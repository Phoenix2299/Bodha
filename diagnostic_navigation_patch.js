/* BODHA v0.6.6 - final diagnostic navigation/completion bridge
   The diagnostic must always finish cleanly after the final answered question.
   In particular, do not call the adaptive selector once the 20-question cap
   has been reached: an exception there could prevent the analysis screen from opening.
*/
(function(){
  const next = document.getElementById('nextQuestion');
  if(!next) return;

  function goToAnalysis(){
    try {
      if(typeof window.showEvidenceAnalysis === 'function') window.showEvidenceAnalysis();
      else if(typeof window.showAnalysis === 'function') window.showAnalysis();
    } finally {
      // Use the shared screen helper when available; fall back to direct DOM toggling.
      if(typeof window.show === 'function') window.show('screen-analysis');
      else {
        document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
        const target=document.getElementById('screen-analysis');
        if(target) target.classList.remove('hidden');
        window.scrollTo({top:0,behavior:'smooth'});
      }
      const btn=document.getElementById('analysisContinue');
      if(btn) btn.focus({preventScroll:true});
    }
  }

  function renderCurrent(){
    const shared=window.BODHA_EVIDENCE_SHARED;
    if(shared && typeof shared.renderEvidenceDiagnostic === 'function') shared.renderEvidenceDiagnostic();
  }

  next.onclick=function(){
    if(!state.currentAnswered) return;

    const queue=state.diagnosticQueue || [];
    const atEnd=state.currentQ >= queue.length-1;

    // Continue through the questions already in the queue.
    if(!atEnd){
      state.currentQ += 1;
      state.currentChoice=null;
      state.currentAnswered=false;
      renderCurrent();
      return;
    }

    const answered=(state.answers || []).length;

    // Hard completion guard: once 20 questions are answered, finish immediately.
    // Never run adaptive selection at the cap.
    if(answered >= 20){
      goToAnalysis();
      return;
    }

    // Keep the intended minimum baseline if a future data change creates a shorter queue.
    if(answered < 16){
      state.currentQ += 1;
      state.currentChoice=null;
      state.currentAnswered=false;
      renderCurrent();
      return;
    }

    // Only seek another targeted question when there is room for one.
    let follow=null;
    try {
      if(typeof window.chooseAdaptiveDiagnosticQuestionV063 === 'function') {
        follow=window.chooseAdaptiveDiagnosticQuestionV063();
      }
    } catch(err){
      console.warn('BODHA adaptive diagnostic selector failed; finishing safely.', err);
      follow=null;
    }

    if(answered < 20 && follow){
      const shared=window.BODHA_EVIDENCE_SHARED;
      if(shared && typeof shared.cloneQuestion === 'function'){
        const clone=shared.cloneQuestion(follow, queue.length);
        queue.push(clone);
        state.diagnosticQueue=queue;
        if(state.diagnosticUsedIds && typeof state.diagnosticUsedIds.add === 'function'){
          state.diagnosticUsedIds.add(follow.id);
        }
        state.currentQ += 1;
        state.currentChoice=null;
        state.currentAnswered=false;
        state.diagnosticPhase='adaptive';
        renderCurrent();
        return;
      }
    }

    // No useful follow-up remains: finish the diagnosis.
    goToAnalysis();
  };

  const shared=window.BODHA_EVIDENCE_SHARED;
  const originalRender=shared?.renderEvidenceDiagnostic;
  if(originalRender && !originalRender.__v066Wrapped){
    const wrapped=function(){
      originalRender();
      const btn=document.getElementById('nextQuestion');
      if(btn){
        if(state.currentAnswered) btn.classList.remove('hidden');
        else btn.classList.add('hidden');
      }
    };
    wrapped.__v066Wrapped=true;
    shared.renderEvidenceDiagnostic=wrapped;
  }
})();
