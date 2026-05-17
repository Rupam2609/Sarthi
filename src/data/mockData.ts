import {
  SyllabusItem,
  CurrentAffairsArticle,
  PrelimsQuestion,
  MainsQuestion,
  CsatConcept,
  ResourceBook,
  SociologyThinker
} from '../types';

export const initialSyllabus: SyllabusItem[] = [
  // Prelims GS
  { id: 'p-1', title: 'Indian National Movement & Modern History', paper: 'Prelims GS', category: 'History', description: 'Freedom struggle from 1857 to 1947, important personalities, Congress sessions.', status: 'notes-done' },
  { id: 'p-2', title: 'Indian Polity & Governance', paper: 'Prelims GS', category: 'Polity', description: 'Constitution, Panchayati Raj, Public Policy, Rights Issues, Judicial Activism.', status: 'reading' },
  { id: 'p-3', title: 'Economic & Social Development', paper: 'Prelims GS', category: 'Economy', description: 'Sustainable Dev, Poverty, Inclusion, Demographics, Social Sector Initiatives, Banking.', status: 'not-started' },
  { id: 'p-4', title: 'General issues on Environmental Ecology & Bio-diversity', paper: 'Prelims GS', category: 'Environment', description: 'Climate change treaties, Ramsar sites, National Parks, Wildlife protection act.', status: 'not-started' },
  { id: 'p-5', title: 'Physical & Human Geography of India & World', paper: 'Prelims GS', category: 'Geography', description: 'Monsoon, Ocean currents, Earthquake distribution, Agriculture cropping patterns.', status: 'revised' },
  // CSAT
  { id: 'cs-1', title: 'Reading Comprehension & Analytical Reasoning', paper: 'Prelims CSAT', category: 'Comprehension', description: 'Inference based passages, author assumptions, logical corollaries.', status: 'reading' },
  { id: 'cs-2', title: 'Basic Numeracy & Data Interpretation', paper: 'Prelims CSAT', category: 'Quant', description: 'Numbers, magnitude, percentages, permutations, combinations, time & work.', status: 'not-started' },
  // GS1
  { id: 'gs1-1', title: 'Art & Culture: Architecture, Literature & Sculpture', paper: 'GS1', category: 'History', description: 'Indus Valley to British era architecture, Bhakti & Sufi movement, classical dances.', status: 'notes-done' },
  { id: 'gs1-2', title: 'Post-Independence Consolidation & Reorganization', paper: 'GS1', category: 'History', description: 'Integration of princely states, linguistic reorganization, land reforms.', status: 'revised' },
  { id: 'gs1-3', title: 'Salient features of Indian Society & Diversity', paper: 'GS1', category: 'Society', description: 'Role of women, secularism, regionalism, communalism, urbanization problems.', status: 'not-started' },
  // GS2
  { id: 'gs2-1', title: 'Functions & Responsibilities of Union & States', paper: 'GS2', category: 'Polity', description: 'Federal structure challenges, Governor role, Inter-state disputes, Finance commission.', status: 'reading' },
  { id: 'gs2-2', title: 'Parliament & State Legislatures', paper: 'GS2', category: 'Polity', description: 'Structure, functioning, conduct of business, powers & privileges, anti-defection law.', status: 'notes-done' },
  { id: 'gs2-3', title: 'Bilateral & Regional Groupings (India & Neighborhood)', paper: 'GS2', category: 'IR', description: 'Look East/Act East, QUAD, SAARC vs BIMSTEC, India-USA, India-China border tensions.', status: 'reading' },
  // GS3
  { id: 'gs3-1', title: 'Indian Economy & Issues of Growth, Resource Mobilization', paper: 'GS3', category: 'Economy', description: 'GDP calculation, fiscal deficit, monetary policy, NPA crisis, inclusive growth.', status: 'not-started' },
  { id: 'gs3-2', title: 'Major Crops & Cropping Patterns in various parts of the country', paper: 'GS3', category: 'Agriculture', description: 'Irrigation systems, farm subsidies, MSP issues, PDS, food processing industries.', status: 'not-started' },
  { id: 'gs3-3', title: 'Internal Security Challenges & Border Management', paper: 'GS3', category: 'Security', description: 'Left Wing Extremism, cyber security, money laundering, role of CAPF and intelligence.', status: 'revised' },
  // GS4
  { id: 'gs4-1', title: 'Ethics and Human Interface & Determinants', paper: 'GS4', category: 'Ethics', description: 'Essence, determinants and consequences of ethics, private vs public relationships.', status: 'notes-done' },
  { id: 'gs4-2', title: 'Emotional Intelligence & Civil Service Values', paper: 'GS4', category: 'Ethics', description: 'Integrity, impartiality, non-partisanship, objectivity, dedication to public service.', status: 'reading' },
  // Sociology Optional Paper 1
  { id: 'soc1-1', title: 'Sociology as a Discipline & Sociology as Science', paper: 'Sociology Optional Paper 1', category: 'Sociology', description: 'Modernity and social changes in Europe and emergence of Sociology, Scope of the subject, Comparison with other social sciences.', status: 'reading' },
  { id: 'soc1-2', title: 'Research Methods and Analysis', paper: 'Sociology Optional Paper 1', category: 'Sociology', description: 'Qualitative and quantitative methods, techniques of data collection, variables, sampling, hypothesis, reliability and validity.', status: 'not-started' },
  { id: 'soc1-3', title: 'Sociological Thinkers & Key Theories', paper: 'Sociology Optional Paper 1', category: 'Sociology', description: 'Karl Marx (Historical Materialism, Alienation), Emile Durkheim (Division of Labour, Suicide), Max Weber (Social Action, Bureaucracy, Protestant Ethic).', status: 'notes-done' },
  // Sociology Optional Paper 2
  { id: 'soc2-1', title: 'Introducing Indian Society: Perspectives', paper: 'Sociology Optional Paper 2', category: 'Sociology', description: 'Indology (G.S. Ghurye), Structural Functionalism (M.N. Srinivas), Marxist Sociology (A.R. Desai).', status: 'reading' },
  { id: 'soc2-2', title: 'Social Structure: Caste System & Agrarian Social Structure', paper: 'Sociology Optional Paper 2', category: 'Sociology', description: 'Perspectives on caste system (M.N. Srinivas, Louis Dumont), Agrarian classes, land reforms, green revolution.', status: 'not-started' }
];

