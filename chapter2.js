const diagnosticQuestions = [
  {
    id:"equation-recognition",
    skill:{en:"Equation recognition",te:"సమీకరణాన్ని గుర్తించడం",hy:"Equation ని గుర్తించడం"},
    q:{en:"Which of these is an equation?",te:"వీటిలో ఏది సమీకరణం?",hy:"వీటిలో ఏది equation?"},
    options:{
      en:["5x + 2","5x + 2 = 12","5x","x² + 1"],
      te:["5x + 2","5x + 2 = 12","5x","x² + 1"],
      hy:["5x + 2","5x + 2 = 12","5x","x² + 1"]
    },
    answer:1,
    explain:{
      en:"An equation uses the equality sign (=) to say the two sides have equal value.",
      te:"సమీకరణంలో (=) సమాన గుర్తు ఉంటుంది. ఇది రెండు వైపుల విలువలు సమానం అని చెబుతుంది.",
      hy:"Equation అంటే రెండు expressions equal గా ఉన్నాయని చూపించే statement. అందులో = sign ఉంటుంది."
    }
  },
  {
    id:"lhs-rhs",
    skill:{en:"LHS & RHS",te:"LHS & RHS",hy:"LHS & RHS"},
    q:{en:"In 2x − 3 = 7, what is the RHS?",te:"2x − 3 = 7 లో RHS ఏది?",hy:"2x − 3 = 7 లో RHS ఏది?"},
    options:{en:["2x","2x − 3","7","x − 3"],te:["2x","2x − 3","7","x − 3"],hy:["2x","2x − 3","7","x − 3"]},
    answer:2,
    explain:{
      en:"RHS means Right Hand Side — the expression to the right of =.",
      te:"RHS అంటే Right Hand Side — అంటే = గుర్తుకు కుడి వైపున ఉన్న భాగం.",
      hy:"RHS అంటే Right Hand Side. అంటే = sign కి కుడివైపు ఉన్న expression."
    }
  },
  {
    id:"simple-equations",
    skill:{en:"Simple equations",te:"సరళ సమీకరణాలు",hy:"Simple equations"},
    q:{en:"If x + 5 = 12, what is x?",te:"x + 5 = 12 అయితే x విలువ ఎంత?",hy:"x + 5 = 12 అయితే x value ఎంత?"},
    options:{en:["5","7","12","17"],te:["5","7","12","17"],hy:["5","7","12","17"]},
    answer:1,
    explain:{
      en:"Subtract 5 from both sides: x = 7.",
      te:"రెండు వైపులా 5 తీసివేస్తే: x = 7.",
      hy:"రెండు sides నుంచి 5 subtract చేస్తే x = 7 వస్తుంది."
    }
  },
  {
    id:"balance-principle",
    skill:{en:"Balance principle",te:"సమతుల్యత సూత్రం",hy:"Balance principle"},
    q:{en:"To keep an equation balanced, what should you do when you add 4 to one side?",te:"సమీకరణం balance గా ఉండాలంటే, ఒక వైపుకు 4 కలిపినప్పుడు ఏమి చేయాలి?",hy:"Equation balanced గా ఉండాలంటే, ఒక side కి 4 add చేసినప్పుడు ఇంకో side కి ఏమి చేయాలి?"},
    options:{
      en:["Add 4 to the other side too","Subtract 4 from the other side","Do nothing","Multiply the other side by 4"],
      te:["మరో వైపుకు కూడా 4 కలపాలి","మరో వైపు నుంచి 4 తీసివేయాలి","ఏమీ చేయకూడదు","మరో వైపును 4తో గుణించాలి"],
      hy:["ఇంకో side కి కూడా 4 add చేయాలి","ఇంకో side నుంచి 4 subtract చేయాలి","ఏమీ చేయకూడదు","ఇంకో side ని 4తో multiply చేయాలి"]
    },
    answer:0,
    explain:{
      en:"The same operation on both sides preserves equality.",
      te:"రెండు వైపులా ఒకే operation చేస్తే సమానత్వం కొనసాగుతుంది.",
      hy:"రెండు sides కి same operation చేస్తే equation balance లో ఉంటుంది."
    }
  },
  {
    id:"variables-both-sides",
    skill:{en:"Variables on both sides",te:"రెండు వైపులా చరరాశి",hy:"Variables on both sides"},
    q:{en:"Which equation has the variable on both sides?",te:"ఏ సమీకరణంలో variable రెండు వైపులా ఉంది?",hy:"ఏ equation లో variable రెండు sides లో ఉంది?"},
    options:{en:["x + 3 = 8","2x − 3 = x + 2","5 = x + 1","7x = 21"],te:["x + 3 = 8","2x − 3 = x + 2","5 = x + 1","7x = 21"],hy:["x + 3 = 8","2x − 3 = x + 2","5 = x + 1","7x = 21"]},
    answer:1,
    explain:{
      en:"The variable x appears on both the left and right sides.",
      te:"x అనే variable ఎడమ వైపునా, కుడి వైపునా ఉంది.",
      hy:"x left side లో కూడా, right side లో కూడా ఉంది — అందుకే variable రెండు sides లో ఉంది."
    }
  },
  {
    id:"word-to-equation",
    skill:{en:"Word-to-equation",te:"పదాలను సమీకరణంగా మార్చడం",hy:"Word-to-equation"},
    q:{en:"A number is 4 more than x. Which expression represents the number?",te:"ఒక సంఖ్య x కంటే 4 ఎక్కువ. ఆ సంఖ్యను ఏ expression సూచిస్తుంది?",hy:"ఒక number x కంటే 4 ఎక్కువ. ఆ number ని ఏ expression represent చేస్తుంది?"},
    options:{en:["x − 4","4x","x + 4","x ÷ 4"],te:["x − 4","4x","x + 4","x ÷ 4"],hy:["x − 4","4x","x + 4","x ÷ 4"]},
    answer:2,
    explain:{
      en:"“4 more than x” means x + 4.",
      te:"“x కంటే 4 ఎక్కువ” అంటే x + 4.",
      hy:"“4 more than x” అంటే x కి 4 add చేయాలి. కాబట్టి expression x + 4."
    }
  },
  {
    id:"simplification",
    skill:{en:"Simplification",te:"సరళీకరణ",hy:"Simplification"},
    q:{en:"Which is the simplified form of 3(x + 2)?",te:"3(x + 2) యొక్క simplified form ఏది?",hy:"3(x + 2) యొక్క simplified form ఏది?"},
    options:{en:["3x + 2","3x + 6","x + 6","3x + 5"],te:["3x + 2","3x + 6","x + 6","3x + 5"],hy:["3x + 2","3x + 6","x + 6","3x + 5"]},
    answer:1,
    explain:{
      en:"Multiply 3 by both terms: 3x + 6.",
      te:"3 ను రెండు terms తో గుణిస్తే: 3x + 6.",
      hy:"3 ని bracket లోని రెండు terms తో multiply చేస్తే 3x + 6 వస్తుంది."
    }
  },
  {
    id:"fractions-equations",
    skill:{en:"Fractions in equations",te:"సమీకరణాల్లో భిన్నాలు",hy:"Fractions in equations"},
    q:{en:"What is a useful first step for an equation containing several fractions?",te:"చాలా భిన్నాలు ఉన్న సమీకరణంలో ఉపయోగకరమైన మొదటి step ఏది?",hy:"Several fractions ఉన్న equation లో useful first step ఏది?"},
    options:{
      en:["Ignore the denominators","Multiply both sides by the LCM of the denominators","Square both sides","Change every fraction to 1"],
      te:["Denominators ను పట్టించుకోకూడదు","Denominators యొక్క LCM తో రెండు వైపులా గుణించాలి","రెండు వైపులా square చేయాలి","ప్రతి fraction ను 1గా మార్చాలి"],
      hy:["Denominators ని ignore చేయాలి","Denominators యొక్క LCM తో both sides ని multiply చేయాలి","Both sides ని square చేయాల్సిన అవసరం లేదు","Every fraction ని 1గా మార్చాల్సిన అవసరం లేదు"]
    },
    answer:1,
    explain:{
      en:"The LCM can help remove the denominators and simplify the equation.",
      te:"LCM ఉపయోగిస్తే denominators తొలగించి సమీకరణాన్ని సులభంగా మార్చవచ్చు.",
      hy:"Denominators కి LCM తీసుకుని both sides ని multiply చేస్తే equation ని simplify చేయడం easy అవుతుంది."
    }
  }
];

