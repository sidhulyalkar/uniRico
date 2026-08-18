const fs=require('fs'),vm=require('vm'),path=require('path');
const files=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=files.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
js=js.replace('$2();$0();_b()',`(()=>{
 const KEYS=['w','o','f','z','a','g','s','b','c','k','r'];let log=null;
 const mark=(k,j)=>log&&j>=0&&log[k].add(j),oe=_e,oE=$E,oO=$O;
 _e=(ball,w,tm,sim)=>{let z=oe(ball,w,tm,sim);if(z)mark('w',A(O(),'w').indexOf(w));return z};
 $E=(ball,w,sim)=>{let z=oE(ball,w,sim);if(z)mark('b',A(O(),'b').indexOf(w));return z};
 $O=(ball,o,tm,sim)=>{let z=oO(ball,o,tm,sim);if(z)mark('o',A(O(),'o').indexOf(o));return z};
 globalThis.COVER={run:i=>{
   L=i;let l=O(),[ang,delay]=sol(),ball=$i(ang),idx=0,tm=delay;log=Object.fromEntries(KEYS.map(k=>[k,new Set()]));
   for(let stepN=0;stepN<1800;stepN++){
     A(l,'f').forEach((x,j)=>I(ball.x,ball.y,x)&&mark('f',j));
     A(l,'z').forEach((x,j)=>I(ball.x,ball.y,x)&&mark('z',j));
     A(l,'g').forEach((x,j)=>{let d=D(ball.x,ball.y,x[0],x[1]);d<x[3]&&d>8&&mark('g',j)});
     A(l,'k').forEach((x,j)=>{let d=D(ball.x,ball.y,x[0],x[1]);ball.charge&&d<x[3]&&d>8&&mark('k',j)});
     let z=_f(ball,tm,1);
     ball.la>=0&&mark('a',ball.la);ball.ls>=0&&mark('s',ball.ls);ball.lc>=0&&mark('c',ball.lc);
     A(l,'r').forEach((x,j)=>I(ball.x,ball.y,x)&&mark('r',j));
     if(z<0)return {ok:false,reason:'physics '+z,idx,used:Object.fromEntries(KEYS.map(k=>[k,[...log[k]]]))};
     if(z!==2){let t=l.t[idx];if(t&&hit(ball,t,tm)){if(ball.r!==t[2])return {ok:false,reason:'bounce',idx};if(++idx===l.t.length)return {ok:true,idx,used:Object.fromEntries(KEYS.map(k=>[k,[...log[k]]]))}}else for(let j=idx+1;j<l.t.length;j++)if(hit(ball,l.t[j],tm))return {ok:false,reason:'order',idx}}
     tm++;
   }
   return {ok:false,reason:'timeout',idx};
 },levels:()=>LEVELS};
})();$2();$0()`);
const noop=()=>{},grad=()=>({addColorStop:noop});const ctx={beginPath:noop,arc:noop,fill:noop,stroke:noop,fillRect:noop,strokeRect:noop,moveTo:noop,lineTo:noop,quadraticCurveTo:noop,roundRect:noop,save:noop,restore:noop,translate:noop,rotate:noop,scale:noop,setTransform:noop,clearRect:noop,setLineDash:noop,fillText:noop,createRadialGradient:grad,createLinearGradient:grad};
const canvas={getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:noop};const els={};const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:'',style:{}})};
const sandbox={console,document,localStorage:{},innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:noop,requestAnimationFrame:noop,setTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary'),window:{}};sandbox.window=sandbox;
vm.createContext(sandbox);vm.runInContext(js,sandbox,{timeout:1000});
const KEYS=['w','o','f','z','a','g','s','b','c','k','r'],levels=sandbox.COVER.levels(),gateWalls=new Set(['3:0','13:0','15:0']),summary=[];
for(let i=0;i<40;i++){
 const r=sandbox.COVER.run(i);if(!r.ok)throw Error(`intended route failed on ${i+1} ${levels[i].n}: ${JSON.stringify(r)}`);
 let missing=[];
 for(const k of KEYS)for(let j=0;j<(levels[i][k]||[]).length;j++)if(!(r.used[k]||[]).includes(j)&&!gateWalls.has(`${i+1}:${j}`))missing.push(`${k}${j}`);
 if(missing.length)throw Error(`unused visible mechanic on ${i+1} ${levels[i].n}: ${missing.join(', ')}`);
 if(gateWalls.has(`${i+1}:0`)){
   const w=levels[i].w[0];if(!(w[1]===0&&w[3]===600))throw Error(`portal gate on ${i+1} no longer blocks the arena`);
   if(!(r.used.o||[]).length)throw Error(`portal gate level ${i+1} did not use its portal`);
 }
 summary.push({level:i+1,name:levels[i].n,mechanics:KEYS.filter(k=>(levels[i][k]||[]).length).join('/')||'bounce/target'});
}
if(summary[19].mechanics!=='w/f/s')throw Error('Level 20 no longer requires its wall/wind/spin mix');
console.log(JSON.stringify({status:'PASS',levels:40,level20:summary[19],endgame:summary.slice(35)},null,2));
