/* BODHA v0.6 - Evidence-Based Mastery Engine
   Focus: enough evidence to learn, not enough guesses to pass.
*/
(function(){
  const skillKeys = [
    "equation-recognition","lhs-rhs","simple-equations","balance-principle",
    "variables-both-sides","word-to-equation","simplification","fractions-equations"
  ];
  const dims = ["conceptual","procedural","representation","application","reasoning","transfer"];
  const dimLabel = {
    en:{conceptual:"Conceptual",procedural:"Procedural",representation:"Representation",application:"Application",reasoning:"Reasoning",transfer:"Transfer"},
    te:{conceptual:"Conceptual",procedural:"Procedural",representation:"Representation",application:"Application",reasoning:"Reasoning",transfer:"Transfer"},
    hy:{conceptual:"Conceptual",procedural:"Procedural",representation:"Representation",application:"Application",reasoning:"Reasoning",transfer:"Transfer"}
  };

  // Extra questions are deliberately different in representation, not just number changes.
  const extraPractice = {
    "equation-recognition":[
      ["conceptual","Which statement is an equation?","వీటిలో ఏది equation?","Which statement equation?",["7x + 1","7x + 1 = 15","7x","7 + 1"],["7x + 1","7x + 1 = 15","7x","7 + 1"],1,"Look for =: an equation says two expressions have equal value."],
      ["representation","Which is a linear equation in one variable?","వీటిలో ఒక variable లో linear equation ఏది?","ఏది one variable linear equation?",["3x + 4 = 10","x² = 9","x + y = 8","3x + 4"],["3x + 4 = 10","x² = 9","x + y = 8","3x + 4"],0,"Check for an equality sign, one variable, and highest power 1."],
      ["reasoning","Why is 4x + 2 not an equation by itself?","4x + 2 ఒక్కటే ఎందుకు equation కాదు?","4x + 2 alone equation ఎందుకు కాదు?",["It has no variable","It has no equality statement","It has two variables","It is always zero"],["It has no variable","It has no equality statement","It has two variables","It is always zero"],1,"An equation needs an equality relationship."],
      ["transfer","Which situation can be represented by x + 5 = 12?","ఏ situation ని x + 5 = 12 గా represent చేయవచ్చు?","ఏ situation x + 5 = 12 ని represent చేస్తుంది?",["A number increased by 5 is 12","A number decreased by 5 is 12","Five times a number is 12","A number divided by 5 is 12"],["A number increased by 5 is 12","A number decreased by 5 is 12","Five times a number is 12","A number divided by 5 is 12"],0,"The equation says: start with x, add 5, and get 12."]
    ],
    "lhs-rhs":[
      ["conceptual","In 6x + 1 = 25, what is the LHS?","6x + 1 = 25 లో LHS ఏది?","6x + 1 = 25 లో LHS ఏది?",["25","6x + 1","1","6x"],["25","6x + 1","1","6x"],1,"LHS is everything to the left of =."],
      ["representation","In 4x - 7 = 2x + 3, what is the RHS?","4x - 7 = 2x + 3 లో RHS ఏది?","4x - 7 = 2x + 3 లో RHS ఏది?",["4x - 7","2x + 3","-7","3"],["4x - 7","2x + 3","-7","3"],1,"RHS is everything to the right of =."],
      ["reasoning","If the RHS is 18 in an equation, which part is on the right of =?","ఒక equation లో RHS 18 అయితే = కి right side లో ఏది ఉంటుంది?","RHS 18 అయితే = కి right side లో ఏది?",["18","The variable only","The left expression","Nothing"],["18","The variable only","The left expression","Nothing"],0,"RHS names the complete expression on the right side."],
      ["transfer","Which pair correctly identifies LHS and RHS in 3x + 2 = x + 10?","3x + 2 = x + 10 లో LHS, RHS సరైన pair ఏది?","3x + 2 = x + 10 లో correct LHS/RHS pair ఏది?",["LHS=x+10, RHS=3x+2","LHS=3x+2, RHS=x+10","LHS=3x, RHS=10","LHS=2, RHS=x"],["LHS=x+10, RHS=3x+2","LHS=3x+2, RHS=x+10","LHS=3x, RHS=10","LHS=2, RHS=x"],1,"Read the complete expressions on each side of =."]
    ],
    "simple-equations":[
      ["procedural","If x - 8 = 13, what is x?","x - 8 = 13 అయితే x ఎంత?","x - 8 = 13 అయితే x value ఎంత?",["5","21","13","104"],["5","21","13","104"],1,"Undo -8 by adding 8 to both sides."],
      ["procedural","If x/5 = 4, what is x?","x/5 = 4 అయితే x ఎంత?","x/5 = 4 అయితే x value ఎంత?",["0.8","9","20","25"],["0.8","9","20","25"],2,"Undo division by 5 by multiplying both sides by 5."],
      ["reasoning","What is the first step in 2x + 3 = 15?","2x + 3 = 15 లో first step ఏమిటి?","2x + 3 = 15 లో first step ఏది?",["Divide by 2 immediately","Subtract 3 from both sides","Add 3 to both sides","Multiply by 3"],["Divide by 2 immediately","Subtract 3 from both sides","Add 3 to both sides","Multiply by 3"],1,"Undo the addition first so the variable term is isolated."],
      ["transfer","A number plus 9 is 20. What is the number?","ఒక సంఖ్యకి 9 కలిపితే 20. ఆ సంఖ్య ఎంత?","A number + 9 = 20. Number ఎంత?",["11","18","29","2"],["11","18","29","2"],0,"Translate the situation to x + 9 = 20, then undo +9."]
    ],
    "balance-principle":[
      ["conceptual","If you multiply one side by 3, what keeps equality?","ఒక side ని 3తో multiply చేస్తే equality కోసం ఏమి చేయాలి?","One side ని 3తో multiply చేస్తే equality ఎలా keep చేయాలి?",["Multiply the other side by 3","Add 3 to the other side","Do nothing","Divide the other side by 3"],["Multiply the other side by 3","Add 3 to the other side","Do nothing","Divide the other side by 3"],0,"The same operation must be applied to both sides."],
      ["procedural","To undo x - 6 = 9, what should you do to both sides?","x - 6 = 9 ని undo చేయడానికి both sides కి ఏమి చేయాలి?","x - 6 = 9 ని undo చేయడానికి both sides కి ఏమి చేయాలి?",["Subtract 6","Add 6","Multiply by 6","Divide by 6"],["Subtract 6","Add 6","Multiply by 6","Divide by 6"],1,"Addition is the inverse of subtraction."],
      ["reasoning","Why do we perform the same operation on both sides?","రెండు sides లో same operation ఎందుకు చేస్తాం?","Both sides లో same operation ఎందుకు?",["To keep equality true","To make numbers larger","To remove the variable automatically","To change the equation"],["To keep equality true","To make numbers larger","To remove the variable automatically","To change the equation"],0,"Changing both sides equally preserves the equality."],
      ["transfer","A balance shows 12 = 12. If 4 is added to the left, what must happen on the right?","Balance లో 12 = 12. Left కి 4 add చేస్తే right లో?","12 = 12 balance. Left కి 4 add చేస్తే right లో ఏమి?",["8","12","16","48"],["8","12","16","48"],2,"12 + 4 must equal the new right side, so add 4 there too."]
    ],
    "variables-both-sides":[
      ["conceptual","Which equation has x on both sides?","ఏ equation లో x రెండు sides లో ఉంది?","ఏ equation లో x both sides లో ఉంది?",["x + 4 = 9","3x + 2 = x + 8","7 = 2x + 1","5x = 20"],["x + 4 = 9","3x + 2 = x + 8","7 = 2x + 1","5x = 20"],1,"Check each side of = for x."],
      ["procedural","In 6x + 1 = 2x + 9, what can you subtract from both sides first?","6x + 1 = 2x + 9 లో first ఏది subtract చేయవచ్చు?","6x + 1 = 2x + 9 లో first ఏది subtract చేయవచ్చు?",["2x","6x","1","9"],["2x","6x","1","9"],0,"Subtracting 2x from both sides leaves variable terms together."],
      ["reasoning","Why can we subtract 2x from both sides?","2x ని both sides నుంచి ఎందుకు subtract చేయవచ్చు?","2x ని both sides నుంచి ఎందుకు subtract చేయవచ్చు?",["It preserves equality","It makes x disappear everywhere","It changes only one side","It avoids simplifying"],["It preserves equality","It makes x disappear everywhere","It changes only one side","It avoids simplifying"],0,"The balance principle allows the same operation on both sides."],
      ["transfer","Solve 3x + 4 = x + 12.","3x + 4 = x + 12 ని solve చేయి.","3x + 4 = x + 12 ని solve చేయి.",["2","4","6","8"],["2","4","6","8"],1,"Subtract x from both sides, then subtract 4 and divide by 2."]
    ],
    "word-to-equation":[
      ["conceptual","What does '7 more than x' mean?","'x కంటే 7 ఎక్కువ' అంటే?","'7 more than x' అంటే?",["x - 7","7x","x + 7","x/7"],["x - 7","7x","x + 7","x/7"],2,"'More than' means addition."],
      ["representation","A number is 5 less than twice x. Which expression represents it?","ఒక సంఖ్య x కి రెండింతల కంటే 5 తక్కువ. Expression ఏది?","A number is 5 less than twice x. Expression ఏది?",["2x + 5","2x - 5","5x - 2","x - 5"],["2x + 5","2x - 5","5x - 2","x - 5"],1,"Twice x is 2x; less 5 means subtract 5."],
      ["application","A pencil costs x rupees and a notebook costs 20 rupees more. Which expression is the notebook cost?","Pencil ₹x, notebook ₹20 ఎక్కువ. Notebook cost expression ఏది?","Pencil ₹x, notebook ₹20 more. Notebook expression ఏది?",["x - 20","20x","x + 20","x/20"],["x - 20","20x","x + 20","x/20"],2,"Twenty more means add 20 to x."],
      ["transfer","The sum of x and 9 is 25. Which equation represents the statement?","x మరియు 9 మొత్తం 25. ఏ equation?","x and 9 sum is 25. Which equation?",["x - 9 = 25","9x = 25","x + 9 = 25","x + 25 = 9"],["x - 9 = 25","9x = 25","x + 9 = 25","x + 25 = 9"],2,"Sum means addition, and the result equals 25."]
    ],
    "simplification":[
      ["procedural","Simplify 5(x + 2).","5(x + 2) ని simplify చేయి.","5(x + 2) ని simplify చేయి.",["5x + 2","5x + 10","x + 10","5x + 7"],["5x + 2","5x + 10","x + 10","5x + 7"],1,"Distribute 5 to both terms."],
      ["procedural","Simplify 2(3x - 4).","2(3x - 4) ని simplify చేయి.","2(3x - 4) ని simplify చేయి.",["6x - 4","6x - 8","3x - 8","6x + 8"],["6x - 4","6x - 8","3x - 8","6x + 8"],1,"Multiply 2 by 3x and by -4."],
      ["reasoning","Why must the outside number multiply every term inside a bracket?","Bracket లో outside number ప్రతి term తో ఎందుకు multiply చేయాలి?","Outside number ప్రతి term తో ఎందుకు multiply చేయాలి?",["It is the distributive property","It only works for x","It removes the bracket by subtraction","It changes addition into division"],["It is the distributive property","It only works for x","It removes the bracket by subtraction","It changes addition into division"],0,"The distributive property applies multiplication to every term."],
      ["transfer","Simplify 3(x + 4) - x.","3(x + 4) - x ని simplify చేయి.","3(x + 4) - x ని simplify చేయి.",["2x + 12","3x + 12","4x + 12","2x + 4"],["2x + 12","3x + 12","4x + 12","2x + 4"],0,"First distribute: 3x + 12, then combine 3x - x."]
    ],
    "fractions-equations":[
      ["conceptual","What is the LCM of 3 and 4?","3, 4 యొక్క LCM ఎంత?","3, 4 యొక్క LCM ఎంత?",["7","12","9","16"],["7","12","9","16"],1,"12 is the smallest number divisible by both 3 and 4."],
      ["procedural","Which number can clear denominators 3 and 5?","3, 5 denominators ని clear చేయడానికి ఏ number?","3, 5 denominators clear చేయడానికి ఏ number?",["8","10","15","30"],["8","10","15","30"],2,"Use the LCM of 3 and 5."],
      ["reasoning","Why can multiplying both sides by the LCM help?","LCM తో both sides multiply చేయడం ఎందుకు help చేస్తుంది?","LCM తో both sides multiply చేయడం ఎందుకు help చేస్తుంది?",["It can remove the denominators while preserving equality","It changes the equation into a graph","It always makes x equal zero","It avoids all operations"],["It can remove the denominators while preserving equality","It changes the equation into a graph","It always makes x equal zero","It avoids all operations"],0,"Multiplying both sides equally preserves equality and can clear denominators."],
      ["transfer","For x/4 + 1/2 = 3/4, which is a useful first operation?","x/4 + 1/2 = 3/4 లో useful first operation ఏది?","x/4 + 1/2 = 3/4 లో useful first operation ఏది?",["Multiply both sides by 4","Multiply only x by 4","Add 4 to one side","Ignore the fractions"],["Multiply both sides by 4","Multiply only x by 4","Add 4 to one side","Ignore the fractions"],0,"4 is the LCM of the denominators 4 and 2."]
    ]
  };

  function qFromTuple(skillKey, t, idx){
    const [dimension,en,te,hy,enOpts,teOpts,answer,hintEn]=t;
    const hyOpts = teOpts;
    return {
      id:`${skillKey}-extra-${idx+1}`,
      skillKey, dimension,
      prompt:{en,te,hy},
      options:{en:enOpts,te:teOpts,hy:hyOpts},
      answer,
      hint:{en:hintEn,te:hintEn,hy:hintEn},
      explain:{en:`The correct answer is ${enOpts[answer]}.`,te:`సరైన సమాధానం ${teOpts[answer]}.`,hy:`Correct answer: ${hyOpts[answer]}.`}
    };
  }

  // Build a richer practice bank from the existing 3 core questions + 4 extra questions.
  const richerPractice = {};
  Object.keys(extraPractice).forEach(skill=>{
    const base = (typeof practiceBank !== "undefined" ? practiceBank[skill] : []) || [];
    richerPractice[skill] = base.map((q,i)=>({...q, skillKey: q.skillKey || skill, dimension:q.dimension || ["conceptual","procedural","transfer"][i] || "procedural", id:q.id || `${skill}-core-${i+1}`}));
    extraPractice[skill].forEach((t,i)=>richerPractice[skill].push(qFromTuple(skill,t,i)));
  });

  // The diagnostic starts with 12 items (not 8), then adds targeted evidence for uncertain skills.
  const baseBySkill = {};
  skillKeys.forEach(k=>{
    baseBySkill[k] = richerPractice[k].slice(0,3);
  });
  const initialDiagnostic = [
    baseBySkill[skillKeys[0]][0], baseBySkill[skillKeys[1]][0], baseBySkill[skillKeys[2]][0], baseBySkill[skillKeys[3]][0],
    baseBySkill[skillKeys[4]][0], baseBySkill[skillKeys[5]][0], baseBySkill[skillKeys[6]][0], baseBySkill[skillKeys[7]][0],
    baseBySkill[skillKeys[2]][1], baseBySkill[skillKeys[3]][1], baseBySkill[skillKeys[5]][1], baseBySkill[skillKeys[7]][1]
  ];

  function cloneQuestion(q, index, fallbackSkillKey){
    const inferredSkill = q?.skillKey || fallbackSkillKey || (q?.id ? Object.keys(richerPractice).find(k=>q.id.startsWith(`${k}-`)) : null);
    return {...q, skillKey: inferredSkill || q?.skillKey, diagnosticIndex:index};
  }

  function beginEvidenceDiagnostic(){
    state.currentQ=0; state.answers=[]; state.lastOverall="support"; state.currentChoice=null; state.currentAnswered=false;
    state.diagnosticQueue=initialDiagnostic.map(cloneQuestion);
    state.diagnosticUsedIds=new Set(state.diagnosticQueue.map(q=>q.id));
    state.diagnosticPhase="initial";
    show("screen-diagnostic"); renderEvidenceDiagnostic();
  }

  $("beginDiagnostic").onclick=beginEvidenceDiagnostic;

  function diagnosticQuestion(){ return state.diagnosticQueue?.[state.currentQ]; }

  function diagnosticWhy(q, choice){
    const opts=q.options?.[langKey()] ?? q.options?.en ?? [];
    const correctText=opts[q.answer] ?? "the correct option";
    const reason=localized(q.explain) || localized(q.hint) || "Review the idea and compare it with the equation.";
    const correctLabel=langKey()==="te"?`సరైన సమాధానం: ${correctText}. ఎందుకు అంటే: ${reason}`:
      langKey()==="hy"?`Correct answer: ${correctText}. ఎందుకు అంటే: ${reason}`:
      `Correct answer: ${correctText}. Why: ${reason}`;
    if(choice===q.answer){
      return langKey()==="te"?`🎉 Correct! ఎందుకు అంటే: ${reason}`:
        langKey()==="hy"?`🎉 Correct! ఎందుకు అంటే: ${reason}`:
        `🎉 Correct! Why: ${reason}`;
    }
    const lead=langKey()==="te"?"మంచి ప్రయత్నం! సరైన idea ని చూద్దాం:":langKey()==="hy"?"Good try! సరైన idea ని చూద్దాం:":"Good try! Let's see why:";
    return `${lead} ${correctLabel}`;
  }

  function renderEvidenceDiagnostic(){
    const q=diagnosticQuestion(); if(!q) return;
    const totalSoFar=state.diagnosticQueue.length;
    setText("questionCount",`${state.currentQ+1} / ${totalSoFar}`);
    $("diagBar").style.width=`${Math.min(100,((state.currentQ+1)/Math.max(totalSoFar,1))*100)}%`;
    setText("skillPill",localized((diagnosticQuestions.find(x=>x.id===q.skillKey)||{}).skill || q.skillKey));
    setText("questionText",localized(q.prompt || q.q));
    const opts=q.options?.[langKey()] ?? q.options?.en ?? [];
    $("options").innerHTML=opts.map((o,i)=>`<button class="option" data-i="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join("");
    $("options").querySelectorAll(".option").forEach(b=>b.onclick=()=>selectEvidenceAnswer(Number(b.dataset.i)));
    const prior=state.answers.find(a=>a.questionIndex===state.currentQ);
    state.currentChoice=prior?prior.choice:null; state.currentAnswered=!!prior;
    $("options").querySelectorAll(".option").forEach(b=>{
      const i=Number(b.dataset.i);
      if(state.currentAnswered){ b.disabled=true; if(i===q.answer)b.classList.add("correct"); if(i===state.currentChoice && i!==q.answer)b.classList.add("wrong"); }
    });
    const f=$("diagFeedback");
    if(state.currentAnswered){
      const correct=state.currentChoice===q.answer;
      f.textContent=diagnosticWhy(q,state.currentChoice);
      f.className=`feedback ${correct?"good":"try"}`;
      $("nextQuestion").classList.remove("hidden");
    } else { f.textContent=""; f.className="feedback hidden"; $("nextQuestion").classList.add("hidden"); }
    setText("nextQuestion", state.currentQ===state.diagnosticQueue.length-1 ? ui[langKey()].continue : ui[langKey()].continue);
  }

  function selectEvidenceAnswer(choice){
    const q=diagnosticQuestion(); if(!q || state.currentAnswered)return;
    state.currentChoice=choice; state.currentAnswered=true;
    const record={questionIndex:state.currentQ,skillKey:q.skillKey,questionId:q.id,choice,correct:choice===q.answer,dimension:q.dimension};
    state.answers.push(record);
    $("options").querySelectorAll(".option").forEach(b=>b.disabled=true);
    const chosen=$("options").querySelector(`[data-i="${choice}"]`); if(chosen)chosen.classList.add(choice===q.answer?"correct":"wrong");
    const correctOption=$("options").querySelector(`[data-i="${q.answer}"]`); if(correctOption)correctOption.classList.add("correct");
    const f=$("diagFeedback"); f.textContent=diagnosticWhy(q,choice); f.className=`feedback ${record.correct?"good":"try"}`;
    $("nextQuestion").classList.remove("hidden");
  }

  function evidenceBySkill(){
    const out={}; skillKeys.forEach(k=>out[k]=[]);
    (state.answers||[]).forEach(a=>{if(out[a.skillKey])out[a.skillKey].push(a);});
    return out;
  }

  function chooseAdaptiveDiagnosticQuestion(){
    const by=evidenceBySkill();
    // Prioritise skills with only one piece of evidence, then skills with mixed results.
    const ranked=skillKeys.map(k=>{
      const arr=by[k]; const n=arr.length; const correct=arr.filter(x=>x.correct).length;
      const pct=n?correct/n:0;
      const uncertainty = n===0 ? 100 : (n===1 ? 80 : (pct>0 && pct<1 ? 70 : 20));
      return {k,n,pct,uncertainty};
    }).sort((a,b)=>b.uncertainty-a.uncertainty || a.n-b.n);
    const target=ranked.find(r=>r.n<3 || (r.pct>0 && r.pct<1));
    if(!target)return null;
    const candidate=richerPractice[target.k].find(q=>!state.diagnosticUsedIds.has(q.id));
    if(!candidate)return null;
    return candidate;
  }

  $("nextQuestion").onclick=function(){
    if(!state.currentAnswered)return;
    const atEnd=state.currentQ>=state.diagnosticQueue.length-1;
    if(!atEnd){ state.currentQ++; state.currentChoice=null; state.currentAnswered=false; renderEvidenceDiagnostic(); return; }
    const answeredCount=state.answers.length;
    const follow=window.chooseAdaptiveDiagnosticQuestionV063();
    // Require at least 16 total questions for a chapter-level first profile, unless the bank is exhausted.
    const shouldContinue = answeredCount < 16 || !!follow;
    if(shouldContinue && answeredCount < 20 && follow){
      state.diagnosticQueue.push(window.BODHA_EVIDENCE_SHARED.cloneQuestion(follow,state.diagnosticQueue.length));
      state.diagnosticUsedIds.add(follow.id);
      state.currentQ++;
      state.currentChoice=null; state.currentAnswered=false; state.diagnosticPhase="adaptive";
      renderEvidenceDiagnostic();
    } else {
      show("screen-analysis"); showEvidenceAnalysis();
    }
  };

  function buildEvidenceAnalysis(){
    const by=evidenceBySkill();
    const rows=skillKeys.map(k=>{
      const arr=by[k]; const correct=arr.filter(a=>a.correct).length; const total=arr.length; const pct=total?correct/total:0;
      const dimensions={}; dims.forEach(d=>dimensions[d]=arr.filter(a=>a.dimension===d));
      const dimScores={}; dims.forEach(d=>{const x=dimensions[d]; dimScores[d]=x.length?x.filter(a=>a.correct).length/x.length:null;});
      let statusKey = total<2 ? "support" : (pct>=.8 && Object.values(dimScores).filter(v=>v!==null).every(v=>v>=.5) ? "strong" : pct>=.5 ? "developing" : "support");
      return {skill:localized((diagnosticQuestions.find(x=>x.id===k)||{}).skill||k),skillKey:k,total,correct,pct,statusKey,status:ui[langKey()].statuses[statusKey],dimensions:dimScores};
    });
    const score=state.answers.filter(a=>a.correct).length, total=state.answers.length;
    const priority=[...rows].sort((a,b)=>a.pct-b.pct || a.total-b.total);
    const target=priority[0];
    const overall=score/Math.max(total,1)>=.8?"strong":score/Math.max(total,1)>=.5?"developing":"support";
    return {rows,strengths:rows.filter(r=>r.statusKey==="strong"),developing:rows.filter(r=>r.statusKey==="developing"),support:rows.filter(r=>r.statusKey==="support"),score,total,overall,targetSkill:target?.skill||"",targetSkillKey:target?.skillKey||null};
  }

  function showEvidenceAnalysis(){
    const a=buildEvidenceAnalysis(); state.lastOverall=a.overall; state.targetSkillKey=a.targetSkillKey;
    setText("analysisScore",a.score); setText("analysisTotal",a.total);
    renderAnalysisList("analysisStrengths",a.strengths,ui[langKey()].noStrengths);
    renderAnalysisList("analysisDeveloping",a.developing,ui[langKey()].noDeveloping);
    renderAnalysisList("analysisSupport",a.support,ui[langKey()].noSupport);
    setText("analysisRecommendation",`${ui[langKey()].nextDescriptions[a.overall]} ${langKey()==="en"?"BODHA collected multiple pieces of evidence instead of relying on one answer per skill.":langKey()==="te"?"BODHA ఒక్క answer మీద కాకుండా multiple evidence points ని ఉపయోగించింది.":"BODHA ఒక్క answer మీద కాకుండా multiple evidence points ని use చేసింది."}`);
    setText("analysisTargetLabel",ui[langKey()].targetLabel); setText("analysisTargetSkill",a.targetSkill);
  }

  // Override the existing analysis/map functions so later screens use the richer evidence model.
  window.buildAnalysis=buildEvidenceAnalysis;
  window.showAnalysis=showEvidenceAnalysis;

  function showEvidenceResults(){
    const L=ui[langKey()], analysis=buildEvidenceAnalysis();
    const rows=analysis.rows.map(r=>({...r}));
    if(state.practiceCompleted && state.practice?.targetSkillKey){
      const target=rows.find(r=>r.skillKey===state.practice.targetSkillKey);
      const m=state.mastery[state.practice.targetSkillKey];
      if(target && m){
        target.pct=m.pct;
        if(m.statusKey==="mastery-candidate"){ target.statusKey="developing"; target.status=langKey()==="en"?"Mastery candidate":langKey()==="te"?"Mastery candidate":"Mastery candidate"; target.masteryCandidate=true; }
        else { target.statusKey=m.statusKey; target.status=L.statuses[m.statusKey]||target.status; }
      }
    }
    const overall=rows.some(r=>r.statusKey==="support")?"developing":rows.some(r=>r.statusKey==="developing")?"developing":"strong";
    state.lastOverall=overall;
    setText("resultTitle",L.resultTitles[overall]);
    let summary=L.summary(analysis.score,analysis.total);
    if(state.practiceCompleted && state.practice?.targetSkillKey){
      const target=rows.find(r=>r.skillKey===state.practice.targetSkillKey);
      if(target?.masteryCandidate){ summary += langKey()==="en"?" Practice produced a mastery candidate; BODHA will verify retention later rather than calling it permanent mastery.":langKey()==="te"?" Practice తర్వాత mastery candidate వచ్చింది; permanent mastery అని చెప్పకుండా BODHA later retention check తో verify చేస్తుంది.":"Practice తర్వాత mastery candidate వచ్చింది; permanent mastery అని చెప్పకుండా later retention check తో verify చేస్తాం."; }
    }
    setText("resultSummary",summary);
    $("skillMap").innerHTML=rows.map(r=>`<div class="skill-row"><strong>${r.skill}</strong><div class="meter"><span class="${r.statusKey}" style="width:${Math.max(r.pct*100,8)}%"></span></div><span class="status ${r.statusKey}">${r.status}</span></div>`).join("");
    setText("nextHeading",L.nextHeadings[overall]); setText("nextDescription",L.nextDescriptions[overall]); setText("learningTargetLabel",L.targetLabel);
    const target=rows.find(r=>r.skillKey===state.practice?.targetSkillKey) || rows.find(r=>r.skillKey===analysis.targetSkillKey);
    setText("learningTargetSkill",target?.skill || analysis.targetSkill);
    $("startLearning").onclick=()=>startLesson(target?.skillKey || analysis.targetSkillKey || skillKeys[0]);
  }
  window.showResults=showEvidenceResults;

  function practiceItemsFor(skillKey){
    const bank=richerPractice[skillKey]||richerPractice["simple-equations"];
    return bank.map(q=>({...q,options:{en:[...q.options.en],te:[...q.options.te],hy:[...q.options.hy]}}));
  }
  window.buildPracticeItems=practiceItemsFor;

  // A practice round now has 10 evidence-bearing questions. It is still adaptive in difficulty,
  // but mastery is based on multiple dimensions, not 3/3.
  window.startAdaptivePractice=function(skillKey){
    const items=practiceItemsFor(skillKey).slice(0,7);
    // Add three non-identical verification items by rotating the strongest evidence questions.
    // They are marked as verification so they count as fresh evidence without claiming a new concept.
    const verificationSeeds = {
      "equation-recognition":[
        {en:"Which is an equation?",te:"వీటిలో ఏది equation?",hy:"వీటిలో ఏది equation?",opts:["8x + 1","8x + 1 = 17","8x","x + 1"],ans:1},
        {en:"Which statement is an equation?",te:"వీటిలో ఏ statement equation?",hy:"వీటిలో ఏ statement equation?",opts:["6x - 3 = 15","6x - 3","6(x - 3)","x - 3"],ans:0},
        {en:"Which is a linear equation in one variable?",te:"వీటిలో ఒక variable లో linear equation ఏది?",hy:"వీటిలో one variable లో linear equation ఏది?",opts:["4x + 1 = 9","x² + 1 = 5","x + y = 9","4x + 1"],ans:0}
      ],
      "lhs-rhs":[
        {en:"In 7x + 4 = 25, what is the RHS?",te:"7x + 4 = 25 లో RHS ఏది?",hy:"7x + 4 = 25 లో RHS ఏది?",opts:["7x","4","25","7x + 4"],ans:2},
        {en:"In 5x - 2 = 3x + 8, what is the LHS?",te:"5x - 2 = 3x + 8 లో LHS ఏది?",hy:"5x - 2 = 3x + 8 లో LHS ఏది?",opts:["5x - 2","3x + 8","8","5x"],ans:0},
        {en:"In 2x + 9 = x + 14, which pair correctly names the two sides?",te:"2x + 9 = x + 14 లో LHS, RHS సరైన pair ఏది?",hy:"2x + 9 = x + 14 లో LHS, RHS correct pair ఏది?",opts:["LHS=x+14, RHS=2x+9","LHS=2x+9, RHS=x+14","LHS=2x, RHS=14","LHS=9, RHS=x"],ans:1}
      ],
      "simple-equations":[
        {en:"If x + 9 = 18, what is x?",te:"x + 9 = 18 అయితే x ఎంత?",hy:"x + 9 = 18 అయితే x value ఎంత?",opts:["7","9","18","27"],ans:1},
        {en:"If 4x = 32, what is x?",te:"4x = 32 అయితే x ఎంత?",hy:"4x = 32 అయితే x value ఎంత?",opts:["6","8","12","36"],ans:1},
        {en:"Solve: 3x + 6 = 21.",te:"3x + 6 = 21 ని solve చేయి.",hy:"3x + 6 = 21 ని solve చేయి.",opts:["3","5","7","9"],ans:1}
      ],
      "balance-principle":[
        {en:"If you subtract 8 from one side, what keeps equality?",te:"ఒక side నుంచి 8 subtract చేస్తే equality కోసం ఏమి చేయాలి?",hy:"One side నుంచి 8 subtract చేస్తే equality ఎలా keep చేయాలి?",opts:["Subtract 8 from the other side","Add 8 to the other side","Do nothing","Multiply the other side by 8"],ans:0},
        {en:"To undo x + 7 = 15, what should you do to both sides?",te:"x + 7 = 15 ని undo చేయడానికి both sides కి ఏమి చేయాలి?",hy:"x + 7 = 15 ని undo చేయడానికి both sides కి ఏమి చేయాలి?",opts:["Add 7","Subtract 7","Multiply by 7","Divide by 7"],ans:1},
        {en:"Why do we subtract the same number from both sides?",te:"రెండు sides నుంచి same number ఎందుకు subtract చేస్తాం?",hy:"Both sides నుంచి same number ఎందుకు subtract చేస్తాం?",opts:["To preserve equality","To make both sides zero","To remove every number","To change the variable"],ans:0}
      ],
      "variables-both-sides":[
        {en:"Which equation has x on both sides?",te:"ఏ equation లో x రెండు sides లో ఉంది?",hy:"ఏ equation లో x both sides లో ఉంది?",opts:["x + 5 = 12","4x + 1 = x + 10","8 = x + 2","6x = 24"],ans:1},
        {en:"In 7x + 2 = 3x + 14, what can you subtract from both sides first?",te:"7x + 2 = 3x + 14 లో first ఏది subtract చేయవచ్చు?",hy:"7x + 2 = 3x + 14 లో first ఏది subtract చేయవచ్చు?",opts:["3x","7x","2","14"],ans:0},
        {en:"Solve: 5x + 2 = 2x + 14.",te:"5x + 2 = 2x + 14 ని solve చేయి.",hy:"5x + 2 = 2x + 14 ని solve చేయి.",opts:["3","4","6","8"],ans:2}
      ],
      "word-to-equation":[
        {en:"What does '6 more than x' mean?",te:"'x కంటే 6 ఎక్కువ' అంటే?",hy:"'6 more than x' అంటే?",opts:["x - 6","6x","x + 6","x/6"],ans:2},
        {en:"A number is 4 less than twice x. Which expression represents it?",te:"ఒక సంఖ్య x కి రెండింతల కంటే 4 తక్కువ. Expression ఏది?",hy:"A number is 4 less than twice x. Expression ఏది?",opts:["2x + 4","2x - 4","4x - 2","x - 4"],ans:1},
        {en:"The sum of x and 6 is 18. Which equation represents this?",te:"x మరియు 6 మొత్తం 18. ఏ equation?",hy:"x and 6 sum is 18. Which equation?",opts:["x - 6 = 18","6x = 18","x + 6 = 18","x + 18 = 6"],ans:2}
      ],
      "simplification":[
        {en:"Simplify 6(x + 2).",te:"6(x + 2) ని simplify చేయి.",hy:"6(x + 2) ని simplify చేయి.",opts:["6x + 2","6x + 12","x + 12","6x + 8"],ans:1},
        {en:"Simplify 3(x - 5).",te:"3(x - 5) ని simplify చేయి.",hy:"3(x - 5) ని simplify చేయి.",opts:["3x - 5","3x - 15","x - 15","3x + 15"],ans:1},
        {en:"Simplify 4(x + 3) - x.",te:"4(x + 3) - x ని simplify చేయి.",hy:"4(x + 3) - x ని simplify చేయి.",opts:["3x + 12","4x + 12","5x + 12","3x + 3"],ans:0}
      ],
      "fractions-equations":[
        {en:"What is the LCM of 4 and 5?",te:"4, 5 యొక్క LCM ఎంత?",hy:"4, 5 యొక్క LCM ఎంత?",opts:["9","10","20","25"],ans:2},
        {en:"Which number can clear denominators 2 and 5?",te:"2, 5 denominators ని clear చేయడానికి ఏ number?",hy:"2, 5 denominators clear చేయడానికి ఏ number?",opts:["7","8","10","12"],ans:2},
        {en:"For x/5 + 1/2 = 7/10, which is a useful first operation?",te:"x/5 + 1/2 = 7/10 లో useful first operation ఏది?",hy:"x/5 + 1/2 = 7/10 లో useful first operation ఏది?",opts:["Multiply both sides by 10","Multiply only x by 5","Add 10 to one side","Ignore the denominators"],ans:0}
      ]
    };
    const verification=verificationSeeds[skillKey].map((v,i)=>({id:`${skillKey}-verify-${i+1}`,dimension:["conceptual","procedural","transfer"][i],prompt:{en:v.en,te:v.te,hy:v.hy},options:{en:v.opts,te:v.opts,hy:v.opts},answer:v.ans,hint:{en:"Use the same core idea, but solve this new version carefully.",te:"అదే core idea ని గుర్తు చేసుకుని ఈ కొత్త question ని carefully solve చేయి.",hy:"Same core idea ని గుర్తు చేసుకుని ఈ new question ని carefully solve చేయి."},verification:true}));
    const seen=new Set(items.map(q=>q.id));
    verification.forEach(q=>{ if(!seen.has(q.id)) items.push(q); }); // total = 10
    // Keep verification questions visually distinct in the learning record.
    items.forEach((q,i)=>{q.roundIndex=i+1;});
    state.practice={items,index:0,score:0,level:1,streak:0,answered:false,usedHint:false,choice:undefined,targetSkillKey:skillKey,seen:[1],attemptHistory:[],dimensionEvidence:{}};
    show("screen-practice"); updateEvidencePracticeUI();
  };

  function updateEvidencePracticeUI(){
    const L=practiceUI[langKey()],p=state.practice,q=p.items[p.index]; if(!q)return;
    setText("practiceProgressLabel",L.label); setText("practiceProgressText",`${p.index+1} / ${p.items.length}`);
    $("practiceProgressBar").style.width=`${((p.index+1)/p.items.length)*100}%`;
    setText("practiceDifficulty",L.level[Math.min(2,q.level||1)-1]); setText("practiceStreak",`${p.streak} ${langKey()==="en"?"correct":"correct"}`);
    setText("practiceEyebrow",L.eyebrow); setText("practiceSkill",localized(adaptiveLessons[p.targetSkillKey]?.skill || {en:p.targetSkillKey,te:p.targetSkillKey,hy:p.targetSkillKey}));
    setText("practiceQuestion",localized(q.prompt));
    $("practiceOptions").innerHTML=q.options[langKey()].map((o,i)=>`<button class="option" data-pi="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join("");
    $("practiceOptions").querySelectorAll(".option").forEach(b=>b.onclick=()=>window.chooseEvidencePractice(Number(b.dataset.pi)));
    if(p.answered){
      $("practiceOptions").querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct");if(i===p.choice&&i!==q.answer)b.classList.add("wrong");});
      $("practiceFeedback").textContent=p.choice===q.answer?`🎉 ${L.correct}`:L.wrong; $("practiceFeedback").className=`feedback ${p.choice===q.answer?"good":"try"}`;
      $("practiceHint").textContent=p.choice===q.answer?"":`💡 ${localized(q.hint)}`; $("practiceHint").className=p.choice===q.answer?"hint hidden":"hint";
      $("practiceAction").textContent=p.choice===q.answer?(p.index===p.items.length-1?L.finish:L.next):L.retry; $("practiceAction").disabled=false;
      $("practiceAction").onclick=p.choice===q.answer?window.nextEvidencePractice:window.retryEvidencePractice;
    } else {
      $("practiceFeedback").textContent=""; $("practiceFeedback").className="feedback hidden"; $("practiceHint").textContent=""; $("practiceHint").className="hint hidden";
      $("practiceAction").textContent=L.check; $("practiceAction").disabled=false; $("practiceAction").onclick=window.checkEvidencePractice;
    }
  }

  window.chooseEvidencePractice=function(i){ if(state.practice.answered)return; state.practice.choice=i; $("practiceOptions").querySelectorAll(".option").forEach(b=>b.classList.remove("selected")); const b=$("practiceOptions").querySelector(`[data-pi="${i}"]`); if(b)b.classList.add("selected"); };
  window.checkEvidencePractice=function(){
    const p=state.practice,q=p.items[p.index]; if(p.answered)return;
    if(p.choice===undefined){$("practiceFeedback").textContent=practiceUI[langKey()].hintText;$("practiceFeedback").className="feedback info";return;}
    const correct=p.choice===q.answer;
    p.attemptHistory.push({questionIndex:p.index,questionId:q.id,answer:p.choice,correct,hintUsed:p.usedHint,dimension:q.dimension});
    if(correct){
      p.answered=true;p.score++;p.streak++;p.dimensionEvidence[q.dimension]=(p.dimensionEvidence[q.dimension]||{correct:0,total:0});p.dimensionEvidence[q.dimension].correct++;p.dimensionEvidence[q.dimension].total++;
      $("practiceOptions").querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct")});
      $("practiceFeedback").textContent=`🎉 ${practiceUI[langKey()].correct}`;$("practiceFeedback").className="feedback good";
      $("practiceHint").className="hint hidden"; $("practiceAction").textContent=p.index===p.items.length-1?practiceUI[langKey()].finish:practiceUI[langKey()].next; $("practiceAction").onclick=window.nextEvidencePractice;
    } else {
      p.answered=true;p.streak=0;p.usedHint=true;p.dimensionEvidence[q.dimension]=(p.dimensionEvidence[q.dimension]||{correct:0,total:0});p.dimensionEvidence[q.dimension].total++;
      $("practiceOptions").querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===p.choice)b.classList.add("wrong")});
      $("practiceFeedback").textContent=practiceUI[langKey()].wrong;$("practiceFeedback").className="feedback try";$("practiceHint").textContent=`💡 ${localized(q.hint)}`;$("practiceHint").className="hint";$("practiceAction").textContent=practiceUI[langKey()].retry;$("practiceAction").onclick=window.retryEvidencePractice;
    }
  };
  window.retryEvidencePractice=function(){ const p=state.practice;p.choice=undefined;p.answered=false;p.usedHint=false;updateEvidencePracticeUI(); };
  window.nextEvidencePractice=function(){ const p=state.practice;if(p.index<p.items.length-1){p.index++;p.choice=undefined;p.answered=false;p.usedHint=false;updateEvidencePracticeUI();}else{showEvidencePracticeSummary();} };

  function masteryAssessment(p){
    const total=p.items.length, pct=p.score/Math.max(total,1), evidence=p.dimensionEvidence||{};
    const covered=Object.keys(evidence).length;
    const transfer=evidence.transfer?.correct||0;
    const reasoning=evidence.reasoning?.correct||0;
    if(pct>=.8 && covered>=5 && transfer>=1 && reasoning>=1) return "mastery-candidate";
    if(pct>=.6) return "proficient";
    if(pct>=.4) return "developing";
    return "needs-support";
  }

  function showEvidencePracticeSummary(){
    const L=practiceUI[langKey()],p=state.practice,s=p.score,t=p.items.length,status=masteryAssessment(p);
    const statusText={
      en:{"mastery-candidate":"Mastery candidate — BODHA has strong evidence across different ways of thinking. A later retention check should verify it.",proficient:"Proficient evidence — the skill is improving, but BODHA will continue verifying it in different contexts.",developing:"Developing evidence — keep practising with targeted support.","needs-support":"Needs support — BODHA will return to the foundations and misconceptions."},
      te:{"mastery-candidate":"Mastery candidate — వేర్వేరు ways of thinking లో strong evidence వచ్చింది. Later retention check తో దీన్ని verify చేయాలి.",proficient:"Proficient evidence — skill improve అవుతోంది. Different contexts లో BODHA ఇంకా verify చేస్తుంది.",developing:"Developing evidence — targeted support తో ఇంకా practice చేద్దాం.","needs-support":"Needs support — BODHA foundations మరియు misconceptions దగ్గరకు తిరిగి వెళ్తుంది."},
      hy:{"mastery-candidate":"Mastery candidate — different ways of thinking లో strong evidence వచ్చింది. Later retention check తో verify చేయాలి.",proficient:"Proficient evidence — skill improve అవుతోంది; different contexts లో ఇంకా verify చేస్తాం.",developing:"Developing evidence — targeted support తో ఇంకొంచెం practice చేద్దాం.","needs-support":"Needs support — BODHA foundations మరియు misconceptions ని మళ్లీ address చేస్తుంది."}
    };
    setText("practiceSummaryEyebrow",L.summaryEyebrow);setText("practiceSummaryTitle",L.summaryTitle);setText("practiceSummaryIntro",L.intro(s,t));setText("practiceSummaryScoreLabel",L.scoreLabel);setText("practiceSummaryScore",s);setText("practiceSummaryTotal",t);
    setText("practiceSummaryNote",statusText[langKey()][status]);setText("practiceNextTitle",status.replace("-"," ").toUpperCase());setText("practiceNextText",statusText[langKey()][status]);setText("practiceFinish",L.finish);
    state.mastery[p.targetSkillKey]={source:"evidence-practice",score:s,total:t,pct:s/t,statusKey:status,dimensionEvidence:p.dimensionEvidence,attemptHistory:p.attemptHistory,updatedAt:Date.now()};
    state.practiceCompleted=true;
    show("screen-practice-summary");
  }

  // Make the new UI functions visible to the language controller.
  window.updatePracticeUI=updateEvidencePracticeUI;
  window.showPracticeSummary=showEvidencePracticeSummary;
  // Expose shared evidence-engine helpers for the v0.6.3 diagnostic layer.
  window.BODHA_EVIDENCE_SHARED = { richerPractice, cloneQuestion, renderEvidenceDiagnostic };

  const previousRefresh=window.refreshVisibleScreen;
  window.refreshVisibleScreen=function(){
    applyLanguage(); const screen=visibleScreen(); if(!screen)return;
    if(screen.id==="screen-diagnostic"){ setText("diagTitle",langKey()==="en"?"Let's build your starting evidence.":langKey()==="te"?"నీ starting evidence ని build చేద్దాం.":"నీ starting evidence ని build చేద్దాం."); renderEvidenceDiagnostic(); }
    else if(screen.id==="screen-analysis")showEvidenceAnalysis();
    else if(screen.id==="screen-results")showResults();
    else if(screen.id==="screen-lesson")renderLesson();
    else if(screen.id==="screen-practice")updateEvidencePracticeUI();
    else if(screen.id==="screen-practice-summary")showEvidencePracticeSummary();
  };

  // v0.6 wording: the diagnostic is evidence gathering, not a school-like test.
  setText("diagTitle", langKey()==="en"?"Let's build your starting evidence.":langKey()==="te"?"నీ starting evidence ని build చేద్దాం.":"నీ starting evidence ని build చేద్దాం.");
  setText("practiceProgressText", "1 / 7");
})();


