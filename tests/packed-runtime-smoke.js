const fs=require('fs'),vm=require('vm');
if(!process.argv[2]){console.log(JSON.stringify({status:'SKIP',reason:'packed artifact not built yet'}));process.exit(0)}
const html=fs.readFileSync(process.argv[2],'utf8'),m=html.match(/<script>([\s\S]*)<\/script>/i);
if(!m)throw Error('packed index.html has no inline script');
const noop=()=>{},gradient={addColorStop:noop},text=[];
const ctx=new Proxy({}, {get:(o,k)=>k==='createRadialGradient'||k==='createLinearGradient'?()=>gradient:k==='measureText'?s=>({width:String(s).length*8}):k==='fillText'?(s=>text.push(String(s))):noop,set:(o,k,v)=>(o[k]=v,true)});
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
const evt=(x,y)=>({clientX:x,clientY:y,pointerType:'mouse',pointerId:1});
// Enter LEVELS from the main menu using the actual packed input path.
text.length=0;handlers.pointerdown(evt(480,390));frame(16.667);
if(!text.includes('50 LEVELS · LOCAL RECORDS'))throw Error(`packed level select does not expose 50 levels: ${JSON.stringify(text.slice(-20))}`);
if(!text.includes('50'))throw Error('packed level select did not render a Level 50 card');
// Level 50 is row 5, column 10 of the 10x5 grid. Aim at its card, then click it.
text.length=0;handlers.pointermove(evt(834,455));handlers.pointerdown(evt(834,455));frame(33.334);
if(!text.some(s=>s.includes('LEVEL 50 · MIRROR FULL SPECTRUM')))throw Error(`packed Level 50 is not selectable/playable: ${JSON.stringify(text.slice(-20))}`);
console.log(JSON.stringify({status:'PASS',packedRuntimeExecuted:true,animationScheduled:raf>0,levelSelect:50,level50:'MIRROR FULL SPECTRUM'}));
