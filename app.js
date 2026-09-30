/* BODHA v0.5.1
   Global language-state controller.
   One learning state -> one content ID -> one localized rendering.
*/

const $ = (id) => document.getElementById(id);
const LANGS = ["en", "te", "hy"];

let state = {
  currentQ: 0,
  answers: [],
  selectedLang: "en",
  currentLesson: 0,
  lastOverall: "support",
  currentChoice: null,
  currentAnswered: false,
  targetSkillKey: null,
  mastery: {},
  practiceCompleted: false,
  lessonAttempts: []
};

try {
  const saved = localStorage.getItem("bodhaLanguage");
  if (LANGS.includes(saved)) state.selectedLang = saved;
} catch (_) {}

const langKey = () => LANGS.includes(state.selectedLang) ? state.selectedLang : "en";

function localized(value) {
  if (value && typeof value === "object" && ("en" in value || "te" in value || "hy" in value)) {
    return value[langKey()] ?? value.en ?? value.te ?? value.hy ?? "";
  }
  return value ?? "";
}

const ui = {
  en: {
    tagline:"Your Learning Buddy", eyebrowHome:"CLASS 8 • MATHEMATICS • SEMESTER 1", homeTitle:"Let's understand mathematics,<br>not just memorize it.", homeIntro:"BODHA will first understand what you already know — then guide your learning.", meet:"Meet BODHA →",
    welcomeEyebrow:"YOUR FIRST BODHA SESSION", welcomeTitle:"Hi! I'm BODHA.", welcomeText:"Before I teach Chapter 2, I want to understand what you already know.", promiseTitle:"No marks. No pressure.", promiseText:"Your mistakes help me decide how to teach you.", begin:"Let's Begin →",
    diagEyebrow:"BODHA DIAGNOSTIC", diagTitle:"Let's see what you know.", continue:"Continue →",
    analysisEyebrow:"YOUR BODHA ANALYSIS", analysisTitle:"Now I know how to help you.", analysisIntro:"Your answers give BODHA a starting point — not a school mark. Let's see what you already understand and where we can build next.", scoreLabel:"Diagnostic score", correctLabel:"correct", ofLabel:"of", scoreNote:"BODHA uses this to personalise your next lesson.", strengthsTitle:"What you're doing well", developingTitle:"Skills to strengthen", supportTitle:"Skills that need more support", noStrengths:"You're still building these skills — and that's okay. BODHA will start with the basics and build from there.", noDeveloping:"No middle-level gaps detected in this diagnostic.", noSupport:"No major support areas detected. Great foundation!", recommendationTitle:"BODHA's recommendation", continueToLearning:"Continue to my Learning Path →", targetLabel:"BODHA will focus on", targetLabel:"BODHA will focus on",
    mapEyebrow:"YOUR BODHA LEARNING MAP", mapTitle:"I know where to start.", summary:(score,total)=>`You answered ${score} of ${total} diagnostic questions correctly. This is not a school mark — it is BODHA's first learning map for you.`,
    statuses:{strong:"Strong", developing:"Developing", support:"Needs support"}, resultTitles:{strong:"You're ready for the challenge!", developing:"Let's strengthen your foundation.", support:"We'll build this step by step."}, nextHeadings:{strong:"Your next step: application & challenge", developing:"Your next step: targeted practice", support:"Your next step: foundation builder"}, nextDescriptions:{strong:"BODHA will reduce repetition and focus on reasoning and real-life applications.", developing:"BODHA will focus on the skills where you need more practice.", support:"BODHA will begin with simple ideas and build confidence one step at a time."}, startPath:"Start My Learning Path →", lessonEyebrow:"Chapter 2 • Personalised Lesson", footer:"UNDERSTAND • PRACTICE • MASTER", close:"Great work! BODHA v0.5.1 is ready for your next lesson."
  },
  te: {
    tagline:"నీ Learning Buddy", eyebrowHome:"8వ తరగతి • గణితం • సెమిస్టర్ 1", homeTitle:"గణితాన్ని కేవలం<br>కంఠస్థం చేయకుండా అర్థం చేసుకుందాం.", homeIntro:"ముందుగా నీకు ఇప్పటికే ఏమి తెలుసో BODHA తెలుసుకుంటుంది — తర్వాత నీ learning ని guide చేస్తుంది.", meet:"BODHA ని కలుద్దాం →",
    welcomeEyebrow:"నీ మొదటి BODHA SESSION", welcomeTitle:"హాయ్! నేను BODHA.", welcomeText:"Chapter 2 నేర్పించే ముందు, నీకు ఇప్పటికే ఏమి తెలుసో నేను తెలుసుకోవాలి.", promiseTitle:"Marks లేవు. Pressure లేదు.", promiseText:"నీ mistakes ని చూసి, నిన్ను ఎలా teach చేయాలో BODHA నిర్ణయిస్తుంది.", begin:"ప్రారంభిద్దాం →",
    diagEyebrow:"BODHA DIAGNOSTIC", diagTitle:"నీకు ఏమి తెలుసో చూద్దాం.", continue:"కొనసాగిద్దాం →",
    analysisEyebrow:"నీ BODHA ANALYSIS", analysisTitle:"ఇప్పుడు నీకు ఎలా help చేయాలో నాకు తెలుసు.", analysisIntro:"నీ answers ఆధారంగా BODHA నీ learning కి ఒక starting point ని గుర్తించింది — ఇది school mark కాదు. నీకు ఇప్పటికే ఏమి అర్థమైందో, ఇంకా ఎక్కడ practice అవసరమో చూద్దాం.", scoreLabel:"Diagnostic score", correctLabel:"సరైన సమాధానాలు", ofLabel:"లో", scoreNote:"నీ next lesson ని personalise చేయడానికి BODHA దీన్ని ఉపయోగిస్తుంది.", strengthsTitle:"నీకు బాగా అర్థమైన skills", developingTitle:"ఇంకా practice చేయాల్సిన skills", supportTitle:"మరింత support అవసరమైన skills", noStrengths:"ఈ skills ఇంకా build అవుతున్నాయి — పర్లేదు. BODHA basics నుంచి step by step గా నేర్పిస్తుంది.", noDeveloping:"ఈ diagnostic లో మధ్యస్థంగా ఉన్న gaps కనిపించలేదు.", noSupport:"ముఖ్యమైన support areas ఏవీ కనిపించలేదు. చాలా మంచి foundation!", recommendationTitle:"BODHA సూచన", continueToLearning:"నా Learning Path కి కొనసాగుదాం →", targetLabel:"BODHA focus చేసే skill",
    mapEyebrow:"నీ BODHA LEARNING MAP", mapTitle:"ఎక్కడి నుంచి start చేయాలో నాకు తెలుసు.", summary:(score,total)=>`${total} diagnostic questions లో ${score} correct గా answer చేశావు. ఇది school mark కాదు — ఇది నీ కోసం BODHA తయారు చేస్తున్న మొదటి learning map.`,
    statuses:{strong:"బాగా అర్థమైంది", developing:"ఇంకా అభివృద్ధి కావాలి", support:"మరింత support కావాలి"}, resultTitles:{strong:"Challenge కి నువ్వు ready!", developing:"నీ foundation ని ఇంకా strong చేద్దాం.", support:"Step by step ముందుకు వెళ్దాం."}, nextHeadings:{strong:"నీ next step: application & challenge", developing:"నీ next step: targeted practice", support:"నీ next step: foundation builder"}, nextDescriptions:{strong:"BODHA repetition తగ్గించి, reasoning మరియు real-life applications పై focus చేస్తుంది.", developing:"నీకు మరింత practice అవసరమైన skills పై BODHA focus చేస్తుంది.", support:"Simple ideas తో ప్రారంభించి, step by step నీ confidence build చేస్తాం."}, startPath:"నా Learning Path ప్రారంభించు →", lessonEyebrow:"Chapter 2 • నీ కోసం Personalised Lesson", footer:"అర్థం చేసుకో • Practice చేయి • Master చేయి", close:"చాలా బాగా చేశావు! BODHA v0.4 నీ next lesson కి ready గా ఉంది."
  },
  hy: {
    tagline:"నీ Learning Buddy", eyebrowHome:"8వ తరగతి • గణితం • సెమిస్టర్ 1", homeTitle:"గణితాన్ని కేవలం<br>memorize చేయకుండా understand చేద్దాం.", homeIntro:"ముందుగా నీకు ఏ concepts clear గా ఉన్నాయో BODHA తెలుసుకుంటుంది — తర్వాత నీకు సరిపోయే learning path ని guide చేస్తుంది.", meet:"BODHA ని కలుద్దాం →",
    welcomeEyebrow:"నీ మొదటి BODHA SESSION", welcomeTitle:"హాయ్! నేను BODHA.", welcomeText:"Chapter 2 నేర్పించే ముందు, నీకు ఏం తెలుసో, ఎక్కడ support కావాలో నేను తెలుసుకుంటాను.", promiseTitle:"Marks కోసం కాదు. Pressure కూడా లేదు.", promiseText:"నీ mistakes కూడా నాకు useful information. వాటిని బట్టి నీకు ఎలా నేర్పాలో BODHA నిర్ణయిస్తుంది.", begin:"ప్రారంభిద్దాం →",
    diagEyebrow:"BODHA DIAGNOSTIC", diagTitle:"నీకు ఏ concepts clear గా ఉన్నాయో చూద్దాం.", continue:"కొనసాగిద్దాం →",
    analysisEyebrow:"నీ BODHA ANALYSIS", analysisTitle:"ఇప్పుడు నీకు ఎక్కడి నుంచి start చేయాలో BODHA కి తెలుసు.", analysisIntro:"నీ answers ని చూసి BODHA నీ strengths, ఇంకా practice కావాల్సిన skills ని గుర్తించింది. ఇది school mark కాదు — నీకు సరైన starting point ని కనుక్కోవడానికి చేసే check.", scoreLabel:"Diagnostic score", correctLabel:"correct", ofLabel:"లో", scoreNote:"నీ next lesson ని నీ current understanding కి సరిపోయేలా personalise చేయడానికి BODHA దీన్ని use చేస్తుంది.", strengthsTitle:"నీకు ఇప్పటికే బాగా అర్థమైన skills", developingTitle:"ఇంకా practice చేస్తే improve అయ్యే skills", supportTitle:"కొంచెం ఎక్కువ support కావాల్సిన skills", noStrengths:"ఇంకా ఏ skill కూడా strong గా confirm కాలేదు — పర్లేదు. BODHA basics నుంచి step by step గా build చేస్తుంది.", noDeveloping:"ఈ diagnostic లో మధ్యస్థంగా ఉన్న gaps కనిపించలేదు.", noSupport:"ప్రస్తుతం ఎక్కువ support అవసరమైన skills కనిపించలేదు. మంచి foundation ఉంది!", recommendationTitle:"BODHA సూచన", continueToLearning:"నా Learning Path కి వెళ్దాం →", targetLabel:"BODHA ముందుగా focus చేసే skill",
    mapEyebrow:"నీ BODHA LEARNING MAP", mapTitle:"నీకు ఎక్కడి నుంచి start చేయాలో ఇప్పుడు clear గా ఉంది.", summary:(score,total)=>`${total} diagnostic questions లో ${score} correct గా answer చేశావు. ఇది school mark కాదు — నీకు ఏం తెలుసో అర్థం చేసుకుని, next ఏం నేర్చుకోవాలో నిర్ణయించడానికి BODHA రూపొందించిన first learning map.`,
    statuses:{strong:"Strong evidence", developing:"ఇంకా practice కావాలి", support:"మరింత support కావాలి"}, resultTitles:{strong:"ఇప్పుడు challenge కి వెళ్లొచ్చు!", developing:"ముందుగా foundation ని ఇంకాస్త strong చేద్దాం.", support:"ముందుగా basics ని step by step గా strong చేద్దాం."}, nextHeadings:{strong:"నీ next step: application & challenge", developing:"నీ next step: targeted practice", support:"నీ next step: foundation building"}, nextDescriptions:{strong:"నీకు ఇప్పటికే clear గా ఉన్న ideas ని మళ్లీ repeat చేయకుండా, reasoning మరియు real-life applications పై BODHA focus చేస్తుంది.", developing:"ఇంకా practice అవసరమైన skills ని BODHA ముందుగా target చేసి, practice తర్వాత మళ్లీ check చేస్తుంది.", support:"Basics నుంచి start చేసి, ప్రతి idea ని small steps లో explain చేసి, అర్థమయ్యే వరకు practice చేయిస్తాం."}, startPath:"నా Learning Path ప్రారంభిద్దాం →", lessonEyebrow:"Chapter 2 • నీ కోసం Personalised Lesson", footer:"అర్థం చేసుకో • Practice చేయి • Master చేయి", close:"చాలా బాగా చేశావు! BODHA నీ next lesson కి ready గా ఉంది."
  }
};

