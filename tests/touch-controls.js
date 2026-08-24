const fs=require('fs'),vm=require('vm'),path=require('path');
const runtimeFiles=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=runtimeFiles.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
js=js.replace('$2();$0();_b()',`globalThis.TOUCH={
  reset:()=>{L=0;F=1;B=null;$d=0;$e=[800,300];tc=0;mo=0},
  pause:()=>{F=4},
  state:()=>({F,shot:!!B,shots:$d,aim:$e.slice(),capture:tc,mobile:mo,sound:$y,path:$a})
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
handlers.pointerdown(ev('touch',90,456));
let s=sandbox.TOUCH.state();assert(s.mobile&&s.capture===1&&!s.shot,'aim wheel should capture touch without firing');
handlers.pointermove(ev('touch',144,510));s=sandbox.TOUCH.state();assert(s.aim[0]>700&&Math.abs(s.aim[1]-300)<1,'aim wheel should map ring position to launch angle');
handlers.pointerup(ev('touch',144,510));s=sandbox.TOUCH.state();assert(!s.shot&&s.capture===0,'releasing aim wheel must not fire');
handlers.pointerdown(ev('touch',870,510,2));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'separate FIRE control should launch once using selected angle');

sandbox.TOUCH.reset();handlers.pointerdown(ev('touch',480,300,3));s=sandbox.TOUCH.state();assert(!s.shot,'touching playfield outside controls must not fire');
sandbox.TOUCH.reset();handlers.pointerdown(ev('mouse',800,300,4));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'mouse click should still fire immediately');

sandbox.TOUCH.pause();let before=sandbox.TOUCH.state();handlers.pointerdown(ev('touch',420,478,5));let after=sandbox.TOUCH.state();assert(after.sound!==before.sound,'pause sound toggle is not touch-clickable');before=after;handlers.pointerdown(ev('touch',540,478,6));after=sandbox.TOUCH.state();assert(after.path!==before.path,'pause path toggle is not touch-clickable');
console.log(JSON.stringify({status:'PASS',scheme:'aim-wheel + separate fire',sound:after.sound,path:after.path}));
