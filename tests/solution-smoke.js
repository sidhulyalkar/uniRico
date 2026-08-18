const fs=require('fs'),vm=require('vm'),path=require('path');
const runtimeFiles=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=runtimeFiles.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
js=js.replace('$2();$0();_b()',`globalThis.G={
  run:i=>{
    L=i;let [a,delay]=sol(),b=$i(a),idx=0,tm=delay,steps=0;
    for(;steps<1800;steps++){
      let z=_f(b,tm,1);
      if(z<0)return {ok:false,reason:'physics '+z,idx,steps,refs:b.r};
      if(z!==2){
        let t=LEVELS[i].t[idx];
        if(t&&hit(b,t,tm)){
          if(b.r!==t[2])return {ok:false,reason:'wrong bounce',idx,steps,refs:b.r,need:t[2]};
          if(++idx===LEVELS[i].t.length)return {ok:true,idx,steps:steps+1,refs:b.r};
        }else for(let j=idx+1;j<LEVELS[i].t.length;j++)if(hit(b,LEVELS[i].t[j],tm))return {ok:false,reason:'wrong order',idx,hit:j,steps};
      }
      tm++;
    }
    return {ok:false,reason:'timeout',idx,steps,refs:b.r};
  },
  info:()=>LEVELS.map((l,i)=>({level:i+1,name:l.n,targets:l.t.length,q:l.q,radii:l.t.map(t=>t[7]||16)}))
};$2();$0()`);
const noop=()=>{},grad=()=>({addColorStop:noop});
const ctx={beginPath:noop,arc:noop,fill:noop,stroke:noop,fillRect:noop,strokeRect:noop,moveTo:noop,lineTo:noop,quadraticCurveTo:noop,roundRect:noop,save:noop,restore:noop,translate:noop,rotate:noop,scale:noop,setTransform:noop,clearRect:noop,setLineDash:noop,fillText:noop,createRadialGradient:grad,createLinearGradient:grad};
const canvas={getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:noop};
const els={};const document={querySelector:s=>s==='#c'?canvas:(els[s]??={textContent:'',style:{}})};
const sandbox={console,document,localStorage:{},innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:noop,requestAnimationFrame:noop,setTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary'),window:{}};sandbox.window=sandbox;
vm.createContext(sandbox);vm.runInContext(js,sandbox,{timeout:1000});
const info=sandbox.G.info(),out=[];
for(let i=0;i<40;i++){let r=sandbox.G.run(i);if(!r.ok)throw Error(`encoded solution FAILED on ${i+1} ${info[i].name}: ${JSON.stringify(r)}`);if(r.idx!==info[i].targets)throw Error(`target chain incomplete on ${i+1}`);out.push(r)}
for(let i=1;i<info.length;i++)if(info[i].q>info[i-1].q)throw Error(`preview budget got easier at ${i+1}: ${info[i-1].q} -> ${info[i].q}`);
for(let i=15;i<25;i++)if(info[i].targets<2)throw Error(`bridge level ${i+1} needs at least 2 ordered locks`);
for(let i=25;i<30;i++)if(info[i].targets!==3)throw Error(`level ${i+1} should be a 3-lock chain`);
for(let i=30;i<35;i++)if(info[i].targets!==4)throw Error(`level ${i+1} should be a 4-lock chain`);
for(let i=35;i<40;i++)if(info[i].targets<5)throw Error(`endgame level ${i+1} needs at least 5 locks`);
if(info[39].targets!==6)throw Error('FULL SPECTRUM must end with a 6-lock chain');
console.log(JSON.stringify({status:'PASS',levels:out.length,targets:info.map(x=>x.targets),previewBudgets:info.map(x=>x.q),last:out.at(-1)},null,2));