export const mockCurrentAffairs: CurrentAffairsArticle[] = [
  {
    id: 'ca-1',
    title: 'One Nation, One Election: High-Level Committee Recommendations & Constitutional Hurdles',
    source: 'The Hindu',
    date: '2026-03-30',
    category: 'Polity & Governance',
    summary: 'The Union Cabinet accepted the report of the High-Level Committee on simultaneous elections. The report proposes a two-step transition: first synchronizing Lok Sabha and State Assembly polls, followed by municipal and panchayat polls within 100 days.',
    keyTakeaways: [
      'Constitutional amendments required to Articles 83, 85, 172, 174, and 356.',
      'Requires ratification by not less than one-half of the State legislatures for local body elections addition.',
      'Pros: Reduces election expenditure, policy paralysis due to Model Code of Conduct (MCC), and voter fatigue.',
      'Cons: May overshadow regional issues with national narratives; disrupts fixed 5-year tenure if government collapses prematurely.'
    ],
    editorialAnalysis: 'From a UPSC Mains GS2 perspective, this question demands a balanced critique. While administrative efficiency is crucial, federalism forms the basic structure of the Constitution. The Sarkaria Commission & Law Commission reports should be cited when evaluating solutions like constructive vote of no-confidence.',
    vocabulary: [
      { word: 'Federalism', meaning: 'System of government where power is divided between a central authority and constituent units.' },
      { word: 'Constructive Vote of No-Confidence', meaning: 'A mechanism where parliament can only dismiss a government if it simultaneously elects a successor.' }
    ],
    bookmarked: true
  },
  {
    id: 'ca-2',
    title: 'Semiconductor Mission & Critical Minerals Securitization in India',
    source: 'Indian Express',
    date: '2026-03-29',
    category: 'Economy',
    summary: 'India has fast-tracked approval for three new semiconductor fabrication and assembly units under the ₹76,000 crore ISM scheme. Simultaneously, strategic pacts with Australia and Latin American countries (Lithium Triangle) have been signed.',
    keyTakeaways: [
      'Semiconductor fabs require ultra-pure water, uninterrupted power, and robust chemical supply chains.',
      'Lithium Triangle comprises Argentina, Bolivia, and Chile.',
      'Mines and Minerals (Development and Regulation) Amendment Act empowers the central govt to exclusively auction critical minerals like Lithium and Niobium.',
      'Reduces dependency on China for rare earth elements (REEs).'
    ],
    editorialAnalysis: 'For GS3 (Industrial Policy & Tech), connect semiconductors to national sovereignty in the AI era. Highlight the lack of domestic R&D talent and the need for fabless design ecosystems alongside heavy manufacturing.',
    vocabulary: [
      { word: 'Fabless', meaning: 'Designing semiconductor chips while outsourcing the actual fabrication/manufacturing.' },
      { word: 'Rare Earth Elements (REE)', meaning: 'A set of 17 metallic elements crucial for high-tech electronics and green tech.' }
    ],
    bookmarked: false
  },
  {
    id: 'ca-3',
    title: 'Global Biodiversity Framework & India’s Updated National Biodiversity Targets',
    source: 'PIB',
    date: '2026-03-28',
    category: 'Environment & Tech',
    summary: 'Ministry of Environment, Forest and Climate Change released updated targets aligned with the Kunming-Montreal Global Biodiversity Framework (GBF) to conserve 30% of land and marine areas by 2030 (30x30 target).',
    keyTakeaways: [
      'Target 1: Conserve 30% of terrestrial, inland water, and coastal ecosystems.',
      'Target 2: Halve the introduction and establishment of invasive alien species.',
      'India has over 57 Tiger Reserves and 75 Ramsar wetlands contributing to this national goal.',
      'Financial mechanism relies on Global Biodiversity Fund hosted by GEF.'
    ],
    bookmarked: true
  },
  {
    id: 'ca-4',
    title: 'Digital Public Infrastructure (DPI) & Financial Inclusion Global Export',
    source: 'Yojana',
    date: '2026-03-27',
    category: 'Polity & Governance',
    summary: 'India’s DPI model (JAM Trinity - Jan Dhan, Aadhaar, Mobile and UPI) is now being adopted by over 12 nations across the Global South. It has brought 500+ million citizens into formal banking networks.',
    keyTakeaways: [
      'DPI lowers customer acquisition cost from $25 to $1 in banking.',
      'Enables Direct Benefit Transfer (DBT), plugging leakages worth trillions.',
      'Acts as a soft power tool for India under G20 leadership.'
    ]
  }
];

