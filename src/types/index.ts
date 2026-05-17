export type SyllabusStatus = 'not-started' | 'reading' | 'notes-done' | 'revised';

export interface SyllabusItem {
  id: string;
  title: string;
  paper: 'Prelims GS' | 'Prelims CSAT' | 'GS1' | 'GS2' | 'GS3' | 'GS4' | 'Essay' | 'Sociology Optional Paper 1' | 'Sociology Optional Paper 2';
  category: string;
  description: string;
  status: SyllabusStatus;
}

export interface Task {
  id: string;
  title: string;
  category: 'GS' | 'Optional' | 'Current Affairs' | 'CSAT' | 'Revision' | 'Mock Test';
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  estimatedHours: number;
}

export interface CurrentAffairsArticle {
  id: string;
  title: string;
  source: 'The Hindu' | 'Indian Express' | 'PIB' | 'Yojana' | 'Vision IAS' | 'Drishti IAS' | 'Insights on India' | 'Vajiram & Ravi';
  date: string;
  category: 'Polity & Governance' | 'Economy' | 'Environment & Tech' | 'International Relations' | 'Social Issues';
  summary: string;
  keyTakeaways: string[];
  editorialAnalysis?: string;
  vocabulary?: { word: string; meaning: string }[];
  bookmarked?: boolean;
  prelimsFocusPoints?: string[];
  mainsFocusPoints?: string[];
}

export interface PrelimsQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: 'History' | 'Polity' | 'Economy' | 'Geography' | 'Environment' | 'Sci-Tech';
  difficulty: 'Easy' | 'Moderate' | 'Tough';
}

export interface MainsQuestion {
  id: string;
  paper: 'GS1' | 'GS2' | 'GS3' | 'GS4' | 'Essay' | 'Sociology Paper 1' | 'Sociology Paper 2';
  topic: string;
  question: string;
  marks: 10 | 15 | 20 | 250;
  wordLimit: 150 | 250 | 1200;
  modelFramework: {
    intro: string;
    bodyPoints: string[];
    conclusion: string;
    diagramHint?: string;
  };
  userAnswer?: string;
}

export interface CsatConcept {
  id: string;
  title: string;
  category: 'Quantitative Aptitude' | 'Logical Reasoning' | 'Reading Comprehension';
  formulaOrRule: string;
  exampleProblem: string;
  exampleSolution: string;
}

export interface ResourceBook {
  id: string;
  title: string;
  authorOrSource: string;
  subject: string;
  type: 'NCERT' | 'Standard Reference' | 'Report / Docs' | 'Magazine';
  recommendedChapters: string;
  completed: boolean;
  buyLink?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
}

export interface DailyStreak {
  date: string;
  studyHours: number;
  tasksCompleted: number;
}

export interface SociologyThinker {
  id: string;
  name: string;
  era: string;
  perspective: 'Functionalist' | 'Conflict' | 'Interactionist' | 'Indian Sociology' | 'Feminist';
  coreTheories: string[];
  keyConcepts: { concept: string; definition: string }[];
  upscPyqs: string[];
  aiDeconstructed: boolean;
}
