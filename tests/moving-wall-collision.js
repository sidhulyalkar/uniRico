const fs=require('fs'),vm=require('vm'),path=require('path');
const src=path.join(__dirname,'../src');
let js=fs.readFileSync(path.join(src,'levels.js'),'utf8')+'\n'+['core.js','audio.js','physics.js','render-world.js','render-entities.js','render-hud.js','ui.js'].map(f=>fs.readFileSync(path.join(src,'runtime',f),'utf8')).join('\n');
js=js.replace('$2();$0();_b()','globalThis.TW={wall:_e,wallPos:wp};$2();$0()');
const noop=()=>{},grad=()=>({addColorStop:noop});
const ctx={beginPath:noop,arc:noop,fill:noop,stroke:noop,fillRect:noop,strokeRect:noop,moveTo:noop,lineTo:noop,quadraticCurveTo:noop,roundRect:noop,save:noop,restore:noop,translate:noop,rotate:noop,scale:noop,setTransform:noop,clearRect:noop,setLineDash:noop,fillText:noop,createRadialGradient:grad,createLinearGradient:grad};
const canvas={getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:noop};
const els={};
const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:''})};
const sandbox={console,document,localStorage:{},innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:noop,requestAnimationFrame:noop,setTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary'),window:{}};sandbox.window=sandbox;
vm.createContext(sandbox);vm.runInContext(js,sandbox,{timeout:1000});
const {wall,wallPos}=sandbox.TW;
const assert=(c,m)=>{if(!c)throw Error(m)};
// 1. High-speed shot must not tunnel through a thin stationary wall.
let w=[300,150,14,260],b={ox:280,oy:260,x:330,y:260,vx:50,vy:0,r:0};
assert(wall(b,w,1,1)===1,'swept stationary wall contact missed');
assert(b.r===1&&b.vx<0,'stationary wall did not reflect');
assert(b.x<300,'stationary wall did not separate ball to entry side');
// 2. A moving wall sweeping into a nearly stationary ball must push it away,
//    not classify the collision as an end-cap hit and drag it along the stick.
w=[300,150,14,260,1,80,.08,0];
let now=5,cur=wallPos(w,now),old=wallPos(w,now-1),mv=cur[0]-old[0];
// Choose the ball just outside the previous right face but inside the swept region.
let start=old[0]+w[2]+6.3;
b={ox:start,oy:260,x:start,y:260,vx:0,vy:0,r:0};
assert(wall(b,w,now,1)===1,'moving wall sweep contact missed');
assert(b.r===1,'moving wall should count exactly one bounce');
assert(Math.sign(b.vx)===Math.sign(mv),'wall should push ball in wall travel direction');
assert(b.x>=cur[0]+w[2]+6,'ball not separated from moving wall');
// 3. Tangential wall motion must not inject a fake normal-angle change.
w=[300,150,14,260,2,60,.06,0];now=19;cur=wallPos(w,now);old=wallPos(w,now-1);
b={ox:285,oy:260,x:310,y:264,vx:25,vy:4,r:0};
const vy=b.vy;
assert(wall(b,w,now,1)===1,'tangential moving wall contact missed');
assert(b.vx<0,'normal component failed to reflect');
assert(b.vy===vy,'tangential wall movement changed tangential velocity');
// 4. After separation, an outgoing ball should not immediately bounce again.
let r0=b.r;b.ox=b.x;b.oy=b.y;b.x+=b.vx;b.y+=b.vy;
assert(!wall(b,w,now+1,1),'outgoing ball re-collided / stuck');
assert(b.r===r0,'bounce counter increased while separating');
console.log('moving-wall-collision: PASS');
