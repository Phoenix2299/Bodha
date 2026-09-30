/* BODHA v0.7.5 — Unified dashboard/profile language layer
   Canonical learning data stays language-neutral; this layer controls presentation only.
*/
(function(){
  const DASH={
    en:{
      eyebrow:'BODHA STUDENT DASHBOARD',profile:'Profile',current:'CURRENT LEARNING',
      diagnosis:'DIAGNOSIS',diagnosisNote:'Initial evidence',focus:'FOCUS SKILL',focusNote:'BODHA learning path',
      events:'LEARNING EVENTS',eventsNote:'Saved on this device',map:'My Learning Map',evidence:'Evidence',journeyTitle:'My Learning Journey',path:'Path',
      boundary:'Prototype data boundary',boundaryText:'This version uses local browser storage only. It is not a production authentication system or cloud student database.',
      reset:'Reset prototype student data',subtitle:'Here is your BODHA learning journey.',
      stageReady:'Learning path ready',stagePractice:'Adaptive practice is next',stageDiagnosis:'Initial diagnosis is ready',
      continue:'Continue My Learning →',start:'Start My BODHA Journey →',
      journey:['Student profile','Initial diagnosis','Personalised lesson','Adaptive practice','Mastery verification','Retention check'],
      emptyMap:'Complete your diagnostic to build your learning map.',
      nextLabel:'NEXT STEP',nextLesson:'Start your personalised lesson',nextPractice:'Continue adaptive practice',nextDiagnosis:'Take your initial diagnostic'
    },
    te:{
      eyebrow:'BODHA STUDENT DASHBOARD',profile:'ప్రొఫైల్',current:'ఇప్పుడు నేర్చుకుంటున్నది',
      diagnosis:'డయాగ్నస్టిక్',diagnosisNote:'మొదటి learning evidence',focus:'ప్రధాన skill',focusNote:'నీ BODHA learning path',
      events:'LEARNING EVENTS',eventsNote:'ఈ device లో save అయ్యాయి',map:'నా Learning Map',evidence:'Evidence',journeyTitle:'నా Learning Journey',path:'Path',
      boundary:'Prototype data గురించి',boundaryText:'ఈ version లో నీ data ఈ browser లోనే save అవుతుంది. ఇది production login లేదా cloud student database కాదు.',
      reset:'Prototype student data reset చేయి',subtitle:'ఇప్పటివరకు నువ్వు ఎలా నేర్చుకున్నావో, తర్వాత ఏం చేయాలో ఇక్కడ చూడొచ్చు.',
      stageReady:'నీ learning path ready గా ఉంది',stagePractice:'ఇప్పుడు Adaptive Practice next',stageDiagnosis:'ముందుగా Diagnostic చేద్దాం',
      continue:'నా Learning కొనసాగించు →',start:'నా BODHA Journey ప్రారంభించు →',
      journey:['నీ student profile','Initial diagnosis','నీకు సరిపోయే lesson','Adaptive practice','Mastery verification','Retention check'],
      emptyMap:'Diagnostic పూర్తి చేస్తే నీ Learning Map ఇక్కడ కనిపిస్తుంది.',
      nextLabel:'తర్వాత ఏమి చేయాలి?',nextLesson:'నీ personalised lesson ప్రారంభించు',nextPractice:'Adaptive practice కొనసాగించు',nextDiagnosis:'మొదటి diagnostic చేద్దాం'
    },
    hy:{
      eyebrow:'BODHA STUDENT DASHBOARD',profile:'Profile',current:'ఇప్పుడు మనం చేస్తున్న Learning',
      diagnosis:'DIAGNOSIS',diagnosisNote:'మొదటి learning evidence',focus:'FOCUS SKILL',focusNote:'నీ BODHA learning path',
      events:'LEARNING EVENTS',eventsNote:'ఈ device లో save అయ్యాయి',map:'నా Learning Map',evidence:'Evidence',journeyTitle:'నా Learning Journey',path:'Path',
      boundary:'Prototype data గురించి',boundaryText:'ఈ version లో నీ data ఈ browser లోనే save అవుతుంది. ఇది production login లేదా cloud student database కాదు.',
      reset:'Prototype student data reset చేద్దాం',subtitle:'ఇప్పటివరకు నువ్వు ఎలా learn చేశావో, next ఏం చేయాలో ఇక్కడ clear గా చూడొచ్చు.',
      stageReady:'నీకు సరిపోయే learning path ready గా ఉంది',stagePractice:'ఇప్పుడు మనం Adaptive Practice చేస్తున్నాం',stageDiagnosis:'ముందుగా Diagnostic చేద్దాం',
      continue:'Learning continue చేద్దాం →',start:'నా BODHA Journey ప్రారంభిద్దాం →',
      journey:['నీ student profile','Initial diagnosis','నీకు సరిపోయే lesson','Adaptive practice','Mastery verification','తర్వాత retention check'],
      emptyMap:'Diagnostic complete చేద్దాం. అప్పుడు నీ Learning Map ని build చేస్తాం.',
      nextLabel:'Next step',nextLesson:'నీ personalised lesson start చేద్దాం',nextPractice:'Adaptive practice continue చేద్దాం',nextDiagnosis:'మొదటి diagnostic start చేద్దాం'
    }
  };

  const key=()=>typeof langKey==='function'?langKey():'en';
  const T=()=>DASH[key()]||DASH.en;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};

  function skillName(skillKey){
    try{
      const q=(typeof diagnosticQuestions!=='undefined'?diagnosticQuestions:[]).find(x=>x.id===skillKey);
      if(q&&q.skill)return q.skill[key()]||q.skill.en||skillKey;
    }catch(_){ }
    return skillKey||'—';
  }

  function statusLabel(status){
    if(key()==='te') return status==='strong'?'బలమైన evidence':status==='support'?'మరింత support కావాలి':'ఇంకా practice కావాలి';
    if(key()==='hy') return status==='strong'?'Strong evidence':status==='support'?'మరింత support కావాలి':'ఇంకా practice కావాలి';
    return status==='strong'?'Strong evidence':status==='support'?'Needs support':'Developing';
  }

  function apply(){
    const t=T();
    set('dashEyebrow',t.eyebrow);set('dashHome',t.profile);set('dashCurrentLearning',t.current);
    set('dashDiagnosisLabel',t.diagnosis);set('dashDiagnosisNote',t.diagnosisNote);
    set('dashFocusLabel',t.focus);set('dashFocusNote',t.focusNote);
    set('dashEventsLabel',t.events);set('dashEventsNote',t.eventsNote);
    set('dashMapTitle',t.map);set('dashMapBadge',t.evidence);
    set('dashJourneyTitle',t.journeyTitle);set('dashJourneyBadge',t.path);
    set('dashBoundaryTitle',t.boundary);set('dashBoundaryText',t.boundaryText);set('dashClear',t.reset);
    set('dashNextLabel',t.nextLabel);
    const grade=document.getElementById('studentGrade');
    if(grade){
      const labels=key()==='te'?['8వ తరగతి','9వ తరగతి','10వ తరగతి']:['Class 8','Class 9','Class 10'];
      [...grade.options].forEach((o,i)=>{if(i<labels.length)o.textContent=labels[i];});
    }
    return t;
  }

  function nextText(d,practiced,diagnosed){
    const t=T();
    if(!diagnosed)return t.nextDiagnosis;
    return practiced?t.nextPractice:t.nextLesson;
  }

  window.BODHA_DASHBOARD_LANGUAGE={apply,skillName,journeyLabels:()=>T().journey,statusLabel,nextText,journeyTitle:()=>T().journeyTitle};
  window.BODHA_GLOBAL_SCREEN_RENDER=function(){
    try{apply();}catch(_){ }
    const screen=typeof visibleScreen==='function'?visibleScreen():document.querySelector('.screen:not(.hidden)');
    if(!screen)return;
    if(screen.id==='screen-dashboard'&&window.BODHA_DASHBOARD?.render) window.BODHA_DASHBOARD.render();
    if(screen.id==='screen-account'&&window.BODHA_DASHBOARD?.renderAccount) window.BODHA_DASHBOARD.renderAccount();
  };
})();
