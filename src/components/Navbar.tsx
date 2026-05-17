import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Calendar, 
  BookOpen, 
  Newspaper, 
  Award, 
  Edit3, 
  FunctionSquare, 
  Library, 
  StickyNote, 
  Flame, 
  Clock,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { mockTopperQuotes } from '../data/mockData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakDays: number;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  prelimsDate: string;
  setPrelimsDate: (date: string) => void;
}

import { Sun, Moon } from 'lucide-react';

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, streakDays, theme, setTheme, prelimsDate, setPrelimsDate }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number }>({ days: 0, hours: 0 });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Calculate Dynamic Countdown
  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date(prelimsDate + 'T09:30:00');
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft({ days, hours });
      } else {
        setTimeLeft({ days: 0, hours: 0 });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [prelimsDate]);

  // Rotate motivational quote
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % mockTopperQuotes.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'planner', label: 'Daily Planner', icon: Calendar },
    { id: 'syllabus', label: 'Syllabus Tracker', icon: BookOpen },
    { id: 'current-affairs', label: 'Current Affairs', icon: Newspaper },
    { id: 'search-hub', label: 'AI Source Search', icon: Compass },
    { id: 'sociology', label: 'Sociology Optional', icon: Sparkles },
    { id: 'prelims', label: 'Prelims Mock', icon: Award },
    { id: 'mains', label: 'Mains Writing', icon: Edit3 },
    { id: 'csat', label: 'CSAT Hub', icon: FunctionSquare },
    { id: 'resources', label: 'Booklist', icon: Library },
    { id: 'notes', label: 'Digital Notes', icon: StickyNote },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-lg transition-colors">
      {/* Top Banner: Topper motivational quote & Countdown */}
      <div className="bg-gradient-to-r from-amber-600/30 via-slate-850/90 to-indigo-600/30 border-b border-amber-500/20 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-200 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
            <span className="italic">"{mockTopperQuotes[quoteIndex].quote}"</span>
            <span className="text-slate-400 font-normal">— {mockTopperQuotes[quoteIndex].author}</span>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900/60 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 relative">
            <div 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Click to customize exam date countdown"
            >
              <Clock className="w-3.5 h-3.5 text-amber-455" />
              <span>Countdown: <strong className="text-amber-455">{timeLeft.days} Days</strong> {timeLeft.hours}h</span>
            </div>

            {showDatePicker && (
              <div className="absolute right-0 top-8 z-50 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-2xl w-52 text-slate-800 dark:text-slate-200 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Target Exam Date:</div>
                <input
                  type="date"
                  value={prelimsDate}
                  onChange={(e) => {
                    setPrelimsDate(e.target.value);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white font-bold"
                />
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="w-full py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[10px] rounded uppercase transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-slate-950 font-bold">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif">
                UPSC <span className="text-amber-400 font-sans">COMPASS</span>
              </h1>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 uppercase tracking-wider">IAS 2026</span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">All-in-One Civil Services Preparation Hub</p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-950/60 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-semibold'
                    : 'text-slate-605 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-205 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Stats & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Light/Night Light Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 text-amber-400 transition-all shrink-0"
            title={theme === 'light' ? "Activate Night Light" : "Activate Colorful White Mode"}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Study Streak Badge */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{streakDays} Day Streak</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Daily Focus</div>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1 shadow-2xl text-slate-900 dark:text-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span className="text-base">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
