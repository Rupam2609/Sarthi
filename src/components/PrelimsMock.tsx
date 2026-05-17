import React, { useState, useEffect } from 'react';
import { Award, Clock, CheckCircle2, XCircle, RotateCcw, HelpCircle, Check, Flag } from 'lucide-react';
import { PrelimsQuestion } from '../types';

interface PrelimsMockProps {
  questions: PrelimsQuestion[];
}

export const PrelimsMock: React.FC<PrelimsMockProps> = ({ questions }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [key: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60); // 15 mins
  const [scoreData, setScoreData] = useState<{
    score: number;
    correct: number;
    incorrect: number;
    unattempted: number;
  } | null>(null);

  useEffect(() => {
    let timer: any;
    if (!isSubmitted && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            handleSubmit();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSubmitted, secondsLeft]);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIdx });
  };

  const toggleReview = (qId: string) => {
    setMarkedForReview({ ...markedForReview, [qId]: !markedForReview[qId] });
  };

  const handleSubmit = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    questions.forEach(q => {
      const userAns = selectedAnswers[q.id];
      if (userAns === undefined) {
        unattempted += 1;
      } else if (userAns === q.correctAnswer) {
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    // UPSC Marking: +2 for correct, -0.66 for incorrect
    const score = Number((correct * 2 - incorrect * 0.66).toFixed(2));
    setScoreData({ score, correct, incorrect, unattempted });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setMarkedForReview({});
    setIsSubmitted(false);
    setSecondsLeft(15 * 60);
    setCurrentIdx(0);
    setScoreData(null);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Intro & Timer banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-amber-950/40 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Prelims Paper 1 GS Simulator</span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">
            UPSC Negative Marking Challenge (+2.00 / -0.66)
          </h2>
          <p className="text-slate-300 text-xs mt-1">
            Test your elimination techniques under strict exam time limits.
          </p>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-3 bg-slate-900/90 px-5 py-3 rounded-2xl border border-slate-700/80 shadow-inner text-center shrink-0">
          <Clock className={`w-6 h-6 ${secondsLeft < 180 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
          <div>
            <div className={`text-2xl font-mono font-black ${secondsLeft < 180 ? 'text-red-400' : 'text-amber-400'}`}>
              {formatTime(secondsLeft)}
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Remaining Time</div>
          </div>
        </div>
      </div>

      {isSubmitted && scoreData ? (
        /* Results Report Card */
        <div className="bg-gradient-to-tr from-slate-800 via-slate-900 to-indigo-950/80 rounded-2xl border border-amber-500/40 p-6 md:p-8 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <Award className="w-8 h-8 animate-bounce" />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-extrabold text-white">
              Mock Assessment Report
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Based on official UPSC Prelims marking scheme.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-black text-amber-400 font-mono">{scoreData.score}</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold">Net Score (out of {questions.length * 2})</div>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30 text-center">
              <div className="text-3xl font-black text-emerald-400 font-mono">{scoreData.correct}</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold">Correct (+2.00)</div>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-red-500/30 text-center">
              <div className="text-3xl font-black text-red-400 font-mono">{scoreData.incorrect}</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold">Incorrect (-0.66)</div>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-black text-slate-400 font-mono">{scoreData.unattempted}</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold">Unattempted (0.00)</div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={handleReset}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Retake Mock Exam
            </button>
          </div>
        </div>
      ) : null}

      {/* Main Grid: Left Question Navigator, Right Question View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Navigator Palette */}
        <div className="lg:col-span-4 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl self-start">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Question Palette ({Object.keys(selectedAnswers).length}/{questions.length})
            </h4>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500/80 border border-emerald-400 inline-block shrink-0" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3.5 h-3.5 rounded bg-amber-500/80 border border-amber-400 inline-block shrink-0" />
              <span>Marked Review</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 col-span-2">
              <span className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-600 inline-block shrink-0" />
              <span>Not Attempted</span>
            </div>
          </div>

          {/* Number Grid */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {questions.map((q, idx) => {
              const isSelected = selectedAnswers[q.id] !== undefined;
              const isReview = markedForReview[q.id];
              const isCurrent = currentIdx === idx;

              let btnClass = "bg-slate-900 text-slate-300 border-slate-700";
              if (isSelected && isReview) {
                btnClass = "bg-gradient-to-br from-emerald-500 to-amber-500 text-slate-950 font-black border-amber-400";
              } else if (isReview) {
                btnClass = "bg-amber-500 text-slate-950 font-black border-amber-400";
              } else if (isSelected) {
                btnClass = "bg-emerald-500 text-slate-950 font-black border-emerald-400";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-11 rounded-xl text-sm font-bold border flex items-center justify-center transition-all ${btnClass} ${
                    isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105 shadow-md' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isSubmitted && (
            <div className="pt-4 border-t border-slate-700">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" /> Final Submit Paper
              </button>
            </div>
          )}
        </div>

        {/* Right Active Question View */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-800/95 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-lg text-sm">
                  Q{currentIdx + 1} of {questions.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-700 font-sans font-semibold">
                  {currentQ.subject}
                </span>
              </div>

              <span className={`px-2.5 py-0.5 rounded font-bold font-sans ${
                currentQ.difficulty === 'Tough' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                currentQ.difficulty === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {currentQ.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <div className="text-base md:text-lg font-serif font-bold text-white leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                const isCorrectAnswer = isSubmitted && currentQ.correctAnswer === optIdx;
                const isWrongAnswer = isSubmitted && isSelected && currentQ.correctAnswer !== optIdx;

                let optionStyle = "bg-slate-900/80 border-slate-700 hover:border-slate-600 text-slate-300";
                if (isCorrectAnswer) {
                  optionStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500";
                } else if (isWrongAnswer) {
                  optionStyle = "bg-red-950/80 border-red-500 text-red-200 font-bold ring-1 ring-red-500";
                } else if (isSelected) {
                  optionStyle = "bg-amber-500/20 border-amber-500 text-white font-bold ring-1 ring-amber-500/50";
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${optionStyle}`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 ${
                      isCorrectAnswer ? 'bg-emerald-500 text-slate-950' :
                      isWrongAnswer ? 'bg-red-500 text-white' :
                      isSelected ? 'bg-amber-500 text-slate-950 font-black' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="text-sm leading-snug flex-1">{opt}</span>

                    {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 self-center" />}
                    {isWrongAnswer && <XCircle className="w-5 h-5 text-red-400 shrink-0 self-center" />}
                  </div>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {isSubmitted && (
              <div className="mt-6 bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-2 animate-fade-in">
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Official UPSC Explanation & Rationale
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Bottom Nav actions */}
            <div className="pt-6 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3 font-medium">
              {!isSubmitted && (
                <button
                  onClick={() => toggleReview(currentQ.id)}
                  className={`px-4 py-2 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                    markedForReview[currentQ.id]
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border-slate-700'
                  }`}
                >
                  <Flag className={`w-4 h-4 ${markedForReview[currentQ.id] ? 'text-amber-400 fill-amber-400' : ''}`} />
                  {markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs border border-slate-700"
                >
                  &larr; Previous
                </button>
                <button
                  onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentIdx === questions.length - 1}
                  className="bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-600 text-slate-950 font-black px-5 py-2 rounded-xl text-xs shadow-md"
                >
                  Next Question &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