function setText(id, value){ const el=$(id); if(el) el.textContent=value; }
function setHTML(id, value){ const el=$(id); if(el) el.innerHTML=value; }

function applyLanguage(){
  const L=ui[langKey()];
  setText("tagline",L.tagline); setText("homeEyebrow",L.eyebrowHome); setHTML("homeTitle",L.homeTitle); setText("homeIntro",L.homeIntro); setText("startBtn",L.meet);
  setText("welcomeEyebrow",L.welcomeEyebrow); setText("welcomeTitle",L.welcomeTitle); setText("welcomeText",L.welcomeText); setText("promiseTitle",L.promiseTitle); setText("promiseText",L.promiseText); setText("beginDiagnostic",L.begin);
  setText("diagEyebrow",L.diagEyebrow); setText("diagTitle",L.diagTitle); setText("nextQuestion",L.continue);
  setText("analysisEyebrow",L.analysisEyebrow); setText("analysisTitle",L.analysisTitle); setText("analysisIntro",L.analysisIntro); setText("analysisScoreLabel",L.scoreLabel); setText("analysisCorrectLabel",L.correctLabel); setText("analysisOfLabel",L.ofLabel); setText("analysisScoreNote",L.scoreNote); setText("analysisStrengthsTitle",L.strengthsTitle); setText("analysisDevelopingTitle",L.developingTitle); setText("analysisSupportTitle",L.supportTitle); setText("analysisRecommendationTitle",L.recommendationTitle); setText("analysisContinue",L.continueToLearning);
  setText("mapEyebrow",L.mapEyebrow); setText("mapTitle",L.mapTitle); setText("startLearning",L.startPath);
  setText("lessonProgressLabel",L.lessonEyebrow); setText("lessonNext",L.continue); setText("footer",L.footer);
  document.querySelectorAll(".lang").forEach(btn=>{
    const active=btn.dataset.lang===langKey();
    btn.classList.toggle("active",active);
    btn.setAttribute("aria-pressed",String(active));
  });
  document.documentElement.lang=langKey()==="te"?"te":"en";
}

function visibleScreen(){ return [...document.querySelectorAll(".screen")].find(s=>!s.classList.contains("hidden")); }
function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
  const target=$(id); if(target) target.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}

