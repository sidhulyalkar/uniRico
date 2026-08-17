const fs=require('fs'),vm=require('vm'),path=require('path');
const runtimeFiles=['../src/levels.js','../src/runtime/core.js','../src/runtime/audio.js','../src/runtime/physics.js','../src/runtime/render-world.js','../src/runtime/render-entities.js','../src/runtime/render-hud.js','../src/runtime/ui.js'];
let js=runtimeFiles.map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
js=js.replace('$2();$0();_b()',`globalThis.G={test:i=>{L=i;$y=0;$6(2);let n=0;while(F===7&&n++<10000)$Q();return {level:i+1,name:LEVELS[i].n,F,n,mode:F,trace:$l.length,targets:LEVELS[i].t.length}},info:()=>LEVELS.map((l,i)=>[i+1,l.n,l.t.length,l.q])};$2();$0()`);
const noop=()=>{};
const grad=()=>({addColorStop:noop});
const ctx={beginPath:noop,arc:noop,fill:noop,stroke:noop,fillRect:noop,strokeRect:noop,moveTo:noop,lineTo:noop,quadraticCurveTo:noop,roundRect:noop,save:noop,restore:noop,translate:noop,rotate:noop,scale:noop,setTransform:noop,clearRect:noop,setLineDash:noop,fillText:noop,createRadialGradient:grad,createLinearGradient:grad};
const canvas={getContext:()=>ctx,getBoundingClientRect:()=>({width:960,height:600,left:0,top:0}),addEventListener:noop};
const els={};
const document={querySelector:s=>s==='#c'?canvas:(els[s]??=( {textContent:''}))};
const localStorage={};
const sandbox={console,document,localStorage,innerWidth:960,innerHeight:600,devicePixelRatio:1,addEventListener:noop,requestAnimationFrame:noop,setTimeout:noop,Math,atob:s=>Buffer.from(s,'base64').toString('binary'),window:{}};
sandbox.window=sandbox;
vm.createContext(sandbox);vm.runInContext(js,sandbox,{timeout:1000});
let out=[];for(let i=0;i<40;i++){let r=sandbox.G.test(i);if(r.F!==1)throw Error('solution failed on level '+(i+1)+' '+r.name);out.push(r)}
console.log(JSON.stringify({status:'PASS',levels:out.length,last:out.at(-1)},null,2));
