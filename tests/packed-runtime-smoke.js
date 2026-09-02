const fs=require('fs'),vm=require('vm');
if(!process.argv[2]){console.log(JSON.stringify({status:'SKIP',reason:'packed artifact not built yet'}));process.exit(0)}
const html=fs.readFileSync(process.argv[2],'utf8'),m=html.match(/<script>([\s\S]*)<\/script>/i);
if(!m)throw Error('packed index.html has no inline script');
const noop=()=>{},gradient={addColorStop:noop},text=[],rotations=[];let previewDash=false,previewLines=0;
const ctx=new Proxy({}, {get:(o,k)=>k==='createRadialGradient'||k==='createLinearGradient'?()=>gradient:k==='measureText'?s=>({width:String(s).length*8}):k==='fillText'?(s=>text.push(String(s))):k==='rotate'?(a=>rotations.push(a)):k==='setLineDash'?(a=>{previewDash=Array.isArray(a)&&a[0]===2&&a[1]===8}):k==='lineTo'?((...a)=>{previewDash&&previewLines++}):noop,set:(o,k,v)=>(o[k]=v,true)});
const handlers={};
const canvas={width:960,height:600,style:{},getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:(n,f)=>handlers[n]=f,setPointerCapture:noop};
const els={};
const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:'',style:{}})};
let raf=0,frame;
const sandbox={console,document,localStorage:{},innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:noop,requestAnimationFrame:f=>(raf++,frame=f,1),setTimeout:()=>1,clearTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary')};
sandbox.window=sandbox;
vm.createContext(sandbox);
vm.runInContext(m[1],sandbox,{timeout:2000});
if(!raf||!frame)throw Error('packed runtime never reached animation scheduling');
if(canvas.width!==960||canvas.height!==600)throw Error(`packed runtime canvas init drifted: ${canvas.width}x${canvas.height}`);
if(!handlers.pointerdown||!handlers.pointermove)throw Error('packed runtime did not register pointer controls');
const evt=(x,y,pointerType='mouse')=>({clientX:x,clientY:y,pointerType,pointerId:1});
const render=t=>{text.length=0;rotations.length=0;previewLines=0;previewDash=false;frame(t);return [...text]};
const expectLevel=(n,strings)=>{let p='LEVEL '+String(n).padStart(2,'0')+' · ';if(!strings.some(s=>s.startsWith(p)))throw Error(`packed Level ${n} did not launch: ${JSON.stringify(strings.slice(-24))}`)};
const ad=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
// Enter LEVELS from the main menu using the actual packed input path.
handlers.pointerdown(evt(480,390));let strings=render(16.667);
if(!strings.includes('50 LEVELS · LOCAL RECORDS'))throw Error(`packed level select does not expose 50 levels: ${JSON.stringify(strings.slice(-20))}`);
if(!strings.includes('50'))throw Error('packed level select did not render a Level 50 card');
// Hover must preview the card under the pointer.
handlers.pointermove(evt(114,159));strings=render(33.334);
if(!strings.some(s=>s.startsWith('01 · ')))throw Error(`Level 1 hover preview did not follow pointermove: ${JSON.stringify(strings.slice(-20))}`);
// Adversarial authority test: leave hover on Level 1, then pointerdown Level 37 directly.
// A selector that reads stale hover state launches Level 1 here. The click itself must win.
handlers.pointerdown(evt(594,381));strings=render(50.001);expectLevel(37,strings);
// Return to LEVELS through the actual gameplay -> pause -> levels path.
handlers.pointerdown(evt(900,87));render(66.668);
handlers.pointerdown(evt(480,389));strings=render(83.335);
if(!strings.includes('50 LEVELS · LOCAL RECORDS'))throw Error('could not reopen packed 50-level selector');
// Hover a different card, then click Level 50 without moving there first.
handlers.pointermove(evt(194,159));render(100.002);
handlers.pointerdown(evt(834,455));strings=render(116.669);
if(!strings.some(s=>s.includes('LEVEL 50 · MIRROR FULL SPECTRUM')))throw Error(`packed Level 50 is not independently clickable: ${JSON.stringify(strings.slice(-24))}`);
// Level 50's projectile origin remains (870,100), but desktop control uses an
// edge-safe pivot at (820,140). An 80px circle around that pivot must expose all
// four cardinal horn directions in the exact packed HTML, proving usable 360° aim.
const aims=[[900,140,0],[820,220,Math.PI/2],[740,140,Math.PI],[820,60,-Math.PI/2]];
let tm=133.336;
for(const [x,y,want] of aims){
  handlers.pointermove(evt(x,y));strings=render(tm);tm+=16.667;
  let aim=rotations.at(-1);
  if(aim==null||ad(aim,want)>1e-9)throw Error(`packed Level 50 full-circle aim drifted at ${x},${y}: ${aim} vs ${want}`);
  if(!strings.includes('AIM'))throw Error('packed Level 50 edge-safe AIM pivot cue is missing');
}
if(previewLines<5)throw Error(`packed Level 50 trajectory preview is still too short: ${previewLines} dotted segments`);
// Touch selection must also use tap coordinates and require no hover state.
handlers.pointerdown(evt(900,87));render(tm);tm+=16.667;
handlers.pointerdown(evt(480,389));render(tm);tm+=16.667;
handlers.pointerdown(evt(194,307,'touch'));strings=render(tm);expectLevel(22,strings);
console.log(JSON.stringify({status:'PASS',packedRuntimeExecuted:true,animationScheduled:raf>0,levelSelect:50,hoverPreview:true,staleHoverClickAuthority:true,level37:true,level50:'MIRROR FULL SPECTRUM',level50FullCircleAim:true,level50AimPivot:[820,140],level50PreviewSegments:previewLines,touchLevel22:true}));
