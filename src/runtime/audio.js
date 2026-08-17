/** uniRico v0.10.0 readable runtime module. */
// -----------------------------------------------------------------------------
// Procedural audio: state-aware bass-music transport + four-bar flight pattern.
//
// The soundtrack is deliberately generated rather than sampled so the shipped
// game keeps zero external audio assets. The goal is energetic gaming
// dubstep/trap language: sub-heavy bass, call/response wobble phrases, irregular
// kick placement, a hard half-time snare, hat rolls, rare glitch accents, and
// transitions that change every bar instead of looping one 16-step phrase.
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Procedural dubstep engine: multi-rate wobble, formant bass, yoi-style stabs,
// sharp half-time drums, swing, fills, and state-aware pacing.
//
// There are still no samples. Every sound is synthesized from Web Audio
// oscillators, filters, and envelopes. `w` on mu() is a tiny timbre bitfield:
//   bit 0      square vs saw mid-bass
//   bits 0..1  wobble/formant resonance + sweep rate
//   bit 2      band-pass "vowel / yoi" mode instead of low-pass wobble
// -----------------------------------------------------------------------------
function _i(){
  if(!$y)return;
  $F||=new(window.AudioContext||window.webkitAudioContext);
  $F.state=='suspended'&&$F.resume();
  mt||=setTimeout(tk,120);
  return $F
}

// Aiming uses a slower orchestral pulse; live shots snap into the denser dubstep
// transport. The last quarter of bar four compresses into a small stutter/fill.
function tk(){
  ms();
  let s=mb&63,k=s&15,b=s>>4,
      f=B?106+[4,-6,8,-10][b]-B.r:76+[0,6,-4,8][b];
  mt=setTimeout(tk,15e3/f*(k&1?1.13:.87)*(b==3&&k>11?.72:1))
}

// Shared one-shot voice for percussion, melodic ticks, SFX, and risers.
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

// Wobble / formant bass. The audible sine stays at the musical root so the sub
// sits in the useful ~45–65 Hz region instead of disappearing below speakers.
// Filter peak timing changes with `w`, giving several wobble rates from one
// compact voice. Bit 2 switches to a resonant band-pass talking/formant sweep.
function mu(f,d=.16,v=.016,w=0){
  try{
    let a=_i(),o=a.createOscillator(),u=a.createOscillator(),
        q=a.createBiquadFilter(),g=a.createGain(),n=a.currentTime;
    o.type=w&1?'square':'sawtooth';
    u.type='sine';
    o.frequency.value=f*2;
    u.frequency.value=f;
    q.type=w&4?'bandpass':'lowpass';
    q.Q.value=10+(w&3)*4;
    q.frequency.setValueAtTime(100+(w&3)*40,n);
    q.frequency.exponentialRampToValueAtTime(760+(w&3)*420,n+d/(2+(w&3)));
    q.frequency.exponentialRampToValueAtTime(110+(w&3)*35,n+d);
    g.gain.setValueAtTime(v,n);
    g.gain.exponentialRampToValueAtTime(.0001,n+d);
    o.connect(q).connect(g);
    u.connect(g);
    g.connect(a.destination);
    o.start(n);u.start(n);o.stop(n+d);u.stop(n+d)
  }catch{$y=0}
}

// Four-bar macro groove. Planning is sparse and orchestral. Flight is the drop:
// root sub, irregular kicks, a hard two-layer snare, hats, wobble phrases,
// vocal/formant calls, a riser into bar three, and a compressed glitch fill.
function ms(){
  if(!$y)return;
  let f=!!B,s=mb++&63,k=s&15,b=s>>4,r=48+(L%4)*3-(b==2)*4;

  if(!f){
    // Slow orchestral planning bed: four-bar harmonic motion with soft,
    // overlapping sine/triangle voices and no percussion. It intentionally
    // leaves space for aiming before the dubstep transport snaps in on fire.
    if(!(k&3)){
      let n=r*[1,1.2,1.125,1.5][b];
      $j(n,.95,.006,'sine',1);
      $j(n*2,.78,.004,'triangle',1);
      $j(n*3,.62,.0025,'triangle',1)
    }
    k==14&&$j(r*8,.34,.0025,'sine',.55);
    return
  }

  let p='8064050306040200908507040806030080690507080402069078060509080709'.charCodeAt(s)-48;

  // Bar three becomes the vocal/formant response bar.
  if(p)mu(r+p*3,.085+(p&3)*.045,.018+(p>6)*.004,((s>>2)&3)|(b==2?4:0));

  // Drop weight: sub impact, irregular kicks, sharp half-time snare, hats.
  !s&&$j(54,.3,.03);
  (([0x821,0x849,0x4425,0x9449][b]>>k)&1)&&$j(112,.105,.065,'sine',.18);
  if(k==8){
    $j(205,.09,.035,'square',.17);
    $j(5200,.018,.018,'square',.28)
  }
  (k+b)&1&&$j(3200+R()*2600,.011,.004,'square',.42);

  // Call / response details. Mode 7 is a tight, resonant "yoi" style stab.
  if(k%4==3){
    $j(r*(5+(k+b)%6),.04,.004,'triangle',1.55);
    R()<.28&&mu(r*1.7,.075,.009,7)
  }
  b==2&&((0x4210>>k)&1)&&mu(r*1.3,.11,.011,7);

  // Transition and phrase-end punctuation.
  if(k==15&&b==1)$j(170,.28,.008,'sawtooth',8);
  if(k==15&&b==3){
    mu(r*2,.06,.012,7);
    $j(6400,.016,.008,'square',.2)
  }
}
