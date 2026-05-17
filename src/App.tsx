import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DailyPlanner } from './components/DailyPlanner';
import { SyllabusTracker } from './components/SyllabusTracker';
import { CurrentAffairs } from './components/CurrentAffairs';
import { PrelimsMock } from './components/PrelimsMock';
import { MainsAnswerWriting } from './components/MainsAnswerWriting';
import { CsatHub } from './components/CsatHub';
import { ResourceLibrary } from './components/ResourceLibrary';
import { NotesPad } from './components/NotesPad';

import { 
  initialSyllabus, 
  mockCurrentAffairs, 
  mockPrelimsQuestions, 
  mockMainsQuestions, 
  mockCsatConcepts, 
  mockResources,
  mockSociologyThinkers
} from './data/mockData';
import { Task, SyllabusItem, CurrentAffairsArticle, MainsQuestion, ResourceBook, NoteItem, SociologyThinker } from './types';
import { Compass, ExternalLink, Heart, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { SociologyHub } from './components/SociologyHub';
import { AISearchHub } from './components/AISearchHub';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('planner');
  
  // Night Light Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('upsc_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  // Customizable countdown date state
  const [prelimsDate, setPrelimsDate] = useState<string>(() => {
    const saved = localStorage.getItem('upsc_prelims_date');
    return saved || '2026-05-24';
  });

  useEffect(() => {
    localStorage.setItem('upsc_prelims_date', prelimsDate);
  }, [prelimsDate]);

  // Persistence keys
  const STREAK_KEY = 'upsc_streak_days';
  const HOURS_KEY = 'upsc_logged_hours';
  const TASKS_KEY = 'upsc_tasks';
  const SYLLABUS_KEY = 'upsc_syllabus';
  const NOTES_KEY = 'upsc_notes';
  const RESOURCES_KEY = 'upsc_resources';
  const MAINS_KEY = 'upsc_mains_answers';

  // Load Initial state or from LocalStorage
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem(STREAK_KEY);
    return saved ? parseInt(saved, 10) : 18;
  });

  const [studyHours, setStudyHours] = useState<number>(() => {
    const saved = localStorage.getItem(HOURS_KEY);
    return saved ? parseFloat(saved) : 3.5;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(TASKS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: '1', title: 'Read The Hindu & make 1-page notes', category: 'Current Affairs', completed: true, priority: 'High', estimatedHours: 1.5 },
      { id: '2', title: 'Revise Polity Laxmikanth Ch 12 (Parliament)', category: 'GS', completed: false, priority: 'High', estimatedHours: 2.5 },
      { id: '3', title: 'Write 2 Mains GS2 Answers in Studio', category: 'Mock Test', completed: false, priority: 'High', estimatedHours: 1 },
      { id: '4', title: 'CSAT PYQ 2023 - Solve 15 Math Questions', category: 'CSAT', completed: false, priority: 'Medium', estimatedHours: 1.5 },
      { id: '5', title: 'Optional Subject Paper 1 revision', category: 'Optional', completed: false, priority: 'High', estimatedHours: 2 }
    ];
  });

  const [syllabus, setSyllabus] = useState<SyllabusItem[]>(() => {
    const saved = localStorage.getItem(SYLLABUS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialSyllabus;
  });

  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffairsArticle[]>(mockCurrentAffairs);
  const [prelimsQuestions] = useState(mockPrelimsQuestions);

  const [mainsQuestions, setMainsQuestions] = useState<MainsQuestion[]>(() => {
    const saved = localStorage.getItem(MAINS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockMainsQuestions;
  });

  const [csatConcepts] = useState(mockCsatConcepts);

  const [resources, setResources] = useState<ResourceBook[]>(() => {
    const saved = localStorage.getItem(RESOURCES_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockResources;
  });

  // Sociology Thinkers Persistence State
  const [thinkers, setThinkers] = useState<SociologyThinker[]>(() => {
    const saved = localStorage.getItem('upsc_thinkers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockSociologyThinkers;
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem(NOTES_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'n-1',
        title: 'Important Supreme Court Judgments (Polity GS2)',
        category: 'Polity & Judgments',
        content: `1. Kesavananda Bharati (1973): Basic Structure Doctrine. Parliament cannot alter basic framework.
2. S.R. Bommai (1994): Secularism is basic structure. Federalism & Article 356 misuse safeguards.
3. K.S. Puttaswamy (2017): Right to Privacy is intrinsic to life & liberty under Article 21.
4. Indra Sawhney (1992): 50% reservation ceiling rule & creamy layer exclusion.`,
        updatedAt: 'Mar 30, 2026'
      },
      {
        id: 'n-2',
        title: 'Key Economic Data Points (Budget 2026 / GS3)',
        category: 'Economy Stats & Data',
        content: `- Fiscal Deficit target: 4.5% of GDP by FY26.
- Direct Tax to Indirect tax ratio: 55:45 (reflecting progressivity).
- India's renewable energy capacity: > 200 GW (Goal: 500 GW by 2030).
- Agriculture share in GVA: ~18%, but employs ~45% of workforce.`,
        updatedAt: 'Mar 28, 2026'
      },
      {
        id: 'n-3',
        title: 'Ethics Quotes for Intro/Conclusion (GS4)',
        category: 'Ethics Quotes & Case Studies',
        content: `• "In law a man is guilty when he violates the rights of others. In ethics he is guilty if he only thinks of doing so." — Immanuel Kant
• "The best way to find yourself is to lose yourself in the service of others." — Mahatma Gandhi
• "Educating the mind without educating the heart is no education at all." — Aristotle`,
        updatedAt: 'Mar 25, 2026'
      }
    ];
  });

  // Apply class theme on HTML/body elements
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('upsc_theme', theme);
  }, [theme]);

  // Save to LocalStorage effects
  useEffect(() => { localStorage.setItem(STREAK_KEY, streakDays.toString()); }, [streakDays]);
  useEffect(() => { localStorage.setItem(HOURS_KEY, studyHours.toString()); }, [studyHours]);
  useEffect(() => { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem(SYLLABUS_KEY, JSON.stringify(syllabus)); }, [syllabus]);
  useEffect(() => { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources)); }, [resources]);
  useEffect(() => { localStorage.setItem(MAINS_KEY, JSON.stringify(mainsQuestions)); }, [mainsQuestions]);
  useEffect(() => { localStorage.setItem('upsc_thinkers', JSON.stringify(thinkers)); }, [thinkers]);

  const incrementStreak = () => {
    setStreakDays(prev => {
      const newStreak = prev + 1;
      return newStreak;
    });
  };

  // Auto-dynamic streak logic
  const checkAndUpdateStreak = () => {
    const completedTasks = tasks.filter(t => t.completed).length;
    const highPriorityDone = tasks.filter(t => t.priority === 'High' && t.completed).length;
    if (studyHours >= 8 && completedTasks >= 3 && highPriorityDone >= 2) {
      incrementStreak();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-slate-900 transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-50 text-slate-950' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        streakDays={streakDays} 
        theme={theme}
        setTheme={setTheme}
        prelimsDate={prelimsDate}
        setPrelimsDate={setPrelimsDate}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {activeTab === 'planner' && (
          <DailyPlanner 
            tasks={tasks} 
            setTasks={setTasks} 
            studyHours={studyHours} 
            setStudyHours={setStudyHours}
            incrementStreak={incrementStreak}
            onActivityUpdate={checkAndUpdateStreak}
            syllabusCoverage={Math.round((syllabus.filter(s => s.status === 'revised' || s.status === 'notes-done').length / syllabus.length) * 100)}
            booklistCoverage={Math.round((resources.filter(r => r.completed).length / resources.length) * 100)}
          />
        )}
        
        {activeTab === 'syllabus' && (
          <SyllabusTracker syllabus={syllabus} setSyllabus={setSyllabus} />
        )}
        
        {activeTab === 'current-affairs' && (
          <CurrentAffairs articles={currentAffairs} setArticles={setCurrentAffairs} />
        )}
        
        {activeTab === 'prelims' && (
          <PrelimsMock questions={prelimsQuestions} />
        )}
        
        {activeTab === 'mains' && (
          <MainsAnswerWriting questions={mainsQuestions} setQuestions={setMainsQuestions} />
        )}
        
        {activeTab === 'csat' && (
          <CsatHub concepts={csatConcepts} />
        )}
        
        {activeTab === 'resources' && (
          <ResourceLibrary resources={resources} setResources={setResources} />
        )}
        
        {activeTab === 'notes' && (
          <NotesPad notes={notes} setNotes={setNotes} />
        )}

        {activeTab === 'sociology' && (
          <SociologyHub thinkers={thinkers} setThinkers={setThinkers} />
        )}

        {activeTab === 'search-hub' && (
          <AISearchHub />
        )}
      </main>

      {/* UPSC Aspirant Helpful Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-serif">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <span className="text-xl font-bold tracking-tight">UPSC COMPASS</span>
            </div>
            <p className="text-xs leading-relaxed font-medium">
              The premier all-in-one digital workspace tailored specifically for IAS / IPS aspirants. Built to bring discipline, structure, and high-yield revision to your UPSC civil services preparation.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-semibold bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Offline-first storage: Your notes & progress are securely saved in your browser.</span>
            </div>
          </div>

          {/* Quick External Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">🏛️ Official Government Portals</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span>UPSC Official Portal</span> <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://ncert.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span>NCERT Online Textbooks</span> <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pib.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span>Press Information Bureau (PIB)</span> <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://darpg.gov.in/arc-reports" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span>2nd Administrative Reforms Commission</span> <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Golden Rules of Success */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">🎯 3 Pillars of IAS Preparation</h4>
            <ul className="space-y-2 text-xs font-serif text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Syllabus Fidelity:</strong> Memorize the Mains syllabus word-by-word.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Limited Sources:</strong> 1 source per topic + 10x multi-revisions.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Daily Answer Writing:</strong> Never wait for syllabus completion to start writing.</span>
              </li>
            </ul>
          </div>

          {/* Exam Disclaimer & Motivational quote */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">💡 Daily Motivational Targe</h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed font-serif">
              "Civil services preparation is a marathon of character, patience, and absolute perseverance. When you feel exhausted, remember why you started."
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-555 flex items-center justify-between">
              <span>Target Prelims: May 24, 2026</span>
              <span className="text-amber-500 font-bold">LBSNAA Mussoorie Awaits</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} UPSC Compass Hub. Designed with rigorous standards for India's civil services aspirants.</p>
          <p className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for future Civil Servants of India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
