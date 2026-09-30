/* BODHA v0.7.6 — Final Dashboard + Profile language bridge
   This layer is intentionally last in the script chain.
   It makes Dashboard/Profile presentation authoritative without touching learning data.
*/
(function(){
  const COPY={
    en:{
      accountEyebrow:'BODHA STUDENT PROFILE',accountCreate:'Create your student profile',accountBack:'Welcome back',
      accountCreateIntro:'This prototype saves your learning journey on this device.',accountBackIntro:'Your learning profile is saved on this device.',
      name:'Student name',namePh:'Enter your name',grade:'Class',continue:'Continue to BODHA →',
      note:'Prototype note: this is local device storage, not a production login.',error:'Please enter your name.',
      dashEyebrow:'BODHA STUDENT DASHBOARD',profile:'Profile',current:'CURRENT LEARNING',diagnosis:'DIAGNOSIS',diagnosisNote:'Initial evidence',focus:'FOCUS SKILL',focusNote:'BODHA learning path',events:'LEARNING EVENTS',eventsNote:'Saved on this device',map:'My Learning Map',evidence:'Evidence',journey:'My Learning Journey',path:'Path',
      boundary:'Prototype data boundary',boundaryText:'This version uses local browser storage only. It is not a production authentication system or cloud student database.',reset:'Reset prototype student data',
      subtitle:'Here is your BODHA learning journey.',ready:'Learning path ready',practice:'Adaptive practice is next',diagnosisReady:'Initial diagnosis is ready',continueLearn:'Continue My Learning →',start:'Start My BODHA Journey →',nextLabel:'NEXT STEP',nextDiagnosis:'Take your initial diagnostic',nextLesson:'Start your personalised lesson',nextPractice:'Continue adaptive practice',
      journey:['Student profile','Initial diagnosis','Personalised lesson','Adaptive practice','Mastery verification','Retention check'],empty:'Complete your diagnostic to build your learning map.',
      status:{strong:'Strong evidence',support:'Needs support',developing:'Developing'},stage:{profile:'Ready for your profile',diagnosed:'Learning path ready',learning:'Personalised lesson is next',practicing:'Adaptive practice is next'}
    },
    te:{
      accountEyebrow:'BODHA STUDENT PROFILE',accountCreate:'నీ student profile create చేద్దాం',accountBack:'మళ్లీ welcome!',
      accountCreateIntro:'నీ learning journey ఈ device లో save అవుతుంది.',accountBackIntro:'నీ learning profile ఈ device లో save అయింది.',
      name:'విద్యార్థి పేరు',namePh:'నీ పేరు enter చేయి',grade:'తరగతి',continue:'BODHA తో కొనసాగుదాం →',
      note:'Prototype note: ఇది local device storage మాత్రమే; production login కాదు.',error:'నీ పేరు enter చేయి.',
      dashEyebrow:'BODHA STUDENT DASHBOARD',profile:'ప్రొఫైల్',current:'ఇప్పుడు నేర్చుకుంటున్నది',diagnosis:'డయాగ్నస్టిక్',diagnosisNote:'మొదటి learning evidence',focus:'ప్రధాన skill',focusNote:'నీ BODHA learning path',events:'LEARNING EVENTS',eventsNote:'ఈ device లో save అయ్యాయి',map:'నా Learning Map',evidence:'Evidence',journey:'నా Learning Journey',path:'Path',
      boundary:'Prototype data గురించి',boundaryText:'ఈ version లో నీ data ఈ browser లోనే save అవుతుంది. ఇది production login లేదా cloud student database కాదు.',reset:'Prototype student data reset చేయి',
      subtitle:'ఇప్పటివరకు నువ్వు ఎలా నేర్చుకున్నావో, తర్వాత ఏం చేయాలో ఇక్కడ చూడొచ్చు.',ready:'నీ learning path ready గా ఉంది',practice:'ఇప్పుడు Adaptive Practice next',diagnosisReady:'ముందుగా Diagnostic చేద్దాం',continueLearn:'నా Learning కొనసాగించు →',start:'నా BODHA Journey ప్రారంభించు →',nextLabel:'తర్వాత ఏమి చేయాలి?',nextDiagnosis:'మొదటి diagnostic చేద్దాం',nextLesson:'నీ personalised lesson ప్రారంభించు',nextPractice:'Adaptive practice కొనసాగించు',
      journey:['నీ student profile','Initial diagnosis','నీకు సరిపోయే lesson','Adaptive practice','Mastery verification','Retention check'],empty:'Diagnostic పూర్తి చేస్తే నీ Learning Map ఇక్కడ కనిపిస్తుంది.',
      status:{strong:'బలమైన evidence',support:'మరింత support కావాలి',developing:'ఇంకా practice కావాలి'},stage:{profile:'Profile ready',diagnosed:'నీ learning path ready గా ఉంది',learning:'నీ personalised lesson next',practicing:'ఇప్పుడు Adaptive Practice next'}
    },
    hy:{
      accountEyebrow:'BODHA STUDENT PROFILE',accountCreate:'ముందుగా నీ student profile create చేసుకుందాం',accountBack:'మళ్లీ వచ్చావు — welcome back!',
      accountCreateIntro:'నీ learning journey ఈ device లో save అవుతుంది.',accountBackIntro:'నీ learning profile ఈ device లో save అయింది — ఇప్పుడు learning continue చేద్దాం.',
      name:'నీ పేరు',namePh:'నీ name enter చేయి',grade:'నీ Class',continue:'BODHA తో continue చేద్దాం →',
      note:'Prototype note: ఇది local device storage మాత్రమే — production login కాదు.',error:'నీ name enter చేయి.',
      dashEyebrow:'BODHA STUDENT DASHBOARD',profile:'Profile',current:'ఇప్పుడు మనం చేస్తున్న Learning',diagnosis:'DIAGNOSIS',diagnosisNote:'మొదటి learning evidence',focus:'FOCUS SKILL',focusNote:'నీ BODHA learning path',events:'LEARNING EVENTS',eventsNote:'ఈ device లో save అయ్యాయి',map:'నా Learning Map',evidence:'Evidence',journey:'నా Learning Journey',path:'Path',
      boundary:'Prototype data గురించి',boundaryText:'ఈ version లో నీ data ఈ browser లోనే save అవుతుంది. ఇది production login కాదు లేదా cloud student database కాదు.',reset:'Prototype student data reset చేద్దాం',
      subtitle:'ఇప్పటివరకు నువ్వు ఎలా learn చేశావో, next ఏం చేయాలో ఇక్కడ clear గా చూడొచ్చు.',ready:'నీకు సరిపోయే learning path ready గా ఉంది',practice:'ఇప్పుడు మనం Adaptive Practice చేస్తున్నాం',diagnosisReady:'ముందుగా Diagnostic చేద్దాం',continueLearn:'Learning continue చేద్దాం →',start:'నా BODHA Journey ప్రారంభిద్దాం →',nextLabel:'Next step',nextDiagnosis:'మొదటి diagnostic start చేద్దాం',nextLesson:'నీ personalised lesson start చేద్దాం',nextPractice:'Adaptive practice continue చేద్దాం',
      journey:['నీ student profile','Initial diagnosis','నీకు సరిపోయే lesson','Adaptive practice','Mastery verification','తర్వాత retention check'],empty:'Diagnostic complete చేద్దాం. అప్పుడు నీ Learning Map ని build చేస్తాం.',
      status:{strong:'Strong evidence',support:'మరింత support కావాలి',developing:'ఇంకా practice కావాలి'},stage:{profile:'Profile ready',diagnosed:'నీకు సరిపోయే learning path ready',learning:'నీ personalised lesson next',practicing:'ఇప్పుడు Adaptive Practice చేస్తున్నాం'}
    }
  };
  const lang=()=>typeof langKey==='function'?langKey():'en';
  const T=()=>COPY[lang()]||COPY.en;
  const el=id=>document.getElementById(id);
  const set=(id,v)=>{const e=el(id);if(e)e.textContent=v;};
  const tr=(en,te,hy)=>lang()==='te'?te:lang()==='hy'?hy:en;

  function renderAccountFinal(){
    const p=(()=>{try{return JSON.parse(localStorage.getItem('bodhaStudentProfile_v07')||'null')}catch(_){return null}})();
    const t=T();
    set('accountEyebrow',t.accountEyebrow); set('accountTitle',p?t.accountBack:t.accountCreate); set('accountIntro',p?t.accountBackIntro:t.accountCreateIntro);
    set('accountNameLabel',t.name); set('accountGradeLabel',t.grade); set('accountContinue',t.continue); set('accountNote',t.note);
    const input=el('studentName'); if(input) input.placeholder=t.namePh;
    const grade=el('studentGrade'); if(grade){
      const labels=lang()==='te'?['8వ తరగతి','9వ తరగతి','10వ తరగతి']:lang()==='hy'?['Class 8','Class 9','Class 10']:['Class 8','Class 9','Class 10'];
      [...grade.options].forEach((o,i)=>{if(labels[i])o.textContent=labels[i];});
    }
    const err=el('accountError'); if(err && !err.textContent) err.textContent='';
  }

  function loadData(){try{return JSON.parse(localStorage.getItem('bodhaLearningData_v07')||'null')}catch(_){return null}}
  function renderDashboardFinal(){
    const d=loadData(); if(!d||!d.profile)return;
    const t=T(), p=d.profile, diagnosed=!!d.diagnosis, rows=Object.values(d.skills||{}), practiced=rows.some(r=>r.practiceTotal);
    set('dashEyebrow',t.dashEyebrow); set('dashHome',t.profile); set('dashCurrentLearning',t.current);
    set('dashSubtitle',t.subtitle); set('dashDiagnosisLabel',t.diagnosis); set('dashDiagnosisNote',t.diagnosisNote);
    set('dashFocusLabel',t.focus); set('dashFocusNote',t.focusNote); set('dashEventsLabel',t.events); set('dashEventsNote',t.eventsNote);
    set('dashMapTitle',t.map); set('dashMapBadge',t.evidence); set('dashJourneyTitle',t.journey); set('dashJourneyBadge',t.path);
    set('dashBoundaryTitle',t.boundary); set('dashBoundaryText',t.boundaryText); set('dashClear',t.reset);
    set('dashGreeting',lang()==='en'?`Hi, ${p.name}!`:lang()==='te'?`హాయ్, ${p.name}!`:`హాయ్ ${p.name}!`);
    const chapter={en:'Chapter 2 — Linear Equations in One Variable',te:'Chapter 2 — ఒక చరరాశిలో సరళ సమీకరణాలు',hy:'Chapter 2 — Linear Equations in One Variable'}[lang()];
    set('dashChapter',chapter);
    const stage=practiced?t.stage.practicing:diagnosed?t.stage.diagnosed:t.stage.diagnosisReady; set('dashStage',stage);
    const next=diagnosed?(practiced?t.nextPractice:t.nextLesson):t.nextDiagnosis; set('dashNextText',`${t.nextLabel}: ${next}`);
    set('dashStart',diagnosed?(practiced?t.continueLearn:t.continueLearn):t.start);
    set('dashDiagScore',diagnosed?`${d.diagnosis.score} / ${d.diagnosis.total}`:'—');
    const target=d.learningPath?.targetSkillKey;
    let targetLabel='—';
    try{const q=(typeof diagnosticQuestions!=='undefined'?diagnosticQuestions:[]).find(x=>x.id===target); if(q?.skill) targetLabel=q.skill[lang()]||q.skill.en||target;}catch(_){ }
    set('dashTarget',target?targetLabel:'—'); set('dashEvents',String(d.events?.length||0));
    const map=el('dashSkillMap');
    if(map){
      const display=rows.length?rows:(d.diagnosis?.rows||[]);
      map.innerHTML=display.map(r=>{
        const pct=Math.max(8,Math.round(((r.practicePct??r.pct??0))*100));
        const status=r.practiceStatus||r.statusKey||'developing';
        let skill=r.skill||r.skillKey||'';
        try{const q=(typeof diagnosticQuestions!=='undefined'?diagnosticQuestions:[]).find(x=>x.id===r.skillKey);if(q?.skill)skill=q.skill[lang()]||q.skill.en||skill;}catch(_){ }
        const statusText=t.status[status]||t.status.developing;
        return `<div class="dash-skill"><div class="dash-skill-top"><strong>${skill}</strong><span class="status ${status}">${statusText}</span></div><div class="meter"><span class="${status}" style="width:${pct}%"></span></div></div>`;
      }).join('')||`<div class="analysis-empty">${t.empty}</div>`;
    }
    const journey=[
      ['profile',t.journey[0],true],['diagnosed',t.journey[1],diagnosed],['learning',t.journey[2],diagnosed],['practicing',t.journey[3],practiced],['mastery',t.journey[4],false],['retention',t.journey[5],false]
    ];
    const j=el('dashJourney'); if(j)j.innerHTML=journey.map((x,i)=>`<div class="journey-step ${x[2]?'done':''} ${i===1&&!diagnosed?'current':''}"><span class="journey-dot">${x[2]?'✓':i+1}</span><span>${x[1]}</span></div>`).join('');
    set('dashDataNote',tr(`Saved on this device • Last updated ${new Date(d.updatedAt).toLocaleString()}`,`ఈ device లో save అయింది • చివరిసారి ${new Date(d.updatedAt).toLocaleString()} కి update అయింది`,`ఈ device లో save అయింది • చివరిసారి ${new Date(d.updatedAt).toLocaleString()} కి update అయింది`));
  }

  // Replace only the two presentation renderers. Their data and navigation remain untouched.
  if(window.BODHA_DASHBOARD){
    window.BODHA_DASHBOARD.renderAccount=renderAccountFinal;
    window.BODHA_DASHBOARD.render=renderDashboardFinal;
  }

  // Ensure navigation into either screen applies the current language immediately.
  const originalShow=window.show;
  if(typeof originalShow==='function' && !originalShow.__bodha076){
    const wrapped=function(id){originalShow(id);setTimeout(()=>{
      if(id==='screen-account')renderAccountFinal();
      if(id==='screen-dashboard')renderDashboardFinal();
    },0);};
    wrapped.__bodha076=true; window.show=wrapped;
  }

  window.BODHA_DASHBOARD_FINAL_LANGUAGE={renderAccount:renderAccountFinal,renderDashboard:renderDashboardFinal};
  setTimeout(()=>{
    const screen=typeof visibleScreen==='function'?visibleScreen():null;
    if(screen?.id==='screen-account')renderAccountFinal();
    if(screen?.id==='screen-dashboard')renderDashboardFinal();
  },0);
})();