export const mockPrelimsQuestions: PrelimsQuestion[] = [
  {
    id: 'pq-1',
    question: 'With reference to the Constitution of India, consider the following statements:\n1. The Governor of a State has the discretionary power to reserve any bill for the consideration of the President.\n2. The Constitution specifies the exact time limit within which the Governor must assent or withhold assent to a bill.\nWhich of the statements given above is/are correct?',
    options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
    correctAnswer: 0,
    explanation: 'Statement 1 is correct under Article 200. Statement 2 is incorrect; the Constitution uses the phrase "as soon as possible" but does not set a specific deadline, which has led to controversies over "pocket vetoes".',
    subject: 'Polity',
    difficulty: 'Moderate'
  },
  {
    id: 'pq-2',
    question: 'Consider the following pairs regarding ancient Indian philosophies:\n1. Samkhya - Kapila\n2. Nyaya - Gautama\n3. Vaisheshika - Patanjali\nHow many of the above pairs are correctly matched?',
    options: ['Only one', 'Only two', 'All three', 'None'],
    correctAnswer: 1,
    explanation: 'Samkhya is attributed to sage Kapila (correct). Nyaya is attributed to sage Gautama (correct). Vaisheshika is attributed to sage Kanada, while Patanjali is associated with Yoga. Thus, only two pairs are correctly matched.',
    subject: 'History',
    difficulty: 'Moderate'
  },
  {
    id: 'pq-3',
    question: 'Which of the following bodies releases the "Financial Stability Report" in India?',
    options: ['NITI Aayog', 'Reserve Bank of India (RBI)', 'Ministry of Finance', 'Securities and Exchange Board of India (SEBI)'],
    correctAnswer: 1,
    explanation: 'The Financial Stability Report (FSR) is published bi-annually by the Reserve Bank of India on behalf of the Financial Stability and Development Council (FSDC).',
    subject: 'Economy',
    difficulty: 'Easy'
  },
  {
    id: 'pq-4',
    question: 'Consider the following statements regarding "Mangroves for the Future" (MFF):\n1. It is a regional initiative co-chaired by IUCN and UNDP.\n2. India is one of the founding member countries.\nWhich of the statements given above is/are correct?',
    options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
    correctAnswer: 2,
    explanation: 'Both statements are correct. MFF was established after the 2004 tsunami to promote coastal ecosystem rehabilitation across South and Southeast Asia.',
    subject: 'Environment',
    difficulty: 'Tough'
  },
  {
    id: 'pq-5',
    question: 'In the context of the Indian economy, "Open Market Operations" (OMOs) refer to:',
    options: [
      'Borrowing by scheduled banks from the RBI',
      'Lending by commercial banks to industry and trade',
      'Purchase and sale of government securities by the RBI',
      'Deposit of gold in foreign central banks'
    ],
    correctAnswer: 2,
    explanation: 'Open Market Operations (OMOs) refer to the buying and selling of government securities in the open market by the central bank (RBI) to expand or contract the amount of money in the banking system.',
    subject: 'Economy',
    difficulty: 'Easy'
  }
];

