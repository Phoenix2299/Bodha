/* BODHA v0.7 — Student identity + persistent learning dashboard foundation
   Prototype storage: localStorage only. No real authentication or cloud database.
*/
(function(){
  const KEY='bodhaStudentProfile_v07';
  const DATA_KEY='bodhaLearningData_v07';
  const $=id=>document.getElementById(id);
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(_){return null}};
  const set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(_){return false}};
  const lang=()=>typeof langKey==='function'?langKey():'en';
  const tr=(en,te,hy)=>lang()==='te'?te:lang()==='hy'?hy:en;

  function defaultData(profile){return {
    profile,
    chapter:'Chapter 2 — Linear Equations in One Variable',
    diagnosis:null,
    learningPath:null,
    events:[],
    skills:{},
    currentStage:'profile',
    updatedAt:Date.now()
  };}
  function loadData(){
    const p=get(); if(!p) return null;
    let d; try{d=JSON.parse(localStorage.getItem(DATA_KEY)||'null')}catch(_){d=null}
    return d&&d.profile&&d.profile.id===p.id?d:defaultData(p);
  }
  function saveData(d){d.updatedAt=Date.now();set(DATA_KEY,d);}
  function event(type,payload={}){
    const d=loadData(); if(!d)return;
    d.events.push({type,at:Date.now(),...payload});
    saveData(d);
  }
  function showScreen(id){if(typeof show==='function')show(id);}
  function labelStatus(s){
    if(window.BODHA_DASHBOARD_LANGUAGE && typeof window.BODHA_DASHBOARD_LANGUAGE.statusLabel==='function') return window.BODHA_DASHBOARD_LANGUAGE.statusLabel(s);
    return s==='strong'?tr('Strong evidence','బలమైన evidence','Strong evidence'):s==='support'?tr('Needs support','మరింత support కావాలి','Needs support'):tr('Developing','ఇంకా అభివృద్ధి కావాలి','Developing');
  }

  function renderAccount(){
    const p=get();
    if(p){
      $('accountTitle').textContent=tr('Welcome back','మళ్లీ స్వాగతం','మళ్లీ వచ్చావు — welcome back!');
      $('accountIntro').textContent=tr('Your learning profile is saved on this device.','నీ learning profile ఈ device లో save అయింది.','నీ learning profile ఈ device లో save అయింది — ఇప్పుడు learning continue చేద్దాం.');
      $('studentName').value=p.name||'';
      $('studentGrade').value=p.grade||'8';
    }else{
      $('accountTitle').textContent=tr('Create your student profile','నీ student profile create చేద్దాం','ముందుగా నీ student profile create చేసుకుందాం');
      $('accountIntro').textContent=tr('This prototype saves your learning journey on this device.','ఈ prototype నీ learning journey ని ఈ device లో save చేస్తుంది.','ఈ prototype నీ learning journey ని ఈ device లో save చేస్తుంది — నీ progress ఇక్కడే save అవుతుంది.');
    }
    $('accountNameLabel').textContent=tr('Student name','విద్యార్థి పేరు','నీ పేరు');
    $('accountGradeLabel').textContent=tr('Class','తరగతి','నీ Class');
    $('accountContinue').textContent=tr('Continue to BODHA →','BODHA కి కొనసాగుదాం →','BODHA తో continue చేద్దాం →');
    $('accountNote').textContent=tr('Prototype note: this is local device storage, not a production login.','Prototype note: ఇది local device storage మాత్రమే; production login కాదు.','Prototype note: ఇది local device storage మాత్రమే — production login కాదు.');
  }

  function profileSubmit(){
    const name=($('studentName').value||'').trim();
    const grade=$('studentGrade').value||'8';
    if(!name){$('accountError').textContent=tr('Please enter your name.','నీ పేరు enter చేయి.','నీ name enter చేయి.');return;}
    let p=get();
    if(!p) p={id:'student_'+Date.now().toString(36),name,grade,createdAt:Date.now()};
    else {p.name=name;p.grade=grade;}
    set(KEY,p);
    let d=loadData(); if(!d)d=defaultData(p); d.profile=p; d.currentStage=d.diagnosis?'learning':'profile'; saveData(d);
    event('student_profile_saved',{studentId:p.id});
    renderDashboard(); showScreen('screen-dashboard');
  }

  function diagnosisSnapshot(){
    let snap=null;
    try{
      if(typeof BODHA_DIAGNOSTIC_V068!=='undefined' && BODHA_DIAGNOSTIC_V068.build){
        const a=BODHA_DIAGNOSTIC_V068.build();
        snap={score:a.score,total:a.total,overall:a.overall,targetSkill:a.targetSkill,targetSkillKey:a.targetSkillKey,rows:a.rows.map(r=>({skill:r.skill,skillKey:r.skillKey,pct:r.pct,statusKey:r.statusKey,confidence:r.confidence||null,gap:r.gap||''}))};
      }
    }catch(_){ }
    if(!snap && typeof buildAnalysis==='function'){
      const a=buildAnalysis(); snap={score:a.score,total:a.total,overall:a.overall,targetSkill:a.targetSkill,targetSkillKey:a.targetSkillKey,rows:a.rows.map(r=>({skill:r.skill,skillKey:r.skillKey,pct:r.pct,statusKey:r.statusKey}))};
    }
    return snap;
  }
  function persistDiagnosis(){
    const d=loadData(); if(!d)return;
    const snap=diagnosisSnapshot(); if(!snap)return;
    d.diagnosis={...snap,completedAt:Date.now(),answers:(state.answers||[]).map(a=>({...a}))};
    d.learningPath={targetSkillKey:snap.targetSkillKey,targetSkill:snap.targetSkill,createdAt:Date.now()};
    d.currentStage='diagnosed';
    d.skills={}; snap.rows.forEach(r=>d.skills[r.skillKey]={...r,lastEvidenceAt:Date.now()});
    saveData(d); event('diagnostic_completed',{score:snap.score,total:snap.total,targetSkillKey:snap.targetSkillKey});
  }

  function persistPractice(){
    const d=loadData(); if(!d||!state.practice)return;
    const p=state.practice;
    if(p._saved)return;
    p._saved=true;
    const key=p.targetSkillKey;
    const prev=d.skills[key]||{};
    const pct=p.items?.length?p.score/p.items.length:0;
    d.skills[key]={...prev,skillKey:key,practiceScore:p.score,practiceTotal:p.items?.length||0,practicePct:pct,practiceStatus:pct===1?'strong':pct>=.5?'developing':'support',lastPracticeAt:Date.now()};
    d.currentStage='practicing';
    saveData(d); event('practice_completed',{skillKey:key,score:p.score,total:p.items?.length||0});
  }

  function dashboardData(){
    const d=loadData(); if(!d)return null;
    const rows=Object.values(d.skills||{});
    const diagnosed=!!d.diagnosis;
    const practiced=rows.some(r=>r.practiceTotal);
    return {d,rows,diagnosed,practiced};
  }

  function renderDashboard(){
    const x=dashboardData(); if(!x)return;
    const {d,rows,diagnosed,practiced}=x,p=d.profile;
    const T=window.BODHA_DASHBOARD_LANGUAGE;
    const t=T&&T.apply?T.apply():null;
    const currentLang=typeof langKey==='function'?langKey():'en';
    const chapterByLang={
      en:'Chapter 2 — Linear Equations in One Variable',
      te:'Chapter 2 — ఒక చరరాశిలో సరళ సమీకరణాలు',
      hy:'Chapter 2 — Linear Equations in One Variable'
    };
    $('dashGreeting').textContent=currentLang==='en'?`Hi, ${p.name}!`:currentLang==='te'?`హాయ్, ${p.name}!`:`హాయ్ ${p.name}!`;
    $('dashSubtitle').textContent=t?t.subtitle:tr('Here is your BODHA learning journey.','ఇది నీ BODHA learning journey.','ఇప్పటివరకు నువ్వు ఎలా learn చేశావో, next ఏం చేయాలో ఇక్కడ clear గా చూడొచ్చు.');
    $('dashChapter').textContent=chapterByLang[currentLang]||chapterByLang.en;
    $('dashStage').textContent=practiced?(t?t.stagePractice:tr('Practicing','Practice చేస్తున్నావు','ఇప్పుడు మనం Practice చేస్తున్నాం')):diagnosed?(t?t.stageReady:tr('Learning path ready','నీ learning path ready గా ఉంది','నీకు సరిపోయే learning path ready గా ఉంది')):(t?t.stageDiagnosis:tr('Ready for diagnosis','Diagnostic కి ready','Diagnostic కి ready గా ఉంది'));
    $('dashStart').textContent=diagnosed?(t?t.continue:tr('Continue My Learning →','నా Learning కొనసాగించు →','Learning continue చేద్దాం →')):(t?t.start:tr('Start My BODHA Journey →','నా BODHA Journey ప్రారంభించు →','నా BODHA Journey ప్రారంభిద్దాం →'));
    $('dashDiagScore').textContent=diagnosed?`${d.diagnosis.score} / ${d.diagnosis.total}`:'—';
    const targetKey=d.learningPath?.targetSkillKey;
    $('dashTarget').textContent=targetKey?(T&&T.skillName?T.skillName(targetKey):(d.learningPath?.targetSkill||'—')):'—';
    $('dashEvents').textContent=String(d.events?.length||0);
    const map=$('dashSkillMap');
    if(map){
      const display=rows.length?rows:(d.diagnosis?.rows||[]);
      map.innerHTML=display.map(r=>{
        const pct=Math.max(8,Math.round(((r.practicePct??r.pct??0))*100));
        const status=r.practiceStatus||r.statusKey||'developing';
        const skill=T&&T.skillName?T.skillName(r.skillKey):((r.skill||r.skillKey)||'');
        return `<div class="dash-skill"><div class="dash-skill-top"><strong>${skill}</strong><span class="status ${status}">${labelStatus(status)}</span></div><div class="meter"><span class="${status}" style="width:${pct}%"></span></div></div>`;
      }).join('') || `<div class="analysis-empty">${t?t.emptyMap:tr('Complete your diagnostic to build your learning map.','Diagnostic complete చేస్తే నీ learning map ఇక్కడ కనిపిస్తుంది.','Diagnostic complete చేద్దాం. అప్పుడు నీ Learning Map ని build చేస్తాం.')}</div>`;
    }
    const labels=T&&T.journeyLabels?T.journeyLabels():['Student profile','Initial diagnosis','Personalised lesson','Adaptive practice','Mastery verification','Retention check'];
    const journey=[['profile',labels[0],true],['diagnosed',labels[1],diagnosed],['learning',labels[2],diagnosed],['practicing',labels[3],practiced],['mastery',labels[4],false],['retention',labels[5],false]];
    $('dashJourney').innerHTML=journey.map((j,i)=>`<div class="journey-step ${j[2]?'done':''} ${i===1&&!diagnosed?'current':''}"><span class="journey-dot">${j[2]?'✓':i+1}</span><span>${j[1]}</span></div>`).join('');
    $('dashDataNote').textContent=tr(`Saved on this device • Last updated ${new Date(d.updatedAt).toLocaleString()}`,`ఈ device లో save అయింది • చివరిసారి ${new Date(d.updatedAt).toLocaleString()} కి update అయింది`,`ఈ device లో save అయింది • చివరిసారి ${new Date(d.updatedAt).toLocaleString()} కి update అయింది`);
  }

  function dashboardStart(){
    const d=loadData(); if(!d)return;
    if(!d.diagnosis){showScreen('screen-welcome');return;}
    const key=d.learningPath?.targetSkillKey;
    if(key && typeof startLesson==='function'){startLesson(key);return;}
    showScreen('screen-results'); if(typeof showResults==='function')showResults();
  }

  function init(){
    $('startBtn').onclick=()=>{renderAccount();showScreen('screen-account');};
    $('accountContinue').onclick=profileSubmit;
    $('dashStart').onclick=dashboardStart;
    $('dashHome').onclick=()=>{renderAccount();showScreen('screen-account');};
    $('dashClear').onclick=()=>{
      if(!confirm(tr('Reset this prototype student data on this device?','ఈ device లోని prototype student data reset చేయాలా?','ఈ device లోని prototype student data reset చేయాలా?')))return;
      localStorage.removeItem(KEY);localStorage.removeItem(DATA_KEY);location.reload();
    };
    const oldBegin=$('beginDiagnostic').onclick;
    $('beginDiagnostic').onclick=function(){if(oldBegin)oldBegin();event('diagnostic_started');};
    const oldNext=$('nextQuestion').onclick;
    $('nextQuestion').onclick=function(){
      if(oldNext)oldNext();
      if(state.currentQ>=diagnosticQuestions.length)persistDiagnosis();
    };
    const oldPracticeFinish=$('practiceFinish').onclick;
    $('practiceFinish').onclick=function(){persistPractice();if(oldPracticeFinish)oldPracticeFinish();renderDashboard();};
    const oldShow=window.showResults;
    window.showResults=function(){if(oldShow)oldShow();persistPractice();};
    document.addEventListener('click',e=>{if(e.target.closest('#analysisContinue')){setTimeout(()=>{const d=loadData();if(d){d.currentStage='learning';saveData(d);renderDashboard();}},0);}});
    const p=get(); if(p)renderDashboard();
  }
  window.BODHA_DASHBOARD={render:renderDashboard,renderAccount,persistDiagnosis,persistPractice,loadData};
  init();
})();
