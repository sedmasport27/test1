const mockTestModules = [
  {
    id: 'cognitive-verbal',
    title: 'A. Kognitivní schopnosti - Verbální inteligence',
    description: 'Testování vaší schopnosti porozumět a pracovat s textem.',
    type: 'multiple-choice',
    timeLimitSeconds: 300,
    questions: [
      {
        id: 'qv1',
        text: 'Doplňte chybějící slovo: Květina je k zahradě jako ____ je k obývacímu pokoji.',
        options: ['stůl', 'váza', 'gauč', 'koberec'],
        correctAnswer: 'koberec',
      },
      {
        id: 'qv2',
        text: 'Vyberte slovo, které nepatří do řady: Jablko, Hruška, Mrkev, Banán, Pomeranč.',
        options: ['Jablko', 'Hruška', 'Mrkev', 'Banán', 'Pomeranč'],
        correctAnswer: 'Mrkev',
      },
      {
        id: 'qv3',
        text: 'Které slovo je nejbližší slovesu "analyzovat"?',
        options: ['zkoumat', 'popisovat', 'kritizovat', 'shromažďovat'],
        correctAnswer: 'zkoumat',
      },
    ],
  },
  {
    id: 'cognitive-numerical',
    title: 'A. Kognitivní schopnosti - Numerická inteligence',
    description: 'Testování vaší schopnosti pracovat s čísly a řešit matematické úlohy.',
    type: 'multiple-choice',
    timeLimitSeconds: 360,
    questions: [
      {
        id: 'qn1',
        text: 'Jaké číslo doplňuje řadu: 2, 4, 8, 16, ___?',
        options: ['20', '24', '32', '36'],
        correctAnswer: '32',
      },
      {
        id: 'qn2',
        text: 'Pokud je cena jednoho jablka 5 Kč a cena jedné hrušky 7 Kč, kolik zaplatíte za 3 jablka a 2 hrušky?',
        options: ['29 Kč', '30 Kč', '31 Kč', '32 Kč'],
        correctAnswer: '29 Kč',
      },
    ],
  },
  {
    id: 'cognitive-logical',
    title: 'A. Kognitivní schopnosti - Logické myšlení',
    description: 'Testování vaší schopnosti rozpoznávat vzorce a vyvozovat závěry.',
    type: 'multiple-choice',
    timeLimitSeconds: 300,
    questions: [
      {
        id: 'ql1',
        text: 'Vyberte následující tvar v posloupnosti: čtverec, trojúhelník, kruh, čtverec, trojúhelník, ___?',
        options: ['kruh', 'čtverec', 'trojúhelník', 'romb'],
        correctAnswer: 'kruh',
      },
      {
        id: 'ql2',
        text: 'Pokud "Všichni psi jsou savci" a "Někteří savci jsou domácí mazlíčci", co z toho vyplývá?',
        options: [
          'Všichni psi jsou domácí mazlíčci.',
          'Někteří psi jsou domácí mazlíčci.',
          'Žádní psi nejsou domácí mazlíčci.',
          'Nelze určit.',
        ],
        correctAnswer: 'Nelze určit.',
      },
    ],
  },
  {
    id: 'cognitive-memory',
    title: 'A. Kognitivní schopnosti - Paměť',
    description: 'Testování vaší schopnosti zapamatovat si a vybavit si informace.',
    type: 'input-recall',
    timeLimitSeconds: 240,
    questions: [
      {
        id: 'qm1',
        text: 'Zapamatujte si následující sérii čísel. Po 10 sekundách ji zadejte.',
      },
    ],
  },
  {
    id: 'cognitive-attention',
    title: 'A. Kognitivní schopnosti - Pozornost',
    description: 'Testování vaší schopnosti soustředit se a ignorovat rušivé podněty.',
    type: 'multiple-choice',
    timeLimitSeconds: 240,
    questions: [
      {
        id: 'qa1',
        text: 'Následující řada obsahuje jedno odlišné písmeno. Které to je? OOOOOOOOOOOOQOOOOOOOOOOOO',
        options: ['O', 'Q'],
        correctAnswer: 'Q',
      },
      {
        id: 'qa2',
        text: 'Najděte, kolikrát se ve větě "V lesa je mnoho listí a trávy a mechu" vyskytuje slovo "a".',
        options: ['1', '2', '3', '4'],
        correctAnswer: '3',
      },
    ],
  },
  {
    id: 'cognitive-decision',
    title: 'A. Kognitivní schopnosti - Rychlé rozhodování',
    description: 'Simulace scénářů vyžadujících rychlé rozhodování pod časovým tlakem.',
    type: 'scenario-choice',
    timeLimitSeconds: 180,
    questions: [
      {
        id: 'qd1',
        text: 'Jste policista na hlídce. Dostanete hlášení o ozbrojeném přepadení obchodu ve vaší blízkosti. Co uděláte jako první?',
        options: [
          'Okamžitě se vydáte na místo bez čekání na posily.',
          'Kontaktujete operační středisko pro další instrukce a informujete o své pozici.',
          'Pokusíte se najít nejbližší únikovou cestu pro pachatele.',
          'Vyzvete kolemjdoucí k evakuaci.',
        ],
        correctAnswer: 'Kontaktujete operační středisko pro další instrukce a informujete o své pozici.',
      },
    ],
  },
  {
    id: 'personality-stress',
    title: 'B. Osobnostní rysy - Odolnost vůči stresu',
    description: 'Dotazník zaměřený na vaši reakci na stresové situace.',
    type: 'likert-scale',
    timeLimitSeconds: 300,
    questions: [
      {
        id: 'qp1',
        text: 'Cítíte se klidně, i když se blíží důležitý termín?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 1, 'Spíše ne': 2, 'Neutrálně': 3, 'Spíše ano': 4, 'Rozhodně ano': 5 },
      },
      {
        id: 'qp2',
        text: 'Snadno se necháte vyvést z míry neočekávanými událostmi?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 5, 'Spíše ne': 4, 'Neutrálně': 3, 'Spíše ano': 2, 'Rozhodně ano': 1 },
      },
      {
        id: 'qp3',
        text: 'Dokážete se soustředit i pod tlakem?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 1, 'Spíše ne': 2, 'Neutrálně': 3, 'Spíše ano': 4, 'Rozhodně ano': 5 },
      },
    ],
  },
  {
    id: 'personality-emotional-stability',
    title: 'B. Osobnostní rysy - Emoční stabilita',
    description: 'Dotazník hodnotící vaši emoční vyrovnanost a náladovost.',
    type: 'likert-scale',
    timeLimitSeconds: 240,
    questions: [
      {
        id: 'qe1',
        text: 'Jste obecně klidná a vyrovnaná osoba?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 1, 'Spíše ne': 2, 'Neutrálně': 3, 'Spíše ano': 4, 'Rozhodně ano': 5 },
      },
      {
        id: 'qe2',
        text: 'Vaše nálada se často mění bez zjevné příčiny?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 5, 'Spíše ne': 4, 'Neutrálně': 3, 'Spíše ano': 2, 'Rozhodně ano': 1 },
      },
    ],
  },
  {
    id: 'personality-social-intelligence',
    title: 'B. Osobnostní rysy - Sociální inteligence',
    description: 'Dotazník zaměřený na vaše dovednosti v sociálních interakcích.',
    type: 'likert-scale',
    timeLimitSeconds: 240,
    questions: [
      {
        id: 'qs1',
        text: 'Snadno rozumíte pocitům druhých lidí?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 1, 'Spíše ne': 2, 'Neutrálně': 3, 'Spíše ano': 4, 'Rozhodně ano': 5 },
      },
      {
        id: 'qs2',
        text: 'Jste dobří ve čtení neverbálních signálů?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 1, 'Spíše ne': 2, 'Neutrálně': 3, 'Spíše ano': 4, 'Rozhodně ano': 5 },
      },
    ],
  },
  {
    id: 'personality-moral-integrity',
    title: 'B. Osobnostní rysy - Morální integrita',
    description: 'Dotazník hodnotící vaši etickou soudnost a dodržování principů.',
    type: 'likert-scale',
    timeLimitSeconds: 300,
    questions: [
      {
        id: 'qm3',
        text: 'Vždy se snažíte jednat čestně, i když je to pro vás nevýhodné?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 1, 'Spíše ne': 2, 'Neutrálně': 3, 'Spíše ano': 4, 'Rozhodně ano': 5 },
      },
      {
        id: 'qm4',
        text: 'Porušení pravidel je pro vás snadné, pokud to nikdo nezjistí?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 5, 'Spíše ne': 4, 'Neutrálně': 3, 'Spíše ano': 2, 'Rozhodně ano': 1 },
      },
    ],
  },
  {
    id: 'personality-assertiveness',
    title: 'B. Osobnostní rysy - Asertivita a sebedůvěra',
    description: 'Dotazník posuzující vaši schopnost prosadit se a důvěru ve vlastní schopnosti.',
    type: 'likert-scale',
    timeLimitSeconds: 240,
    questions: [
      {
        id: 'qa3',
        text: 'Cítíte se sebejistě při vyjadřování svých názorů v diskuzi?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 1, 'Spíše ne': 2, 'Neutrálně': 3, 'Spíše ano': 4, 'Rozhodně ano': 5 },
      },
      {
        id: 'qa4',
        text: 'Je pro vás obtížné říci "ne" požadavkům, se kterými nesouhlasíte?',
        options: ['Vůbec ne', 'Spíše ne', 'Neutrálně', 'Spíše ano', 'Rozhodně ano'],
        scoringMap: { 'Vůbec ne': 5, 'Spíše ne': 4, 'Neutrálně': 3, 'Spíše ano': 2, 'Rozhodně ano': 1 },
      },
    ],
  },
  {
    id: 'psychomotor-reaction',
    title: 'C. Psychomotorické schopnosti - Reakční test',
    description: 'Testování rychlosti vašich reakcí na vizuální podněty.',
    type: 'reaction-test',
    timeLimitSeconds: 180,
    questions: [
      {
        id: 'pmr1',
        text: 'Klikněte co nejrychleji na červené tlačítko, jakmile se objeví.',
        stimuli: ['circle'],
      },
      {
        id: 'pmr2',
        text: 'Rychle stiskněte tlačítko, jakmile se změní barva pozadí.',
        stimuli: ['color_change'],
      },
    ],
  },
  {
    id: 'psychomotor-adaptation',
    title: 'C. Psychomotorické schopnosti - Test adaptace',
    description: 'Měnící se úlohy v reálném čase, vyžadující rychlou adaptaci.',
    type: 'dynamic-adaptation',
    timeLimitSeconds: 300,
    questions: [
      {
        id: 'pad1',
        text: 'Následujte instrukce, které se budou rychle měnit. Klikněte na správnou barvu.',
      },
    ],
  },
  {
    id: 'police-conflict',
    title: 'D. Kompetence specifické pro policii - Konfliktní situace',
    description: 'Scénáře simulující konfliktní situace a vaše možné reakce.',
    type: 'scenario-choice',
    timeLimitSeconds: 420,
    questions: [
      {
        id: 'pcs1',
        text: 'Jste svědkem hádky na veřejnosti. Jaká je vaše první reakce?',
        options: [
          'Okamžitě zasáhnu a pokusím se uklidnit situaci.',
          'Pozoruji situaci a vyhodnocuji, zda je nutný zásah.',
          'Kontaktuji kolegy a čekám na posily.',
          'Držím se stranou, abych se vyhnul eskalaci.',
        ],
        correctAnswer: 'Pozoruji situaci a vyhodnocuji, zda je nutný zásah.',
      },
    ],
  },
  {
    id: 'police-pressure',
    title: 'D. Kompetence specifické pro policii - Práce pod tlakem',
    description: 'Kombinace kognitivních úloh, které musíte řešit v omezeném čase.',
    type: 'multiple-choice',
    timeLimitSeconds: 360,
    questions: [
      {
        id: 'pp1',
        text: 'Máte 30 sekund na vyřešení rovnice: 15 + 7 * 2 - 4 = ?',
        options: ['25', '28', '30', '32'],
        correctAnswer: '25',
      },
      {
        id: 'pp2',
        text: 'Při sledování kamer máte identifikovat osobu s červenou bundou v davu. Která z těchto možností ji nejlépe popisuje?',
        options: [
          'Osoba v levém rohu s červenou bundou a modrými džíny.',
          'Osoba uprostřed s červenou bundou a kloboukem.',
          'Několik osob s červenou bundou, potřebuji více informací.',
          'Nevidím nikoho s červenou bundou.',
        ],
        correctAnswer: 'Osoba v levém rohu s červenou bundou a modrými džíny.',
      },
    ],
  },
  {
    id: 'police-ethics',
    title: 'D. Kompetence specifické pro policii - Etická rozhodnutí',
    description: 'Výběr mezi několika hodnotově náročnými rozhodnutími.',
    type: 'scenario-choice',
    timeLimitSeconds: 300,
    questions: [
      {
        id: 'pe1',
        text: 'Váš kolega udělá drobnou chybu, která by mohla poškodit reputaci týmu, ale nikdo si jí nevšiml. Co uděláte?',
        options: [
          'Ignoruji to, protože to není velký problém.',
          'Nahlásím to nadřízenému.',
          'Diskrétně na to upozorním kolegu, aby to napravil.',
          'Pokryji to, aby nikdo neměl problémy.',
        ],
        correctAnswer: 'Diskrétně na to upozorním kolegu, aby to napravil.',
      },
    ],
  },
];

export default mockTestModules;