export const mockMainsQuestions: MainsQuestion[] = [
  {
    id: 'mq-1',
    paper: 'GS2',
    topic: 'Polity & Governance',
    question: '“The strength of Indian democracy lies in the robustness of its local self-governing institutions.” Evaluate the performance of the 73rd and 74th Constitutional Amendment Acts in empowering marginalized sections over the past three decades.',
    marks: 15,
    wordLimit: 250,
    modelFramework: {
      intro: 'Briefly mention the enactment of 73rd and 74th amendments in 1992, creating the 3-tier Panchayati Raj and Municipalities. State the core philosophy of democratic decentralization (Article 40).',
      bodyPoints: [
        'Positive Empowerment: 33% mandatory reservation for women (some states 50%), SC/ST representation proportionate to population, creating grassroots leadership.',
        'Financial Bottlenecks: State finance commissions irregular; local bodies reliant on tied grants rather than own tax revenue.',
        'Functional Bottlenecks: Unwillingness of state line departments to devolve 29 items (11th Schedule) and 18 items (12th Schedule).',
        'Social realities: Issues of "Sarpanch Pati" (proxy rule), caste discrimination in village assemblies (Gram Sabhas).'
      ],
      conclusion: 'Conclude with the need for Activity Mapping (2nd ARC recommendation), robust capacity building of elected reps, and financial autonomy to realize true Gram Swaraj.',
      diagramHint: 'Draw a triangle representing 3 Fs: Functions, Functionaries, and Finances at the base of democratic decentralization.'
    }
  },
  {
    id: 'mq-2',
    paper: 'GS3',
    topic: 'Environment & Disaster Management',
    question: 'Examine the multi-dimensional impact of climate change on Indian agriculture. How can the adoption of Climate-Smart Agriculture (CSA) practices secure food and nutritional security?',
    marks: 10,
    wordLimit: 150,
    modelFramework: {
      intro: 'Define climate change impacts on India (erratic monsoons, El Nino frequency, heatwaves). Mention IPCC reports projecting yield reduction in wheat and rice.',
      bodyPoints: [
        'Impacts: Spatial shift in cropping zones, pest outbreaks (e.g., locusts), soil salinization in coastal areas, drop in groundwater recharge.',
        'What is CSA: Agriculture that sustainably increases productivity, enhances resilience (adaptation), and reduces GHGs (mitigation).',
        'Specific Techniques: Zero budget natural farming, direct seeding of rice, drought-resistant millets (Shree Anna), micro-irrigation (Per Drop More Crop), solar pumps (PM KUSUM).'
      ],
      conclusion: 'Summarize that transitioning from water-intensive monoculture to climate-resilient polyculture is essential for achieving SDG 2 (Zero Hunger).'
    }
  },
  {
    id: 'mq-3',
    paper: 'GS4',
    topic: 'Ethics in Public Administration',
    question: 'You are the District Magistrate of a flood-prone district. A severe flash flood has cut off several remote villages. Relief supplies are limited, and local politicians are pressurizing you to divert food packets to their vote-bank areas first. What ethical dilemmas do you face, and how will you allocate resources?',
    marks: 20,
    wordLimit: 250,
    modelFramework: {
      intro: 'Identify the stakeholders: Marooned villagers, District administration, local politicians, relief workers. Identify the core values at test: Impartiality, Compassion for the weakest (Antyodaya), Courage, and Objectivity.',
      bodyPoints: [
        'Ethical Dilemmas: Political pressure vs Administrative duty; Utilitarianism (greatest good) vs Deontology (duty to save the most vulnerable regardless of status).',
        'Action Plan Step 1: Immediate survey via drone/satellite imagery to objectively identify most critical villages (children, elderly, medical emergencies).',
        'Action Plan Step 2: Establish a transparent distribution SOP. Communicate firmly with politicians that allocation will strictly follow humanitarian triage principles.',
        'Action Plan Step 3: Mobilize NDRF, SDRF, and civil society volunteers to ensure last-mile delivery without leakages.'
      ],
      conclusion: 'Reiterate Gandhiji’s Talisman: the step taken must empower the most helpless person. Upholding constitutional morality over political expediency is the true hallmark of a civil servant.'
    }
  }
];

