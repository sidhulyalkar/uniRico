const fs=require('fs'),vm=require('vm');
if(!process.argv[2]){console.log(JSON.stringify({status:'SKIP',reason:'packed artifact not built yet'}));process.exit(0)}
const html=fs.readFileSync(process.argv[2],'utf8'),m=html.match(/<script>([\s\S]*)<\/script>/i);
if(!m)throw Error('packed index.html has no inline script');
const noop=()=>{},gradient={addColorStop:noop},text=[],rotations=[];let previewDash=false,previewLines=0;
const ctx=new Proxy({}, {get:(o,k)=>k==='createRadialGradient'||k==='createLinearGradient'?()=>gradient:k==='measureText'?s=>({width:String(s).length*8}):k==='fillText'?(s=>text.push(String(s))):k==='rotate'?(a=>rotations.push(a)):k==='setLineDash'?(a=>{previewDash=Array.isArray(a)&&a[0]===2&&a[1]===8}):k==='lineTo'?((...a)=>{previewDash&&previewLines++}):noop,set:(o,k,v)=>(o[k]=v,true)});
const handlers={},winHandlers={};
const canvas={width:960,height:600,style:{},getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:(n,f)=>handlers[n]=f,setPointerCapture:noop};
const els={};
const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:'',style:{}})};
let raf=0,frame;
const sandbox={console,document,localStorage:{},innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:(n,f)=>winHandlers[n]=f,requestAnimationFrame:f=>(raf++,frame=f,1),setTimeout:()=>1,clearTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary')};
sandbox.window=sandbox;
vm.createContext(sandbox);
vm.runInContext(m[1],sandbox,{timeout:2000});
if(!raf||!frame)throw Error('packed runtime never reached animation scheduling');
if(canvas.width!==960||canvas.height!==600)throw Error(`packed runtime canvas init drifted: ${canvas.width}x${canvas.height}`);
if(!handlers.pointerdown||!handlers.pointermove||!winHandlers.keydown)throw Error('packed runtime did not register pointer + keyboard controls');
const evt=(x,y,pointerType='mouse')=>({clientX:x,clientY:y,pointerType,pointerId:1}),key=k=>winHandlers.keydown({key:k,preventDefault:noop});
const render=t=>{text.length=0;rotations.length=0;previewLines=0;previewDash=false;frame(t);return [...text]};
const expectLevel=(n,strings)=>{let p='LEVEL '+String(n).padStart(2,'0')+' · ';if(!strings.some(s=>s.startsWith(p)))throw Error(`packed Level ${n} did not launch: ${JSON.stringify(strings.slice(-24))}`)};
const ad=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
let tm=0,strings=render(tm);tm+=16.667;
if(!strings.includes('AIM KEYS'))throw Error('packed desktop aim mode is not keyboard-default');
// Main-menu toggle must remain mouse-clickable and reversible.
handlers.pointerdown(evt(480,434));strings=render(tm);tm+=16.667;if(!strings.includes('AIM MOUSE'))throw Error('packed main-menu AIM toggle did not enable mouse mode');
handlers.pointerdown(evt(480,434));strings=render(tm);tm+=16.667;if(!strings.includes('AIM KEYS'))throw Error('packed main-menu AIM toggle did not restore keyboard mode');
// Enter LEVELS from the main menu using the actual packed pointer path.
handlers.pointerdown(evt(480,390));strings=render(tm);tm+=16.667;
if(!strings.includes('50 LEVELS · LOCAL RECORDS'))throw Error(`packed level select does not expose 50 levels: ${JSON.stringify(strings.slice(-20))}`);
if(!strings.includes('50'))throw Error('packed level select did not render a Level 50 card');
handlers.pointermove(evt(114,159));strings=render(tm);tm+=16.667;
if(!strings.some(s=>s.startsWith('01 · ')))throw Error(`Level 1 hover preview did not follow pointermove: ${JSON.stringify(strings.slice(-20))}`);
// Click authority remains actual pointerdown coordinates.
handlers.pointerdown(evt(594,381));strings=render(tm);tm+=16.667;expectLevel(37,strings);
handlers.pointerdown(evt(900,87));render(tm);tm+=16.667;
handlers.pointerdown(evt(480,389));strings=render(tm);tm+=16.667;
if(!strings.includes('50 LEVELS · LOCAL RECORDS'))throw Error('could not reopen packed 50-level selector');
handlers.pointermove(evt(194,159));render(tm);tm+=16.667;
handlers.pointerdown(evt(834,455));strings=render(tm);tm+=16.667;
if(!strings.some(s=>s.includes('LEVEL 50 · MIRROR FULL SPECTRUM')))throw Error(`packed Level 50 is not independently clickable: ${JSON.stringify(strings.slice(-24))}`);
if(!strings.some(s=>s.includes('KEY AIM')))throw Error('Level 50 did not advertise keyboard aim controls');
// Keyboard mode: mouse motion cannot disturb aim, arrows provide full 360° rotation.
let start=rotations.at(-1);handlers.pointermove(evt(820,60));strings=render(tm);tm+=16.667;let aim=rotations.at(-1);
if(start==null||aim==null||ad(aim,start)>1e-9)throw Error(`mouse motion changed packed keyboard aim: ${start} -> ${aim}`);
for(let i=0;i<45;i++)key('ArrowRight');strings=render(tm);tm+=16.667;aim=rotations.at(-1);
if(aim==null||ad(aim,Math.PI)>1e-9)throw Error(`packed Level 50 keyboard aim cannot reach 180°: ${aim}`);
for(let i=0;i<45;i++)key('ArrowRight');strings=render(tm);tm+=16.667;aim=rotations.at(-1);
if(aim==null||ad(aim,0)>1e-9)throw Error(`packed Level 50 keyboard aim cannot complete 360°: ${aim}`);
key('ArrowUp');strings=render(tm);tm+=16.667;aim=rotations.at(-1);
if(aim==null||ad(aim,-Math.PI/360)>1e-9)throw Error(`packed Level 50 fine keyboard aim drifted: ${aim}`);
if(previewLines<5)throw Error(`packed Level 50 trajectory preview is too short: ${previewLines} dotted segments`);
key(' ');render(tm);tm+=16.667;if(previewLines!==0)throw Error('Space did not fire the packed keyboard-selected trajectory');
// Pause K-toggle back to mouse aim, restart, then prove pointer + click authority remains available.
handlers.pointerdown(evt(900,87));strings=render(tm);tm+=16.667;key('K');strings=render(tm);tm+=16.667;
if(!strings.includes('AIM MOUSE'))throw Error('packed K toggle did not enable mouse aim');
handlers.pointerdown(evt(480,301));render(tm);tm+=16.667;
handlers.pointermove(evt(820,60));strings=render(tm);tm+=16.667;aim=rotations.at(-1);
if(aim==null||ad(aim,-Math.PI/2)>1e-9)throw Error(`packed legacy mouse aim drifted: ${aim}`);
if(!strings.some(s=>s.includes('MOUSE AIM')))throw Error('packed mouse mode control hint is missing');
handlers.pointerdown(evt(300,300));render(tm);tm+=16.667;if(previewLines!==0)throw Error('mouse mode click did not fire the packed trajectory');
// Touch selection remains coordinate-authoritative and independent of desktop mode.
handlers.pointerdown(evt(900,87));render(tm);tm+=16.667;
handlers.pointerdown(evt(480,389));render(tm);tm+=16.667;
handlers.pointerdown(evt(194,307,'touch'));strings=render(tm);expectLevel(22,strings);
console.log(JSON.stringify({status:'PASS',packedRuntimeExecuted:true,animationScheduled:raf>0,levelSelect:50,keyboardDefault:true,level50Keyboard360:true,spaceFire:true,mouseToggle:true,mouseAim:true,touchLevel22:true}));
