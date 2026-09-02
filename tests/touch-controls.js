const fs=require('fs'),vm=require('vm'),path=require('path');
const runtimeFiles=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=runtimeFiles.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
const entities=fs.readFileSync(path.join(__dirname,'../src/runtime/render-entities.js'),'utf8');
const ui=fs.readFileSync(path.join(__dirname,'../src/runtime/ui.js'),'utf8');
js=js.replace('$2();$0();_b()',`globalThis.TOUCH={
  reset:()=>{L=0;F=1;B=null;$d=0;$e=[800,300];tc=0;mo=0},
  level:i=>{L=i;F=1;B=null;$d=0;tc=0;mo=0;$e=O().p.slice()},
  pause:()=>{F=4},
  state:()=>({F,level:L,shot:!!B,shots:$d,aim:$e.slice(),player:O().p.slice(),pivot:ap(),angle:Math.atan2($e[1]-O().p[1],$e[0]-O().p[0]),capture:tc,mobile:mo,sound:$y,path:$a})
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
const ad=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));

assert(/pts=\[\],N=300/.test(entities),'trajectory preview must use one 300-tick horizon across the campaign');
assert(!/N=O\(\)\.q/.test(entities),'per-level preview horizon still controls aiming feedback');
assert(/function ap\(\).*140.*W-140.*140.*H-140/.test(ui),'desktop edge-safe aim pivot contract drifted');
assert(/F===1\?da\(q\[0\],q\[1\]\)/.test(ui),'desktop gameplay pointermove must route through edge-safe aim authority');

// Full-circle desktop aim is a global invariant. The cursor controls an inset
// pivot near the unicorn so edge/corner starts still get a usable 360-degree
// circle without changing the projectile origin or physics.
const reps=[0,19,30,39,40,49],dirs=[[80,0,0],[0,80,Math.PI/2],[-80,0,Math.PI],[0,-80,-Math.PI/2]];
for(const i of reps){
  sandbox.TOUCH.level(i);let s=sandbox.TOUCH.state(),q=s.pivot;
  assert(q[0]>=140&&q[0]<=820&&q[1]>=140&&q[1]<=460,`unsafe desktop aim pivot on Level ${i+1}: ${q}`);
  for(const [dx,dy,want] of dirs){
    handlers.pointermove(ev('mouse',q[0]+dx,q[1]+dy,50+i));
    s=sandbox.TOUCH.state();
    assert(ad(s.angle,want)<1e-9,`360 desktop aim drift on Level ${i+1}: ${s.angle} vs ${want}`);
  }
}
sandbox.TOUCH.level(49);let corner=sandbox.TOUCH.state();
assert(corner.player[0]===870&&corner.player[1]===100,'Level 50 player origin drifted');
assert(corner.pivot[0]===820&&corner.pivot[1]===140,'Level 50 edge-safe aim pivot must be 820,140');

sandbox.TOUCH.reset();
handlers.pointerdown(ev('touch',90,456));
let s=sandbox.TOUCH.state();assert(s.mobile&&s.capture===1&&!s.shot,'aim wheel should capture touch without firing');
handlers.pointermove(ev('touch',144,510));s=sandbox.TOUCH.state();assert(Math.abs(s.aim[0]-430)<1&&Math.abs(s.aim[1]-300)<1,'aim wheel should map ring position to a 300px launch vector');
handlers.pointerup(ev('touch',144,510));s=sandbox.TOUCH.state();assert(!s.shot&&s.capture===0,'releasing aim wheel must not fire');
handlers.pointerdown(ev('touch',870,510,2));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'separate FIRE control should launch once using selected angle');

sandbox.TOUCH.reset();handlers.pointerdown(ev('touch',480,300,3));s=sandbox.TOUCH.state();assert(!s.shot,'touching playfield outside controls must not fire');
sandbox.TOUCH.reset();handlers.pointerdown(ev('mouse',800,300,4));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'mouse click should still fire immediately');

sandbox.TOUCH.reset();let q=sandbox.TOUCH.state().pivot;handlers.pointermove(ev('mouse',q[0]+80,q[1]-40,5));let aimed=sandbox.TOUCH.state();handlers.pointerdown(ev('mouse',260,520,6));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'desktop click should fire the current aim');assert(s.aim[0]===aimed.aim[0]&&s.aim[1]===aimed.aim[1],'desktop pointerdown must not retarget away from the displayed trajectory');

sandbox.TOUCH.pause();let before=sandbox.TOUCH.state();handlers.pointerdown(ev('touch',420,478,7));let after=sandbox.TOUCH.state();assert(after.sound!==before.sound,'pause sound toggle is not touch-clickable');before=after;handlers.pointerdown(ev('touch',540,478,8));after=sandbox.TOUCH.state();assert(after.path!==before.path,'pause path toggle is not touch-clickable');
console.log(JSON.stringify({status:'PASS',scheme:'edge-safe 360 desktop aim + uniform preview + aim-wheel + separate fire',desktopLevels:reps.map(i=>i+1),level50Pivot:corner.pivot,sound:after.sound,path:after.path}));
