const fs=require('fs'),vm=require('vm'),path=require('path');
const runtimeFiles=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=runtimeFiles.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
const entities=fs.readFileSync(path.join(__dirname,'../src/runtime/render-entities.js'),'utf8');
const ui=fs.readFileSync(path.join(__dirname,'../src/runtime/ui.js'),'utf8');
const hud=fs.readFileSync(path.join(__dirname,'../src/runtime/render-hud.js'),'utf8');
js=js.replace('$2();$0();_b()',`globalThis.TOUCH={
  reset:()=>{L=0;F=1;B=null;$d=0;$e=[430,300];tc=0;mo=0;cm=0},
  level:i=>{L=i;F=1;B=null;$d=0;tc=0;mo=0;cm=0;let p=O().p;$e=[p[0]+300,p[1]]},
  menu:()=>{F=0;B=null},
  pause:()=>{F=4},
  state:()=>({F,level:L,shot:!!B,shots:$d,aim:$e.slice(),player:O().p.slice(),pivot:ap(),angle:Math.atan2($e[1]-O().p[1],$e[0]-O().p[0]),capture:tc,mobile:mo,sound:$y,path:$a,mode:cm?'mouse':'keys'})
};$2();$0()`);
const noop=()=>{},grad=()=>({addColorStop:noop});
const ctx={beginPath:noop,arc:noop,fill:noop,stroke:noop,fillRect:noop,strokeRect:noop,moveTo:noop,lineTo:noop,quadraticCurveTo:noop,roundRect:noop,save:noop,restore:noop,translate:noop,rotate:noop,scale:noop,setTransform:noop,clearRect:noop,setLineDash:noop,fillText:noop,createRadialGradient:grad,createLinearGradient:grad};
const handlers={},winHandlers={};
const canvas={getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:(n,f)=>handlers[n]=f,setPointerCapture:noop};
const els={};const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:'',style:{}})};
const storage={};
const sandbox={console,document,localStorage:storage,innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:(n,f)=>winHandlers[n]=f,requestAnimationFrame:noop,setTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary'),window:{}};sandbox.window=sandbox;
vm.createContext(sandbox);vm.runInContext(js,sandbox,{timeout:1000});
const assert=(c,m)=>{if(!c)throw Error(m)},ev=(type,x,y,id=1)=>({pointerType:type,clientX:x,clientY:y,pointerId:id}),key=k=>winHandlers.keydown({key:k,preventDefault:noop});
const ad=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));

assert(/pts=\[\],N=300/.test(entities),'trajectory preview must use one 300-tick horizon across the campaign');
assert(/cm&&da\(q\[0\],q\[1\]\)/.test(ui),'mouse aiming must be gated behind mouse mode');
assert(/ArrowLeft.*-P\/45.*ArrowRight.*P\/45.*ArrowUp.*-P\/360.*ArrowDown.*P\/360/.test(ui),'keyboard coarse/fine rotation contract drifted');
assert(/k===' '&&F===1/.test(ui),'Space must fire during live play');
assert(/AIM '\+\(cm\?'MOUSE':'KEYS'\)/.test(hud),'visible desktop aim toggle is missing');

// Keyboard aim is the default desktop authority. Mouse motion/click must be inert
// during live play while the arrow keys rotate the exact authoritative aim vector.
sandbox.TOUCH.reset();let s=sandbox.TOUCH.state();assert(s.mode==='keys','keyboard aim must be the desktop default');
let start=s.angle,q=s.pivot;handlers.pointermove(ev('mouse',q[0],q[1]-80,1));s=sandbox.TOUCH.state();assert(ad(s.angle,start)<1e-12,'mouse movement changed aim while keyboard mode was active');
handlers.pointerdown(ev('mouse',300,300,2));s=sandbox.TOUCH.state();assert(!s.shot&&s.shots===0,'mouse click fired while keyboard mode was active');
key('ArrowRight');s=sandbox.TOUCH.state();assert(ad(s.angle,Math.PI/45)<1e-9,'ArrowRight did not coarse-rotate by 4 degrees');
key('ArrowUp');s=sandbox.TOUCH.state();assert(ad(s.angle,Math.PI/45-Math.PI/360)<1e-9,'ArrowUp did not fine-rotate by 0.5 degrees');
key(' ');s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'Space did not fire the keyboard-selected aim');

// Full 360-degree keyboard rotation must work on the corner-positioned final level.
sandbox.TOUCH.level(49);for(let i=0;i<45;i++)key('ArrowRight');s=sandbox.TOUCH.state();assert(ad(s.angle,Math.PI)<1e-9,'Level 50 keyboard aim could not reach 180 degrees');
for(let i=0;i<45;i++)key('ArrowRight');s=sandbox.TOUCH.state();assert(ad(s.angle,0)<1e-9,'Level 50 keyboard aim could not complete 360 degrees');

// K and the clickable menu toggle switch to legacy mouse aim, which preserves
// edge-safe 360-degree pointer mapping and click-to-fire authority.
key('K');s=sandbox.TOUCH.state();assert(s.mode==='mouse'&&storage.r1c==='1','K did not persist mouse aim mode');q=s.pivot;
handlers.pointermove(ev('mouse',q[0],q[1]-80,3));s=sandbox.TOUCH.state();assert(ad(s.angle,-Math.PI/2)<1e-9,'mouse mode did not restore pointer aim');
handlers.pointerdown(ev('mouse',260,520,4));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'mouse mode click did not fire');
sandbox.TOUCH.menu();handlers.pointerdown(ev('mouse',480,434,5));s=sandbox.TOUCH.state();assert(s.mode==='keys'&&storage.r1c==='0','main-menu AIM toggle did not return to keyboard mode');

// Mobile AIM/FIRE remains independent from desktop mode.
sandbox.TOUCH.reset();handlers.pointerdown(ev('touch',90,456,6));s=sandbox.TOUCH.state();assert(s.mobile&&s.capture===6&&!s.shot,'aim wheel should capture touch without firing');
handlers.pointermove(ev('touch',144,510,6));s=sandbox.TOUCH.state();assert(Math.abs(s.aim[0]-430)<1&&Math.abs(s.aim[1]-300)<1,'aim wheel should map ring position to a 300px launch vector');
handlers.pointerup(ev('touch',144,510,6));s=sandbox.TOUCH.state();assert(!s.shot&&s.capture===0,'releasing aim wheel must not fire');
handlers.pointerdown(ev('touch',870,510,7));s=sandbox.TOUCH.state();assert(s.shot&&s.shots===1,'separate mobile FIRE control should launch once');

sandbox.TOUCH.pause();let before=sandbox.TOUCH.state();handlers.pointerdown(ev('touch',420,478,8));let after=sandbox.TOUCH.state();assert(after.sound!==before.sound,'pause sound toggle is not touch-clickable');before=after;handlers.pointerdown(ev('touch',540,478,9));after=sandbox.TOUCH.state();assert(after.path!==before.path,'pause path toggle is not touch-clickable');before=after;handlers.pointerdown(ev('touch',660,478,10));after=sandbox.TOUCH.state();assert(after.mode!==before.mode,'pause AIM toggle is not touch-clickable');
console.log(JSON.stringify({status:'PASS',scheme:'keyboard-default desktop aim + optional mouse aim + mobile wheel',level50Keyboard360:true,mouseToggle:true,sound:after.sound,path:after.path}));
