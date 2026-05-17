import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  CheckSquare, 
  AlertCircle,
  Filter,
  Award,
  Sparkles
} from 'lucide-react';
import { Task } from '../types';

interface DailyPlannerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  studyHours: number;
  setStudyHours: React.Dispatch<React.SetStateAction<number>>;
  incrementStreak: () => void;
  onActivityUpdate?: () => void;
  syllabusCoverage?: number;
  booklistCoverage?: number;
}

export const DailyPlanner: React.FC<DailyPlannerProps> = ({
  tasks,
  setTasks,
  studyHours,
  setStudyHours,
  incrementStreak,
  onActivityUpdate,
  syllabusCoverage = 34,
  booklistCoverage = 42
}) => {
  // Pomodoro timer state
  const [timerMode, setTimerMode] = useState<'study' | 'break'>('study');
  const [workDuration, setWorkDuration] = useState(50); // 50 mins default
  const [breakDuration, setBreakDuration] = useState(10); // 10 mins default
  const [secondsLeft, setSecondsLeft] = useState(50 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('GS');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('Medium');
  const [newTaskHours, setNewTaskHours] = useState(1);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Daily Practice Questions (GS / CSAT / Mains)
  const [dailyCsatOption, setDailyCsatOption] = useState<number | null>(null);
  const [submittedCsat, setSubmittedCsat] = useState(false);
  const [mainsFeedback, setMainsFeedback] = useState('');
  const [showMainsFramework, setShowMainsFramework] = useState(false);

  const dailyGoalHours = 8;

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (timerMode === 'study') {
              const newCount = sessionsCompleted + 1;
              setSessionsCompleted(newCount);
              const hoursAdded = Math.round((workDuration / 60) * 10) / 10;
              setStudyHours((h) => {
                const updated = Math.min(24, Math.round((h + hoursAdded) * 10) / 10);
                if (updated >= dailyGoalHours) {
                  incrementStreak();
                }
                return updated;
              });
              setTimerMode('break');
              setSecondsLeft(breakDuration * 60);
              alert('🎯 Focus Session completed! Great job. Time for a short break.');
            } else {
              setTimerMode('study');
              setSecondsLeft(workDuration * 60);
              alert('⏳ Break over! Let\'s resume your UPSC preparation.');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerMode, workDuration, breakDuration, sessionsCompleted, setStudyHours, incrementStreak]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft((timerMode === 'study' ? workDuration : breakDuration) * 60);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        return { ...t, completed: nextState };
      }
      return t;
    }));
    if (onActivityUpdate) onActivityUpdate();
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      completed: false,
      priority: newTaskPriority,
      estimatedHours: newTaskHours
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const filteredTasks = filterCategory === 'All' 
    ? tasks 
    : tasks.filter(t => t.category === filterCategory);

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasksCount = tasks.length;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 transition-all">
      
      {/* Premium Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-amber-500/5 to-purple-500/10 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>IAS / IPS Command Dashboard</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Your Daily Journey to LBSNAA Mussoorie
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl leading-relaxed">
              Monitor your comprehensive metrics, run Pomodoro deep focus sprints, practice daily CSAT / GS questions, and manage study routines in one premium integrated panel.
            </p>
          </div>

          {/* Core Tracker Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Study Sprints</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-1">{studyHours}h logged</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Syllabus Done</div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono mt-1">{syllabusCoverage}%</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Booklist Progress</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">{booklistCoverage}%</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Targets Done</div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1">{completedTasksCount}/{totalTasksCount}</div>
            </div>
          </div>
        </div>

        {/* Study Progress Goal Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2 text-sm font-semibold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-500" />
              Deep Focus Sprint Progress
            </span>
            <span className="text-amber-600 dark:text-amber-400">{Math.min(100, Math.round((studyHours / dailyGoalHours) * 100))}% Daily Goal</span>
          </div>
          <div className="h-3.5 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-850">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, (studyHours / dailyGoalHours) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Layout Sprints & Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT Sprints & Practice */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Pomodoro Study Simulator (Prominent on Home) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Pomodoro Deep Focus Simulator
              </h3>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-850 text-xs">
                <button
                  onClick={() => {
                    setTimerMode('study');
                    setIsRunning(false);
                    setSecondsLeft(workDuration * 60);
                  }}
                  className={`px-3 py-1 rounded-md transition-all font-medium ${timerMode === 'study' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-550 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
                >
                  Study ({workDuration}m)
                </button>
                <button
                  onClick={() => {
                    setTimerMode('break');
                    setIsRunning(false);
                    setSecondsLeft(breakDuration * 60);
                  }}
                  className={`px-3 py-1 rounded-md transition-all font-medium ${timerMode === 'break' ? 'bg-indigo-500 text-white font-bold shadow-sm' : 'text-slate-550 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
                >
                  Break ({breakDuration}m)
                </button>
              </div>
            </div>

            <div className="text-center my-8 p-6 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-inner">
              <div className="text-6xl md:text-7xl font-mono font-black tracking-tight text-amber-500 dark:text-amber-400 drop-shadow-sm">
                {formatTime(secondsLeft)}
              </div>
              <p className="mt-3 text-xs text-slate-555 dark:text-slate-400 uppercase tracking-widest font-semibold">
                {timerMode === 'study' ? '🔥 Deep Study Interval' : '☕ Active Recovery Break'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleStartStop}
                className={`flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 text-base transition-all transform active:scale-95 shadow-lg ${
                  isRunning 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20' 
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 shadow-amber-500/20 font-extrabold'
                }`}
              >
                {isRunning ? <><Pause className="w-5 h-5 fill-current" /> Pause Sprint</> : <><Play className="w-5 h-5 fill-current" /> Start Study Sprint</>}
              </button>
              
              <button
                onClick={handleReset}
                title="Reset Timer"
                className="p-3 bg-slate-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 rounded-xl transition-all border border-slate-200 dark:border-slate-700"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-555 dark:text-slate-300 gap-3">
              <div>
                <span className="text-slate-455 dark:text-slate-400">Study Mode:</span> 
                <select 
                  value={workDuration} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setWorkDuration(val);
                    if (val === 25) setBreakDuration(5);
                    if (val === 50) setBreakDuration(10);
                    if (val === 90) setBreakDuration(15);
                    if (timerMode === 'study') setSecondsLeft(val * 60);
                  }}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-2 py-1 ml-2 text-amber-600 dark:text-amber-400 font-bold focus:outline-none"
                >
                  <option value={25}>25m study / 5m break</option>
                  <option value={50}>50m study / 10m break</option>
                  <option value={90}>90m study / 15m break</option>
                </select>
              </div>

              <div>
                <span className="text-slate-455 dark:text-slate-400">Sprint weight:</span>
                <input 
                  type="number" 
                  min="0.5" 
                  step="0.5" 
                  value={newTaskHours} 
                  onChange={(e) => setNewTaskHours(Number(e.target.value))} 
                  className="w-16 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-2 py-0.5 ml-2 text-amber-600 dark:text-amber-400 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Manual Study Log Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-500" />
              Add Manual Offline Study Hours
            </h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((hr) => (
                <button
                  key={hr}
                  onClick={() => {
                    setStudyHours((prev) => {
                      const updated = Math.min(24, prev + hr);
                      if (updated >= dailyGoalHours && prev < dailyGoalHours) {
                        incrementStreak();
                      }
                      return updated;
                    });
                  }}
                  className="flex-1 py-2 bg-slate-50 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800/80 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-xl border border-slate-250 dark:border-slate-800 transition-all"
                >
                  + {hr} hr
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT Daily Targets */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Daily Practice GS/CSAT practice questions box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <Award className="w-5 h-5 text-amber-500" />
              Daily Civil Services Practice Sprints (Option B)
            </h3>

            {/* Tabbed practicing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Daily CSAT Question */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-955 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-indigo-500 uppercase tracking-wider">Daily CSAT Practice</span>
                  <span className="text-amber-500">Quantitative Aptitude</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300 font-serif leading-relaxed">
                  In a class, 60% of students are girls and rest are boys. 30% of girls and 50% of boys passed the CSAT mock exam. What percentage of total students failed?
                </p>

                <div className="space-y-1.5 pt-1 text-[11px] font-sans">
                  {['54%', '62%', '68%', '72%'].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => !submittedCsat && setDailyCsatOption(idx)}
                      className={`w-full p-2 rounded border text-left flex items-center justify-between ${
                        dailyCsatOption === idx 
                          ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold' 
                          : 'bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                {submittedCsat ? (
                  <div className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-2 rounded border border-emerald-500/20 leading-relaxed">
                    Correct Answer: **62%**. Total girls = 60, boys = 40. Passed girls = 18, passed boys = 20. Total passed = 38, thus failed = 62%.
                  </div>
                ) : (
                  <button
                    onClick={() => setSubmittedCsat(true)}
                    disabled={dailyCsatOption === null}
                    className="w-full py-2 bg-indigo-500 hover:bg-indigo-650 disabled:opacity-50 text-white text-[11px] font-bold rounded-lg transition-all"
                  >
                    Submit Answer
                  </button>
                )}
              </div>

              {/* Daily Mains Answer Structurer */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-955 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-purple-500 uppercase tracking-wider">Daily GS Mains Question</span>
                  <span className="text-amber-500">GS Paper III</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300 font-serif leading-relaxed">
                  Discuss the dynamic relationship between technology transfer and industrialization in the context of PM Gati Shakti. (10 Marks, 150 Words)
                </p>

                <textarea
                  rows={3}
                  value={mainsFeedback}
                  onChange={(e) => setMainsFeedback(e.target.value)}
                  placeholder="Type structure ideas, constitutional articles, or statistics points here..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:outline-none font-serif"
                />

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setShowMainsFramework(!showMainsFramework)}
                    className="flex-1 py-2 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-lg border border-slate-250 dark:border-slate-800 transition-all"
                  >
                    {showMainsFramework ? 'Hide Framework' : '💡 View Framework'}
                  </button>
                  <button
                    onClick={() => alert('🚀 Structure saved to daily answer vault! Practice makes perfect.')}
                    className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white text-[11px] font-bold rounded-lg transition-all"
                  >
                    Submit Answer
                  </button>
                </div>

                {showMainsFramework && (
                  <div className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 p-3 rounded border border-purple-500/20 leading-relaxed space-y-1 font-serif">
                    <strong>Introduction:</strong> Define PM Gati Shakti (Logistics, 7 Engines).
                    <strong>Body Points:</strong> Technology integration in logistics lowers operational costs from 14% to 8% of GDP.
                    <strong>Conclusion:</strong> Link to National Logistics Policy (NLP) & SDG 9.
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Daily Tasks Target list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-amber-500" />
                  Daily Targets & Tasks ({completedTasksCount}/{totalTasksCount})
                </h3>
                <p className="text-xs text-slate-500">Organize your GS, Sociology Optional, and Current Affairs goals</p>
              </div>

              {/* Filter categories */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 mr-1"><Filter className="w-3 h-3" /> Filter:</span>
                {['All', 'GS', 'Optional', 'Current Affairs', 'CSAT', 'Mock Test'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                      filterCategory === cat 
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-955 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Add Form */}
            <form onSubmit={addTask} className="bg-slate-50 dark:bg-slate-955 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 space-y-3">
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">➕ Add New Study Target</div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="e.g. Read The Hindu Editorial & make notes..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as Task['category'])}
                    className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="GS">GS</option>
                    <option value="Optional">Optional</option>
                    <option value="Current Affairs">Current Affairs</option>
                    <option value="CSAT">CSAT</option>
                    <option value="Revision">Revision</option>
                    <option value="Mock Test">Mock Test</option>
                  </select>

                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                    className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-2 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟡 Med</option>
                    <option value="Low">🟢 Low</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-all flex items-center justify-center gap-1 shadow-md shadow-amber-500/20 shrink-0"
                  >
                    <Plus className="w-4 h-4 font-extrabold" /> Add
                  </button>
                </div>
              </div>
            </form>

            {/* Target List items */}
            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 dark:bg-slate-955 rounded-xl border border-dashed border-slate-250 dark:border-slate-800">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-medium">No study targets found in this category.</p>
                </div>
              ) : (
                filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      t.completed 
                        ? 'bg-slate-50 dark:bg-slate-955 border-slate-200 dark:border-slate-900 opacity-60' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-805 hover:border-slate-400 dark:hover:border-slate-750'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <button
                        onClick={() => toggleTask(t.id)}
                        className="text-slate-400 hover:text-amber-500 transition-colors shrink-0"
                      >
                        {t.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/10" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-semibold truncate ${t.completed ? 'line-through text-slate-455' : 'text-slate-900 dark:text-slate-200'}`}>
                          {t.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-950 text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-850 uppercase tracking-wider font-mono">
                            {t.category}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            t.priority === 'High' ? 'text-red-600 bg-red-500/10 border border-red-500/20' :
                            t.priority === 'Medium' ? 'text-yellow-600 bg-yellow-500/10 border border-yellow-500/20' :
                            'text-emerald-600 bg-emerald-500/10 border border-emerald-500/20'
                          }`}>
                            {t.priority}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" /> ~{t.estimatedHours}h
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(t.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg ml-2 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
