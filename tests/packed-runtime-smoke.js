const fs=require('fs'),vm=require('vm');
if(!process.argv[2]){console.log(JSON.stringify({status:'SKIP',reason:'packed artifact not built yet'}));process.exit(0)}
const html=fs.readFileSync(process.argv[2],'utf8'),m=html.match(/<script>([\s\S]*)<\/script>/i);
if(!m)throw Error('packed index.html has no inline script');
const noop=()=>{},gradient={addColorStop:noop};
const ctx=new Proxy({}, {get:(o,k)=>k==='createRadialGradient'||k==='createLinearGradient'?()=>gradient:k==='measureText'?s=>({width:String(s).length*8}):noop,set:(o,k,v)=>(o[k]=v,true)});
const canvas={width:960,height:600,style:{},getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:noop,setPointerCapture:noop};
const els={};
const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:'',style:{}})};
let raf=0;
const sandbox={console,document,localStorage:{},innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:noop,requestAnimationFrame:f=>(raf++,1),setTimeout:()=>1,clearTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary')};
sandbox.window=sandbox;
vm.createContext(sandbox);
vm.runInContext(m[1],sandbox,{timeout:2000});
if(!raf)throw Error('packed runtime never reached animation scheduling');
if(canvas.width!==960||canvas.height!==600)throw Error(`packed runtime canvas init drifted: ${canvas.width}x${canvas.height}`);
console.log(JSON.stringify({status:'PASS',packedRuntimeExecuted:true,animationScheduled:raf>0}));
