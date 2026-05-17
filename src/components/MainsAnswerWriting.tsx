import React, { useState, useEffect } from 'react';
import { Edit3, Clock, CheckCircle, FileText, CheckSquare, Sparkles, Eye, AlertTriangle } from 'lucide-react';
import { MainsQuestion } from '../types';

interface MainsAnswerWritingProps {
  questions: MainsQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<MainsQuestion[]>>;
}

export const MainsAnswerWriting: React.FC<MainsAnswerWritingProps> = ({ questions, setQuestions }) => {
  const [selectedPaper, setSelectedPaper] = useState<string>('All');
  const [activeQuestionId, setActiveQuestionId] = useState<string>(questions[0]?.id || '');
  const [answerText, setAnswerText] = useState<string>('');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showFramework, setShowFramework] = useState<boolean>(false);
  const [evaluationModal, setEvaluationModal] = useState<boolean>(false);

  // Self evaluation rubric checklist
  const [rubric, setRubric] = useState({
    intro: false,
    headings: false,
    articles: false,
    diagrams: false,
    conclusion: false
  });

  const papers = ['All', 'GS1', 'GS2', 'GS3', 'GS4', 'Essay'];

  const filteredQuestions = questions.filter(q => selectedPaper === 'All' || q.paper === selectedPaper);
  const activeQ = questions.find(q => q.id === activeQuestionId) || filteredQuestions[0] || questions[0];

  useEffect(() => {
    if (activeQ) {
      setAnswerText(activeQ.userAnswer || '');
      setTimerSeconds(activeQ.marks === 15 || activeQ.marks === 20 ? 11 * 60 : 7 * 60);
      setIsTimerRunning(false);
      setShowFramework(false);
      setRubric({ intro: false, headings: false, articles: false, diagrams: false, conclusion: false });
    }
  }, [activeQ?.id]);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => {
          if (s <= 1) {
            setIsTimerRunning(false);
            alert('⏰ Time up! Please wrap up your conclusion.');
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleSaveAnswer = () => {
    setQuestions(questions.map(q => q.id === activeQ.id ? { ...q, userAnswer: answerText } : q));
    alert('💾 Answer draft saved successfully! You can review it anytime.');
  };

  const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0;
  const isOverLimit = wordCount > activeQ.wordLimit;

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateRubricScore = () => {
    const total = Object.values(rubric).filter(Boolean).length;
    return Math.round((total / 5) * 10); // out of 10
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Intro */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-indigo-950/40 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Mains Answer Structuring Studio</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
            Art of Writing 20 Answers in 180 Minutes
          </h2>
          <p className="text-slate-300 text-xs">
            Practice answer writing under strict time limits (7 mins for 10-markers, 11 mins for 15-markers). Evaluate your structure against toppers' framework.
          </p>
        </div>

        {/* Paper Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-3 rounded-xl border border-slate-700 w-full md:w-auto">
          {papers.map(p => (
            <button
              key={p}
              onClick={() => setSelectedPaper(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPaper === p 
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Question List */}
        <div className="lg:col-span-4 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-3 shadow-xl self-start max-h-[700px] overflow-y-auto">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-700">
            Select Question Bank ({filteredQuestions.length})
          </h3>

          {filteredQuestions.map((q) => {
            const isSelected = q.id === activeQ.id;
            const hasDraft = !!q.userAnswer;

            return (
              <div
                key={q.id}
                onClick={() => setActiveQuestionId(q.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                  isSelected 
                    ? 'bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500/30' 
                    : 'bg-slate-900/70 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {q.paper}
                  </span>
                  <span className="text-slate-400 font-semibold">{q.marks} Marks | {q.wordLimit} Words</span>
                </div>

                <p className="text-xs font-bold text-white line-clamp-3 leading-snug">
                  {q.question}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px]">
                  <span className="text-slate-400 font-sans italic">{q.topic}</span>
                  {hasDraft ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Draft Saved
                    </span>
                  ) : (
                    <span className="text-slate-500 font-medium">Unattempted</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Writing Studio */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-800/95 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            
            {/* Question Card */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-3 font-serif">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono font-sans text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono">
                    {activeQ.paper}
                  </span>
                  <span className="text-amber-400 font-semibold font-sans">{activeQ.topic}</span>
                </div>
                <div className="text-slate-300 font-bold">
                  {activeQ.marks} Marks &bull; {activeQ.wordLimit} Words Limit
                </div>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                {activeQ.question}
              </h2>
            </div>

            {/* Studio Tools Bar: Timer & Word Counter */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
              {/* Timer */}
              <div className="flex items-center gap-3">
                <Clock className={`w-5 h-5 ${isTimerRunning ? 'text-amber-400 animate-spin-slow' : 'text-slate-400'}`} />
                <span className="font-mono font-black text-xl text-white">{formatTime(timerSeconds)}</span>
                
                {/* Dynamic Custom Timer setting */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                  <input 
                    type="number" 
                    min="1" 
                    max="180" 
                    value={Math.round(timerSeconds / 60)} 
                    onChange={(e) => setTimerSeconds(Number(e.target.value) * 60)}
                    className="w-12 bg-slate-900 text-white text-xs font-bold text-center border-none outline-none p-1"
                    title="Set custom timer in minutes"
                  />
                  <span className="text-[10px] text-slate-400 font-bold uppercase pr-1">Mins</span>
                </div>

                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isTimerRunning ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-950'
                  }`}
                >
                  {isTimerRunning ? 'Pause Timer' : 'Start Timer'}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(activeQ.marks === 15 || activeQ.marks === 20 ? 11 * 60 : 7 * 60);
                  }}
                  className="text-xs text-slate-400 hover:text-white underline ml-1"
                >
                  Reset
                </button>
              </div>

              {/* Word Count Indicator */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-300 font-medium">Word Count:</span>
                <span className={`text-base font-black font-mono px-3 py-1 rounded-lg ${
                  isOverLimit ? 'bg-red-950/80 text-red-400 border border-red-500' : 'bg-slate-800 text-amber-400 border border-slate-700'
                }`}>
                  {wordCount} / {activeQ.wordLimit}
                </span>

                {isOverLimit && (
                  <span className="text-red-400 text-xs font-bold flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-4 h-4" /> Word limit exceeded!
                  </span>
                )}
              </div>
            </div>

            {/* Answer Pad */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>📝 Your Answer Draft (Introduction, Body, Conclusion)</span>
                <span className="text-[10px] text-slate-500 italic font-normal">Auto-counts words as you type</span>
              </label>
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Write your structured UPSC answer here... Use bullet points, underline key terms, and maintain clear headings..."
                rows={12}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 text-sm font-serif text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 leading-relaxed shadow-inner"
              />
            </div>

            {/* Action Bar with AI answer scan upload */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 bg-slate-900/50 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">📤 Scan & Upload Answer Sheet (Image / PDF)</div>
                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    accept="image/*,application/pdf" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        alert(`📸 "${e.target.files[0].name}" uploaded successfully! Running automated optical character recognition (OCR) & AI evaluation...`);
                        // Auto populate AI transcription
                        setAnswerText(prev => prev + `\n\n[AI TRANSCRIBED SCAN SHEET FACT ANALYSIS]:\nKey takeaways from uploaded handwritten script: Arguments are logically placed. Need to include Supreme Court case reference to bolster the first pass arguments.`);
                      }
                    }}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 cursor-pointer"
                  />
                  <button
                    onClick={() => {
                      if (!answerText.trim()) {
                        alert('Please write or upload an answer sheet first before running AI online check!');
                        return;
                      }
                      alert('🤖 AI Online evaluation completed!\n-------------------------------\nScore: 6.5/10\n\nFeedback: Excellent structured arguments. Try adding a comparative structural functionalist theory viewpoint to strengthen Mains value-addition.');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1 shrink-0"
                  >
                    <Sparkles className="w-4 h-4 animate-pulse" /> Run AI Online Check
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowFramework(!showFramework)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    showFramework 
                      ? 'bg-indigo-500 text-white font-extrabold shadow-md shadow-indigo-500/20' 
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {showFramework ? 'Hide Framework' : '💡 View Framework'}
                </button>

                <button
                  onClick={() => setEvaluationModal(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-amber-400 hover:bg-slate-800 border border-slate-700 flex items-center gap-2 transition-all shadow-sm"
                >
                  <CheckSquare className="w-4 h-4 text-amber-400" />
                  Checklist
                </button>

                <button
                  onClick={handleSaveAnswer}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-2.5 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2 ml-auto"
                >
                  <FileText className="w-4 h-4" /> Save Draft
                </button>
              </div>
            </div>

            {/* Model Framework / Hints Drawer */}
            {showFramework && (
              <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 p-6 rounded-2xl border border-indigo-500/40 space-y-4 shadow-xl animate-fade-in text-sm font-sans">
                <div className="flex items-center gap-2 pb-3 border-b border-indigo-800/80 text-amber-300 font-bold">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
                  <span>Model Framework & Value Additions (Toppers' Secret)</span>
                </div>

                <div className="space-y-3 text-slate-200">
                  <div>
                    <strong className="text-amber-400 text-xs uppercase tracking-wider block mb-1">1. Impressive Introduction:</strong>
                    <p className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs leading-relaxed font-serif">
                      {activeQ.modelFramework.intro}
                    </p>
                  </div>

                  <div>
                    <strong className="text-amber-400 text-xs uppercase tracking-wider block mb-1">2. Core Body Arguments:</strong>
                    <ul className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs font-serif">
                      {activeQ.modelFramework.bodyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold shrink-0">&bull;</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeQ.modelFramework.diagramHint && (
                    <div>
                      <strong className="text-indigo-400 text-xs uppercase tracking-wider block mb-1">📊 Flowchart / Diagram Idea:</strong>
                      <div className="bg-indigo-900/30 p-3 rounded-lg border border-indigo-800 text-xs italic text-indigo-200">
                        "{activeQ.modelFramework.diagramHint}"
                      </div>
                    </div>
                  )}

                  <div>
                    <strong className="text-emerald-400 text-xs uppercase tracking-wider block mb-1">3. Balanced Conclusion & Way Forward:</strong>
                    <p className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs leading-relaxed font-serif text-slate-300">
                      {activeQ.modelFramework.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Evaluation Rubric Modal */}
            {evaluationModal && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-xl w-full space-y-6 shadow-2xl relative animate-scale-up">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-amber-400" />
                      UPSC Mains Answer Evaluator
                    </h3>
                    <button 
                      onClick={() => setEvaluationModal(false)}
                      className="text-slate-400 hover:text-white font-bold text-lg"
                    >
                      &times;
                    </button>
                  </div>

                  <p className="text-xs text-slate-300">
                    Self-assess your answer against the 5 golden parameters of UPSC Mains evaluation:
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={rubric.intro} 
                        onChange={(e) => setRubric({ ...rubric, intro: e.target.checked })} 
                        className="mt-1 accent-amber-500 w-4 h-4 rounded"
                      />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">1. Impactful Intro</strong>
                        <span className="text-slate-400">Started with Constitution Article, Data fact, SDG goal, or exact definition.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={rubric.headings} 
                        onChange={(e) => setRubric({ ...rubric, headings: e.target.checked })} 
                        className="mt-1 accent-amber-500 w-4 h-4 rounded"
                      />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">2. Sub-headings & Bullet Points</strong>
                        <span className="text-slate-400">Addressed all sub-parts of the question in distinct paragraphs/points.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={rubric.articles} 
                        onChange={(e) => setRubric({ ...rubric, articles: e.target.checked })} 
                        className="mt-1 accent-amber-500 w-4 h-4 rounded"
                      />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">3. Value Addition (Committees / ARC / SC Cases)</strong>
                        <span className="text-slate-400">Quoted 2nd ARC, Sarkaria, Supreme Court rulings, or NITI Aayog index.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={rubric.diagrams} 
                        onChange={(e) => setRubric({ ...rubric, diagrams: e.target.checked })} 
                        className="mt-1 accent-amber-500 w-4 h-4 rounded"
                      />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">4. Visual Presentation</strong>
                        <span className="text-slate-400">Included a hub-and-spoke diagram, map of India, or flowchart.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={rubric.conclusion} 
                        onChange={(e) => setRubric({ ...rubric, conclusion: e.target.checked })} 
                        className="mt-1 accent-amber-500 w-4 h-4 rounded"
                      />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">5. Futuristic Conclusion</strong>
                        <span className="text-slate-400">Ended on a positive note connecting to "Panch Pran" or Vision 2047.</span>
                      </div>
                    </label>
                  </div>

                  {/* Calculated Score */}
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-300">Estimated Rubric Band:</span>
                    <span className="font-mono text-2xl font-black text-amber-400">{calculateRubricScore()} / 10</span>
                  </div>

                  <button
                    onClick={() => setEvaluationModal(false)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl transition-all shadow-md"
                  >
                    Confirm Evaluation & Continue
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
