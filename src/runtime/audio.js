/** Readable runtime module: adaptive procedural dubstep/trap soundtrack + SFX. */
// Procedural audio: state-aware bass-music transport + four-bar flight pattern.
//
// The soundtrack is deliberately generated rather than sampled so the shipped
// game keeps zero external audio assets. The goal is energetic gaming
// dubstep/trap language: sub-heavy bass, call/response wobble phrases, irregular
// kick placement, a hard half-time snare, hat rolls, rare glitch accents, and
// transitions that change every bar instead of looping one 16-step phrase.
// -----------------------------------------------------------------------------
function _i(){
  if(!$y)return;
  $F||=new(window.AudioContext||window.webkitAudioContext);
  $F.state==='suspended'&&$F.resume();
  mt||=setTimeout(tk,120);
  return $F
}
// Adaptive transport: aiming grooves around ~122–138 BPM, then firing drops
// into a heavier ~94–106 BPM pocket. Each bar changes tempo and alternating
// 16th-note delays add swing; reflections shave a little more speed from the
// flight state so long ricochets feel weightier rather than more frantic.
function tk(){
  ms();
  let s=mb&63,k=s&15,b=s>>4,
      bpm=B?100+[4,-2,6,-6][b]-B.r:126+[0,8,-4,12][b];
  mt=setTimeout(tk,15e3/bpm*(k&1?1.12:.88))
}

// One-shot synth shared by game SFX and percussion. `e` is the end/start pitch
// ratio, so values > 1 can make tiny risers while the default still falls.
function $j(f=300,d=.06,v=.02,type='sine',e=.7){
  try{
    let a=_i();if(!a)return;
    let o=a.createOscillator(),g=a.createGain(),n=a.currentTime;
    o.type=type;
    o.frequency.setValueAtTime(f,n);
    o.frequency.exponentialRampToValueAtTime(Math.max(40,f*e),n+d);
    g.gain.setValueAtTime(v,n);
    g.gain.exponentialRampToValueAtTime(.0001,n+d);
    o.connect(g).connect(a.destination);
    o.start(n);o.stop(n+d)
  }catch{$y=0}
}

// Bass voice: a filtered saw carries the mid-bass texture while a sine an
// octave below bypasses that filter and preserves the sub. `w` chooses one of
// several filter shapes so adjacent notes do not all make the same "wub".
function mu(f,d=.16,v=.016,w=0){
  try{
    let a=_i(),o=a.createOscillator(),u=a.createOscillator(),q=a.createBiquadFilter(),g=a.createGain(),n=a.currentTime;
    o.type=w&1?'square':'sawtooth';u.type='sine';
    o.frequency.value=f*2;u.frequency.value=f/2;
    q.type='lowpass';q.Q.value=9+w*2;
    q.frequency.setValueAtTime(90+w*45,n);
    q.frequency.exponentialRampToValueAtTime(520+w*430,n+d/2);
    q.frequency.exponentialRampToValueAtTime(110+w*35,n+d);
    g.gain.setValueAtTime(v,n);
    g.gain.exponentialRampToValueAtTime(.0001,n+d);
    o.connect(q).connect(g); // textured mid-bass
    u.connect(g);            // clean sub survives the filter sweep
    g.connect(a.destination);
    o.start(n);u.start(n);o.stop(n+d);u.stop(n+d)
  }catch{$y=0}
}

// 64 steps = four related bars. The encoded bass phrase evolves by bar; kick
// masks change independently; the last bar gets trap-style hat density and a
// glitch fill. Random accents are intentionally low-probability so repetitions
// remain recognizable but never completely identical.
function ms(){
  if(!$y)return;
  let fly=!!B,s=mb++&63,k=s&15,b=s>>4,r=52+(L%4)*3-(b==2)*5;

  // Planning groove: quicker but lighter. Syncopated filtered bass pops,
  // pitched triangle stabs, off-beat hats, and a ghost snare keep aim mode
  // funky without obscuring the trajectory puzzle. Every bar uses a different
  // bass/stab mask so the loop does not march uniformly.
  if(!fly){
    if(([0x4411,0x1221,0x8841,0x2115][b]>>k)&1)
      mu(r*.82,.09,.007,(k+b)&3);
    if(([0x2492,0x4924,0x9249,0x2942][b]>>k)&1)
      $j(r*(6+(k+b)%5),.045,.005,'triangle',1.3);
    if(k&1)$j(2300+R()*1300,.012,.003,'square',.6);
    if(k===8)$j(190,.05,.008,'square',.28);
    return
  }

  // Flight groove: deliberate half-time / bullet-time weight. The lower BPM
  // leaves room for thicker sub notes and sharper percussion. Syncopated
  // melodic stabs and occasional short wah-bass answers create funk between
  // the heavier dubstep hits; bar-specific kick masks and end-bar transitions
  // keep the four-bar phrase changing shape.
  let p='8064050306040200908507040806030080690507080402069078060509080709'.charCodeAt(s)-48;
  if(p)mu(r+p*3,.08+(p&3)*.04,.015+(p>6)*.004,(s>>2)&3);
  if(!s)$j(62,.28,.025);
  if(([0x821,0x849,0x4425,0x9449][b]>>k)&1)$j(118,.11,.06,'sine',.2);
  if(k===8){$j(205,.11,.03,'square',.2);$j(2200,.028,.014,'square',.35)}
  if((k+b)&1)$j(2600+R()*1900,.013,.004,'square',.5);
  if(k%4===3){
    $j(r*(5+(k+b)%6),.045,.004,'triangle',1.45);
    if(R()<.22)mu(r*2.5,.05,.006,3)
  }
  
  if(k===15&&b===1)$j(170,.28,.008,'sawtooth',7);
  if(k===15&&b===3){mu(r*2,.07,.012,3);$j(2900,.022,.008,'square',.3)}
  if(k===13)mu(r*1.5,.075,.009,2)
}

function $u(x,y,n=10,h=190){for(let i=0;i<n;i++){let a=R()*T,v=.5+R()*4;$g.push([x,y,Math.cos(a)*v,Math.sin(a)*v,18+R()*24,h+R()*35])}}
function _d(x,y,t,h=48){$r.push([x,y,t,45,h])}
