const fs=require('fs'),vm=require('vm'),path=require('path');
const runtimeFiles=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=runtimeFiles.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
js=js.replace('$2();$0();_b()',`globalThis.AUD={start:_i,tick:tk,aim:()=>{F=1;B=null},flight:r=>{F=1;B={r:r||0}},fire:()=>{F=1;B=null;$3()},off:()=>{$y=0},on:()=>{$y=1}};$2();$0();_b()`);
const noop=()=>{},grad=()=>({addColorStop:noop});
const ctx2d={beginPath:noop,arc:noop,fill:noop,stroke:noop,fillRect:noop,strokeRect:noop,moveTo:noop,lineTo:noop,quadraticCurveTo:noop,roundRect:noop,save:noop,restore:noop,translate:noop,rotate:noop,scale:noop,setTransform:noop,clearRect:noop,setLineDash:noop,fillText:noop,createRadialGradient:grad,createLinearGradient:grad};
const canvas={getContext:()=>ctx2d,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:noop};
const els={};
const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:'',style:{}})};
let timers=0,timerFn=null,lastDelay=0,delays=[],osc=0,starts=0,stops=0,filters=0,bandpasses=0,resumes=0,upRamps=0,lowStarts=0,highStarts=0,filterPeaks=[],triangles=0,squares=0;
const param=()=>({value:0,setValueAtTime(v){this.value=v;if(v<90)lowStarts++;if(v>1800)highStarts++},exponentialRampToValueAtTime(v){if(v>this.value)upRamps++;this.value=v}});
const node=()=>({connect(n){return n}});
class FakeAudioContext{
  constructor(){this.currentTime=0;this.destination=node();this.state='suspended'}
  resume(){resumes++;this.state='running'}
  createOscillator(){osc++;let n=node(),type='sine';Object.defineProperty(n,'type',{get(){return type},set(v){type=v;if(v==='triangle')triangles++;if(v==='square')squares++}});n.frequency=param();n.start=()=>starts++;n.stop=()=>stops++;return n}
  createGain(){let n=node();n.gain=param();return n}
  createBiquadFilter(){filters++;let n=node(),type='lowpass';Object.defineProperty(n,'type',{get(){return type},set(v){type=v;v==='bandpass'&&bandpasses++}});n.frequency=param();n.Q={value:0};filterPeaks.push(n);return n}
}
const math=Object.create(Math);math.random=()=>.19;
const sandbox={console,document,localStorage:{},innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:noop,requestAnimationFrame:noop,setInterval:()=>{throw Error('fixed interval transport should not be used')},setTimeout:(fn,ms)=>{timers++;timerFn=fn;lastDelay=ms;delays.push(ms);return timers},Math:math,atob:s=>Buffer.from(s,'base64').toString('binary'),window:{AudioContext:FakeAudioContext}};
sandbox.window.window=sandbox.window;sandbox.window.webkitAudioContext=FakeAudioContext;
vm.createContext(sandbox);vm.runInContext(js,sandbox,{timeout:1000});
const assert=(c,m)=>{if(!c)throw Error(m)};
sandbox.AUD.start();sandbox.AUD.start();
assert(timers===1,'music transport started more than once');
assert(lastDelay===120,'unexpected initial audio unlock delay');
sandbox.AUD.aim();let before=osc,mark=delays.length;
for(let i=0;i<32;i++)sandbox.AUD.tick();
const aimVoices=osc-before,aimDelays=delays.slice(mark),aimMin=Math.min(...aimDelays),aimMax=Math.max(...aimDelays),aimAvg=aimDelays.reduce((a,b)=>a+b,0)/aimDelays.length;
assert(aimAvg>170,'aim state is not the slower orchestral bed');
assert(aimMax-aimMin>20,'aim state has insufficient harmonic pacing variation');
assert(aimVoices>0,'aim state produced no music');
sandbox.AUD.flight(0);before=osc;mark=delays.length;
for(let i=0;i<32;i++)sandbox.AUD.tick();
const flightVoices=osc-before,flightDelays=delays.slice(mark),flightMin=Math.min(...flightDelays),flightMax=Math.max(...flightDelays),flightAvg=flightDelays.reduce((a,b)=>a+b,0)/flightDelays.length;
assert(flightAvg<aimAvg-35,'flight state did not accelerate out of orchestral planning mode');
assert(flightMax-flightMin>20,'flight state has insufficient swing/tempo variation');
assert(flightVoices>aimVoices,'flight arrangement should be sonically denser than the orchestral bed');
sandbox.AUD.flight(4);mark=delays.length;for(let i=0;i<8;i++)sandbox.AUD.tick();
const bounceAvg=delays.slice(mark).reduce((a,b)=>a+b,0)/8;
assert(bounceAvg>flightAvg*.98,'reflection pacing unexpectedly accelerated');
sandbox.AUD.aim();before=osc;sandbox.AUD.fire();
assert(osc-before>=3,'shot launch did not create the immediate drop/firing accent');
assert(filters>0,'expected filtered bass voices');
assert(starts===stops,'oscillator nodes were not all scheduled to stop');
assert(upRamps>0,'no upward filter/riser automation was scheduled');
assert(lowStarts>0,'no deep sub/kick frequencies were scheduled');
assert(highStarts>0,'no sharp percussion frequencies were scheduled');
assert(filterPeaks.some(f=>f.Q.value>=18),'bass timbre did not reach aggressive resonant settings');
assert(bandpasses>0,'no band-pass formant / yoi bass voices were scheduled');
assert(triangles>0,'no pitched funky triangle stabs were scheduled');
assert(squares>0,'no sharp square-wave percussion/stabs were scheduled');
before=osc;sandbox.AUD.off();for(let i=0;i<8;i++)sandbox.AUD.tick();assert(osc===before,'audio nodes created while master sound disabled');
sandbox.AUD.on();assert(resumes>0,'AudioContext never resumed');
console.log(JSON.stringify({status:'PASS',aimAvg,aimMin,aimMax,flightAvg,flightMin,flightMax,bounceAvg,aimVoices,flightVoices,timers,oscillators:osc,filters,starts,stops,triangles,squares,bandpasses,upRamps,lowStarts,highStarts,resumes}));
