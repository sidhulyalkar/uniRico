const fs=require('fs'),path=require('path');
const adapter=fs.readFileSync(path.join(__dirname,'../deploy/wavedash/adapter.js'),'utf8');
let progress=[],init=0;
const window={Wavedash:{updateLoadProgressZeroToOne:v=>progress.push(v),init:()=>init++}};
Function('window',adapter)(window);
if(init!==1)throw Error(`Wavedash.init called ${init} times`);
if(progress.length!==1||progress[0]!==1)throw Error(`unexpected progress ${JSON.stringify(progress)}`);
console.log(JSON.stringify({status:'PASS',progress,init}));