/* BODHA v0.6.3 — Initial Diagnosis Intelligence
   The initial diagnostic is now a balanced evidence-gathering stage.
   16 baseline questions (2 per skill) + up to 4 targeted follow-ups.
   It distinguishes lack of evidence from an actual learning gap and
   explains WHAT is strong/weak, WHERE the difficulty appears, and WHAT
   BODHA will do next before the learning path is chosen.
*/
(function(){
  const SKILLS = [
    "equation-recognition","lhs-rhs","simple-equations","balance-principle",
    "variables-both-sides","word-to-equation","simplification","fractions-equations"
  ];
  const DIM_LABELS = {
    en:{conceptual:"conceptual understanding",procedural:"step-by-step solving",representation:"reading or representing the idea",application:"applying the idea",reasoning:"reasoning about why it works",transfer:"using the idea in a new situation"},
    te:{conceptual:"concept ని అర్థం చేసుకోవడం",procedural:"step-by-step గా solve చేయడం",representation:"idea ని read లేదా represent చేయడం",application:"idea ని apply చేయడం",reasoning:"ఎందుకు పనిచేస్తుందో reasoning చేయడం",transfer:"కొత్త situation లో idea ని use చేయడం"},
    hy:{conceptual:"concept ని understand చేయడం",procedural:"step-by-step solving",representation:"idea ని read లేదా represent చేయడం",application:"idea ని apply చేయడం",reasoning:"ఎందుకు works అవుతుందో reasoning",transfer:"కొత్త situation లో idea ని use చేయడం"}
  };
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
  const T = {
    en:{
      diagnosisTitle:"What BODHA found", diagnosisIntro:"BODHA looks at what you can already do, where you are getting stuck, and how much evidence it has before choosing your learning path.",
      whatStrong:"What you already understand", whatDeveloping:"What is partly understood", whatSupport:"What needs more support", where:"Where BODHA sees the gap", evidence:"Evidence", confidence:"Confidence", next:"BODHA's next step", earlyWhat:"BODHA does not have enough evidence yet to make a specific judgement.", earlyWhere:"This skill will be checked again when more evidence is useful.", earlyNext:"Keep this skill in the background while BODHA checks the areas that need clearer evidence.", strongWhere:"No clear gap appeared in the evidence collected so far.", strongNext:"Keep this skill active and verify it later through application or transfer.", scoreIntro:"Your diagnostic is a learning profile, not a school mark.", priority:"Learning-path priority"
    },
    te:{
      diagnosisTitle:"BODHA ఏమి గుర్తించింది", diagnosisIntro:"నీకు ఇప్పటికే ఏమి వచ్చో, ఎక్కడ difficulty వస్తుందో, ఎంత evidence ఉందో చూసిన తర్వాతే BODHA నీ learning path ని choose చేస్తుంది.",
      whatStrong:"నీకు ఇప్పటికే అర్థమైనది", whatDeveloping:"ఇంకా partly అర్థమైనది", whatSupport:"మరింత support అవసరమైనది", where:"ఎక్కడ gap కనిపించింది", evidence:"Evidence", confidence:"Confidence", next:"BODHA next step", earlyWhat:"ఇప్పుడే specific judgement ఇవ్వడానికి BODHA దగ్గర enough evidence లేదు.", earlyWhere:"మరింత evidence అవసరమైనప్పుడు ఈ skill ని మళ్లీ check చేస్తాం.", earlyNext:"ఈ skill ని background లో ఉంచి, clearer evidence అవసరమైన areas ని BODHA ముందుగా check చేస్తుంది.", strongWhere:"ఇప్పటివరకు collect చేసిన evidence లో clear gap కనిపించలేదు.", strongNext:"ఈ skill ని application లేదా transfer ద్వారా later verify చేస్తాం.", scoreIntro:"నీ diagnostic learning profile — school mark కాదు.", priority:"Learning-path priority"
    },
    hy:{
      diagnosisTitle:"BODHA ఏమి గుర్తించింది", diagnosisIntro:"నీకు already ఏమి వచ్చో, ఎక్కడ stuck అవుతున్నావో, ఎంత evidence ఉందో చూసి BODHA learning path ని choose చేస్తుంది.",
      whatStrong:"నీకు already clear అయినది", whatDeveloping:"Partly clear అయినది", whatSupport:"మరింత support అవసరమైనది", where:"ఎక్కడ gap కనిపించింది", evidence:"Evidence", confidence:"Confidence", next:"BODHA next step", earlyWhat:"Specific judgement ఇవ్వడానికి ఇంకా enough evidence లేదు.", earlyWhere:"More evidence useful అయినప్పుడు ఈ skill ని మళ్లీ check చేస్తాం.", earlyNext:"ఈ skill ని background లో ఉంచి, unclear areas ని BODHA ముందుగా check చేస్తుంది.", strongWhere:"ఇప్పటివరకు collected evidence లో clear gap కనిపించలేదు.", strongNext:"Application లేదా transfer ద్వారా later verify చేస్తాం.", scoreIntro:"నీ diagnostic learning profile — school mark కాదు.", priority:"Learning-path priority"
    }
  };

  function skillName(k){ return localized((diagnosticQuestions.find(x=>x.id===k)||{}).skill||k); }
  function balancedDiagnostic(){
    const shared=window.BODHA_EVIDENCE_SHARED;
    const bankSource=shared?.richerPractice || {};
    const arr=[];
    SKILLS.forEach(k=>{
      const bank=(bankSource[k]||[]).slice(0,2);
      bank.forEach(q=>arr.push({...q, skillKey:q.skillKey || k}));
    });
    return arr;
  }

  function startV063Diagnostic(){
    state.currentQ=0; state.answers=[]; state.lastOverall="support"; state.currentChoice=null; state.currentAnswered=false;
    const shared=window.BODHA_EVIDENCE_SHARED;
    if(!shared){ console.error("BODHA evidence engine helpers are not ready."); return; }
    state.diagnosticQueue=balancedDiagnostic().map(shared.cloneQuestion);
    state.diagnosticUsedIds=new Set(state.diagnosticQueue.map(q=>q.id));
    state.diagnosticPhase="baseline";
    show("screen-diagnostic");
    window.BODHA_EVIDENCE_SHARED.renderEvidenceDiagnostic();
  }

  function evidenceRowsV063(){
    const by={}; SKILLS.forEach(k=>by[k]=[]);
    (state.answers||[]).forEach(a=>{if(by[a.skillKey])by[a.skillKey].push(a);});
    return SKILLS.map(k=>{
      const arr=by[k], total=arr.length, correct=arr.filter(a=>a.correct).length, pct=total?correct/total:0;
      const dim={}; ["conceptual","procedural","representation","application","reasoning","transfer"].forEach(d=>{
        const x=arr.filter(a=>a.dimension===d); dim[d]=x.length?x.filter(a=>a.correct).length/x.length:null;
      });
      const observedDims=Object.entries(dim).filter(([,v])=>v!==null);
      const weakest=observedDims.length ? observedDims.sort((a,b)=>a[1]-b[1])[0][0] : null;
      let statusKey="early";
      if(total>=2 && pct>=.8) statusKey="strong";
      else if(total>=2 && pct>=.5) statusKey="developing";
      else if(total>=2) statusKey="support";
      const confidence=total>=4?"high":total>=3?"moderate":"moderate";
      return {skillKey:k,skill:skillName(k),total,correct,pct,dim,weakest,statusKey,confidence,arr};
    });
  }

  function diagnosisText(row){
    const L=T[langKey()], labels=DIM_LABELS[langKey()];
    if(row.statusKey==="early") return {what:L.earlyWhat,where:L.earlyWhere,next:L.earlyNext};
    if(row.statusKey==="strong") return {what:`${L.whatStrong}: ${row.correct}/${row.total} questions correct.`,where:L.strongWhere,next:L.strongNext};
    const where=labels[row.weakest] || labels.conceptual;
    if(row.statusKey==="support"){
      return {
        what:`${L.whatSupport}: ${row.correct}/${row.total} questions correct.`,
        where:`${L.where}: ${where}.`,
        next: row.weakest ? `BODHA will begin with ${where}, then check the skill again with a fresh problem.` : "BODHA will return to the foundation and gather more evidence."
      };
    }
    return {
      what:`${L.whatDeveloping}: ${row.correct}/${row.total} questions correct.`,
      where:`${L.where}: ${where}.`,
      next:`BODHA will give targeted practice on ${where} before moving to harder applications.`
    };
  }

  function priorityScore(row){
    if(row.statusKey==="support") return 100 + (1-row.pct)*20;
    if(row.statusKey==="developing") return 60 + (1-row.pct)*20;
    if(row.statusKey==="early") return 30;
    return 10 + (1-row.pct)*10;
  }

  function buildV063Analysis(){
    const rows=evidenceRowsV063();
    const score=(state.answers||[]).filter(a=>a.correct).length, total=(state.answers||[]).length;
    const priority=[...rows].sort((a,b)=>priorityScore(b)-priorityScore(a));
    const target=priority.find(r=>r.statusKey==="support") || priority.find(r=>r.statusKey==="developing") || priority.find(r=>r.statusKey==="early") || priority[0];
    const overall=rows.some(r=>r.statusKey==="support")?"support":rows.some(r=>r.statusKey==="developing")?"developing":rows.some(r=>r.statusKey==="early")?"developing":"strong";
    return {rows,score,total,overall,targetSkill:target?.skill||"",targetSkillKey:target?.skillKey||null,
      strengths:rows.filter(r=>r.statusKey==="strong"),developing:rows.filter(r=>r.statusKey==="developing"),support:rows.filter(r=>r.statusKey==="support")};
  }

  function renderDiagnosisCards(rows){
    const el=$("diagnosisDetails"); if(!el)return;
    const L=T[langKey()], S=STATUS[langKey()], C=CONF[langKey()];
    el.innerHTML=rows.map(r=>{
      const d=diagnosisText(r);
      const pct=Math.round(r.pct*100);
      return `<div class="diagnosis-card">
        <div class="diagnosis-card-head"><div class="diagnosis-card-title">${r.skill}</div><span class="diagnosis-status ${r.statusKey}">${S[r.statusKey]}</span></div>
        <div class="diagnosis-line"><strong>${d.what}</strong></div>
        <div class="diagnosis-line"><strong>${L.where}:</strong> ${d.where.replace(L.where+": ","")}</div>
        <span class="diagnosis-evidence">${L.evidence}: ${r.correct}/${r.total} (${pct}%)</span>
        <div class="diagnosis-confidence">${L.confidence}: ${C[r.confidence]}</div>
        <div class="diagnosis-line"><strong>${L.next}:</strong> ${d.next}</div>
      </div>`;
    }).join("");
  }

  function renderAnalysisV063(){
    const a=buildV063Analysis(), L=T[langKey()];
    state.lastOverall=a.overall; state.targetSkillKey=a.targetSkillKey;
    setText("analysisScore",a.score); setText("analysisTotal",a.total);
    setText("diagnosisTitle",L.diagnosisTitle); setText("diagnosisIntro",L.diagnosisIntro);
    renderAnalysisList("analysisStrengths",a.strengths,ui[langKey()].noStrengths);
    renderAnalysisList("analysisDeveloping",a.developing,ui[langKey()].noDeveloping);
    renderAnalysisList("analysisSupport",a.support,ui[langKey()].noSupport);
    renderDiagnosisCards(a.rows);
    const target=a.targetSkill;
    const scoreText=langKey()==="en"?`BODHA used ${a.total} evidence points. ${a.score} were correct. This profile guides the learning path; it is not a school mark.`:langKey()==="te"?`BODHA ${a.total} evidence points ని చూసింది. ${a.score} correct. ఈ profile learning path ని guide చేస్తుంది — ఇది school mark కాదు.`:`BODHA ${a.total} evidence points ని use చేసింది. ${a.score} correct. ఈ profile learning path ని guide చేస్తుంది — ఇది school mark కాదు.`;
    setText("analysisRecommendation",`${scoreText} ${ui[langKey()].nextDescriptions[a.overall]}`);
    setText("analysisTargetLabel",ui[langKey()].targetLabel); setText("analysisTargetSkill",target);
  }

  // Replace the adaptive selector so extra questions are genuinely targeted.
  window.chooseAdaptiveDiagnosticQuestionV063=function(){
    const by={}; SKILLS.forEach(k=>by[k]=[]);
    (state.answers||[]).forEach(a=>{if(by[a.skillKey])by[a.skillKey].push(a);});
    const ranked=SKILLS.map(k=>{
      const arr=by[k], n=arr.length, pct=n?arr.filter(x=>x.correct).length/n:0;
      let need=0;
      if(n===0) need=100;
      else if(n===1) need=90;
      else if(pct<0.5) need=80;
      else if(pct<1) need=70;
      else need=0;
      return {k,n,pct,need};
    }).sort((a,b)=>b.need-a.need || a.n-b.n);
    const target=ranked.find(r=>r.need>0);
    if(!target)return null;
    const shared=window.BODHA_EVIDENCE_SHARED;
    return (shared?.richerPractice?.[target.k]||[]).find(q=>!state.diagnosticUsedIds.has(q.id)) || null;
  };
  // Replace the diagnostic entry point with the balanced baseline.
  $("beginDiagnostic").onclick=startV063Diagnostic;

  // Replace the Continue behavior so the diagnostic always reaches at least 16 baseline questions,
  // then asks up to four targeted questions when a skill is still uncertain or mixed.
  $("nextQuestion").onclick=function(){
    if(!state.currentAnswered)return;
    const atEnd=state.currentQ>=state.diagnosticQueue.length-1;
    if(!atEnd){state.currentQ++;state.currentChoice=null;state.currentAnswered=false;renderEvidenceDiagnostic();return;}
    const answered=state.answers.length;
    const follow=window.chooseAdaptiveDiagnosticQuestionV063();
    if(answered<16){
      // Baseline should already be 16; this guard keeps the flow safe if a question was skipped.
      state.currentQ++; state.currentChoice=null; state.currentAnswered=false; renderEvidenceDiagnostic(); return;
    }
    if(answered<20 && follow){
      state.diagnosticQueue.push(window.BODHA_EVIDENCE_SHARED.cloneQuestion(follow,state.diagnosticQueue.length));
      state.diagnosticUsedIds.add(follow.id); state.currentQ++; state.currentChoice=null; state.currentAnswered=false; state.diagnosticPhase="adaptive"; renderEvidenceDiagnostic(); return;
    }
    show("screen-analysis"); renderAnalysisV063();
  };

  // Replace the analysis screen's continuation with the new diagnosis-driven path.
  $("analysisContinue").onclick=()=>{ show("screen-results"); showResults(); };
  window.buildAnalysis=buildV063Analysis;
  window.showAnalysis=renderAnalysisV063;
  window.showEvidenceAnalysis=renderAnalysisV063;
  // v0.7.1: expose the authoritative diagnostic renderer so the global language controller can
  // redraw the active question directly, avoiding legacy refresh-chain language drift.
  window.BODHA_RENDER_DIAGNOSTIC = renderEvidenceDiagnostic;

  const oldRefresh=window.refreshVisibleScreen;
  window.refreshVisibleScreen=function(){
    applyLanguage();
    const screen=visibleScreen(); if(!screen)return;
    if(screen.id==="screen-diagnostic"){renderEvidenceDiagnostic();}
    else if(screen.id==="screen-analysis"){renderAnalysisV063();}
    else if(screen.id==="screen-results"){showResults();}
    else if(screen.id==="screen-lesson"){renderLesson();}
    else if(screen.id==="screen-practice"){updateEvidencePracticeUI();}
    else if(screen.id==="screen-practice-summary"){showEvidencePracticeSummary();}
  };


  // Results / Learning Map should consume the same diagnosis model used on the analysis screen.
  window.showResults=function(){
    const a=buildV063Analysis();
    const L=ui[langKey()];
    state.lastOverall=a.overall; state.targetSkillKey=a.targetSkillKey;
    setText("resultTitle",L.resultTitles[a.overall]);
    setText("resultSummary",L.summary(a.score,a.total));
    $("skillMap").innerHTML=a.rows.map(r=>`<div class="skill-row"><strong>${r.skill}</strong><div class="meter"><span class="${r.statusKey}" style="width:${Math.max(r.pct*100,8)}%"></span></div><span class="status ${r.statusKey}">${STATUS[langKey()][r.statusKey]}</span></div>`).join("");
    setText("nextHeading",L.nextHeadings[a.overall]); setText("nextDescription",L.nextDescriptions[a.overall]); setText("learningTargetLabel",L.targetLabel); setText("learningTargetSkill",a.targetSkill);
    $("startLearning").onclick=()=>startLesson(a.targetSkillKey || SKILLS[0]);
  };

  // Make the page wording reflect the new evidence-first diagnostic.
  setText("diagTitle",langKey()==="en"?"Let's build your starting evidence.":langKey()==="te"?"నీ starting evidence ని build చేద్దాం.":"నీ starting evidence ని build చేద్దాం.");
})();
