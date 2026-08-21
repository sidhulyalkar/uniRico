const fs=require('fs'),vm=require('vm'),path=require('path');
const runtimeFiles=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=runtimeFiles.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
js=js.replace('$2();$0();_b()',`globalThis.TOUCH={
  reset:()=>{L=0;F=1;B=null;$d=0;$e=[800,300];tc=0;tz=18},
  pause:()=>{F=4},
  state:()=>({F,shot:!!B,shots:$d,aim:$e.slice(),capture:tc,deadzone:tz,sound:$y,path:$a})
};$2();$0()`);
const noop=()=>{},grad=()=>({addColorStop:noop});
const ctx={beginPath:noop,arc:noop,fill:noop,stroke:noop,fillRect:noop,strokeRect:noop,moveTo:noop,lineTo:noop,quadraticCurveTo:noop,roundRect:noop,save:noop,restore:noop,translate:noop,rotate:noop,scale:noop,setTransform:noop,clearRect:noop,setLineDash:noop,fillText:noop,createRadialGradient:grad,createLinearGradient:grad};
const handlers={};
const canvas={getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:(n,f)=>handlers[n]=f,setPointerCapture:noop};
const els={};const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:'',style:{}})};
const storage={};
const sandbox={console,document,localStorage:storage,innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:noop,requestAnimationFrame:noop,setTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary'),window:{}};sandbox.window=sandbox;
vm.createContext(sandbox);vm.runInContext(js,sandbox,{timeout:1000});
const assert=(c,m)=>{if(!c)throw Error(m)},ev=(type,x,y,id=1)=>({pointerType:type,clientX:x,clientY:y,pointerId:id});

sandbox.TOUCH.reset();
handlers.pointerdown(ev('touch',430,260));
let s=sandbox.TOUCH.state();assert(!s.shot&&s.capture===1,'touch-down should enter aim mode without firing');
handlers.pointermove(ev('touch',500,290));s=sandbox.TOUCH.state();assert(s.aim[0]!==500||s.aim[1]!==290,'drag gesture should use relative direction rather than raw target');
handlers.pointerup(ev('touch',500,290));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1&&s.capture===0,'drag release should fire exactly one shot');

sandbox.TOUCH.reset();
handlers.pointerdown(ev('touch',760,300,2));handlers.pointerup(ev('touch',764,302,2));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'tap release should retain direct-touch firing');assert(storage.r1z!==undefined,'learned touch deadzone was not persisted');

sandbox.TOUCH.reset();
handlers.pointerdown(ev('mouse',800,300,3));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'mouse click should still fire immediately');

sandbox.TOUCH.reset();
handlers.pointerdown(ev('touch',430,260,4));handlers.pointercancel(ev('touch',430,260,4));s=sandbox.TOUCH.state();assert(s.capture===0&&!s.shot,'cancelled touch should not leave a captured gesture or fire');

sandbox.TOUCH.pause();let before=sandbox.TOUCH.state();handlers.pointerdown(ev('touch',420,478,5));let after=sandbox.TOUCH.state();assert(after.sound!==before.sound,'pause sound toggle is not touch-clickable');before=after;handlers.pointerdown(ev('touch',540,478,6));after=sandbox.TOUCH.state();assert(after.path!==before.path,'pause path toggle is not touch-clickable');

console.log(JSON.stringify({status:'PASS',deadzone:+storage.r1z,sound:after.sound,path:after.path}));