export const mockCsatConcepts: CsatConcept[] = [
  {
    id: 'csat-1',
    title: 'Percentages & Fractional Equivalents',
    category: 'Quantitative Aptitude',
    formulaOrRule: '1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%. Use successive percentage change formula: A + B + (A*B)/100',
    exampleProblem: 'The price of sugar increases by 25%. By what percentage must a household reduce its consumption so that the expenditure remains unchanged?',
    exampleSolution: 'Let initial price = 100, consumption = 100. New price = 125. To keep expenditure 10,000, new consumption = 10000/125 = 80. Reduction = 20 from 100 = 20%.'
  },
  {
    id: 'csat-2',
    title: 'Syllogisms & Venn Diagram Technique',
    category: 'Logical Reasoning',
    formulaOrRule: 'Always draw minimum overlapping Venn diagrams. "All A are B" means A is inside B. "Some A are B" means overlapping circles. "No A is B" means disjoint circles with a cross.',
    exampleProblem: 'Statements: 1. All IAS are officers. 2. Some officers are diplomats. Conclusion I: Some IAS are diplomats. Conclusion II: All diplomats are officers.',
    exampleSolution: 'Drawing the diagram: IAS is inside Officers. Diplomats overlaps with Officers but does not necessarily touch IAS. Thus, Conclusion I does not follow. Conclusion II is clearly false. Neither I nor II follows.'
  },
  {
    id: 'csat-3',
    title: 'Reading Comprehension: Crux & Logical Corollaries',
    category: 'Reading Comprehension',
    formulaOrRule: 'Avoid extreme words in options ("always", "never", "only", "all"). Identify the core problem the author is highlighting. "Assumption" is something unstated but necessary for the author\'s argument.',
    exampleProblem: 'Passage: "Urbanization in developing countries is uncoordinated, leading to slums and environmental decay. Without decentralization of employment opportunities, mega-cities will collapse."',
    exampleSolution: 'The logical corollary is that rural-urban migration can be mitigated by developing Tier-2 and rural economic clusters. Do not choose options that suggest banning migration.'
  }
];

export const mockResources: ResourceBook[] = [
  { id: 'rb-1', title: 'Indian Polity (7th Edition)', authorOrSource: 'M. Laxmikanth', subject: 'Polity', type: 'Standard Reference', recommendedChapters: 'Fundamental Rights, Parliament, Emergency Provisions, Judiciary', completed: false, buyLink: 'https://www.amazon.in/dp/9355325586' },
  { id: 'rb-2', title: 'A Brief History of Modern India', authorOrSource: 'Spectrum / Rajiv Ahir', subject: 'Modern History', type: 'Standard Reference', recommendedChapters: 'Socio-Religious Movements, 1857 Revolt, Gandhian Era', completed: true, buyLink: 'https://www.amazon.in/dp/8179308182' },
  { id: 'rb-3', title: 'Class 11 NCERT: Indian Constitution at Work', authorOrSource: 'NCERT', subject: 'Polity', type: 'NCERT', recommendedChapters: 'Rights in Constitution, Election & Representation, Federalism', completed: true },
  { id: 'rb-4', title: 'Class 11 NCERT: An Introduction to Indian Art', authorOrSource: 'NCERT', subject: 'Art & Culture', type: 'NCERT', recommendedChapters: 'Mauryan Art, Temple Architecture, Bronze Sculptures', completed: false },
  { id: 'rb-5', title: 'Indian Economy', authorOrSource: 'Nitin Singhania / Ramesh Singh', subject: 'Economy', type: 'Standard Reference', recommendedChapters: 'Banking & RBI, Fiscal Policy, External Sector, Inflation', completed: false },
  { id: 'rb-6', title: 'Economic Survey & Union Budget Highlights', authorOrSource: 'Ministry of Finance', subject: 'Economy', type: 'Report / Docs', recommendedChapters: 'Macroeconomic overview, social infrastructure schemes', completed: false },
  { id: 'rb-7', title: '2nd ARC Report (Summary): Ethics in Governance', authorOrSource: 'Govt of India', subject: 'Ethics & Governance', type: 'Report / Docs', recommendedChapters: 'Corruption remedies, civil service code of conduct', completed: false }
];