const lessonBank = {
  strong: {
    title:{en:"You're ready for the challenge!",te:"నువ్వు challenge కి ready!",hy:"Challenge కి వెళ్లడానికి నువ్వు ready గా ఉన్నావు!"},
    body:{
      en:`<p>Your diagnostic suggests that your foundations are strong. BODHA won't make you repeat everything.</p><div class="example">Learn → Apply → Challenge</div><p>We'll move quickly through familiar ideas and spend more time on reasoning and applications.</p>`,
      te:`<p>నీ diagnostic ప్రకారం నీ basics strong గా ఉన్నాయి. BODHA అన్నింటినీ మళ్లీ repeat చేయించదు.</p><div class="example">నేర్చుకో → ఉపయోగించు → Challenge</div><p>నీకు already తెలిసిన ideas ని త్వరగా దాటి, reasoning మరియు applications పై ఎక్కువ focus చేస్తాం.</p>`,
      hy:`<p>నీ diagnostic బట్టి basic foundations strong గా ఉన్నాయి. అందుకే BODHA అన్నింటినీ మళ్లీ repeat చేయించదు.</p><div class="example">Learn → Apply → Challenge</div><p>నీకు already clear అయిన ideas ని త్వరగా దాటి, reasoning మరియు real-life applications పై ఎక్కువ focus చేస్తాం.</p>`
    }
  },
  developing: {
    title:{en:"Let's strengthen your foundation.",te:"నీ foundation ను ఇంకా strong చేద్దాం.",hy:"నీ foundation ని ఇంకాస్త strong చేద్దాం."},
    body:{
      en:`<p>You already understand some of the ideas. A few skills need practice before we move to harder problems.</p><div class="example">Understand → Practise → Retest</div><p>BODHA will give you targeted practice instead of making you repeat the whole chapter.</p>`,
      te:`<p>కొన్ని ideas నీకు ఇప్పటికే అర్థమయ్యాయి. Harder problems కి వెళ్లే ముందు కొన్ని skills కి మరింత practice కావాలి.</p><div class="example">అర్థం చేసుకో → Practice చేయి → మళ్లీ Test</div><p>మొత్తం chapter ని repeat చేయకుండా, అవసరమైన skills పైనే BODHA targeted practice ఇస్తుంది.</p>`,
      hy:`<p>కొన్ని ideas నీకు already అర్థమయ్యాయి. Harder problems కి వెళ్లే ముందు కొన్ని skills కి ఇంకాస్త practice అవసరం.</p><div class="example">Understand → Practise → Retest</div><p>Whole chapter repeat చేయకుండా, నీకు అవసరమైన skills పైన BODHA targeted practice ఇస్తుంది.</p>`
    }
  },
  support: {
    title:{en:"We'll build this step by step.",te:"దీన్ని step by step నేర్చుకుందాం.",hy:"Step by step నేర్చుకుందాం."},
    body:{
      en:`<p>That's completely okay. BODHA found a few places where extra guidance will help.</p><div class="example">See → Think → Try → Understand</div><p>We'll start with the basics and use small steps until the ideas become clear.</p>`,
      te:`<p>అది పూర్తిగా okay. కొన్ని చోట్ల నీకు extra guidance ఉపయోగపడుతుందని BODHA గుర్తించింది.</p><div class="example">చూడు → ఆలోచించు → ప్రయత్నించు → అర్థం చేసుకో</div><p>Basics తో start చేసి, ideas clear అయ్యే వరకు చిన్న చిన్న steps లో ముందుకు వెళ్తాం.</p>`,
      hy:`<p>అది పూర్తిగా okay. కొన్ని places లో extra guidance ఉపయోగపడుతుందని BODHA గుర్తించింది.</p><div class="example">See → Think → Try → Understand</div><p>Basics నుంచి start చేసి, ideas clear అయ్యే వరకు small steps లో ముందుకు వెళ్తాం.</p>`
    }
  }
};