function refreshVisibleScreen(){
  

const adaptiveLessons = {
  "equation-recognition": {
    skill:{en:"Equation recognition",te:"సమీకరణాన్ని గుర్తించడం",hy:"Equation recognition"},
    section:{en:"Targeted lesson • Equation recognition",te:"Targeted lesson • సమీకరణాన్ని గుర్తించడం",hy:"Targeted lesson • Equation recognition"},
    title:{en:"What makes something an equation?",te:"ఏది equation అవుతుంది?",hy:"ఏది equation అవుతుంది?"},
    body:{
      en:`<p>An equation says that two expressions have the <strong>same value</strong>. Look for the equality sign <strong>=</strong>.</p><div class="example">5x + 2 = 12</div><p>The left and right sides are connected by equality.</p>`,
      te:`<p>Equation అంటే రెండు expressions యొక్క <strong>value సమానం</strong> అని చెప్పే statement. ఇందులో <strong>=</strong> గుర్తు ఉంటుంది.</p><div class="example">5x + 2 = 12</div><p>= గుర్తు రెండు sides మధ్య equality ని చూపిస్తుంది.</p>`,
      hy:`<p>Equation అంటే two expressions యొక్క <strong>value equal</strong> అని చెప్పే statement. ఇందులో <strong>=</strong> sign ఉంటుంది.</p><div class="example">5x + 2 = 12</div><p>= sign రెండు sides మధ్య equality ని show చేస్తుంది.</p>`
    },
    question:{prompt:{en:"Which is an equation?",te:"వీటిలో ఏది equation?",hy:"వీటిలో ఏది equation?"},placeholder:{en:"Type A, B, C or D",te:"A, B, C లేదా D టైప్ చేయి",hy:"A, B, C లేదా D type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"B",good:{en:"Exactly! 🎉 B has an equality sign, so it is an equation.",te:"సరిగ్గా చెప్పావు! 🎉 B లో = గుర్తు ఉంది కాబట్టి అది equation.",hy:"Exactly! 🎉 B లో = sign ఉంది, కాబట్టి అది equation."},tryAgain:{en:"Look for the = sign. Which option has it?",te:"= గుర్తు కోసం చూడు. ఏ option లో అది ఉంది?",hy:"= sign కోసం చూడు. ఏ option లో అది ఉంది?"}}
  },
  "lhs-rhs": {
    skill:{en:"LHS & RHS",te:"LHS & RHS",hy:"LHS & RHS"}, section:{en:"Targeted lesson • LHS & RHS",te:"Targeted lesson • LHS & RHS",hy:"Targeted lesson • LHS & RHS"}, title:{en:"Read an equation from left to right",te:"Equation ని ఎడమ నుంచి కుడికి చదుద్దాం",hy:"Equation ని left నుంచి right కి చదుద్దాం"},
    body:{en:`<p>In an equation, <strong>LHS</strong> is everything on the left of = and <strong>RHS</strong> is everything on the right.</p><div class="example">2x − 3 = 7</div><p>So LHS = 2x − 3 and RHS = 7.</p>`,te:`<p>Equation లో <strong>LHS</strong> అంటే = కి ఎడమ వైపు ఉన్నది. <strong>RHS</strong> అంటే = కి కుడి వైపు ఉన్నది.</p><div class="example">2x − 3 = 7</div><p>కాబట్టి LHS = 2x − 3, RHS = 7.</p>`,hy:`<p>Equation లో <strong>LHS</strong> అంటే = కి left side లో ఉన్నది. <strong>RHS</strong> అంటే = కి right side లో ఉన్నది.</p><div class="example">2x − 3 = 7</div><p>So LHS = 2x − 3, RHS = 7.</p>`},
    question:{prompt:{en:"In 2x − 3 = 7, type the RHS.",te:"2x − 3 = 7 లో RHS ని టైప్ చేయి.",hy:"2x − 3 = 7 లో RHS ని type చేయి."},placeholder:{en:"Type the RHS",te:"RHS టైప్ చేయి",hy:"RHS type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"7",good:{en:"Exactly! 🎉 The RHS is 7.",te:"సరిగ్గా చెప్పావు! 🎉 RHS = 7.",hy:"Exactly! 🎉 RHS = 7."},tryAgain:{en:"RHS is on the right side of =. What is written there?",te:"RHS అంటే = కి కుడి వైపు. అక్కడ ఏమి ఉంది?",hy:"RHS అంటే = కి right side. అక్కడ ఏమి ఉంది?"}}
  },
  "simple-equations": {
    skill:{en:"Simple equations",te:"సరళ సమీకరణాలు",hy:"Simple equations"},section:{en:"Targeted lesson • Simple equations",te:"Targeted lesson • సరళ సమీకరణాలు",hy:"Targeted lesson • Simple equations"},title:{en:"Undo the operation",te:"Operation ని ఎలా undo చేయాలి?",hy:"Operation ని ఎలా undo చేయాలి?"},
    body:{en:`<p>To solve <strong>x + 5 = 12</strong>, undo +5 by subtracting 5 from both sides.</p><div class="example">x + 5 − 5 = 12 − 5</div><p>So x = 7.</p>`,te:`<p><strong>x + 5 = 12</strong> solve చేయడానికి +5 ని undo చేయాలి. అందుకే రెండు sides నుంచి 5 subtract చేస్తాం.</p><div class="example">x + 5 − 5 = 12 − 5</div><p>అందుకే x = 7.</p>`,hy:`<p><strong>x + 5 = 12</strong> solve చేయడానికి +5 ని undo చేయాలి. So both sides నుంచి 5 subtract చేస్తాం.</p><div class="example">x + 5 − 5 = 12 − 5</div><p>Therefore x = 7.</p>`},
    question:{prompt:{en:"If x + 5 = 12, what is x?",te:"x + 5 = 12 అయితే x విలువ ఎంత?",hy:"x + 5 = 12 అయితే x value ఎంత?"},placeholder:{en:"Type x",te:"x విలువ టైప్ చేయి",hy:"x value type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"7",good:{en:"Exactly! 🎉 x = 7.",te:"సరిగ్గా చెప్పావు! 🎉 x = 7.",hy:"Exactly! 🎉 x = 7."},tryAgain:{en:"Undo +5. What happens if you subtract 5 from both sides?",te:"+5 ని undo చేయాలి. రెండు sides నుంచి 5 తీసేస్తే ఏమవుతుంది?",hy:"+5 ని undo చేయాలి. Both sides నుంచి 5 subtract చేస్తే ఏమవుతుంది?"}}
  },
  "balance-principle": {
    skill:{en:"Balance principle",te:"సమతుల్యత సూత్రం",hy:"Balance principle"},section:{en:"Targeted lesson • Balance principle",te:"Targeted lesson • సమతుల్యత సూత్రం",hy:"Targeted lesson • Balance principle"},title:{en:"Keep both sides balanced",te:"రెండు sides ని balance లో ఉంచుదాం",hy:"Both sides ని balance లో ఉంచుదాం"},
    body:{en:`<p>An equation behaves like a balance. If you add or subtract something on one side, do the <strong>same operation</strong> on the other side.</p><div class="example">x + 4 = 10<br>−4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;−4</div>`,te:`<p>Equation ఒక balance లాంటిది. ఒక side కి ఏదైనా add లేదా subtract చేస్తే, <strong>అదే operation</strong> మరో side లో కూడా చేయాలి.</p><div class="example">x + 4 = 10<br>−4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;−4</div>`,hy:`<p>Equation ఒక balance లాంటిది. One side కి add లేదా subtract చేస్తే, <strong>same operation</strong> other side లో కూడా చేయాలి.</p><div class="example">x + 4 = 10<br>−4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;−4</div>`},
    question:{prompt:{en:"If you add 3 to the left side, what should you do to the right side?",te:"Left side కి 3 add చేస్తే, right side కి ఏమి చేయాలి?",hy:"Left side కి 3 add చేస్తే, right side కి ఏమి చేయాలి?"},placeholder:{en:"Type: add 3",te:"‘3 కలపాలి’ అని టైప్ చేయి",hy:"‘add 3’ అని type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"add 3",good:{en:"Exactly! 🎉 The same operation keeps the equation balanced.",te:"సరిగ్గా చెప్పావు! 🎉 అదే operation చేస్తే equation balance లో ఉంటుంది.",hy:"Exactly! 🎉 Same operation చేస్తే equation balanced గా ఉంటుంది."},tryAgain:{en:"Remember the balance rule: whatever you do to one side, do the same to the other.",te:"Balance rule గుర్తుంచుకో: ఒక side కి ఏం చేస్తే, అదే మరో side కి కూడా చేయాలి.",hy:"Balance rule గుర్తుంచుకో: one side కి ఏం చేస్తే, same thing other side కి కూడా చేయాలి."}}
  },
  "variables-both-sides": {
    skill:{en:"Variables on both sides",te:"రెండు వైపులా చరరాశి",hy:"Variables on both sides"},section:{en:"Targeted lesson • Variables on both sides",te:"Targeted lesson • రెండు వైపులా చరరాశి",hy:"Targeted lesson • Variables on both sides"},title:{en:"Spot the variable on both sides",te:"రెండు sides లో variable ని గుర్తించు",hy:"Both sides లో variable ని గుర్తించు"},
    body:{en:`<p>Look at both sides of the equality sign. If <strong>x</strong> appears on each side, the variable is on both sides.</p><div class="example">2x − 3 = x + 2</div>`,te:`<p>= గుర్తుకు రెండు వైపులా చూడు. రెండు sides లో <strong>x</strong> ఉంటే variable రెండు వైపులా ఉన్నట్టే.</p><div class="example">2x − 3 = x + 2</div>`,hy:`<p>= sign కి both sides చూడు. రెండు sides లో <strong>x</strong> కనిపిస్తే variable both sides లో ఉంది.</p><div class="example">2x − 3 = x + 2</div>`},
    question:{prompt:{en:"In 2x − 3 = x + 2, is x on both sides? Type yes or no.",te:"2x − 3 = x + 2 లో x రెండు sides లో ఉందా? yes లేదా no టైప్ చేయి.",hy:"2x − 3 = x + 2 లో x both sides లో ఉందా? yes లేదా no type చేయి."},placeholder:{en:"yes / no",te:"yes / no",hy:"yes / no"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"yes",good:{en:"Exactly! 🎉 x appears on both sides.",te:"సరిగ్గా చెప్పావు! 🎉 x రెండు sides లో ఉంది.",hy:"Exactly! 🎉 x both sides లో ఉంది."},tryAgain:{en:"Look at the left and right sides separately. Can you find x on each side?",te:"Left, right sides ని విడిగా చూడు. రెండింటిలో x కనిపిస్తుందా?",hy:"Left, right sides ని separately చూడు. రెండింటిలో x ఉందా?"}}
  },
  "word-to-equation": {
    skill:{en:"Word-to-equation",te:"పదాలను సమీకరణంగా మార్చడం",hy:"Word-to-equation"},section:{en:"Targeted lesson • Word-to-equation",te:"Targeted lesson • పదాలను సమీకరణంగా మార్చడం",hy:"Targeted lesson • Word-to-equation"},title:{en:"Turn words into operations",te:"Words ని operations గా మార్చుదాం",hy:"Words ని operations గా మార్చుదాం"},
    body:{en:`<p>Words tell us what operation to use. <strong>“4 more than x”</strong> means start with x and add 4.</p><div class="example">x + 4</div>`,te:`<p>Words ఏ operation చేయాలో చెబుతాయి. <strong>“x కంటే 4 ఎక్కువ”</strong> అంటే x కి 4 కలపాలి.</p><div class="example">x + 4</div>`,hy:`<p>Words మనకి operation చెబుతాయి. <strong>“4 more than x”</strong> అంటే x కి 4 add చేయాలి.</p><div class="example">x + 4</div>`},
    question:{prompt:{en:"A number is 4 more than x. Write the expression.",te:"ఒక సంఖ్య x కంటే 4 ఎక్కువ. Expression రాయండి.",hy:"ఒక number x కంటే 4 ఎక్కువ. Expression type చేయి."},placeholder:{en:"Type x + 4",te:"x + 4 టైప్ చేయి",hy:"x + 4 type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"x+4",good:{en:"Exactly! 🎉 “4 more” means add 4: x + 4.",te:"సరిగ్గా చెప్పావు! 🎉 “4 ఎక్కువ” అంటే 4 కలపాలి: x + 4.",hy:"Exactly! 🎉 “4 more” అంటే 4 add చేయాలి: x + 4."},tryAgain:{en:"“More than” means add. Start with x and add 4.",te:"“ఎక్కువ” అంటే కలపాలి. x తో start చేసి 4 కలపాలి.",hy:"“More than” అంటే add. x తో start చేసి 4 add చేయాలి."}}
  },
  "simplification": {
    skill:{en:"Simplification",te:"సరళీకరణ",hy:"Simplification"},section:{en:"Targeted lesson • Simplification",te:"Targeted lesson • సరళీకరణ",hy:"Targeted lesson • Simplification"},title:{en:"Distribute carefully",te:"Brackets ని జాగ్రత్తగా simplify చేద్దాం",hy:"Brackets ని carefully simplify చేద్దాం"},
    body:{en:`<p>Use the distributive idea: multiply the number outside the bracket by <strong>every term</strong> inside.</p><div class="example">3(x + 2) = 3x + 6</div>`,te:`<p>Bracket బయట ఉన్న number ని లోపల ఉన్న <strong>ప్రతి term</strong> తో multiply చేయాలి.</p><div class="example">3(x + 2) = 3x + 6</div>`,hy:`<p>Bracket బయట ఉన్న number ని inside ఉన్న <strong>every term</strong> తో multiply చేయాలి.</p><div class="example">3(x + 2) = 3x + 6</div>`},
    question:{prompt:{en:"Simplify 3(x + 2).",te:"3(x + 2) ని simplify చేయి.",hy:"3(x + 2) ని simplify చేయి."},placeholder:{en:"Type 3x + 6",te:"3x + 6 టైప్ చేయి",hy:"3x + 6 type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"3x+6",good:{en:"Exactly! 🎉 3 multiplies both x and 2, giving 3x + 6.",te:"సరిగ్గా చెప్పావు! 🎉 3 ని x, 2 రెండింటితో multiply చేస్తే 3x + 6 వస్తుంది.",hy:"Exactly! 🎉 3 ని x, 2 రెండింటితో multiply చేస్తే 3x + 6 వస్తుంది."},tryAgain:{en:"Multiply 3 by both terms inside the bracket. What do you get?",te:"Bracket లోని రెండు terms తో 3 ని multiply చేయి. ఏమి వస్తుంది?",hy:"Bracket లోని both terms తో 3 multiply చేయి. ఏమి వస్తుంది?"}}
  },
  "fractions-equations": {
    skill:{en:"Fractions in equations",te:"సమీకరణాల్లో భిన్నాలు",hy:"Fractions in equations"},section:{en:"Targeted lesson • Fractions in equations",te:"Targeted lesson • సమీకరణాల్లో భిన్నాలు",hy:"Targeted lesson • Fractions in equations"},title:{en:"Use the LCM to clear denominators",te:"Denominators ని తొలగించడానికి LCM ఉపయోగిద్దాం",hy:"Denominators clear చేయడానికి LCM use చేద్దాం"},
    body:{en:`<p>When several fractions appear, multiplying both sides by the <strong>LCM of the denominators</strong> can remove the denominators.</p><div class="example">LCM → multiply both sides → simplify</div>`,te:`<p>చాలా fractions ఉన్నప్పుడు, denominators యొక్క <strong>LCM</strong> తో రెండు sides ని multiply చేస్తే denominators తొలగించవచ్చు.</p><div class="example">LCM → రెండు sides కి multiply → simplify</div>`,hy:`<p>Several fractions ఉన్నప్పుడు, denominators యొక్క <strong>LCM</strong> తో both sides ని multiply చేస్తే denominators clear అవుతాయి.</p><div class="example">LCM → both sides multiply → simplify</div>`},
    question:{prompt:{en:"What is a useful first step when several fractions have denominators 2 and 3?",te:"Denominators 2, 3 ఉన్న fractions ఎక్కువగా ఉంటే useful first step ఏమిటి?",hy:"Denominators 2, 3 ఉన్న several fractions ఉంటే useful first step ఏమిటి?"},placeholder:{en:"Type LCM 6",te:"LCM 6 అని టైప్ చేయి",hy:"LCM 6 అని type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"6",good:{en:"Exactly! 🎉 The LCM of 2 and 3 is 6, which can clear the denominators.",te:"సరిగ్గా చెప్పావు! 🎉 2, 3 యొక్క LCM = 6. ఇది denominators ని తొలగించడంలో help చేస్తుంది.",hy:"Exactly! 🎉 2, 3 యొక్క LCM = 6. ఇది denominators ని clear చేయడంలో help చేస్తుంది."},tryAgain:{en:"Find the least common multiple of 2 and 3.",te:"2, 3 యొక్క కనిష్ఠ సామాన్య గుణిజం కనుక్కో.",hy:"2, 3 యొక్క LCM కనుక్కో."}}
  }
};

applyLanguage();
  const screen=visibleScreen();
  if(!screen) return;
  switch(screen.id){
    case "screen-diagnostic": renderQuestion({preserveState:true}); break;
    case "screen-analysis": if(state.answers.length) showAnalysis(); break;
    case "screen-results": if(state.answers.length) showResults(); break;
    case "screen-lesson": if(chapter2[state.currentLesson]) renderLesson(); break;
  }
}

// Single source of truth for language changes.
document.addEventListener("click",(event)=>{
  const btn=event.target.closest(".lang");
  if(!btn) return;
  const next=btn.dataset.lang;
  if(!LANGS.includes(next) || next===langKey()) return;
  state.selectedLang=next;
  try{ localStorage.setItem("bodhaLanguage",next); }catch(_){}
  refreshVisibleScreen();
});

$("startBtn").onclick=()=>show("screen-welcome");
$("beginDiagnostic").onclick=()=>{
  state.currentQ=0; state.answers=[]; state.lastOverall="support"; state.currentChoice=null; state.currentAnswered=false;
  show("screen-diagnostic"); renderQuestion();
};

function renderQuestion({preserveState=false}={}){
  const q=diagnosticQuestions[state.currentQ];
  if(!q) return;
  if(!preserveState){ state.currentChoice=null; state.currentAnswered=false; }

  setText("questionCount",`${state.currentQ+1} / ${diagnosticQuestions.length}`);
  $("diagBar").style.width=`${((state.currentQ+1)/diagnosticQuestions.length)*100}%`;
  setText("skillPill",localized(q.skill));
  setText("questionText",localized(q.q));

  const opts=q.options?.[langKey()] ?? q.options?.en ?? [];
  $("options").innerHTML=opts.map((o,i)=>`<button class="option" data-i="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join("");
  document.querySelectorAll(".option").forEach(b=>b.onclick=()=>selectAnswer(Number(b.dataset.i)));

  const previous=state.answers.find(a=>a.questionIndex===state.currentQ);
  if(previous){ state.currentChoice=previous.choice; state.currentAnswered=true; }

  document.querySelectorAll(".option").forEach(b=>{
    const i=Number(b.dataset.i);
    if(state.currentAnswered){
      b.disabled=true;
      if(i===state.currentChoice) b.classList.add(i===q.answer?"correct":"wrong");
      if(i===q.answer) b.classList.add("correct");
    }
  });

  const f=$("diagFeedback");
  if(state.currentAnswered){
    const correct=state.currentChoice===q.answer;
    f.textContent=correct?`🎉 ${localized(q.explain)}`:`${wrongFeedback()} ${localized(q.explain)}`;
    f.className=`feedback ${correct?"good":"try"}`;
    $("nextQuestion").classList.remove("hidden");
  }else{
    f.textContent=""; f.className="feedback hidden"; $("nextQuestion").classList.add("hidden");
  }
}

function wrongFeedback(){
  if(langKey()==="en") return "Good attempt! Let's look at the idea:";
  if(langKey()==="te") return "మంచి ప్రయత్నం! ఈ idea ని ఒకసారి కలిసి చూద్దాం:";
  return "Good try! ఈ idea ని ఒకసారి కలిసి చూద్దాం:";
}

function selectAnswer(choice){
  const q=diagnosticQuestions[state.currentQ];
  if(state.currentAnswered) return;
  state.currentChoice=choice; state.currentAnswered=true;
  document.querySelectorAll(".option").forEach(b=>b.disabled=true);
  const chosen=document.querySelector(`[data-i="${choice}"]`); if(chosen) chosen.classList.add(choice===q.answer?"correct":"wrong");
  const correctOption=document.querySelector(`[data-i="${q.answer}"]`); if(correctOption) correctOption.classList.add("correct");

  const record={questionIndex:state.currentQ,skillKey:q.id,choice,correct:choice===q.answer};
  const existing=state.answers.findIndex(a=>a.questionIndex===state.currentQ);
  if(existing>=0) state.answers[existing]=record; else state.answers.push(record);

  const f=$("diagFeedback");
  f.textContent=record.correct?`🎉 ${localized(q.explain)}`:`${wrongFeedback()} ${localized(q.explain)}`;
  f.className=`feedback ${record.correct?"good":"try"}`;
  $("nextQuestion").classList.remove("hidden");
}

$("nextQuestion").onclick=()=>{
  state.currentQ++;
  if(state.currentQ<diagnosticQuestions.length){ state.currentChoice=null; state.currentAnswered=false; renderQuestion(); }
  else { show("screen-analysis"); showAnalysis(); }
};

function buildAnalysis(){
  const L=ui[langKey()],groups={};
  diagnosticQuestions.forEach(q=>groups[q.id]={q,correct:0,total:0});
  state.answers.forEach(a=>{ if(groups[a.skillKey]){ groups[a.skillKey].total++; if(a.correct) groups[a.skillKey].correct++; }});
  const rows=Object.values(groups).filter(g=>g.total>0).map(g=>{
    const pct=g.correct/g.total;
    const statusKey=pct===1?"strong":pct>=.5?"developing":"support";
    return {skill:localized(g.q.skill),skillKey:g.q.id,statusKey,pct,status:L.statuses[statusKey]};
  });
  const score=state.answers.filter(a=>a.correct).length;
  const overall=score>=7?"strong":score>=4?"developing":"support";
  const priority = [...rows].sort((a,b)=>a.pct-b.pct);
  const targetSkill = priority.length ? priority[0].skill : "";
  const targetSkillKey = priority.length ? priority[0].skillKey : null;
  return {rows,strengths:rows.filter(r=>r.statusKey==="strong"),developing:rows.filter(r=>r.statusKey==="developing"),support:rows.filter(r=>r.statusKey==="support"),score,total:diagnosticQuestions.length,overall,targetSkill,targetSkillKey};
}

function renderAnalysisList(id,items,emptyText){
  const el=$(id); if(!el) return;
  if(!items.length){el.innerHTML=`<div class="analysis-empty">${emptyText}</div>`;return;}
  el.innerHTML=items.map(r=>`<div class="analysis-skill"><span>${r.skill}</span><span class="status ${r.statusKey}">${r.status}</span></div>`).join("");
}

function showAnalysis(){
  const L=ui[langKey()],a=buildAnalysis(); state.lastOverall=a.overall;
  setText("analysisScore",a.score); setText("analysisTotal",a.total);
  renderAnalysisList("analysisStrengths",a.strengths,L.noStrengths); renderAnalysisList("analysisDeveloping",a.developing,L.noDeveloping); renderAnalysisList("analysisSupport",a.support,L.noSupport);
  setText("analysisRecommendation",L.nextDescriptions[a.overall]);
  setText("analysisTargetLabel",L.targetLabel);
  setText("analysisTargetSkill",a.targetSkill);
}

$("analysisContinue").onclick=()=>{ show("screen-results"); showResults(); };

function applyPracticeEvidence(){
  const p=state.practice;
  if(!p || !p.items?.length || state.practiceCompleted) return;
  const pct=p.score/p.items.length;
  const key=p.targetSkillKey;
  if(!key) return;
  const statusKey=pct===1?"strong":pct>=0.5?"developing":"support";
  state.mastery[key]={
    source:"practice",
    score:p.score,
    total:p.items.length,
    pct,
    statusKey,
    updatedAt:Date.now()
  };
  state.practiceCompleted=true;
}

function getLearningMapRows(){
  const L=ui[langKey()], skillGroups={};
  state.answers.forEach(a=>{ if(!skillGroups[a.skillKey]) skillGroups[a.skillKey]=[]; skillGroups[a.skillKey].push(a.correct); });
  return diagnosticQuestions.filter(q=>skillGroups[q.id]).map(q=>{
    const v=skillGroups[q.id];
    let pct=v.filter(Boolean).length/v.length;
    let statusKey=pct===1?"strong":pct>=.5?"developing":"support";
    const mastery=state.mastery[q.id];
    if(mastery){ pct=mastery.pct; statusKey=mastery.statusKey; }
    return {skill:localized(q.skill),skillKey:q.id,pct,status:L.statuses[statusKey],cls:statusKey,mastery};
  });
}

function showResults(){
  const L=ui[langKey()], analysis=buildAnalysis();
  applyPracticeEvidence();
  const rows=getLearningMapRows();
  const score=state.answers.filter(a=>a.correct).length;
  const overall=rows.length ? (rows.every(r=>r.cls==="strong") ? "strong" : rows.some(r=>r.cls==="support") ? "developing" : "strong") : analysis.overall;
  state.lastOverall=overall;

  let summary=L.summary(score,state.answers.length);
  if(state.practiceCompleted && state.practice.targetSkillKey){
    const target=rows.find(r=>r.skillKey===state.practice.targetSkillKey);
    if(target){
      const p=state.practice;
      const before=analysis.rows.find(r=>r.skillKey===target.skillKey);
      const beforeStatus=before ? before.status : L.statuses.support;
      const updateText = langKey()==="en"
        ? ` After targeted practice, ${target.skill} moved from ${beforeStatus} to ${target.status} based on ${p.score}/${p.items.length} practice answers.`
        : langKey()==="te"
          ? ` Targeted practice తర్వాత ${target.skill} skill ${beforeStatus} నుంచి ${target.status} కి update అయింది (${p.score}/${p.items.length} practice answers ఆధారంగా).`
          : ` Targeted practice తర్వాత ${target.skill} skill ${beforeStatus} నుంచి ${target.status} కి update అయింది (${p.score}/${p.items.length} practice answers ఆధారంగా).`;
      summary += updateText;
    }
  }

  setText("resultTitle",L.resultTitles[overall]);
  setText("resultSummary",summary);
  $("skillMap").innerHTML=rows.map(r=>`<div class="skill-row"><strong>${r.skill}</strong><div class="meter"><span class="${r.cls}" style="width:${Math.max(r.pct*100,8)}%"></span></div><span class="status ${r.cls}">${r.status}</span></div>`).join("");
  setText("nextHeading",L.nextHeadings[overall]);
  setText("nextDescription",L.nextDescriptions[overall]);
  setText("learningTargetLabel",L.targetLabel);
  const targetRow=state.practiceCompleted ? rows.find(r=>r.skillKey===state.practice.targetSkillKey) : null;
  setText("learningTargetSkill",targetRow?.skill || analysis.targetSkill);
  $("startLearning").onclick=()=>startLesson(targetRow?.skillKey || analysis.targetSkillKey || diagnosticQuestions[0].id);
}

function startLesson(skillKey){ state.currentLesson=0; state.targetSkillKey=skillKey; state.lessonAttempts=[]; show("screen-lesson"); renderLesson(); }

function getLessonQuestionData(lesson){
  // Some targeted lessons use the same multiple-choice question as the
  // diagnostic skill. Reuse those options so the lesson never asks for
  // option letters without actually showing the options.
  const diagnosticMatch=diagnosticQuestions.find(q=>q.id===state.targetSkillKey);
  const options=lesson.question?.options || diagnosticMatch?.options || null;
  const optionAnswer=typeof lesson.question?.answer === "number"
    ? lesson.question.answer
    : (diagnosticMatch && options ? diagnosticMatch.answer : null);
  return {options, optionAnswer};
}

function renderLesson(){
  const lesson=adaptiveLessons[state.targetSkillKey] || chapter2[state.currentLesson]; if(!lesson) return;
  const {options, optionAnswer}=getLessonQuestionData(lesson);
  setText("lessonProgressText","1 / 1"); $("lessonProgressBar").style.width="100%";
  setText("lessonSection",localized(lesson.section)); setText("lessonTitle",localized(lesson.title));
  setText("lessonTarget",localized(lesson.skill)); setHTML("lessonBody",localized(lesson.body));
  $("lessonFeedback").className="feedback hidden"; $("lessonNext").classList.add("hidden");

  if(options){
    const opts=options[langKey()] || options.en || [];
    $("lessonInteraction").innerHTML=`<div class="question"><strong>${localized(lesson.question.prompt)}</strong><div id="lessonOptions" class="options">${opts.map((o,i)=>`<button class="option" data-li="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}</div><div class="answer-row"><button class="check" id="lessonCheck">${localized(lesson.question.check)}</button></div></div>`;
    $("lessonOptions").querySelectorAll(".option").forEach(b=>b.onclick=()=>{
      $("lessonOptions").querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));
      b.classList.add("selected");
      state.lessonChoice=Number(b.dataset.li);
    });
    state.lessonChoice=undefined;
  } else {
    $("lessonInteraction").innerHTML=`<div class="question"><strong>${localized(lesson.question.prompt)}</strong><div class="answer-row"><input id="lessonAnswer" placeholder="${localized(lesson.question.placeholder)}"><button class="check" id="lessonCheck">${localized(lesson.question.check)}</button></div></div>`;
    $("lessonAnswer").onkeydown=e=>{if(e.key==='Enter') checkLesson();};
  }
  $("lessonCheck").onclick=checkLesson;
}

function checkLesson(){
  const lesson=adaptiveLessons[state.targetSkillKey] || chapter2[state.currentLesson],f=$("lessonFeedback");
  const {options, optionAnswer}=getLessonQuestionData(lesson);

  if(options){
    if(state.lessonChoice===undefined){
      f.textContent=localized(lesson.question.tryAgain);
      f.className="feedback info";
      return;
    }
    const attemptedChoice=state.lessonChoice;
    const selectedText=(options[langKey()] || options.en || [])[attemptedChoice] ?? String.fromCharCode(65+attemptedChoice);
    const correct=attemptedChoice===optionAnswer;
    state.lessonAttempts.push({answer:selectedText,choice:attemptedChoice,correct,hintUsed:!correct});

    if(correct){
      f.textContent=localized(lesson.question.good); f.className="feedback good";
      $("lessonOptions").querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===optionAnswer)b.classList.add("correct")});
      $("lessonNext").classList.remove("hidden"); $("lessonCheck").disabled=true;
    } else {
      const selected=$("lessonOptions").querySelector(`[data-li="${attemptedChoice}"]`);
      if(selected) selected.classList.add("wrong");
      f.textContent=localized(lesson.question.tryAgain); f.className="feedback try";
      // Keep the wrong choice in learning evidence, but clear the active UI
      // so the student gets a genuinely fresh attempt after the hint.
      $("lessonOptions").querySelectorAll(".option").forEach(b=>{b.disabled=false;b.classList.remove("selected","wrong")});
      state.lessonChoice=undefined;
    }
    return;
  }

  const answer=$("lessonAnswer");
  if(!answer) return;
  const raw=answer.value.trim();
  const val=raw.toLowerCase().replace(/\s+/g,"").replace(/[“”]/g,"");
  const expected=String(lesson.question.answer).toLowerCase().replace(/\s+/g,"");
  if(val===expected){
    state.lessonAttempts.push({answer:raw, correct:true, hintUsed:false});
    f.textContent=localized(lesson.question.good); f.className="feedback good"; $("lessonNext").classList.remove("hidden"); $("lessonCheck").disabled=true; answer.disabled=true;
  } else {
    state.lessonAttempts.push({answer:raw, correct:false, hintUsed:true});
    f.textContent=localized(lesson.question.tryAgain); f.className="feedback try";
    // Keep the wrong answer in learning evidence, but clear the active input.
    answer.value=""; answer.focus();
  }
}

$("lessonNext").onclick=()=>alert(ui[langKey()].close);



const adaptiveLessons = {
  "equation-recognition": {
    skill:{en:"Equation recognition",te:"సమీకరణాన్ని గుర్తించడం",hy:"Equation recognition"},
    section:{en:"Targeted lesson • Equation recognition",te:"Targeted lesson • సమీకరణాన్ని గుర్తించడం",hy:"Targeted lesson • Equation recognition"},
    title:{en:"What makes something an equation?",te:"ఏది equation అవుతుంది?",hy:"ఏది equation అవుతుంది?"},
    body:{
      en:`<p>An equation says that two expressions have the <strong>same value</strong>. Look for the equality sign <strong>=</strong>.</p><div class="example">5x + 2 = 12</div><p>The left and right sides are connected by equality.</p>`,
      te:`<p>Equation అంటే రెండు expressions యొక్క <strong>value సమానం</strong> అని చెప్పే statement. ఇందులో <strong>=</strong> గుర్తు ఉంటుంది.</p><div class="example">5x + 2 = 12</div><p>= గుర్తు రెండు sides మధ్య equality ని చూపిస్తుంది.</p>`,
      hy:`<p>Equation అంటే two expressions యొక్క <strong>value equal</strong> అని చెప్పే statement. ఇందులో <strong>=</strong> sign ఉంటుంది.</p><div class="example">5x + 2 = 12</div><p>= sign రెండు sides మధ్య equality ని show చేస్తుంది.</p>`
    },
    question:{prompt:{en:"Which is an equation?",te:"వీటిలో ఏది equation?",hy:"వీటిలో ఏది equation?"},placeholder:{en:"Type A, B, C or D",te:"A, B, C లేదా D టైప్ చేయి",hy:"A, B, C లేదా D type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"B",good:{en:"Exactly! 🎉 B has an equality sign, so it is an equation.",te:"సరిగ్గా చెప్పావు! 🎉 B లో = గుర్తు ఉంది కాబట్టి అది equation.",hy:"Exactly! 🎉 B లో = sign ఉంది, కాబట్టి అది equation."},tryAgain:{en:"Look for the = sign. Which option has it?",te:"= గుర్తు కోసం చూడు. ఏ option లో అది ఉంది?",hy:"= sign కోసం చూడు. ఏ option లో అది ఉంది?"}}
  },
  "lhs-rhs": {
    skill:{en:"LHS & RHS",te:"LHS & RHS",hy:"LHS & RHS"}, section:{en:"Targeted lesson • LHS & RHS",te:"Targeted lesson • LHS & RHS",hy:"Targeted lesson • LHS & RHS"}, title:{en:"Read an equation from left to right",te:"Equation ని ఎడమ నుంచి కుడికి చదుద్దాం",hy:"Equation ని left నుంచి right కి చదుద్దాం"},
    body:{en:`<p>In an equation, <strong>LHS</strong> is everything on the left of = and <strong>RHS</strong> is everything on the right.</p><div class="example">2x − 3 = 7</div><p>So LHS = 2x − 3 and RHS = 7.</p>`,te:`<p>Equation లో <strong>LHS</strong> అంటే = కి ఎడమ వైపు ఉన్నది. <strong>RHS</strong> అంటే = కి కుడి వైపు ఉన్నది.</p><div class="example">2x − 3 = 7</div><p>కాబట్టి LHS = 2x − 3, RHS = 7.</p>`,hy:`<p>Equation లో <strong>LHS</strong> అంటే = కి left side లో ఉన్నది. <strong>RHS</strong> అంటే = కి right side లో ఉన్నది.</p><div class="example">2x − 3 = 7</div><p>So LHS = 2x − 3, RHS = 7.</p>`},
    question:{prompt:{en:"In 2x − 3 = 7, type the RHS.",te:"2x − 3 = 7 లో RHS ని టైప్ చేయి.",hy:"2x − 3 = 7 లో RHS ని type చేయి."},placeholder:{en:"Type the RHS",te:"RHS టైప్ చేయి",hy:"RHS type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"7",good:{en:"Exactly! 🎉 The RHS is 7.",te:"సరిగ్గా చెప్పావు! 🎉 RHS = 7.",hy:"Exactly! 🎉 RHS = 7."},tryAgain:{en:"RHS is on the right side of =. What is written there?",te:"RHS అంటే = కి కుడి వైపు. అక్కడ ఏమి ఉంది?",hy:"RHS అంటే = కి right side. అక్కడ ఏమి ఉంది?"}}
  },
  "simple-equations": {
    skill:{en:"Simple equations",te:"సరళ సమీకరణాలు",hy:"Simple equations"},section:{en:"Targeted lesson • Simple equations",te:"Targeted lesson • సరళ సమీకరణాలు",hy:"Targeted lesson • Simple equations"},title:{en:"Undo the operation",te:"Operation ని ఎలా undo చేయాలి?",hy:"Operation ని ఎలా undo చేయాలి?"},
    body:{en:`<p>To solve <strong>x + 5 = 12</strong>, undo +5 by subtracting 5 from both sides.</p><div class="example">x + 5 − 5 = 12 − 5</div><p>So x = 7.</p>`,te:`<p><strong>x + 5 = 12</strong> solve చేయడానికి +5 ని undo చేయాలి. అందుకే రెండు sides నుంచి 5 subtract చేస్తాం.</p><div class="example">x + 5 − 5 = 12 − 5</div><p>అందుకే x = 7.</p>`,hy:`<p><strong>x + 5 = 12</strong> solve చేయడానికి +5 ని undo చేయాలి. So both sides నుంచి 5 subtract చేస్తాం.</p><div class="example">x + 5 − 5 = 12 − 5</div><p>Therefore x = 7.</p>`},
    question:{prompt:{en:"If x + 5 = 12, what is x?",te:"x + 5 = 12 అయితే x విలువ ఎంత?",hy:"x + 5 = 12 అయితే x value ఎంత?"},placeholder:{en:"Type x",te:"x విలువ టైప్ చేయి",hy:"x value type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"7",good:{en:"Exactly! 🎉 x = 7.",te:"సరిగ్గా చెప్పావు! 🎉 x = 7.",hy:"Exactly! 🎉 x = 7."},tryAgain:{en:"Undo +5. What happens if you subtract 5 from both sides?",te:"+5 ని undo చేయాలి. రెండు sides నుంచి 5 తీసేస్తే ఏమవుతుంది?",hy:"+5 ని undo చేయాలి. Both sides నుంచి 5 subtract చేస్తే ఏమవుతుంది?"}}
  },
  "balance-principle": {
    skill:{en:"Balance principle",te:"సమతుల్యత సూత్రం",hy:"Balance principle"},section:{en:"Targeted lesson • Balance principle",te:"Targeted lesson • సమతుల్యత సూత్రం",hy:"Targeted lesson • Balance principle"},title:{en:"Keep both sides balanced",te:"రెండు sides ని balance లో ఉంచుదాం",hy:"Both sides ని balance లో ఉంచుదాం"},
    body:{en:`<p>An equation behaves like a balance. If you add or subtract something on one side, do the <strong>same operation</strong> on the other side.</p><div class="example">x + 4 = 10<br>−4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;−4</div>`,te:`<p>Equation ఒక balance లాంటిది. ఒక side కి ఏదైనా add లేదా subtract చేస్తే, <strong>అదే operation</strong> మరో side లో కూడా చేయాలి.</p><div class="example">x + 4 = 10<br>−4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;−4</div>`,hy:`<p>Equation ఒక balance లాంటిది. One side కి add లేదా subtract చేస్తే, <strong>same operation</strong> other side లో కూడా చేయాలి.</p><div class="example">x + 4 = 10<br>−4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;−4</div>`},
    question:{prompt:{en:"If you add 3 to the left side, what should you do to the right side?",te:"Left side కి 3 add చేస్తే, right side కి ఏమి చేయాలి?",hy:"Left side కి 3 add చేస్తే, right side కి ఏమి చేయాలి?"},placeholder:{en:"Type: add 3",te:"‘3 కలపాలి’ అని టైప్ చేయి",hy:"‘add 3’ అని type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"add 3",good:{en:"Exactly! 🎉 The same operation keeps the equation balanced.",te:"సరిగ్గా చెప్పావు! 🎉 అదే operation చేస్తే equation balance లో ఉంటుంది.",hy:"Exactly! 🎉 Same operation చేస్తే equation balanced గా ఉంటుంది."},tryAgain:{en:"Remember the balance rule: whatever you do to one side, do the same to the other.",te:"Balance rule గుర్తుంచుకో: ఒక side కి ఏం చేస్తే, అదే మరో side కి కూడా చేయాలి.",hy:"Balance rule గుర్తుంచుకో: one side కి ఏం చేస్తే, same thing other side కి కూడా చేయాలి."}}
  },
  "variables-both-sides": {
    skill:{en:"Variables on both sides",te:"రెండు వైపులా చరరాశి",hy:"Variables on both sides"},section:{en:"Targeted lesson • Variables on both sides",te:"Targeted lesson • రెండు వైపులా చరరాశి",hy:"Targeted lesson • Variables on both sides"},title:{en:"Spot the variable on both sides",te:"రెండు sides లో variable ని గుర్తించు",hy:"Both sides లో variable ని గుర్తించు"},
    body:{en:`<p>Look at both sides of the equality sign. If <strong>x</strong> appears on each side, the variable is on both sides.</p><div class="example">2x − 3 = x + 2</div>`,te:`<p>= గుర్తుకు రెండు వైపులా చూడు. రెండు sides లో <strong>x</strong> ఉంటే variable రెండు వైపులా ఉన్నట్టే.</p><div class="example">2x − 3 = x + 2</div>`,hy:`<p>= sign కి both sides చూడు. రెండు sides లో <strong>x</strong> కనిపిస్తే variable both sides లో ఉంది.</p><div class="example">2x − 3 = x + 2</div>`},
    question:{prompt:{en:"In 2x − 3 = x + 2, is x on both sides? Type yes or no.",te:"2x − 3 = x + 2 లో x రెండు sides లో ఉందా? yes లేదా no టైప్ చేయి.",hy:"2x − 3 = x + 2 లో x both sides లో ఉందా? yes లేదా no type చేయి."},placeholder:{en:"yes / no",te:"yes / no",hy:"yes / no"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"yes",good:{en:"Exactly! 🎉 x appears on both sides.",te:"సరిగ్గా చెప్పావు! 🎉 x రెండు sides లో ఉంది.",hy:"Exactly! 🎉 x both sides లో ఉంది."},tryAgain:{en:"Look at the left and right sides separately. Can you find x on each side?",te:"Left, right sides ని విడిగా చూడు. రెండింటిలో x కనిపిస్తుందా?",hy:"Left, right sides ని separately చూడు. రెండింటిలో x ఉందా?"}}
  },
  "word-to-equation": {
    skill:{en:"Word-to-equation",te:"పదాలను సమీకరణంగా మార్చడం",hy:"Word-to-equation"},section:{en:"Targeted lesson • Word-to-equation",te:"Targeted lesson • పదాలను సమీకరణంగా మార్చడం",hy:"Targeted lesson • Word-to-equation"},title:{en:"Turn words into operations",te:"Words ని operations గా మార్చుదాం",hy:"Words ని operations గా మార్చుదాం"},
    body:{en:`<p>Words tell us what operation to use. <strong>“4 more than x”</strong> means start with x and add 4.</p><div class="example">x + 4</div>`,te:`<p>Words ఏ operation చేయాలో చెబుతాయి. <strong>“x కంటే 4 ఎక్కువ”</strong> అంటే x కి 4 కలపాలి.</p><div class="example">x + 4</div>`,hy:`<p>Words మనకి operation చెబుతాయి. <strong>“4 more than x”</strong> అంటే x కి 4 add చేయాలి.</p><div class="example">x + 4</div>`},
    question:{prompt:{en:"A number is 4 more than x. Write the expression.",te:"ఒక సంఖ్య x కంటే 4 ఎక్కువ. Expression రాయండి.",hy:"ఒక number x కంటే 4 ఎక్కువ. Expression type చేయి."},placeholder:{en:"Type x + 4",te:"x + 4 టైప్ చేయి",hy:"x + 4 type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"x+4",good:{en:"Exactly! 🎉 “4 more” means add 4: x + 4.",te:"సరిగ్గా చెప్పావు! 🎉 “4 ఎక్కువ” అంటే 4 కలపాలి: x + 4.",hy:"Exactly! 🎉 “4 more” అంటే 4 add చేయాలి: x + 4."},tryAgain:{en:"“More than” means add. Start with x and add 4.",te:"“ఎక్కువ” అంటే కలపాలి. x తో start చేసి 4 కలపాలి.",hy:"“More than” అంటే add. x తో start చేసి 4 add చేయాలి."}}
  },
  "simplification": {
    skill:{en:"Simplification",te:"సరళీకరణ",hy:"Simplification"},section:{en:"Targeted lesson • Simplification",te:"Targeted lesson • సరళీకరణ",hy:"Targeted lesson • Simplification"},title:{en:"Distribute carefully",te:"Brackets ని జాగ్రత్తగా simplify చేద్దాం",hy:"Brackets ని carefully simplify చేద్దాం"},
    body:{en:`<p>Use the distributive idea: multiply the number outside the bracket by <strong>every term</strong> inside.</p><div class="example">3(x + 2) = 3x + 6</div>`,te:`<p>Bracket బయట ఉన్న number ని లోపల ఉన్న <strong>ప్రతి term</strong> తో multiply చేయాలి.</p><div class="example">3(x + 2) = 3x + 6</div>`,hy:`<p>Bracket బయట ఉన్న number ని inside ఉన్న <strong>every term</strong> తో multiply చేయాలి.</p><div class="example">3(x + 2) = 3x + 6</div>`},
    question:{prompt:{en:"Simplify 3(x + 2).",te:"3(x + 2) ని simplify చేయి.",hy:"3(x + 2) ని simplify చేయి."},placeholder:{en:"Type 3x + 6",te:"3x + 6 టైప్ చేయి",hy:"3x + 6 type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"3x+6",good:{en:"Exactly! 🎉 3 multiplies both x and 2, giving 3x + 6.",te:"సరిగ్గా చెప్పావు! 🎉 3 ని x, 2 రెండింటితో multiply చేస్తే 3x + 6 వస్తుంది.",hy:"Exactly! 🎉 3 ని x, 2 రెండింటితో multiply చేస్తే 3x + 6 వస్తుంది."},tryAgain:{en:"Multiply 3 by both terms inside the bracket. What do you get?",te:"Bracket లోని రెండు terms తో 3 ని multiply చేయి. ఏమి వస్తుంది?",hy:"Bracket లోని both terms తో 3 multiply చేయి. ఏమి వస్తుంది?"}}
  },
  "fractions-equations": {
    skill:{en:"Fractions in equations",te:"సమీకరణాల్లో భిన్నాలు",hy:"Fractions in equations"},section:{en:"Targeted lesson • Fractions in equations",te:"Targeted lesson • సమీకరణాల్లో భిన్నాలు",hy:"Targeted lesson • Fractions in equations"},title:{en:"Use the LCM to clear denominators",te:"Denominators ని తొలగించడానికి LCM ఉపయోగిద్దాం",hy:"Denominators clear చేయడానికి LCM use చేద్దాం"},
    body:{en:`<p>When several fractions appear, multiplying both sides by the <strong>LCM of the denominators</strong> can remove the denominators.</p><div class="example">LCM → multiply both sides → simplify</div>`,te:`<p>చాలా fractions ఉన్నప్పుడు, denominators యొక్క <strong>LCM</strong> తో రెండు sides ని multiply చేస్తే denominators తొలగించవచ్చు.</p><div class="example">LCM → రెండు sides కి multiply → simplify</div>`,hy:`<p>Several fractions ఉన్నప్పుడు, denominators యొక్క <strong>LCM</strong> తో both sides ని multiply చేస్తే denominators clear అవుతాయి.</p><div class="example">LCM → both sides multiply → simplify</div>`},
    question:{prompt:{en:"What is a useful first step when several fractions have denominators 2 and 3?",te:"Denominators 2, 3 ఉన్న fractions ఎక్కువగా ఉంటే useful first step ఏమిటి?",hy:"Denominators 2, 3 ఉన్న several fractions ఉంటే useful first step ఏమిటి?"},placeholder:{en:"Type LCM 6",te:"LCM 6 అని టైప్ చేయి",hy:"LCM 6 అని type చేయి"},check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},answer:"6",good:{en:"Exactly! 🎉 The LCM of 2 and 3 is 6, which can clear the denominators.",te:"సరిగ్గా చెప్పావు! 🎉 2, 3 యొక్క LCM = 6. ఇది denominators ని తొలగించడంలో help చేస్తుంది.",hy:"Exactly! 🎉 2, 3 యొక్క LCM = 6. ఇది denominators ని clear చేయడంలో help చేస్తుంది."},tryAgain:{en:"Find the least common multiple of 2 and 3.",te:"2, 3 యొక్క కనిష్ఠ సామాన్య గుణిజం కనుక్కో.",hy:"2, 3 యొక్క LCM కనుక్కో."}}
  }
};

applyLanguage();


/* ================= BODHA v0.5.1 — Practice Evidence & Mastery Update ================= */
const practiceUI = {
  en:{eyebrow:"ADAPTIVE PRACTICE",label:"BODHA Practice",check:"Check →",next:"Next question →",retry:"Try again",hint:"Hint",correct:"Nice work! Let's make the next one a little more challenging.",wrong:"Good attempt. Let's use a hint and try the idea again.",hintText:"Think about the key idea from your lesson before choosing.",summaryEyebrow:"YOUR PRACTICE RESULT",summaryTitle:"Practice complete!",intro:(s,t)=>`You got ${s} of ${t} practice questions right. BODHA adjusts the next step from your responses.`,scoreLabel:"Practice score",nextStrong:"You're ready to stretch your thinking.",nextDeveloping:"You're improving. A little more targeted practice will help.",nextSupport:"Let's strengthen this skill with another guided round.",postPracticeText:"BODHA will now verify this skill with a challenge question.",finish:"Continue →",level:["Level 1 • Foundation","Level 2 • Core","Level 3 • Challenge"]},
  te:{eyebrow:"ADAPTIVE PRACTICE",label:"BODHA Practice",check:"చెక్ చేయి →",next:"తర్వాతి ప్రశ్న →",retry:"మళ్లీ ప్రయత్నించు",hint:"Hint",correct:"చాలా బాగా చేశావు! ఇప్పుడు next question ని కొంచెం challenging గా చేద్దాం.",wrong:"మంచి ప్రయత్నం! ఒక hint తో idea ని మరోసారి try చేద్దాం.",hintText:"Lesson లో నేర్చుకున్న key idea ని గుర్తు చేసుకుని answer చేయి.",summaryEyebrow:"నీ PRACTICE RESULT",summaryTitle:"Practice complete!",intro:(s,t)=>`${t} practice questions లో ${s} correct గా answer చేశావు. నీ responses బట్టి BODHA next step ని adjust చేస్తుంది.`,scoreLabel:"Practice score",nextStrong:"ఇప్పుడు నీ thinking ని ఇంకాస్త stretch చేద్దాం.",nextDeveloping:"నీకు improvement కనిపిస్తోంది. ఇంకొంచెం targeted practice help చేస్తుంది.",nextSupport:"ఈ skill ని మరో guided round తో ఇంకా strong చేద్దాం.",postPracticeText:"ఇప్పుడు BODHA ఈ skill ని ఒక challenge question తో verify చేస్తుంది.",finish:"కొనసాగిద్దాం →",level:["Level 1 • Foundation","Level 2 • Core","Level 3 • Challenge"]},
  hy:{eyebrow:"ADAPTIVE PRACTICE",label:"BODHA Practice",check:"Check →",next:"Next question →",retry:"మళ్లీ try చేయి",hint:"Hint",correct:"Great! ఇప్పుడు next question ని కొంచెం challenging గా చేద్దాం.",wrong:"Good attempt! ఒక hint తీసుకుని idea ని మరోసారి try చేద్దాం.",hintText:"Lesson లో నేర్చుకున్న key idea ని గుర్తు చేసుకుని think చేయి.",summaryEyebrow:"నీ PRACTICE RESULT",summaryTitle:"Practice complete!",intro:(s,t)=>`${t} practice questions లో ${s} correct గా answer చేశావు. నీ responses బట్టి BODHA next step ని adjust చేస్తుంది.`,scoreLabel:"Practice score",nextStrong:"నీ thinking ని ఇప్పుడు ఇంకాస్త challenge చేద్దాం.",nextDeveloping:"Nice progress! ఇంకొంచెం targeted practice నీకు help చేస్తుంది.",nextSupport:"ఈ skill ని మరో guided round తో ఇంకా strong చేద్దాం.",postPracticeText:"ఇప్పుడు BODHA ఈ skill ని ఒక challenge question తో verify చేస్తుంది.",finish:"Continue →",level:["Level 1 • Foundation","Level 2 • Core","Level 3 • Challenge"]}
};

const practiceBank = {
  "equation-recognition":[
    {level:1,prompt:{en:"Which is an equation?",te:"వీటిలో ఏది equation?",hy:"వీటిలో ఏది equation?"},options:{en:["3x + 2","3x + 2 = 8","3x","x + 2"],te:["3x + 2","3x + 2 = 8","3x","x + 2"],hy:["3x + 2","3x + 2 = 8","3x","x + 2"]},answer:1,hint:{en:"Look for the equality sign =.",te:"= గుర్తు కోసం చూడు.",hy:"= sign కోసం చూడు."}},
    {level:2,prompt:{en:"Which statement is an equation?",te:"వీటిలో ఏ statement equation?",hy:"వీటిలో ఏ statement equation?"},options:{en:["4x - 1 = 11","4x - 1","4(x - 1)","x/4"],te:["4x - 1 = 11","4x - 1","4(x - 1)","x/4"],hy:["4x - 1 = 11","4x - 1","4(x - 1)","x/4"]},answer:0,hint:{en:"An equation states that two sides are equal.",te:"Equation రెండు sides equal అని చెబుతుంది.",hy:"Equation అంటే two sides equal అని statement."}},
    {level:3,prompt:{en:"Which is a linear equation in one variable?",te:"వీటిలో ఒక variable లో linear equation ఏది?",hy:"వీటిలో one variable లో linear equation ఏది?"},options:{en:["2x + 5 = 13","x² = 9","2x + y = 7","5x + 2"],te:["2x + 5 = 13","x² = 9","2x + y = 7","5x + 2"],hy:["2x + 5 = 13","x² = 9","2x + y = 7","5x + 2"]},answer:0,hint:{en:"Look for =, one variable, and highest power 1.",te:"= గుర్తు, ఒక variable, highest power 1 ఉందో చూడు.",hy:"= sign, one variable, highest power 1 ఉందో చూడు."}}],
  "lhs-rhs":[
    {level:1,prompt:{en:"In 5x + 2 = 17, what is the RHS?",te:"5x + 2 = 17 లో RHS ఏది?",hy:"5x + 2 = 17 లో RHS ఏది?"},options:{en:["5x","2","17","5x + 2"],te:["5x","2","17","5x + 2"],hy:["5x","2","17","5x + 2"]},answer:2,hint:{en:"RHS is everything to the right of =.",te:"RHS అంటే = కి కుడి వైపు ఉన్నది.",hy:"RHS అంటే = కి right side లో ఉన్నది."}},
    {level:2,prompt:{en:"In 3x - 4 = 2x + 6, what is the LHS?",te:"3x - 4 = 2x + 6 లో LHS ఏది?",hy:"3x - 4 = 2x + 6 లో LHS ఏది?"},options:{en:["3x - 4","2x + 6","6","3x"],te:["3x - 4","2x + 6","6","3x"],hy:["3x - 4","2x + 6","6","3x"]},answer:0,hint:{en:"LHS is everything to the left of =.",te:"LHS అంటే = కి ఎడమ వైపు ఉన్నది.",hy:"LHS అంటే = కి left side లో ఉన్నది."}},
    {level:3,prompt:{en:"If 4x + 3 = 19, which pair correctly names the two sides?",te:"4x + 3 = 19 లో LHS, RHS సరైన pair ఏది?",hy:"4x + 3 = 19 లో LHS, RHS correct pair ఏది?"},options:{en:["LHS=19, RHS=4x+3","LHS=4x+3, RHS=19","LHS=4x, RHS=3","LHS=3, RHS=19"],te:["LHS=19, RHS=4x+3","LHS=4x+3, RHS=19","LHS=4x, RHS=3","LHS=3, RHS=19"],hy:["LHS=19, RHS=4x+3","LHS=4x+3, RHS=19","LHS=4x, RHS=3","LHS=3, RHS=19"]},answer:1,hint:{en:"Read the equation from left to right around =.",te:"= గుర్తు చుట్టూ equation ని left నుంచి right కి చదువు.",hy:"= sign చుట్టూ equation ని left నుంచి right కి read చేయి."}}],
  "simple-equations":[
    {level:1,prompt:{en:"If x + 6 = 14, what is x?",te:"x + 6 = 14 అయితే x ఎంత?",hy:"x + 6 = 14 అయితే x value ఎంత?"},options:{en:["6","8","14","20"],te:["6","8","14","20"],hy:["6","8","14","20"]},answer:1,hint:{en:"Undo +6 by subtracting 6.",te:"+6 ని undo చేయడానికి 6 తీసివేయి.",hy:"+6 ని undo చేయడానికి 6 subtract చేయి."}},
    {level:2,prompt:{en:"If 3x = 21, what is x?",te:"3x = 21 అయితే x ఎంత?",hy:"3x = 21 అయితే x value ఎంత?"},options:{en:["6","7","18","24"],te:["6","7","18","24"],hy:["6","7","18","24"]},answer:1,hint:{en:"Undo ×3 by dividing both sides by 3.",te:"×3 ని undo చేయడానికి రెండు sides ని 3తో భాగించు.",hy:"×3 ని undo చేయడానికి both sides ని 3తో divide చేయి."}},
    {level:3,prompt:{en:"Solve: 2x + 5 = 17.",te:"2x + 5 = 17 ని solve చేయి.",hy:"2x + 5 = 17 ని solve చేయి."},options:{en:["5","6","7","11"],te:["5","6","7","11"],hy:["5","6","7","11"]},answer:1,hint:{en:"First subtract 5 from both sides, then divide by 2.",te:"ముందుగా రెండు sides నుంచి 5 తీసివేసి, తర్వాత 2తో భాగించు.",hy:"First both sides నుంచి 5 subtract చేసి, తర్వాత 2తో divide చేయి."}}],
  "balance-principle":[
    {level:1,prompt:{en:"If you subtract 5 from the left side, what keeps the equation balanced?",te:"Left side నుంచి 5 తీస్తే equation balance గా ఉండటానికి ఏమి చేయాలి?",hy:"Left side నుంచి 5 subtract చేస్తే balance కోసం ఏమి చేయాలి?"},options:{en:["Subtract 5 from right side","Add 5 to right side","Do nothing","Multiply right side by 5"],te:["Right side నుంచి 5 తీసివేయాలి","Right side కి 5 కలపాలి","ఏమీ చేయకూడదు","Right side ని 5తో గుణించాలి"],hy:["Right side నుంచి 5 subtract చేయాలి","Right side కి 5 add చేయాలి","ఏమీ చేయకూడదు","Right side ని 5తో multiply చేయాలి"]},answer:0,hint:{en:"Same operation on both sides.",te:"రెండు sides లో same operation చేయాలి.",hy:"Both sides లో same operation చేయాలి."}},
    {level:2,prompt:{en:"What should you do to both sides of x - 7 = 10 to undo -7?",te:"x - 7 = 10 లో -7 ని undo చేయడానికి రెండు sides కి ఏమి చేయాలి?",hy:"x - 7 = 10 లో -7 ని undo చేయడానికి both sides కి ఏమి చేయాలి?"},options:{en:["Subtract 7","Add 7","Multiply by 7","Divide by 7"],te:["7 తీసివేయాలి","7 కలపాలి","7తో గుణించాలి","7తో భాగించాలి"],hy:["7 subtract చేయాలి","7 add చేయాలి","7తో multiply చేయాలి","7తో divide చేయాలి"]},answer:1,hint:{en:"Use the inverse operation of subtraction.",te:"Subtraction కి opposite operation ని ఉపయోగించు.",hy:"Subtraction కి inverse operation ని use చేయి."}},
    {level:3,prompt:{en:"Which action preserves equality?",te:"ఏ action equality ని maintain చేస్తుంది?",hy:"ఏ action equality ని maintain చేస్తుంది?"},options:{en:["Add 4 to only one side","Multiply both sides by 2","Subtract 3 from only the left","Divide only the right by 5"],te:["ఒక side కి మాత్రమే 4 కలపడం","రెండు sides ని 2తో గుణించడం","Left side నుంచి మాత్రమే 3 తీసివేయడం","Right side ని మాత్రమే 5తో భాగించడం"],hy:["Only one side కి 4 add చేయడం","Both sides ని 2తో multiply చేయడం","Left side నుంచి మాత్రమే 3 subtract చేయడం","Right side ని మాత్రమే 5తో divide చేయడం"]},answer:1,hint:{en:"The same operation must be applied to both sides.",te:"రెండు sides కి ఒకే operation చేయాలి.",hy:"Both sides కి same operation చేయాలి."}}],
  "variables-both-sides":[
    {level:1,prompt:{en:"Which equation has x on both sides?",te:"ఏ equation లో x రెండు sides లో ఉంది?",hy:"ఏ equation లో x both sides లో ఉంది?"},options:{en:["x + 2 = 9","2x + 1 = x + 6","7 = x + 3","4x = 20"],te:["x + 2 = 9","2x + 1 = x + 6","7 = x + 3","4x = 20"],hy:["x + 2 = 9","2x + 1 = x + 6","7 = x + 3","4x = 20"]},answer:1,hint:{en:"Check the left and right sides separately for x.",te:"Left, right sides ని విడిగా చూసి x ఉందో చూడు.",hy:"Left, right sides ని separately చూసి x ఉందో చూడు."}},
    {level:2,prompt:{en:"In 5x - 2 = 2x + 7, what is the next useful move?",te:"5x - 2 = 2x + 7 లో useful next move ఏది?",hy:"5x - 2 = 2x + 7 లో useful next move ఏది?"},options:{en:["Remove x from one side by subtracting 2x from both","Add 2x to both sides","Divide both sides by 5 immediately","Ignore the x on the right"],te:["రెండు sides నుంచి 2x తీసివేసి ఒక side లో x ని ఉంచడం","రెండు sides కి 2x కలపడం","వెంటనే రెండు sides ని 5తో భాగించడం","Right side లో x ని ignore చేయడం"],hy:["Both sides నుంచి 2x subtract చేసి ఒక side లో x ని ఉంచడం","Both sides కి 2x add చేయడం","Immediately both sides ని 5తో divide చేయడం","Right side లో x ని ignore చేయడం"]},answer:0,hint:{en:"Collect variable terms on one side while keeping balance.",te:"Balance maintain చేస్తూ variable terms ని ఒక side లోకి తీసుకురా.",hy:"Balance maintain చేస్తూ variable terms ని one side లోకి తీసుకురా."}},
    {level:3,prompt:{en:"Solve: 4x - 3 = 2x + 9.",te:"4x - 3 = 2x + 9 ని solve చేయి.",hy:"4x - 3 = 2x + 9 ని solve చేయి."},options:{en:["3","6","9","12"],te:["3","6","9","12"],hy:["3","6","9","12"]},answer:1,hint:{en:"Subtract 2x from both sides, then add 3.",te:"రెండు sides నుంచి 2x తీసివేసి, తర్వాత 3 కలపు.",hy:"Both sides నుంచి 2x subtract చేసి, తర్వాత 3 add చేయి."}}],
  "word-to-equation":[
    {level:1,prompt:{en:"A number is 5 more than x. Which expression represents it?",te:"ఒక సంఖ్య x కంటే 5 ఎక్కువ. దాన్ని ఏ expression చూపిస్తుంది?",hy:"ఒక number x కంటే 5 ఎక్కువ. ఏ expression represent చేస్తుంది?"},options:{en:["x - 5","5x","x + 5","x/5"],te:["x - 5","5x","x + 5","x/5"],hy:["x - 5","5x","x + 5","x/5"]},answer:2,hint:{en:"‘More than’ tells you to add.",te:"‘ఎక్కువ’ అంటే add చేయాలి.",hy:"‘More than’ అంటే add చేయాలి."}},
    {level:2,prompt:{en:"A number is 3 less than twice x. Which expression represents it?",te:"ఒక సంఖ్య x కి రెండింతల కంటే 3 తక్కువ. ఏ expression?",hy:"ఒక number twice x కంటే 3 less. ఏ expression?"},options:{en:["2x + 3","2x - 3","x - 3","3x - 2"],te:["2x + 3","2x - 3","x - 3","3x - 2"],hy:["2x + 3","2x - 3","x - 3","3x - 2"]},answer:1,hint:{en:"Twice x is 2x; ‘less’ means subtract 3.",te:"x కి రెండింతలు 2x; ‘తక్కువ’ అంటే 3 subtract చేయాలి.",hy:"Twice x = 2x; ‘less’ అంటే 3 subtract చేయాలి."}},
    {level:3,prompt:{en:"The sum of a number x and 7 is 20. Which equation represents this?",te:"x అనే సంఖ్య మరియు 7 మొత్తం 20. ఏ equation దీనిని చూపిస్తుంది?",hy:"x మరియు 7 sum 20. ఏ equation represent చేస్తుంది?"},options:{en:["x - 7 = 20","7x = 20","x + 7 = 20","x + 20 = 7"],te:["x - 7 = 20","7x = 20","x + 7 = 20","x + 20 = 7"],hy:["x - 7 = 20","7x = 20","x + 7 = 20","x + 20 = 7"]},answer:2,hint:{en:"‘Sum’ means addition, and it equals 20.",te:"‘మొత్తం’ అంటే addition; అది 20కి equal.",hy:"‘Sum’ అంటే addition; అది 20కి equal."}}],
  "simplification":[
    {level:1,prompt:{en:"Simplify: 2(x + 3).",te:"2(x + 3) ని simplify చేయి.",hy:"2(x + 3) ని simplify చేయి."},options:{en:["2x + 3","2x + 6","x + 6","2x + 5"],te:["2x + 3","2x + 6","x + 6","2x + 5"],hy:["2x + 3","2x + 6","x + 6","2x + 5"]},answer:1,hint:{en:"Multiply 2 by both terms inside the bracket.",te:"Bracket లోని రెండు terms తో 2 ని multiply చేయి.",hy:"Bracket లోని both terms తో 2 ని multiply చేయి."}},
    {level:2,prompt:{en:"Simplify: 4(x - 2).",te:"4(x - 2) ని simplify చేయి.",hy:"4(x - 2) ని simplify చేయి."},options:{en:["4x - 2","4x - 8","x - 8","4x + 8"],te:["4x - 2","4x - 8","x - 8","4x + 8"],hy:["4x - 2","4x - 8","x - 8","4x + 8"]},answer:1,hint:{en:"Distribute 4 to x and to -2.",te:"4 ని x కి, -2 కి రెండింటికీ distribute చేయి.",hy:"4 ని x మరియు -2 రెండింటికీ distribute చేయి."}},
    {level:3,prompt:{en:"Simplify: 3(2x + 4) - x.",te:"3(2x + 4) - x ని simplify చేయి.",hy:"3(2x + 4) - x ని simplify చేయి."},options:{en:["5x + 12","6x + 12","5x + 4","6x + 4"],te:["5x + 12","6x + 12","5x + 4","6x + 4"],hy:["5x + 12","6x + 12","5x + 4","6x + 4"]},answer:0,hint:{en:"First distribute 3, then combine like terms 6x - x.",te:"ముందుగా 3 ని distribute చేసి, తర్వాత 6x - x ని combine చేయి.",hy:"First 3 ని distribute చేసి, తర్వాత 6x - x ని combine చేయి."}}],
  "fractions-equations":[
    {level:1,prompt:{en:"What is the LCM of 2 and 3?",te:"2 మరియు 3 యొక్క LCM ఎంత?",hy:"2 మరియు 3 యొక్క LCM ఎంత?"},options:{en:["5","6","8","9"],te:["5","6","8","9"],hy:["5","6","8","9"]},answer:1,hint:{en:"Find the smallest number divisible by both 2 and 3.",te:"2, 3 రెండింటితో divide అయ్యే smallest number ని చూడు.",hy:"2, 3 రెండింటితో divisible అయ్యే smallest number ని చూడు."}},
    {level:2,prompt:{en:"To clear denominators 4 and 6, which number can multiply both sides?",te:"4, 6 denominators ని clear చేయడానికి ఏ number తో both sides ని multiply చేయవచ్చు?",hy:"4, 6 denominators clear చేయడానికి ఏ number తో both sides multiply చేయవచ్చు?"},options:{en:["6","8","10","12"],te:["6","8","10","12"],hy:["6","8","10","12"]},answer:3,hint:{en:"Use the LCM of 4 and 6.",te:"4, 6 యొక్క LCM ఉపయోగించు.",hy:"4, 6 యొక్క LCM use చేయి."}},
    {level:3,prompt:{en:"For x/3 + 1/2 = 5/6, what is a useful first step?",te:"x/3 + 1/2 = 5/6 లో useful first step ఏది?",hy:"x/3 + 1/2 = 5/6 లో useful first step ఏది?"},options:{en:["Multiply both sides by 6","Square both sides","Ignore the denominators","Multiply only x by 3"],te:["రెండు sides ని 6తో గుణించాలి","రెండు sides ని square చేయాలి","Denominators ని ignore చేయాలి","x ని మాత్రమే 3తో గుణించాలి"],hy:["Both sides ని 6తో multiply చేయాలి","Both sides ని square చేయాలి","Denominators ని ignore చేయాలి","x ని మాత్రమే 3తో multiply చేయాలి"]},answer:0,hint:{en:"6 is the LCM of 3, 2 and 6.",te:"3, 2, 6 యొక్క LCM = 6.",hy:"3, 2, 6 యొక్క LCM = 6."}}]
};

state.practice = {items:[], index:0, score:0, level:1, streak:0, answered:false, usedHint:false, targetSkillKey:null, choice:undefined, attemptHistory:[]};

function practiceQuestion(){ return state.practice.items[state.practice.index]; }
function buildPracticeItems(skillKey){
  const bank=practiceBank[skillKey] || practiceBank["simple-equations"];
  return bank.map(q=>({...q, options:{en:[...q.options.en],te:[...q.options.te],hy:[...q.options.hy]}}));
}
function updatePracticeUI(){
  const L=practiceUI[langKey()],q=practiceQuestion(); if(!q) return;
  setText("practiceProgressLabel",L.label); setText("practiceProgressText",`${state.practice.index+1} / ${state.practice.items.length}`);
  $("practiceProgressBar").style.width=`${((state.practice.index+1)/state.practice.items.length)*100}%`;
  setText("practiceDifficulty",L.level[q.level-1]); setText("practiceStreak",`${state.practice.streak} ${langKey()==="en"?"correct":"correct"}`);
  setText("practiceEyebrow",L.eyebrow); setText("practiceSkill",localized(adaptiveLessons[state.practice.targetSkillKey]?.skill || {en:state.practice.targetSkillKey,te:state.practice.targetSkillKey,hy:state.practice.targetSkillKey}));
  setText("practiceQuestion",localized(q.prompt));
  $("practiceOptions").innerHTML=q.options[langKey()].map((o,i)=>`<button class="option" data-pi="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join("");
  $("practiceOptions").querySelectorAll(".option").forEach(b=>b.onclick=()=>choosePractice(Number(b.dataset.pi)));
  const choice=state.practice.choice, answered=state.practice.answered, usedHint=state.practice.usedHint;
  if(choice!==undefined){
    const selected=$("practiceOptions").querySelector(`[data-pi="${choice}"]`); if(selected) selected.classList.add(answered && choice!==q.answer?"wrong":"selected");
  }
  if(answered){
    $("practiceOptions").querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct");});
    $("practiceFeedback").textContent=`🎉 ${L.correct}`; $("practiceFeedback").className="feedback good";
    $("practiceAction").textContent=state.practice.index===state.practice.items.length-1?L.finish:L.next; $("practiceAction").onclick=nextPractice;
  }else if(usedHint){
    $("practiceFeedback").textContent=L.wrong; $("practiceFeedback").className="feedback try"; $("practiceHint").textContent=`💡 ${localized(q.hint)}`; $("practiceHint").className="hint"; $("practiceAction").textContent=L.retry; $("practiceAction").disabled=false; $("practiceAction").onclick=retryPractice;
  }else{
    $("practiceFeedback").textContent=""; $("practiceFeedback").className="feedback hidden"; $("practiceHint").textContent=""; $("practiceHint").className="hint hidden"; $("practiceAction").textContent=L.check; $("practiceAction").disabled=false; $("practiceAction").onclick=checkPractice;
  }
}
function choosePractice(i){
  if(state.practice.answered) return;
  state.practice.choice=i;
  $("practiceOptions").querySelectorAll(".option").forEach(b=>b.classList.remove("selected"));
  const b=$("practiceOptions").querySelector(`[data-pi="${i}"]`);
  if(b)b.classList.add("selected");
}
function checkPractice(){
  if(state.practice.answered) return; const q=practiceQuestion(),L=practiceUI[langKey()],f=$("practiceFeedback");
  if(state.practice.choice===undefined){f.textContent=L.hintText;f.className="feedback info";return;}
  if(state.practice.choice===q.answer){
    state.practice.answered=true; state.practice.score++; state.practice.streak++;
    state.practice.attemptHistory.push({questionIndex:state.practice.index, answer:state.practice.choice, correct:true, hintUsed:state.practice.usedHint});
    $("practiceOptions").querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct");});
    f.textContent=`🎉 ${L.correct}`; f.className="feedback good"; $("practiceAction").textContent=state.practice.index===state.practice.items.length-1?L.finish:L.next;
    $("practiceAction").onclick=nextPractice;
    if(state.practice.streak>=2 && state.practice.level<3) state.practice.level++;
  }else{
    const attemptedChoice=state.practice.choice;
    state.practice.streak=0; state.practice.usedHint=true;
    state.practice.attemptHistory.push({questionIndex:state.practice.index, answer:attemptedChoice, correct:false, hintUsed:true});
    const chosen=$("practiceOptions").querySelector(`[data-pi="${attemptedChoice}"]`); if(chosen)chosen.classList.add("wrong");

    // Show the hint, but immediately clear the student's previous selection.
    // The attempt remains in attemptHistory for BODHA's learning evidence.
    state.practice.choice=undefined;
    $("practiceOptions").querySelectorAll(".option").forEach(b=>{b.disabled=false;b.classList.remove("wrong","selected")});
    f.textContent=L.wrong; f.className="feedback try"; $("practiceHint").textContent=`💡 ${localized(q.hint)}`; $("practiceHint").className="hint"; $("practiceAction").textContent=L.retry;
    $("practiceAction").onclick=retryPractice;
  }
}
function retryPractice(){
  state.practice.choice=undefined;
  state.practice.usedHint=false;
  $("practiceOptions").querySelectorAll(".option").forEach(b=>{b.disabled=false;b.classList.remove("wrong","selected")});
  $("practiceFeedback").className="feedback hidden";
  $("practiceHint").className="hint hidden";
  const L=practiceUI[langKey()];
  $("practiceAction").textContent=L.check;
  $("practiceAction").disabled=false;
  $("practiceAction").onclick=checkPractice;
}
function nextPractice(){
  const p=state.practice, current=p.items[p.index];
  if(current.level===3 || p.score>=3){showPracticeSummary();return;}
  const nextLevel=Math.min(3,current.level+1);
  const idx=p.items.findIndex(q=>q.level===nextLevel && !p.seen.includes(q.level));
  if(idx<0){showPracticeSummary();return;}
  p.seen.push(p.items[idx].level); p.index=idx; p.choice=undefined; p.answered=false; updatePracticeUI();
}
function startAdaptivePractice(skillKey){
  state.practice={items:buildPracticeItems(skillKey),index:0,score:0,level:1,streak:0,answered:false,usedHint:false,choice:undefined,targetSkillKey:skillKey,seen:[1],attemptHistory:[]};
  show("screen-practice"); updatePracticeUI();
}
function showPracticeSummary(){
  const L=practiceUI[langKey()],p=state.practice,s=p.score,t=p.items.length;
  applyPracticeEvidence();
  setText("practiceSummaryEyebrow",L.summaryEyebrow);setText("practiceSummaryTitle",L.summaryTitle);setText("practiceSummaryIntro",L.intro(s,t));setText("practiceSummaryScoreLabel",L.scoreLabel);setText("practiceSummaryScore",s);setText("practiceSummaryTotal",t);
  const pct=s/t;
  const title=pct===1?L.nextStrong:pct>=.67?L.nextDeveloping:L.nextSupport;
  const text=pct===1?L.postPracticeText:pct>=.67?L.nextDeveloping:L.nextSupport;
  setText("practiceSummaryNote",title);setText("practiceNextTitle",title);setText("practiceNextText",text);setText("practiceFinish",L.finish);
  show("screen-practice-summary");
}
$("practiceAction").onclick=checkPractice;
$("practiceFinish").onclick=()=>{ show("screen-results"); showResults(); };

// v0.5: completing the personalised lesson enters adaptive practice.
const originalLessonNext = $("lessonNext").onclick;
$("lessonNext").onclick=()=>startAdaptivePractice(state.practice?.targetSkillKey || state.targetSkillKey || diagnosticQuestions[0].id);

// Re-render practice screens on every language change without resetting learning state.
const oldRefreshVisibleScreen=refreshVisibleScreen;
refreshVisibleScreen=function(){
  applyLanguage();
  const screen=visibleScreen(); if(!screen)return;
  if(screen.id==="screen-diagnostic")renderQuestion({preserveState:true});
  else if(screen.id==="screen-analysis")showAnalysis();
  else if(screen.id==="screen-results")showResults();
  else if(screen.id==="screen-lesson")renderLesson();
  else if(screen.id==="screen-practice")updatePracticeUI();
  else if(screen.id==="screen-practice-summary")showPracticeSummary();
};
