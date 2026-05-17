import React, { useState } from 'react';
import { 
  FunctionSquare, 
  Calculator, 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Percent, 
  Plus, 
  Award 
} from 'lucide-react';
import { CsatConcept } from '../types';

interface CsatHubProps {
  concepts: CsatConcept[];
}

interface DailyCsatQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Moderate' | 'Tough';
}

export const CsatHub: React.FC<CsatHubProps> = ({ concepts }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openSolutionId, setOpenSolutionId] = useState<string | null>(null);

  // CSAT Score Calculator state
  const [correctCount, setCorrectCount] = useState<number>(35);
  const [incorrectCount, setIncorrectCount] = useState<number>(15);

  // Daily CSAT practice questions
  const [selectedDailyOption, setSelectedDailyOption] = useState<number | null>(null);
  const [submittedDaily, setSubmittedDaily] = useState(false);

  // Custom CSAT Daily Question list
  const [dailyQuestions, setDailyQuestions] = useState<DailyCsatQuestion[]>([
    {
      id: 'dq-1',
      question: 'Two trains of equal length are running on parallel lines in the same direction at 46 km/h and 36 km/h. The faster train passes the slower train in 36 seconds. The length of each train is:',
      options: ['50 m', '80 m', '100 m', '120 m'],
      correctAnswer: 0,
      explanation: 'Relative speed = 46 - 36 = 10 km/h = 10 * (5/18) = 25/9 m/s. Let length of each train be L. Total distance to pass = 2L. 2L = Speed * Time = (25/9) * 36 = 100 m. Thus, L = 50 m.',
      difficulty: 'Moderate'
    },
    {
      id: 'dq-2',
      question: 'A clock strikes once at 1 o’clock, twice at 2 o’clock, thrice at 3 o’clock, and so on. How many times will it strike in 24 hours?',
      options: ['78 times', '156 times', '228 times', '300 times'],
      correctAnswer: 1,
      explanation: 'The clock strikes 1 + 2 + 3 + ... + 12 = (12 * 13)/2 = 78 times in 12 hours. In 24 hours, it strikes 78 * 2 = 156 times.',
      difficulty: 'Easy'
    }
  ]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  // Custom CSAT Question Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState(0);
  const [newExplanation, setNewExplanation] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Moderate' | 'Tough'>('Moderate');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: DailyCsatQuestion = {
      id: 'dq-' + Date.now(),
      question: newQuestionText.trim(),
      options: newOptions.map((o, i) => o.trim() || `Option ${String.fromCharCode(65 + i)}`),
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation.trim() || 'No explanation added yet.',
      difficulty: newDifficulty
    };

    setDailyQuestions([...dailyQuestions, newQ]);
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewExplanation('');
    setShowAddForm(false);
    alert('✨ New Daily CSAT question added successfully! Try solving it.');
  };

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...newOptions];
    updated[index] = value;
    setNewOptions(updated);
  };

  const csatScore = Number((correctCount * 2.5 - incorrectCount * 0.833).toFixed(2));
  const isQualified = csatScore >= 66.67;

  const categories = ['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Reading Comprehension'];

  const filteredConcepts = activeCategory === 'All' 
    ? concepts 
    : concepts.filter(c => c.category === activeCategory);

  const toggleSolution = (id: string) => {
    setOpenSolutionId(openSolutionId === id ? null : id);
  };

  const currentDailyQ = dailyQuestions[activeQuestionIdx];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 font-sans">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-amber-950/40 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
            <FunctionSquare className="w-3.5 h-3.5" />
            <span>Paper II Qualifying Masterclass & Sprints</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
            Never Let CSAT Stop Your Mains Journey
          </h2>
          <p className="text-slate-300 text-xs">
            Master number system remainders, syllogism Venn diagrams, and reading comprehension elimination rules. Try our customizable daily questions below.
          </p>
        </div>

        {/* Quick Calculator Widget inside Header */}
        <div className="bg-slate-900/95 p-4 rounded-2xl border border-slate-700/80 shadow-2xl w-full lg:w-80 shrink-0 space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-1.5"><Calculator className="w-4 h-4" /> Score Calculator</span>
            <span>Target: 66.67+</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-1 font-semibold">Correct (x 2.5):</span>
              <input 
                type="number" 
                min="0" 
                max="80" 
                value={correctCount} 
                onChange={(e) => setCorrectCount(Number(e.target.value))} 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-bold"
              />
            </div>
            <div>
              <span className="text-slate-400 block mb-1 font-semibold">Wrong (-0.83):</span>
              <input 
                type="number" 
                min="0" 
                max="80" 
                value={incorrectCount} 
                onChange={(e) => setIncorrectCount(Number(e.target.value))} 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-bold"
              />
            </div>
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between text-sm ${
            isQualified ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            <div>
              <div className="font-mono text-xl font-black">{csatScore}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider">{isQualified ? '🎉 Qualified for GS Evaluation' : '⚠️ Below Qualifying Mark'}</div>
            </div>
            <Percent className="w-6 h-6 opacity-40" />
          </div>
        </div>
      </div>

      {/* Daily CSAT Question Board */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Daily CSAT Practice Simulator ({dailyQuestions.length} Sprints)</span>
          </div>
          
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-650 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 font-black" /> Add Custom CSAT Daily Question
          </button>
        </div>

        {/* Custom Question Adder Form */}
        {showAddForm && (
          <form onSubmit={handleAddQuestion} className="bg-slate-50 dark:bg-slate-955 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">➕ Add custom CSAT Daily Question</div>
            <textarea
              placeholder="Enter CSAT Daily Practice Question Text..."
              value={newQuestionText}
              rows={3}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-850 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none font-serif"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {newOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select
                value={newCorrectAnswer}
                onChange={(e) => setNewCorrectAnswer(Number(e.target.value))}
                className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-750 dark:text-slate-200 focus:outline-none"
              >
                <option value={0}>Correct Option: A</option>
                <option value={1}>Correct Option: B</option>
                <option value={2}>Correct Option: C</option>
                <option value={3}>Correct Option: D</option>
              </select>

              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value as any)}
                className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-755 dark:text-slate-200 focus:outline-none"
              >
                <option value="Easy">Easy Difficulty</option>
                <option value="Moderate">Moderate Difficulty</option>
                <option value="Tough">Tough Difficulty</option>
              </select>

              <input
                type="text"
                placeholder="Step-by-step explanation..."
                value={newExplanation}
                onChange={(e) => setNewExplanation(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Submit Question
            </button>
          </form>
        )}

        {/* Active Practice Question */}
        {currentDailyQ && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
            {/* Navigation list */}
            <div className="lg:col-span-3 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">Select Daily Practice Question</div>
              {dailyQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuestionIdx(idx);
                    setSelectedDailyOption(null);
                    setSubmittedDaily(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    activeQuestionIdx === idx 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-750 font-bold' 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="text-xs">Sprint #{idx + 1} ({q.difficulty})</span>
                </button>
              ))}
            </div>

            {/* Question body */}
            <div className="lg:col-span-9 space-y-4 bg-slate-50 dark:bg-slate-955 p-5 rounded-xl border border-slate-200 dark:border-slate-800 font-serif">
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {currentDailyQ.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-sans text-xs">
                {currentDailyQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => !submittedDaily && setSelectedDailyOption(idx)}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      selectedDailyOption === idx 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold ring-1 ring-indigo-500' 
                        : 'bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {submittedDaily ? (
                <div className="mt-4 p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-500/20 space-y-1.5 text-xs font-sans">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Solution Framework:
                  </div>
                  <p className="font-serif leading-relaxed">{currentDailyQ.explanation}</p>
                </div>
              ) : (
                <button
                  onClick={() => setSubmittedDaily(true)}
                  disabled={selectedDailyOption === null}
                  className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-650 text-white text-xs font-bold rounded-xl shadow-sm disabled:opacity-50"
                >
                  Submit Practice Answer
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeCategory === cat 
                ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Concept Flashcards & Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcepts.map((concept) => {
          const isOpen = openSolutionId === concept.id;
          const categoryColors = {
            'Quantitative Aptitude': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            'Logical Reasoning': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            'Reading Comprehension': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }[concept.category];

          return (
            <div key={concept.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between gap-4 shadow-xl hover:border-slate-700 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${categoryColors}`}>
                    {concept.category}
                  </span>
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                </div>

                <h3 className="text-base font-bold text-white font-serif">{concept.title}</h3>

                {/* Formula / Rule box */}
                <div className="bg-slate-955 p-3.5 rounded-xl border border-slate-800/80 text-xs text-amber-300 leading-relaxed font-mono">
                  <span className="text-slate-500 font-sans block mb-1 uppercase text-[10px] font-bold tracking-wider">⚡ Core Rule / Formula:</span>
                  {concept.formulaOrRule}
                </div>

                {/* Example Problem */}
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
                  <span className="text-slate-400 text-xs font-bold block">🎯 UPSC CSAT PYQ Example:</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-serif">
                    {concept.exampleProblem}
                  </p>
                </div>
              </div>

              {/* Solution Toggle */}
              <div>
                <button
                  onClick={() => toggleSolution(concept.id)}
                  className="w-full py-2 px-3 bg-slate-855 hover:bg-slate-700/80 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-between transition-colors border border-slate-700"
                >
                  <span>{isOpen ? 'Hide Step-by-Step Solution' : 'Reveal Step-by-Step Solution'}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-amber-400" />}
                </button>

                {isOpen && (
                  <div className="mt-2 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 leading-relaxed animate-fade-in space-y-1">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Official Approach:
                    </div>
                    {concept.exampleSolution}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Tip Box */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950/80 border border-indigo-500/30 rounded-2xl p-6 shadow-lg flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <strong className="text-white block font-sans text-sm">💡 Exam Hall Strategy for CSAT:</strong>
          <p className="text-slate-300 leading-relaxed font-serif">
            Do not get stuck on a difficult permutation or probability question for 6 minutes. Always attempt 25-28 easy Reading Comprehension questions first, then scan the paper for simple Data Interpretation and basic arithmetic. Accuracy is your best friend.
          </p>
        </div>
      </div>
    </div>
  );
};