const chapter2 = [{
  section:{en:"Personalised Chapter 2",te:"నీ కోసం రూపొందించిన Chapter 2",hy:"నీ కోసం Personalised Chapter 2"},
  title:{en:"Your first BODHA lesson",te:"నీ మొదటి BODHA lesson",hy:"నీ first BODHA lesson"},
  body:{
    en:`<p>Before solving a complicated equation, remember the central idea: <strong>both sides of an equation must stay equal.</strong></p><div class="example">2x − 3 = 7</div><p>Instead of memorising “move −3 to the other side”, ask: <strong>What operation will undo −3?</strong></p><p>Add 3 to both sides. The balance is preserved.</p>`,
    te:`<p>Complicated equation solve చేసే ముందు ఒక main idea గుర్తుంచుకో: <strong>equation లో రెండు sides ఎప్పుడూ equal గా ఉండాలి.</strong></p><div class="example">2x − 3 = 7</div><p>“−3 ని other side కి move చేయాలి” అని memorize చేయడం బదులు, <strong>−3 ని undo చేయడానికి ఏ operation చేయాలి?</strong> అని ఆలోచించు.</p><p>రెండు sides కి 3 add చేయి. Balance అలాగే ఉంటుంది.</p>`,
    hy:`<p>Complicated equation solve చేసే ముందు ఒక main idea గుర్తుంచుకో: <strong>equation లో both sides equal గా ఉండాలి.</strong></p><div class="example">2x − 3 = 7</div><p>“−3 ని other side కి move చేయాలి” అని memorize చేయడం బదులు, <strong>−3 ని undo చేయడానికి ఏ operation use చేయాలి?</strong> అని ఆలోచించు.</p><p>Both sides కి 3 add చేస్తే balance maintain అవుతుంది.</p>`
  },
  question:{
    prompt:{en:"If x − 3 = 7, what is x?",te:"x − 3 = 7 అయితే x విలువ ఎంత?",hy:"x − 3 = 7 అయితే x value ఎంత?"},
    placeholder:{en:"Type your answer",te:"నీ answer టైప్ చేయి",hy:"నీ answer టైప్ చేయి"},
    check:{en:"Check",te:"చెక్ చేయి",hy:"Check చేయి"},
    answer:"10",
    good:{en:"Exactly! 🎉 Adding 3 to both sides gives x = 10.",te:"Exactly! 🎉 రెండు sides కి 3 add చేస్తే x = 10.",hy:"సరిగ్గా చేశావు! 🎉 రెండు sides కి 3 add చేస్తే x = 10 వస్తుంది."},
    tryAgain:{en:"Think about the operation that undoes −3. What should you add to both sides?",te:"−3 ని undo చేసే operation గురించి ఆలోచించు. రెండు sides కి ఏమి add చేయాలి?",hy:"−3 ని undo చేయడానికి ఏ operation use చేయాలి? రెండు sides కి ఏమి add చేయాలి?"}
  }
}];
