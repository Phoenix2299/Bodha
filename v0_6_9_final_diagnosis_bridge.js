/* BODHA v0.6.9 — Final diagnosis/report bridge
   Ensures the evidence-based v0.6.8 diagnosis model is the single source of truth
   for both the Analysis screen and Learning Map, including navigation.
*/
(function(){
  function bind(){
    const engine=window.BODHA_DIAGNOSTIC_V068;
    if(!engine || typeof engine.showAnalysisV068==='function'){
      // The v0.6.8 module intentionally keeps its renderer private; use window.showAnalysis.
    }

    // Critical: the older evidence engine exposed this alias after its own renderer.
    // Re-point it to the final v0.6.8 renderer so the diagnostic cannot fall back
    // to the legacy report that displayed undefined statuses.
    if(typeof window.showAnalysis==='function'){
      window.showEvidenceAnalysis=window.showAnalysis;
    }

    const analysisContinue=document.getElementById('analysisContinue');
    if(analysisContinue){
      analysisContinue.onclick=function(){
        if(typeof window.show==='function') window.show('screen-results');
        if(typeof window.showResults==='function') window.showResults();
        const target=document.getElementById('startLearning');
        if(target) target.focus({preventScroll:true});
      };
    }

    // IMPORTANT: the legacy evidence engine has its own local refreshVisibleScreen()
    // closure that can call its old showResults() renderer. Rebind the visible-screen
    // refresh so the v0.6.8 diagnosis engine is the single source of truth.
    const finalRefresh = window.refreshVisibleScreen;
    window.refreshVisibleScreen = function(){
      if(typeof window.applyLanguage==='function') window.applyLanguage();
      const screen = typeof window.visibleScreen==='function' ? window.visibleScreen() : null;
      if(!screen) return;
      if(screen.id === 'screen-analysis'){
        if(typeof window.showAnalysis==='function') window.showAnalysis();
      } else if(screen.id === 'screen-results'){
        if(typeof window.showResults==='function') window.showResults();
      } else if(typeof finalRefresh==='function'){
        // Preserve the existing lesson/practice refresh behavior for other screens.
        finalRefresh();
      }
    };
  }

  // The earlier scripts are already loaded when this file executes.
  bind();
  window.BODHA_FINAL_DIAGNOSIS_BRIDGE=true;
})();