export const mockTopperQuotes = [
  { quote: "Consistency is your greatest weapon. You don't need to study 16 hours a day; study 8 hours every single day for 365 days.", author: "Tina Dabi, IAS (AIR 1)" },
  { quote: "The UPSC exam tests your emotional stability as much as your intellectual depth. Stay calm and trust your revision.", author: "Anudeep Durishetty, IAS (AIR 1)" },
  { quote: "Mains is not about knowing everything. It is about presenting what you know in the most structured and legible manner within 7 minutes.", author: "Srushti Jayant Deshmukh, IAS (AIR 5)" },
  { quote: "Don't collect endless PDFs. Limit your resources and revise them 10 times rather than reading 10 books once.", author: "Kanishak Kataria, IAS (AIR 1)" }
];

export const mockSociologyThinkers: SociologyThinker[] = [
  {
    id: 't-1',
    name: 'Karl Marx',
    era: '1818 – 1883',
    perspective: 'Conflict',
    coreTheories: [
      'Historical Materialism (Forces & Relations of Production)',
      'Class Struggle & Alienation',
      'Concept of Commodity Fetishism & False Consciousness'
    ],
    keyConcepts: [
      { concept: 'Forces of Production', definition: 'Tools, technology, raw materials, and labor power used in production.' },
      { concept: 'Alienation', definition: 'Systemic separation of the worker from the product, the act of production, self, and fellow workers.' }
    ],
    upscPyqs: [
      'Explain the Marxist analysis of class and stratification. (20 marks - 2023)',
      'According to Marx, how does alienation affect the human essence? (15 marks - 2022)'
    ],
    aiDeconstructed: false
  },
  {
    id: 't-2',
    name: 'Emile Durkheim',
    era: '1858 – 1917',
    perspective: 'Functionalist',
    coreTheories: [
      'Social Facts (Externality and Constraint)',
      'Division of Labour (Mechanical vs Organic Solidarity)',
      'Sociological Study of Suicide & Religion'
    ],
    keyConcepts: [
      { concept: 'Anomie', definition: 'A state of normlessness where society fails to provide regulatory guidelines for individuals.' },
      { concept: 'Collective Conscience', definition: 'Set of shared beliefs, ideas, and moral attitudes common to a social group.' }
    ],
    upscPyqs: [
      'Compare mechanical and organic solidarity in Durkheim’s Division of Labour. (15 marks - 2021)',
      'Critically examine Durkheim’s thesis on Suicide. (20 marks - 2022)'
    ],
    aiDeconstructed: false
  },
  {
    id: 't-3',
    name: 'Max Weber',
    era: '1864 – 1920',
    perspective: 'Interactionist',
    coreTheories: [
      'Social Action & Verstehen method',
      'Protestant Ethic and the Spirit of Capitalism',
      'Bureaucracy & Types of Authority (Charismatic, Traditional, Rational-Legal)'
    ],
    keyConcepts: [
      { concept: 'Verstehen', definition: 'Empathic understanding of the subjective meanings that actors attach to their behavior.' },
      { concept: 'Ideal Type', definition: 'A methodological tool representing a mental construct used to compare concrete reality.' }
    ],
    upscPyqs: [
      'Analyze Protestant Ethic as a major catalyst for modern rational capitalism. (20 marks - 2023)',
      'How is Weber’s concept of bureaucracy linked to rationalization? (15 marks - 2022)'
    ],
    aiDeconstructed: false
  }
];
