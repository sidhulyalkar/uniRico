/** uniRico v0.14.0 readable runtime module. */
const C=document.querySelector('#c'),X=C.getContext('2d'),U={h:document.querySelector('#hud'),t:document.querySelector('#time'),n:document.querySelector('#next')},W=960,H=600,P=Math.PI,T=P*2,MK='wofzagsbckrv',MN='PRISM ARCH WIND DREAM BOOST MOON SPIN STORM CHARGE MAGNET AURORA VOID'.split(' '),Q='KIJJLJJJOIJHJJGJLNKSRTRRPUUURPUUTSPUVUQV',E=atob('IB9A3XQD8NMAALHRAM7g2EDOQM4g0AAAAACwzQAAAABdyitkwtAAAF3KwtArZIBw3Vm5GgAAwtBdyitkuRqAcMLQ3Vmr1DmLAABCYKvUuRo=');let R=Math.random,$V=1,L=0,$d=0,$t=0,$n=0,F=0,$h=0,$e=[800,300],B=null,$q=[],$g=[],$r=[],$c=0,$k=0,$a=1,$y=1,$F,J=0,Y=0,$s=0,$m=0,V=[],$W=0,$l=[],_=0,ek=0,et=0,ee=0,mt,mb=0;
// Geometry and collision helpers
const cl=(v,a,b)=>v<a?a:v>b?b:v,D=(a,b,c,d)=>Math.hypot(a-c,b-d),I=(x,y,r)=>x>r[0]&&x<r[0]+r[2]&&y>r[1]&&y<r[1]+r[3],hit=(b,t,n)=>{let q=tp(t,n),r=(t[7]||16)+6;if(b.pc==11)return D(b.x,b.y,q[0],q[1])<r;let p=tp(t,n-1),x=b.ox-p[0],y=b.oy-p[1],u=b.x-q[0]-x,v=b.y-q[1]-y,z=cl(-(x*u+y*v)/(u*u+v*v||1),0,1);return Math.hypot(x+u*z,y+v*z)<r};
// Persistence and boot state
try{V=JSON.parse(localStorage.r1r||'[]');Array.isArray(V)||(V=[]);$W=+localStorage.r1l||0}catch{}L=cl($W,0,LEVELS.length-1);
function $x(){$V=Math.min(devicePixelRatio||1,2);C.width=innerWidth*$V;C.height=innerHeight*$V}addEventListener('resize',$x);$x();
function tr(){let r=C.getBoundingClientRect(),s=Math.min(r.width/W,r.height/H);return[s,(r.width-W*s)/2,(r.height-H*s)/2]}
function $L(e){let r=C.getBoundingClientRect(),[s,x,y]=tr();return[cl((e.clientX-r.left-x)/s,0,W),cl((e.clientY-r.top-y)/s,0,H)]}const O=()=>LEVELS[L],A=(l,k)=>l[k]||[];
function $w(x,y,m=0,a=0,s=0,p=0,t=0){let q=Math.sin(t*s+p),c=Math.cos(t*s+p);return m==1?[x+q*a,y]:m==2?[x,y+q*a]:m==3?[x+c*a,y+q*a]:m==4?[x+q*a,y+Math.sin(t*s*2+p)*a*.55]:[x,y]}
function tp(t,tm){return $w(t[0],t[1],t[3],t[4],t[5],t[6],tm)}
function wp(w,tm){let q=$w(w[0],w[1],w[4],w[5],w[6],w[7],tm);return[q[0],q[1],w[2],w[3]]}
function pp(o,j,tm){let k=j?9:5,q=$w(o[j?2:0],o[j?3:1],o[k],o[k+1],o[k+2],o[k+3],tm);return q}
function $2(){$t=$n=0;for(let r of V)if(r){$n+=r[0]&3;$t+=r[3]||0}}
function $o(){try{localStorage.r1r=JSON.stringify(V);localStorage.r1l=L}catch{}}
function _c(t){let s=t/60|0;return String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0')+'.'+(t%60/6|0)}const $Y=()=>(Q.charCodeAt(L)-65)*30,sol=()=>{let i=L*2,v=E.charCodeAt(i)|E.charCodeAt(i+1)<<8;return[(v>>3)*P/3600,[0,24,28,40,72,96,120][v&7]]};
function $Z(t,s){let q=Math.max(100,Math.min(1000,Math.round(1000*$Y()/Math.max($Y(),t))-180*(s-1)));return[q,q>=900?3:q>=650?2:1]}
function ml(l){let m=[];for(let i=0;i<MK.length;i++)A(l,MK[i]).length&&m.push(MN[i]);l.t.some(t=>t[3])&&m.push('MOVING CLOUD');return m.join(' · ')||'RAINBOW PATH'}
function $0(){U.t.textContent=_c(Y);let i=B?B.i:0,t=O().t[Math.min(i,O().t.length-1)];U.n.textContent='NEXT '+(i+1)+'/'+O().t.length+' · NEED '+t[2]+' BOUNCE'+(t[2]==1?'':'S');$2()}
function $1(full=0){B=null;$q=[];$g=[];$r=[];F=1;J=Y=0;if(full)$d=0;let l=O();$e=[l.p[0]+300,l.p[1]];$0();$o()}
function $b(i=L,keep=0){L=cl(i,0,LEVELS.length-1);$d=0;if(!keep){$l=[];_=0}$1(1);$j(320,.08)}
