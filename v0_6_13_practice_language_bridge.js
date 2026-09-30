/* BODHA v0.6.13 — Practice language bridge
   Final language controller loaded after all legacy/new renderers.
   Practice must obey the same global language state as every earlier screen.
*/
(function(){
  const LANGS = ["en","te","hy"];
  function currentLang(){
    try { return LANGS.includes(state.selectedLang) ? state.selectedLang : "en"; }
    catch(_) { return "en"; }
  }
  function applyPracticeLanguage(){
    try {
      applyLanguage();
      const screen = document.querySelector(".screen:not(.hidden)");
      if (!screen) return;
      if (screen.id === "screen-practice" && typeof window.updatePracticeUI === "function") {
        window.updatePracticeUI();
      } else if (screen.id === "screen-practice-summary" && typeof window.showPracticeSummary === "function") {
        window.showPracticeSummary();
      } else if (typeof window.refreshVisibleScreen === "function") {
        window.refreshVisibleScreen();
      }
    } catch(err) {
      console.error("BODHA language refresh error:", err);
    }
  }

  function setLanguage(next){
    if (!LANGS.includes(next)) return;
    if (state.selectedLang === next) {
      applyPracticeLanguage();
      return;
    }
    state.selectedLang = next;
    try { localStorage.setItem("bodhaLanguage", next); } catch(_) {}
    document.querySelectorAll(".lang").forEach(btn => {
      const active = btn.dataset.lang === next;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    applyPracticeLanguage();
  }

  // Capture phase ensures this remains authoritative even if an older handler exists.
  document.addEventListener("click", function(event){
    const btn = event.target.closest && event.target.closest(".lang");
    if (!btn) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    setLanguage(btn.dataset.lang);
  }, true);

  window.BODHA_PRACTICE_LANGUAGE = { setLanguage, applyPracticeLanguage };
  applyPracticeLanguage();
})();
