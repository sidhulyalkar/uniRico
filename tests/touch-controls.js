const fs=require('fs'),vm=require('vm'),path=require('path');
const runtimeFiles=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=runtimeFiles.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
const entities=fs.readFileSync(path.join(__dirname,'../src/runtime/render-entities.js'),'utf8');
js=js.replace('$2();$0();_b()',`globalThis.TOUCH={
  reset:()=>{L=0;F=1;B=null;$d=0;$e=[800,300];tc=0;mo=0},
  level:i=>{L=i;F=1;B=null;$d=0;tc=0;mo=0;$e=O().p.slice()},
  pause:()=>{F=4},
  state:()=>({F,level:L,shot:!!B,shots:$d,aim:$e.slice(),player:O().p.slice(),angle:Math.atan2($e[1]-O().p[1],$e[0]-O().p[0]),capture:tc,mobile:mo,sound:$y,path:$a})
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

assert(/pts=\[\],N=300/.test(entities),'trajectory preview must use one 300-tick horizon across the campaign');
assert(!/N=O\(\)\.q/.test(entities),'per-level preview horizon still controls aiming feedback');

// Desktop aim direction is a global invariant. Representative early, late,
// source-endgame, and reflected-gauntlet levels must map the same relative
// pointer vector to the same horn angle.
const reps=[0,19,30,39,40,49],vectors=[[35,25],[-35,-25]];
for(const i of reps)for(const [dx,dy] of vectors){
  sandbox.TOUCH.level(i);let s=sandbox.TOUCH.state(),want=Math.atan2(dy,dx);
  handlers.pointermove(ev('mouse',s.player[0]+dx,s.player[1]+dy,50+i));
  s=sandbox.TOUCH.state();
  assert(Math.abs(s.angle-want)<1e-9,`desktop aim drift on Level ${i+1}: ${s.angle} vs ${want}`);
}

sandbox.TOUCH.reset();
handlers.pointerdown(ev('touch',90,456));
let s=sandbox.TOUCH.state();assert(s.mobile&&s.capture===1&&!s.shot,'aim wheel should capture touch without firing');
handlers.pointermove(ev('touch',144,510));s=sandbox.TOUCH.state();assert(Math.abs(s.aim[0]-430)<1&&Math.abs(s.aim[1]-300)<1,'aim wheel should map ring position to a 300px launch vector');
handlers.pointerup(ev('touch',144,510));s=sandbox.TOUCH.state();assert(!s.shot&&s.capture===0,'releasing aim wheel must not fire');
handlers.pointerdown(ev('touch',870,510,2));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'separate FIRE control should launch once using selected angle');

sandbox.TOUCH.reset();handlers.pointerdown(ev('touch',480,300,3));s=sandbox.TOUCH.state();assert(!s.shot,'touching playfield outside controls must not fire');
sandbox.TOUCH.reset();handlers.pointerdown(ev('mouse',800,300,4));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'mouse click should still fire immediately');

sandbox.TOUCH.reset();handlers.pointermove(ev('mouse',780,180,5));let aimed=sandbox.TOUCH.state();handlers.pointerdown(ev('mouse',260,520,6));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'desktop click should fire the current aim');assert(s.aim[0]===aimed.aim[0]&&s.aim[1]===aimed.aim[1],'desktop pointerdown must not retarget away from the displayed trajectory');

sandbox.TOUCH.pause();let before=sandbox.TOUCH.state();handlers.pointerdown(ev('touch',420,478,7));let after=sandbox.TOUCH.state();assert(after.sound!==before.sound,'pause sound toggle is not touch-clickable');before=after;handlers.pointerdown(ev('touch',540,478,8));after=sandbox.TOUCH.state();assert(after.path!==before.path,'pause path toggle is not touch-clickable');
console.log(JSON.stringify({status:'PASS',scheme:'uniform 300-tick preview + authoritative desktop aim + aim-wheel + separate fire',desktopLevels:reps.map(i=>i+1),sound:after.sound,path:after.path}));
