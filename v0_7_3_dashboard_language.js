/* BODHA v0.7.3 — Student dashboard language layer
   Makes dashboard/account language follow the same global language state.
   Hybrid is conversational Telugu + natural classroom English, not word-for-word mixing.
*/
(function(){
  const dashboardText = {
    en:{
      dashEyebrow:'BODHA STUDENT DASHBOARD', profile:'Profile', current:'CURRENT LEARNING',
      diagnosis:'DIAGNOSIS', diagnosisNote:'Initial evidence', focus:'FOCUS SKILL', focusNote:'BODHA learning path',
      events:'LEARNING EVENTS', eventsNote:'Saved on this device', map:'My Learning Map', evidence:'Evidence', journey:'My Learning Journey', path:'Path',
      boundary:'Prototype data boundary', boundaryText:'This version uses local browser storage only. It is not a production authentication system or cloud student database.',
      reset:'Reset prototype student data', subtitle:'Here is your BODHA learning journey.',
      stageReady:'Learning path ready', stagePractice:'Practicing', stageDiagnosis:'Ready for diagnosis',
      continue:'Continue My Learning →', start:'Start My BODHA Journey →',
      focusEmpty:'—',
      journey:['Student profile','Initial diagnosis','Personalised lesson','Adaptive practice','Mastery verification','Retention check'],
      emptyMap:'Complete your diagnostic to build your learning map.'
    },
    te:{
      dashEyebrow:'BODHA STUDENT DASHBOARD', profile:'Profile', current:'ప్రస్తుతం నీ Learning',
      diagnosis:'DIAGNOSIS', diagnosisNote:'మొదటి learning evidence', focus:'FOCUS SKILL', focusNote:'BODHA learning path',
      events:'LEARNING EVENTS', eventsNote:'ఈ device లో save అయ్యాయి', map:'నా Learning Map', evidence:'Evidence', journey:'నా Learning Journey', path:'Path',
      boundary:'Prototype data boundary', boundaryText:'ఈ version లో data ఈ browser లోనే save అవుతుంది. ఇది production login లేదా cloud student database కాదు.',
      reset:'Prototype student data reset చేయి', subtitle:'ఇప్పటివరకు నీ BODHA learning journey ఇక్కడ చూడొచ్చు.',
      stageReady:'నీ learning path ready గా ఉంది', stagePractice:'ఇప్పుడు Practice చేస్తున్నాం', stageDiagnosis:'Diagnostic కి ready',
      continue:'నా Learning కొనసాగించు →', start:'నా BODHA Journey ప్రారంభించు →',
      focusEmpty:'—',
      journey:['Student profile','Initial diagnosis','Personalised lesson','Adaptive practice','Mastery verification','Retention check'],
      emptyMap:'Diagnostic complete చేస్తే నీ Learning Map ఇక్కడ కనిపిస్తుంది.'
    },
    hy:{
      dashEyebrow:'BODHA STUDENT DASHBOARD', profile:'Profile', current:'ఇప్పుడు మనం చేస్తున్న Learning',
      diagnosis:'DIAGNOSIS', diagnosisNote:'మొదటి learning evidence', focus:'FOCUS SKILL', focusNote:'నీ BODHA learning path',
      events:'LEARNING EVENTS', eventsNote:'ఈ device లో save అయ్యాయి', map:'నా Learning Map', evidence:'Evidence', journey:'నా Learning Journey', path:'Path',
      boundary:'Prototype data boundary', boundaryText:'ఈ version లో data ఈ browser లోనే save అవుతుంది. ఇది production login లేదా cloud student database కాదు.',
      reset:'Prototype student data reset చేద్దాం', subtitle:'ఇప్పటివరకు నువ్వు ఎలా learn చేశావో, next ఏం చేయాలో ఇక్కడ clear గా చూడొచ్చు.',
      stageReady:'నీకు సరిపోయే learning path ready గా ఉంది', stagePractice:'ఇప్పుడు మనం Practice చేస్తున్నాం', stageDiagnosis:'Diagnostic కి ready గా ఉంది',
      continue:'Learning continue చేద్దాం →', start:'నా BODHA Journey ప్రారంభిద్దాం →',
      focusEmpty:'—',
      journey:['నీ Student profile','నీ Initial diagnosis','నీకు సరిపోయే lesson','Adaptive practice','Mastery verification','తర్వాత Retention check'],
      emptyMap:'Diagnostic complete చేద్దాం. అప్పుడు నీ Learning Map ని build చేస్తాం.'
    }
  };

  function L(){
    const k = typeof langKey==='function' ? langKey() : 'en';
    return dashboardText[k] || dashboardText.en;
  }
  function text(id,value){ const el=document.getElementById(id); if(el) el.textContent=value; }

  function skillName(key){
    try{
      const q=(typeof diagnosticQuestions!=='undefined' ? diagnosticQuestions : []).find(x=>x.id===key);
      if(q && q.skill) return q.skill[L()===dashboardText.te?'te':L()===dashboardText.hy?'hy':'en'] || q.skill.en;
    }catch(_){ }
    return key || '—';
  }

  window.BODHA_DASHBOARD_LANGUAGE={
    apply:function(){
      const t=L();
      text('dashEyebrow',t.dashEyebrow); text('dashHome',t.profile); text('dashCurrentLearning',t.current);
      text('dashDiagnosisLabel',t.diagnosis); text('dashDiagnosisNote',t.diagnosisNote);
      text('dashFocusLabel',t.focus); text('dashFocusNote',t.focusNote);
      text('dashEventsLabel',t.events); text('dashEventsNote',t.eventsNote);
      text('dashMapTitle',t.map); text('dashMapBadge',t.evidence); text('dashJourneyTitle',t.journey); text('dashJourneyBadge',t.path);
      text('dashBoundaryTitle',t.boundary); text('dashBoundaryText',t.boundaryText); text('dashClear',t.reset);
      return t;
    },
    skillName,
    journeyLabels:function(){return L().journey;},
    statusLabel:function(status){
      const k=typeof langKey==='function'?langKey():'en';
      if(k==='te') return status==='strong'?'బలమైన evidence':status==='support'?'మరింత support కావాలి':'ఇంకా practice కావాలి';
      if(k==='hy') return status==='strong'?'Strong evidence':status==='support'?'మరింత support కావాలి':'ఇంకా practice కావాలి';
      return status==='strong'?'Strong evidence':status==='support'?'Needs support':'Developing';
    }
  };
})();
