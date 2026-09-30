/* BODHA v0.6.8 — Diagnostic Intelligence & Report Accuracy
   - One shared diagnosis model for analysis + learning map
   - No undefined statuses
   - Developing = needs strengthening; support = clear gap
   - Skill-specific WHAT / WHERE / NEXT language from evidence dimensions
   - Recommendation explains WHY the first learning-path skill was chosen
*/
(function(){
  const SKILLS = [
    "equation-recognition","lhs-rhs","simple-equations","balance-principle",
    "variables-both-sides","word-to-equation","simplification","fractions-equations"
  ];
  const DIMS = ["conceptual","procedural","representation","application","reasoning","transfer"];

  const STATUS = {
    en:{strong:"Strong evidence",developing:"Developing",support:"Needs support",early:"More evidence needed"},
    te:{strong:"బలమైన evidence",developing:"ఇంకా అభివృద్ధి కావాలి",support:"మరింత support కావాలి",early:"ఇంకా evidence కావాలి"},
    hy:{strong:"Strong evidence",developing:"Developing",support:"Needs support",early:"More evidence కావాలి"}
  };
  const CONF = {
    en:{low:"Low confidence",moderate:"Moderate confidence",high:"High confidence"},
    te:{low:"తక్కువ confidence",moderate:"మధ్యస్థ confidence",high:"ఎక్కువ confidence"},
    hy:{low:"Low confidence",moderate:"Moderate confidence",high:"High confidence"}
  };
  const COPY = {
    en:{
      noStrengths:"No skill has enough evidence to be called strong yet.",
      noDeveloping:"No clear strengthening areas detected.",
      noSupport:"No high-priority support gaps detected in this diagnostic.",
      whatStrong:"You handled the evidence collected for this skill consistently.",
      whatDeveloping:"You have part of this skill, but the evidence is not yet consistent.",
      whatSupport:"The evidence shows a clear gap that BODHA should address before moving on.",
      earlyWhat:"BODHA does not have enough evidence to make a specific judgement yet.",
      earlyWhere:"More evidence is needed before BODHA names a specific difficulty.",
      strongWhere:"No clear gap appeared in the evidence collected so far.",
      strongNext:"Keep this skill active and verify it later through application or transfer.",
      recommendationPrefix:"BODHA is starting here because this skill has the clearest learning need among the evidence collected.",
      evidenceLabel:"Evidence", whereLabel:"Where", confidenceLabel:"Confidence", nextLabel:"BODHA's next step",
      strengthSection:"What you're doing well", developingSection:"Skills to strengthen", supportSection:"Skills that need targeted support",
      diagnosisTitle:"What BODHA found", diagnosisIntro:"BODHA looks at what you can already do, where the difficulty appears, how much evidence it has, and what to teach next.",
      reportIntro:(score,total)=>`You answered ${score} of ${total} diagnostic questions correctly. This is a learning profile, not a school mark.`,
      overallDeveloping:"You have some strong areas, and several skills need strengthening before harder applications.",
      overallSupport:"BODHA found one or more skills that need targeted support before moving to harder applications.",
      overallStrong:"Your evidence is strong across the skills checked so far. BODHA will verify it with application and transfer.",
      overallEarly:"BODHA needs a little more evidence before making a confident learning-path decision."
    },
    te:{
      noStrengths:"ఏ skill కి కూడా ఇంకా strong evidence అని చెప్పడానికి enough evidence లేదు.",
      noDeveloping:"Clear strengthening areas కనిపించలేదు.",
      noSupport:"ఈ diagnostic లో high-priority support gaps కనిపించలేదు.",
      whatStrong:"ఈ skill కోసం collect చేసిన evidence లో నువ్వు consistent గా perform చేశావు.",
      whatDeveloping:"ఈ skill లో కొంత understanding ఉంది, కానీ evidence ఇంకా consistent గా లేదు.",
      whatSupport:"ఈ skill లో clear gap కనిపించింది. ముందుకు వెళ్లే ముందు దీన్ని BODHA address చేస్తుంది.",
      earlyWhat:"Specific judgement ఇవ్వడానికి BODHA దగ్గర ఇంకా enough evidence లేదు.",
      earlyWhere:"Specific difficulty చెప్పడానికి మరింత evidence అవసరం.",
      strongWhere:"ఇప్పటివరకు collect చేసిన evidence లో clear gap కనిపించలేదు.",
      strongNext:"ఈ skill ని later application లేదా transfer ద్వారా verify చేస్తాం.",
      recommendationPrefix:"Collect చేసిన evidence లో clearest learning need ఈ skill లో కనిపించింది కాబట్టి BODHA ఇక్కడి నుంచి start చేస్తుంది.",
      evidenceLabel:"Evidence", whereLabel:"ఎక్కడ", confidenceLabel:"Confidence", nextLabel:"BODHA next step",
      strengthSection:"నీకు బాగా అర్థమైనది", developingSection:"ఇంకా strengthen చేయాల్సిన skills", supportSection:"Targeted support అవసరమైన skills",
      diagnosisTitle:"BODHA ఏమి గుర్తించింది", diagnosisIntro:"నీకు ఏమి వచ్చో, difficulty ఎక్కడ కనిపించిందో, ఎంత evidence ఉందో, next ఏమి teach చేయాలో BODHA చూస్తుంది.",
      reportIntro:(score,total)=>`${total} diagnostic questions లో ${score} correct. ఇది school mark కాదు — నీ learning profile.`,
      overallDeveloping:"నీకు కొన్ని strong areas ఉన్నాయి; harder applications కి వెళ్లే ముందు కొన్ని skills ని ఇంకా strengthen చేయాలి.",
      overallSupport:"Harder applications కి వెళ్లే ముందు targeted support అవసరమైన skills BODHA గుర్తించింది.",
      overallStrong:"ఇప్పటివరకు check చేసిన skills లో evidence strong గా ఉంది. Application మరియు transfer ద్వారా BODHA verify చేస్తుంది.",
      overallEarly:"Confident learning-path decision కోసం BODHA కి ఇంకొంచెం evidence అవసరం."
    },
    hy:{
      noStrengths:"ఇప్పటివరకు ఏ skill కి కూడా strong evidence అని confidently చెప్పడానికి enough evidence లేదు.",
      noDeveloping:"Clear strengthening areas కనిపించలేదు.",
      noSupport:"ఈ diagnostic లో high-priority support gaps కనిపించలేదు.",
      whatStrong:"ఈ skill కోసం collect చేసిన evidence లో నువ్వు consistently perform చేశావు.",
      whatDeveloping:"ఈ skill లో part of the idea అర్థమైంది, కానీ evidence ఇంకా consistent కాదు.",
      whatSupport:"ఈ skill లో clear gap కనిపించింది; next step గా BODHA దీన్ని target చేస్తుంది.",
      earlyWhat:"Specific judgement ఇవ్వడానికి BODHA దగ్గర ఇంకా enough evidence లేదు.",
      earlyWhere:"Specific difficulty identify చేయడానికి మరింత evidence అవసరం.",
      strongWhere:"Collected evidence లో ఇప్పటివరకు clear gap కనిపించలేదు.",
      strongNext:"Later application లేదా transfer ద్వారా ఈ skill ని verify చేస్తాం.",
      recommendationPrefix:"Collected evidence లో clearest learning need ఈ skill లో కనిపించింది కాబట్టి BODHA ఇక్కడి నుంచి start చేస్తుంది.",
      evidenceLabel:"Evidence", whereLabel:"Where", confidenceLabel:"Confidence", nextLabel:"BODHA next step",
      strengthSection:"నీకు already strong గా ఉన్నది", developingSection:"ఇంకా strengthen చేయాల్సిన skills", supportSection:"Targeted support కావాల్సిన skills",
      diagnosisTitle:"BODHA ఏమి గుర్తించింది", diagnosisIntro:"నీకు already ఏమి వచ్చో, difficulty ఎక్కడ ఉందో, ఎంత evidence ఉందో, next ఏమి teach చేయాలో BODHA చూస్తుంది.",
      reportIntro:(score,total)=>`${total} diagnostic questions లో ${score} correct. ఇది school mark కాదు — ఇది నీ learning profile.`,
      overallDeveloping:"నీకు కొన్ని strong areas ఉన్నాయి; harder applications కి ముందు కొన్ని skills ని strengthen చేయాలి.",
      overallSupport:"Harder applications కి ముందు targeted support అవసరమైన skills BODHA గుర్తించింది.",
      overallStrong:"ఇప్పటివరకు check చేసిన skills లో evidence strong గా ఉంది. Application మరియు transfer ద్వారా verify చేస్తాం.",
      overallEarly:"Confident learning-path decision కోసం ఇంకా కొంచెం evidence అవసరం."
    }
  };

  const GAP = {
    "equation-recognition":{
      conceptual:{en:"distinguishing an equation from an expression",te:"equation ని expression నుంచి గుర్తించడం",hy:"equation ని expression నుంచి distinguish చేయడం"},
      procedural:{en:"following the basic steps used to identify an equation",te:"equation ని identify చేసే basic steps",hy:"equation identify చేసే basic steps"},
      representation:{en:"reading the equality relationship",te:"= sign ద్వారా equality relationship ని చదవడం",hy:"= sign ద్వారా equality relationship ని read చేయడం"},
      application:{en:"recognising equations in simple situations",te:"simple situations లో equations ని గుర్తించడం",hy:"simple situations లో equations ని recognise చేయడం"},
      reasoning:{en:"explaining why an equality statement is an equation",te:"equality statement ఎందుకు equation అవుతుందో explain చేయడం",hy:"equality statement ఎందుకు equation అవుతుందో explain చేయడం"},
      transfer:{en:"recognising an equation in a new situation",te:"కొత్త situation లో equation ని గుర్తించడం",hy:"కొత్త situation లో equation ని recognise చేయడం"}
    },
    "lhs-rhs":{
      conceptual:{en:"identifying the complete expression on each side of =",te:"= కి ఇరువైపులా ఉన్న complete expression ని గుర్తించడం",hy:"= కి ఇరువైపులా ఉన్న complete expression ని identify చేయడం"},
      procedural:{en:"reading LHS and RHS correctly before solving",te:"solve చేసే ముందు LHS, RHS ని సరిగ్గా గుర్తించడం",hy:"solve చేసే ముందు LHS, RHS ని correctly identify చేయడం"},
      representation:{en:"reading which expression is on the left or right of =",te:"= కి left/right లో ఏ expression ఉందో చదవడం",hy:"= కి left/right లో ఏ expression ఉందో read చేయడం"},
      application:{en:"using LHS and RHS correctly in an equation",te:"equation లో LHS, RHS ని సరిగ్గా ఉపయోగించడం",hy:"equation లో LHS, RHS ని correctly use చేయడం"},
      reasoning:{en:"explaining what LHS and RHS represent",te:"LHS, RHS ఏమి represent చేస్తాయో explain చేయడం",hy:"LHS, RHS ఏమి represent చేస్తాయో explain చేయడం"},
      transfer:{en:"identifying both sides in a new equation",te:"కొత్త equation లో రెండు sides ని గుర్తించడం",hy:"కొత్త equation లో రెండు sides ని identify చేయడం"}
    },
    "simple-equations":{
      conceptual:{en:"understanding what it means to isolate the variable",te:"variable ని isolate చేయడం అంటే ఏమిటో అర్థం చేసుకోవడం",hy:"variable ని isolate చేయడం అంటే ఏమిటో understand చేయడం"},
      procedural:{en:"choosing and applying the inverse operation",te:"correct inverse operation ని choose చేసి apply చేయడం",hy:"correct inverse operation ని choose చేసి apply చేయడం"},
      representation:{en:"connecting an equation to the operation needed to solve it",te:"equation ని solve చేయడానికి అవసరమైన operation ని గుర్తించడం",hy:"equation కి solve operation ని connect చేయడం"},
      application:{en:"using equation-solving in a simple situation",te:"simple situation లో equation-solving ని apply చేయడం",hy:"simple situation లో equation-solving ని apply చేయడం"},
      reasoning:{en:"explaining why an operation should be undone",te:"ఒక operation ని ఎందుకు undo చేయాలో explain చేయడం",hy:"operation ని ఎందుకు undo చేయాలో explain చేయడం"},
      transfer:{en:"solving an unfamiliar equation structure",te:"కొత్త type equation ని solve చేయడం",hy:"unfamiliar equation structure ని solve చేయడం"}
    },
    "balance-principle":{
      conceptual:{en:"understanding that equality must be preserved",te:"equality ని preserve చేయాలి అని అర్థం చేసుకోవడం",hy:"equality ని preserve చేయాలి అని understand చేయడం"},
      procedural:{en:"applying the same operation to both sides",te:"రెండు sides కి same operation apply చేయడం",hy:"both sides కి same operation apply చేయడం"},
      representation:{en:"seeing the equation as a balanced relationship",te:"equation ని balanced relationship గా చూడడం",hy:"equation ని balanced relationship గా చూడడం"},
      application:{en:"maintaining balance while solving",te:"solve చేస్తూ balance ని maintain చేయడం",hy:"solve చేస్తూ balance ని maintain చేయడం"},
      reasoning:{en:"explaining why the same operation keeps equality true",te:"same operation ఎందుకు equality ని true గా ఉంచుతుందో explain చేయడం",hy:"same operation ఎందుకు equality ని true గా ఉంచుతుందో explain చేయడం"},
      transfer:{en:"using the balance idea in a new situation",te:"కొత్త situation లో balance idea ని use చేయడం",hy:"కొత్త situation లో balance idea ని use చేయడం"}
    },
    "variables-both-sides":{
      conceptual:{en:"recognising when the variable appears on both sides",te:"variable రెండు sides లో ఉందో గుర్తించడం",hy:"variable రెండు sides లో ఉందో recognise చేయడం"},
      procedural:{en:"collecting variable terms on one side",te:"variable terms ని ఒక side లోకి తీసుకురావడం",hy:"variable terms ని ఒక side లోకి collect చేయడం"},
      representation:{en:"reading variable terms across both sides",te:"రెండు sides లో variable terms ని చదవడం",hy:"both sides లో variable terms ని read చేయడం"},
      application:{en:"using the same operations when variables occur on both sides",te:"variables రెండు sides లో ఉన్నప్పుడు same operations ని use చేయడం",hy:"variables both sides లో ఉన్నప్పుడు same operations ని use చేయడం"},
      reasoning:{en:"explaining why variable terms can be moved using equal operations",te:"equal operations ద్వారా variable terms ని ఎందుకు మార్చవచ్చో explain చేయడం",hy:"equal operations ద్వారా variable terms ని ఎందుకు move చేయవచ్చో explain చేయడం"},
      transfer:{en:"solving a new equation with variables on both sides",te:"కొత్త both-sides equation ని solve చేయడం",hy:"కొత్త both-sides equation ని solve చేయడం"}
    },
    "word-to-equation":{
      conceptual:{en:"understanding mathematical language such as more, less, twice and sum",te:"more, less, twice, sum వంటి mathematical language ని అర్థం చేసుకోవడం",hy:"more, less, twice, sum వంటి mathematical language ని understand చేయడం"},
      procedural:{en:"turning words into the correct mathematical operation",te:"words ని correct mathematical operation గా మార్చడం",hy:"words ని correct mathematical operation గా translate చేయడం"},
      representation:{en:"translating a sentence into an equation",te:"sentence ని equation గా represent చేయడం",hy:"sentence ని equation గా represent చేయడం"},
      application:{en:"building an equation from a real-life situation",te:"real-life situation నుంచి equation build చేయడం",hy:"real-life situation నుంచి equation build చేయడం"},
      reasoning:{en:"explaining why a phrase maps to a particular operation",te:"ఒక phrase ఏ operation కి ఎందుకు match అవుతుందో explain చేయడం",hy:"phrase ఒక operation కి ఎందుకు match అవుతుందో explain చేయడం"},
      transfer:{en:"translating a new word problem into an equation",te:"కొత్త word problem ని equation గా మార్చడం",hy:"కొత్త word problem ని equation గా translate చేయడం"}
    },
    "simplification":{
      conceptual:{en:"understanding like terms and the distributive property",te:"like terms మరియు distributive property ని అర్థం చేసుకోవడం",hy:"like terms మరియు distributive property ని understand చేయడం"},
      procedural:{en:"distributing and combining terms correctly",te:"distribute చేసి terms ని సరిగ్గా combine చేయడం",hy:"distribute చేసి terms ని correctly combine చేయడం"},
      representation:{en:"reading brackets and terms before simplifying",te:"simplify చేసే ముందు brackets, terms ని చదవడం",hy:"simplify చేసే ముందు brackets, terms ని read చేయడం"},
      application:{en:"simplifying expressions inside an equation",te:"equation లో expressions ని simplify చేయడం",hy:"equation లో expressions ని simplify చేయడం"},
      reasoning:{en:"explaining why every term is affected by distribution",te:"distribution లో ప్రతి term ఎందుకు affect అవుతుందో explain చేయడం",hy:"distribution లో ప్రతి term ఎందుకు affect అవుతుందో explain చేయడం"},
      transfer:{en:"simplifying a new expression structure",te:"కొత్త expression structure ని simplify చేయడం",hy:"కొత్త expression structure ని simplify చేయడం"}
    },
    "fractions-equations":{
      conceptual:{en:"understanding denominators, LCM and equality",te:"denominators, LCM మరియు equality ని అర్థం చేసుకోవడం",hy:"denominators, LCM మరియు equality ని understand చేయడం"},
      procedural:{en:"clearing denominators using a common multiple",te:"common multiple తో denominators ని clear చేయడం",hy:"common multiple తో denominators ని clear చేయడం"},
      representation:{en:"reading fractional terms and denominators correctly",te:"fractional terms, denominators ని సరిగ్గా చదవడం",hy:"fractional terms, denominators ని correctly read చేయడం"},
      application:{en:"using fraction operations while preserving equality",te:"equality ని preserve చేస్తూ fraction operations ని use చేయడం",hy:"equality preserve చేస్తూ fraction operations ని use చేయడం"},
      reasoning:{en:"explaining why multiplying both sides by the LCM works",te:"LCM తో both sides multiply చేస్తే ఎందుకు work అవుతుందో explain చేయడం",hy:"LCM తో both sides multiply చేస్తే ఎందుకు work అవుతుందో explain చేయడం"},
      transfer:{en:"solving a new equation that contains fractions",te:"fractions ఉన్న కొత్త equation ని solve చేయడం",hy:"fractions ఉన్న కొత్త equation ని solve చేయడం"}
    }
  };

  function L(){ return COPY[typeof langKey==='function'?langKey():'en'] || COPY.en; }
  function statusText(key){ const lang=typeof langKey==='function'?langKey():'en'; return (STATUS[lang]||STATUS.en)[key] || STATUS.en[key] || key; }
  function confText(key){ const lang=typeof langKey==='function'?langKey():'en'; return (CONF[lang]||CONF.en)[key] || CONF.en[key] || key; }
  function skillLabel(key){
    const q=(typeof diagnosticQuestions!=='undefined'?diagnosticQuestions:[]).find(x=>x.id===key);
    if(q && typeof localized==='function') return localized(q.skill);
    const fallback={"equation-recognition":"Equation recognition","lhs-rhs":"LHS & RHS","simple-equations":"Simple equations","balance-principle":"Balance principle","variables-both-sides":"Variables on both sides","word-to-equation":"Word-to-equation","simplification":"Simplification","fractions-equations":"Fractions in equations"};
    return fallback[key]||key;
  }
  function questionForAnswer(a){ return (state.diagnosticQueue||[]).find(q=>q.id===a.questionId) || (typeof diagnosticQuestions!=='undefined'?diagnosticQuestions.find(q=>q.id===a.skillKey):null); }
  function gapFor(skill,dim){
    const g=GAP[skill]||{};
    const lang=typeof langKey==='function'?langKey():'en';
    return g[dim]?.[lang] || g[dim]?.en || g.conceptual?.[lang] || g.conceptual?.en || "the core idea";
  }
  function rows(){
    const by={}; SKILLS.forEach(k=>by[k]=[]);
    (state.answers||[]).forEach(a=>{ if(by[a.skillKey]) by[a.skillKey].push(a); });
    return SKILLS.map(skill=>{
      const arr=by[skill]||[];
      const total=arr.length;
      const correct=arr.filter(a=>a.correct).length;
      const pct=total?correct/total:0;
      const dimScores={};
      DIMS.forEach(d=>{ const x=arr.filter(a=>a.dimension===d); dimScores[d]=x.length?x.filter(a=>a.correct).length/x.length:null; });
      const observed=DIMS.filter(d=>dimScores[d]!==null);
      let weakest=null;
      if(observed.length) weakest=observed.slice().sort((a,b)=>dimScores[a]-dimScores[b])[0];
      let statusKey='early';
      if(total>=2 && pct>=0.8) statusKey='strong';
      else if(total>=2 && pct>=0.5) statusKey='developing';
      else if(total>=2) statusKey='support';
      const confidence=total>=4?'high':total>=2?'moderate':'low';
      const gap=weakest?gapFor(skill,weakest):null;
      return {skillKey:skill,skill:skillLabel(skill),arr,total,correct,pct,statusKey,confidence,weakest,dimScores,gap};
    });
  }
  function priorityScore(r){
    if(r.statusKey==='support') return 100+(1-r.pct)*25;
    if(r.statusKey==='developing') return 60+(1-r.pct)*25;
    if(r.statusKey==='early') return 30;
    return 10+(1-r.pct)*10;
  }
  function diagnosisFor(r){
    const c=L();
    if(r.statusKey==='early') return {what:c.earlyWhat,where:c.earlyWhere,next:c.overallEarly};
    if(r.statusKey==='strong') return {what:`${c.whatStrong} (${r.correct}/${r.total})`,where:c.strongWhere,next:c.strongNext};
    if(r.statusKey==='support') return {what:c.whatSupport,where:r.gap?`${r.gap}.`:`More evidence is needed to name the exact gap.`,next:r.gap?`Targeted teaching on ${r.gap}, followed by a fresh verification problem.`:"BODHA will gather more evidence before choosing a specific intervention."};
    return {what:c.whatDeveloping,where:r.gap?`${r.gap}.`:`More evidence is needed to name the exact gap.`,next:r.gap?`Targeted practice on ${r.gap}, followed by a fresh verification problem.`:"BODHA will gather another evidence point before moving to harder applications."};
  }
  function build(){
    const rs=rows();
    const score=(state.answers||[]).filter(a=>a.correct).length,total=(state.answers||[]).length;
    const priority=rs.slice().sort((a,b)=>priorityScore(b)-priorityScore(a));
    const target=priority.find(r=>r.statusKey==='support')||priority.find(r=>r.statusKey==='developing')||priority.find(r=>r.statusKey==='early')||priority.find(r=>r.statusKey==='strong')||rs[0];
    const overall=rs.some(r=>r.statusKey==='support')?'support':rs.some(r=>r.statusKey==='developing')?'developing':rs.some(r=>r.statusKey==='early')?'early':'strong';
    return {rows:rs,score,total,overall,target,targetSkill:target?.skill||'',targetSkillKey:target?.skillKey||null,strengths:rs.filter(r=>r.statusKey==='strong'),developing:rs.filter(r=>r.statusKey==='developing'),support:rs.filter(r=>r.statusKey==='support')};
  }
  function renderList(id,items,empty){
    const el=$(id); if(!el)return;
    if(!items.length){el.innerHTML=`<div class="analysis-empty">${empty}</div>`;return;}
    el.innerHTML=items.map(r=>`<div class="analysis-skill"><span>${r.skill}</span><span class="status ${r.statusKey}">${statusText(r.statusKey)}</span></div>`).join('');
  }
  function renderCards(a){
    const el=$('diagnosisDetails'); if(!el)return;
    const c=L();
    el.innerHTML=a.rows.map(r=>{
      const d=diagnosisFor(r), pct=Math.round(r.pct*100);
      return `<div class="diagnosis-card">
        <div class="diagnosis-card-head"><div class="diagnosis-card-title">${r.skill}</div><span class="diagnosis-status ${r.statusKey}">${statusText(r.statusKey)}</span></div>
        <div class="diagnosis-line"><strong>${d.what}</strong></div>
        <div class="diagnosis-line"><strong>${c.whereLabel}:</strong> ${d.where}</div>
        <span class="diagnosis-evidence">${c.evidenceLabel}: ${r.correct}/${r.total} (${pct}%)</span>
        <div class="diagnosis-confidence">${c.confidenceLabel}: ${confText(r.confidence)}</div>
        <div class="diagnosis-line"><strong>${c.nextLabel}:</strong> ${d.next}</div>
      </div>`;
    }).join('');
  }
  function showAnalysisV068(){
    const a=build(),c=L();
    state.lastOverall=a.overall; state.targetSkillKey=a.targetSkillKey;
    setText('analysisScore',a.score); setText('analysisTotal',a.total);
    setText('analysisEyebrow',typeof ui!=='undefined'?(ui[langKey()]?.analysisEyebrow||'YOUR BODHA ANALYSIS'):'YOUR BODHA ANALYSIS');
    setText('analysisTitle',typeof ui!=='undefined'?(ui[langKey()]?.analysisTitle||'Now I know how to help you.'):'Now I know how to help you.');
    setText('analysisIntro',c.reportIntro(a.score,a.total));
    setText('analysisStrengthsTitle',c.strengthSection); setText('analysisDevelopingTitle',c.developingSection); setText('analysisSupportTitle',c.supportSection);
    renderList('analysisStrengths',a.strengths,c.noStrengths); renderList('analysisDeveloping',a.developing,c.noDeveloping); renderList('analysisSupport',a.support,c.noSupport);
    setText('diagnosisTitle',c.diagnosisTitle); setText('diagnosisIntro',c.diagnosisIntro); renderCards(a);
    let overallText=c.overallDeveloping; if(a.overall==='support')overallText=c.overallSupport; else if(a.overall==='strong')overallText=c.overallStrong; else if(a.overall==='early')overallText=c.overallEarly;
    const reason=a.target?.gap?` ${c.recommendationPrefix} ${a.target.gap}.`:` ${c.recommendationPrefix}`;
    setText('analysisRecommendation',overallText+reason);
    setText('analysisTargetLabel',typeof ui!=='undefined'?(ui[langKey()]?.targetLabel||'BODHA will focus on'):'BODHA will focus on'); setText('analysisTargetSkill',a.targetSkill);
  }
  function showResultsV068(){
    const a=build(), lang=langKey(), LUI=typeof ui!=='undefined'?ui[lang]:{};
    state.lastOverall=a.overall;
    const resolvedTarget = a.target || (a.targetSkillKey ? a.rows.find(r=>r.skillKey===a.targetSkillKey) : null) || a.rows[0];
    const resolvedTargetKey = resolvedTarget?.skillKey || a.targetSkillKey || SKILLS[0];
    const resolvedTargetSkill = resolvedTarget?.skill || a.targetSkill || skillLabel(resolvedTargetKey);
    state.targetSkillKey=resolvedTargetKey;
    setText('resultTitle',LUI.resultTitles?.[a.overall==='support'?'support':a.overall==='strong'?'strong':'developing']||'I know where to start.');
    setText('resultSummary',L.reportIntro(a.score,a.total));
    const mapStatus=r=>r.statusKey==='early'?'developing':r.statusKey;
    const map=$('skillMap');
    if(map) map.innerHTML=a.rows.map(r=>`<div class="skill-row"><strong>${r.skill}</strong><div class="meter"><span class="${mapStatus(r)}" style="width:${Math.max(r.pct*100,8)}%"></span></div><span class="status ${mapStatus(r)}">${statusText(r.statusKey)}</span></div>`).join('');
    setText('learningTargetLabel',LUI.targetLabel||'BODHA will focus on'); setText('learningTargetSkill',resolvedTargetSkill);
    const nextKey=a.overall==='support'?'support':a.overall==='strong'?'strong':'developing';
    setText('nextHeading',LUI.nextHeadings?.[nextKey]||'Your next step');
    setText('nextDescription',resolvedTarget?.gap?`${LUI.nextDescriptions?.[nextKey]||''} ${L.recommendationPrefix} ${resolvedTarget.gap}.`:LUI.nextDescriptions?.[nextKey]||'');
    const btn=$('startLearning'); if(btn)btn.onclick=()=>{ if(typeof startLesson==='function')startLesson(resolvedTargetKey); };
  }
  window.buildAnalysis=build;
  window.showAnalysis=showAnalysisV068;
  window.showResults=showResultsV068;
  window.BODHA_DIAGNOSTIC_V068={build,rows,diagnosisFor};
})();
