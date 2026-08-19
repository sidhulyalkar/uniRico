// Wavedash injects window.Wavedash before the game runs.
// The production one-file Wavedash build in dist/ inlines this after uniRico initializes.
let w=window.Wavedash;
if(w){
  w.updateLoadProgressZeroToOne(1);
  w.init();
}
