/* BODHA v0.7.5 — Unified global language/state controller
   One authoritative language state. Every visible screen is re-rendered from it.
   No screen owns its own language state.
*/
(function(){
  const LANGS = ["en","te","hy"];
  const getLang = () => {
    try {
      const saved = localStorage.getItem("bodhaLanguage");
      if (LANGS.includes(saved)) state.selectedLang = saved;
    } catch(_) {}
    return LANGS.includes(state.selectedLang) ? state.selectedLang : "en";
  };
  const markActive = (lang) => {
    document.querySelectorAll(".lang").forEach(btn=>{
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.documentElement.lang = lang === "te" ? "te" : "en";
  };
  const currentScreen = () => typeof visibleScreen === "function"
    ? visibleScreen()
    : document.querySelector(".screen:not(.hidden)");

  function renderScreen(){
    const lang = getLang();
    markActive(lang);
    if(typeof applyLanguage === "function") applyLanguage();
    const screen = currentScreen();
    if(!screen) return;
    switch(screen.id){
      case "screen-account":
        if(window.BODHA_DASHBOARD?.renderAccount) window.BODHA_DASHBOARD.renderAccount();
        break;
      case "screen-dashboard":
        if(window.BODHA_DASHBOARD?.render) window.BODHA_DASHBOARD.render();
        break;
      case "screen-diagnostic":
        if(window.BODHA_RENDER_DIAGNOSTIC) window.BODHA_RENDER_DIAGNOSTIC();
        else if(typeof renderQuestion === "function") renderQuestion({preserveState:true});
        break;
      case "screen-analysis":
        if(typeof showAnalysis === "function") showAnalysis();
        break;
      case "screen-results":
        if(typeof showResults === "function") showResults();
        break;
      case "screen-lesson":
        if(typeof renderLesson === "function") renderLesson();
        break;
      case "screen-practice":
        if(typeof updatePracticeUI === "function") updatePracticeUI();
        break;
      case "screen-practice-summary":
        if(typeof showPracticeSummary === "function") showPracticeSummary();
        break;
    }
    // Dashboard/profile language bridge may have additional localized fields.
    if(window.BODHA_GLOBAL_SCREEN_RENDER && window.BODHA_GLOBAL_SCREEN_RENDER !== renderScreen){
      try { window.BODHA_GLOBAL_SCREEN_RENDER(); } catch(_) {}
    }
  }

  function setLanguage(next){
    if(!LANGS.includes(next)) return;
    state.selectedLang = next;
    try { localStorage.setItem("bodhaLanguage", next); } catch(_) {}
    markActive(next);
    renderScreen();
  }

  // This is the only language click listener. Capture phase prevents older listeners
  // from rendering a second time with stale language state.
  document.addEventListener("click", function(event){
    const btn = event.target.closest?.(".lang");
    if(!btn) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    setLanguage(btn.dataset.lang);
  }, true);

  window.BODHA_SET_LANGUAGE = setLanguage;
  window.BODHA_REFRESH_LANGUAGE = renderScreen;
  window.BODHA_GET_LANGUAGE = getLang;
  markActive(getLang());
})();
