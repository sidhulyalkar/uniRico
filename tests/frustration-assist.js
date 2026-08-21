const fs=require('fs'),path=require('path');
const physics=fs.readFileSync(path.join(__dirname,'../src/runtime/physics.js'),'utf8');
if(!physics.includes("$d==3&&_d(W/2,H-48,'STUCK? MENU → HELP',190)"))throw Error('three-miss Help nudge missing');
console.log(JSON.stringify({status:'PASS',triggerAfterFailedShots:3}));
