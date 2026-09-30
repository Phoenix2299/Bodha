/* BODHA v0.6.11 — Learning Map final renderer bridge
   Final single-source renderer for Diagnosis -> Learning Map -> Lesson.
   This intentionally avoids every legacy showResults implementation.
*/
(function(){
  const STATUS = {
    en:{strong:'Strong evidence', developing:'Developing', support:'Needs support', early:'More evidence needed'},
    te:{strong:'బలమైన evidence', developing:'ఇంకా అభివృద్ధి కావాలి', support:'మరింత support కావాలి', early:'ఇంకా evidence కావాలి'},
    hy:{strong:'Strong evidence', developing:'ఇంకా practice కావాలి', support:'మరింత support కావాలి', early:'ఇంకా కొంచెం evidence కావాలి'}
  };

  function currentLang(){ return typeof langKey==='function' ? langKey() : 'en'; }
  function labels(){ return (typeof ui!=='undefined' && ui[currentLang()]) ? ui[currentLang()] : ui.en; }
  function status(key){ return (STATUS[currentLang()]||STATUS.en)[key] || STATUS.en[key] || key; }
  function set(id,value){ const el=document.getElementById(id); if(el) el.textContent=value==null?'':String(value); }

  function renderLearningMap(){
    const engine=window.BODHA_DIAGNOSTIC_V068;
    if(!engine || typeof engine.build!=='function'){
      console.error('BODHA: v0.6.8 diagnosis engine is unavailable.');
      return false;
    }

    const a=engine.build();
    const L=labels();
    const rows=Array.isArray(a.rows)?a.rows:[];
    const target=a.target || rows.find(r=>r.skillKey===a.targetSkillKey) || rows[0] || null;
    const targetKey=target?.skillKey || a.targetSkillKey || null;
    const targetName=target?.skill || a.targetSkill || '';

    if(typeof state!=='undefined'){
      state.lastOverall=a.overall;
      state.targetSkillKey=targetKey;
    }

    const overallKey=a.overall==='support'?'support':a.overall==='strong'?'strong':'developing';
    set('mapEyebrow',L.mapEyebrow || 'YOUR BODHA LEARNING MAP');
    set('mapTitle',L.mapTitle || 'I know where to start.');
    set('resultTitle',(L.resultTitles&&L.resultTitles[overallKey]) || 'I know where to start.');
    set('resultSummary',typeof L.summary==='function' ? L.summary(a.score,a.total) : `You answered ${a.score} of ${a.total} diagnostic questions correctly.`);

    const map=document.getElementById('skillMap');
    if(map){
      map.innerHTML=rows.map(r=>{
        const key=r.statusKey==='early'?'developing':r.statusKey;
        const pct=Math.max(Math.round((Number(r.pct)||0)*100),8);
        return `<div class="skill-row"><strong>${r.skill||''}</strong><div class="meter"><span class="${key}" style="width:${pct}%"></span></div><span class="status ${key}">${status(r.statusKey)}</span></div>`;
      }).join('');
    }

    set('learningTargetLabel',L.targetLabel || 'BODHA will focus on');
    set('learningTargetSkill',targetName);
    set('nextHeading',(L.nextHeadings&&L.nextHeadings[overallKey]) || 'Your next step');

    let next=L.nextDescriptions&&L.nextDescriptions[overallKey] ? L.nextDescriptions[overallKey] : '';
    if(target?.gap) next += (next?' ':'') + `BODHA is starting here because this skill has the clearest learning need among the evidence collected: ${target.gap}.`;
    set('nextDescription',next);

    const start=document.getElementById('startLearning');
    if(start){
      start.onclick=function(){
        if(!targetKey){
          console.warn('BODHA: no target skill available for learning path.');
          return;
        }
        if(typeof startLesson==='function') startLesson(targetKey);
      };
    }
    return true;
  }

  function bind(){
    const continueBtn=document.getElementById('analysisContinue');
    if(continueBtn){
      continueBtn.onclick=function(){
        if(typeof show==='function') show('screen-results');
        renderLearningMap();
      };
    }

    // Make this final bridge the single public results renderer.
    window.showResults=renderLearningMap;
    window.BODHA_RENDER_LEARNING_MAP=renderLearningMap;

    // If the language changes while the map is visible, redraw from the same evidence.
    const previousRefresh=window.refreshVisibleScreen;
    window.refreshVisibleScreen=function(){
      if(typeof applyLanguage==='function') applyLanguage();
      const screen=typeof visibleScreen==='function' ? visibleScreen() : null;
      if(!screen) return;
      if(screen.id==='screen-results') renderLearningMap();
      else if(screen.id==='screen-analysis' && typeof window.showAnalysis==='function') window.showAnalysis();
      else if(typeof previousRefresh==='function') previousRefresh();
    };
  }

  bind();
})();
