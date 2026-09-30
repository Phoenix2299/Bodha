/* BODHA v0.7.5 — Final state bridge
   Keeps language, screen and learning data synchronized after navigation.
*/
(function(){
  const render = () => {
    try { window.BODHA_REFRESH_LANGUAGE?.(); } catch(_) {}
  };
  // Re-render when the app changes which .screen is visible.
  const observer = new MutationObserver(muts=>{
    if(muts.some(m=>m.type==='attributes' && m.attributeName==='class')){
      setTimeout(render,0);
    }
  });
  document.querySelectorAll('.screen').forEach(s=>observer.observe(s,{attributes:true,attributeFilter:['class']}));
  window.BODHA_RENDER_CURRENT_SCREEN = render;
  setTimeout(render,0);
})();
