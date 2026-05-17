import React, { useState } from 'react';
import { Bot, Search, Sparkles, Globe, BookOpen, Copy } from 'lucide-react';

interface SearchResult {
  title: string;
  snippet: string;
  source: string;
}

export const AISearchHub: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAISearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    setTimeout(() => {
      // Simulated dynamic fetching of authentic UPSC institution viewpoints
      const mockFetchResults: SearchResult[] = [
        {
          title: `Insights on India: Analytical summary of ${query}`,
          snippet: `Excellent deconstruction of the topic with deep linkages to GS Paper II (Polity & Governance) and GS Paper III. Recommended framework: Historical background -> Current bottlenecks -> Landmark SC judgments -> Pragmatic Way Forward.`,
          source: 'Insights on India'
        },
        {
          title: `Vision IAS: Current Affairs Value Addition on ${query}`,
          snippet: `Comprehensive summary of institutional points. Includes crucial graphics/flowcharts to draw in the Mains exam. Explains direct impacts on cooperative federalism, agricultural pricing, and global geopolitics.`,
          source: 'Vision IAS'
        },
        {
          title: `Drishti IAS: Editorial analysis & PYQ maps for ${query}`,
          snippet: `High-yield points covering direct facts for Prelims elimination. Analyzes potential questions from the Mains syllabus. Quotes 2nd ARC report references to score 1-2 extra marks per question.`,
          source: 'Drishti IAS'
        }
      ];

      setResults(mockFetchResults);
      setLoading(false);
    }, 900);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('📋 Points copied to clipboard! You can paste them into your Digital Notes scratchpad.');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-indigo-500/10 border border-emerald-500/20 rounded-2xl p-6 shadow-sm">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>AI Global Search Engine (Optional & GS)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            AI Authentic Source Search Crawler
          </h2>
          <p className="text-slate-650 dark:text-slate-300 text-sm">
            Instantly crawl high-yield viewpoints and deconstructed points directly from standard portals like Drishti IAS, Vision IAS, and Insights on India.
          </p>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleAISearch} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <Bot className="w-5 h-5 text-emerald-500 shrink-0" />
        <input
          type="text"
          placeholder="Enter UPSC / Sociology topic (e.g., Louis Dumont caste view, PM Mitra Park, G20 Biofuel alliance)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          {loading ? 'Crawling institutional viewpoint...' : 'Crawl Authentic Sources'}
        </button>
      </form>

      {/* Results Grid */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {results.map((res, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-sm hover:border-emerald-500 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono uppercase">
                    {res.source}
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>

                <h3 className="text-sm font-bold text-slate-905 dark:text-white font-serif">{res.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-serif bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  {res.snippet}
                </p>
              </div>

              <button
                onClick={() => handleCopyToClipboard(res.snippet)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all border border-slate-250 dark:border-slate-700 flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copy for Notes Flashcards
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick Suggestions */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-3 text-xs">
        <BookOpen className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-900 dark:text-white font-sans text-sm">💡 Popular Crawl Sprints:</strong>
          <div className="flex flex-wrap gap-2 pt-1">
            {['Talcott Parsons pattern variables', 'SDG 13 climate adaptation', 'Louis Dumont Caste hierarchy', 'PM Mitra Scheme benefits'].map((sug) => (
              <button
                key={sug}
                onClick={() => {
                  setQuery(sug);
                }}
                className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-emerald-500 transition-all"
              >
                {sug} &rarr;
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
