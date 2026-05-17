import React, { useState } from 'react';
import { 
  Newspaper, 
  Bookmark, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Lightbulb, 
  Filter, 
  Bot, 
  Plus, 
  Grid, 
  List,
  Sparkles,
  BookmarkCheck,
  Edit3,
  Check
} from 'lucide-react';
import { CurrentAffairsArticle } from '../types';

interface CurrentAffairsProps {
  articles: CurrentAffairsArticle[];
  setArticles: React.Dispatch<React.SetStateAction<CurrentAffairsArticle[]>>;
}

// Daily Hot Topics Dashboard (Option B)
interface HotTopic {
  id: string;
  title: string;
  category: CurrentAffairsArticle['category'];
  source: CurrentAffairsArticle['source'];
  prelimsPoints: string[];
  mainsPoints: string[];
}

export const CurrentAffairs: React.FC<CurrentAffairsProps> = ({ articles, setArticles }) => {
  const [activeSubTab, setActiveSubTab] = useState<'main' | 'option-b'>('main');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState<boolean>(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // AI Add New Article feature
  const [showAddForm, setShowAddForm] = useState(false);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleCategory, setNewArticleCategory] = useState('Polity & Governance');
  const [newArticleSource, setNewArticleSource] = useState<CurrentAffairsArticle['source']>('The Hindu');
  const [aiLoading, setAiLoading] = useState(false);

  // Edit modal states
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editTakeaways, setEditTakeaways] = useState('');
  const [editAnalysis, setEditAnalysis] = useState('');

  // Mock hot topics for Option B dashboard (Simulated from Drishti, Vision IAS, PIB, Insights)
  const hotTopics: HotTopic[] = [
    {
      id: 'hot-1',
      title: 'Deep Ocean Mission & India’s Blue Economy 2.0',
      category: 'Environment & Tech',
      source: 'PIB',
      prelimsPoints: [
        'Consists of 6 thematic pillars supported by Ministry of Earth Sciences.',
        'Key technology: Manned Submersible "Matsya 6000" capable of diving 6km deep.',
        'Explores Poly-metallic nodules in the Central Indian Ocean Basin (CIOB).'
      ],
      mainsPoints: [
        'Unlocks strategic critical minerals like Copper, Nickel, Cobalt for clean energy transition.',
        'Strengthens India’s position in international ocean governance & maritime security.',
        'Balancing fragile deep-sea biodiversity preservation with resource security.'
      ]
    },
    {
      id: 'hot-2',
      title: 'Panchayati Raj Financing & Devolution of Power: RBI Report Highlights',
      category: 'Polity & Governance',
      source: 'Vision IAS',
      prelimsPoints: [
        'Article 243H empowers states to authorize Panchayats to levy taxes.',
        'Article 243I mandates Constitution of State Finance Commissions.',
        'Panchayats receive substantial chunk of revenue via Central Grants.'
      ],
      mainsPoints: [
        'Local bodies heavily reliant on conditional tied grants, reducing functional autonomy.',
        'Sarkaria Commission & 2nd ARC emphasize "Activity Mapping" as critical reform.',
        'Empowering local bodies is fundamental to realizing Grassroots Cooperative Federalism.'
      ]
    },
    {
      id: 'hot-3',
      title: 'Carbon Border Adjustment Mechanism (CBAM) & Impact on India’s Exports',
      category: 'Economy',
      source: 'Insights on India',
      prelimsPoints: [
        'Proposed by European Union (EU) as a carbon tariff on carbon-intensive imports.',
        'Target sectors: Steel, Cement, Aluminium, Fertilizer, and Electricity.',
        'Measures carbon embedded in products to prevent carbon leakage.'
      ],
      mainsPoints: [
        'Indian exporters face massive competitive disadvantage in EU markets due to high carbon footprint.',
        'Violates WTO principles of non-discrimination & UNFCCC Principle of Common But Differentiated Responsibilities.',
        'Way forward: India must green its production lines and negotiate bilateral carbon credit frameworks.'
      ]
    },
    {
      id: 'hot-4',
      title: 'Global Biofuels Alliance (GBA) & India’s Ethanol Blending Targets',
      category: 'Environment & Tech',
      source: 'Drishti IAS',
      prelimsPoints: [
        'Launched at G20 Summit under Indian Presidency.',
        'Target: Achieve 20% ethanol blending in petrol (E20) by 2025-26.',
        'Major feedstocks: Sugarcane, damaged food grains, agricultural waste.'
      ],
      mainsPoints: [
        'Significantly reduces crude oil import dependency, saving billions in forex.',
        'Mitigates air pollution and crop residue burning (Stubble burning solution).',
        'Ethical Dilemma: Fuel vs Food security regarding usage of fertile land and grains.'
      ]
    }
  ];

  const categories = [
    'All',
    'Polity & Governance',
    'Economy',
    'Environment & Tech',
    'International Relations',
    'Social Issues'
  ];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticles(articles.map(a => a.id === id ? { ...a, bookmarked: !a.bookmarked } : a));
  };

  // Simulate AI-powered article generation with specific prelims/mains headings
  const addNewArticleWithAI = () => {
    if (!newArticleTitle.trim()) return;
    
    setAiLoading(true);
    
    setTimeout(() => {
      const newArticle: CurrentAffairsArticle = {
        id: 'ca-' + Date.now(),
        title: newArticleTitle,
        source: newArticleSource,
        date: new Date().toISOString().split('T')[0],
        category: newArticleCategory as any,
        summary: `Analytical study of "${newArticleTitle}" deconstructed by AI using authentic institutional methodologies.`,
        keyTakeaways: [
          `📌 PRELIMS FACTS: Linked with specific constitutional articles & state acts.`,
          `📝 MAINS CONNECT: Evaluated against NITI Aayog 3-year agenda & global indices.`,
          `⚡ CRITICAL CRITIQUE: Analyzed for federalism impact, administrative feasibility, and resource constraints.`
        ],
        editorialAnalysis: `GS Mains relevance: Highly dynamic topic testing multi-dimensional cooperative frameworks, technology linkages, and socio-economic outcomes.`,
        vocabulary: [{ word: "Governance", meaning: "Process of decision-making" }],
        bookmarked: false
      };

      setArticles([newArticle, ...articles]);
      setNewArticleTitle('');
      setShowAddForm(false);
      setAiLoading(false);
      alert('🤖 AI-generated & structured institutional article added successfully!');
    }, 900);
  };

  // Open edit mode
  const openEditMode = (art: CurrentAffairsArticle) => {
    setEditTitle(art.title);
    setEditSummary(art.summary);
    setEditTakeaways(art.keyTakeaways.join('\n'));
    setEditAnalysis(art.editorialAnalysis || '');
    setIsEditing(true);
  };

  // Save edited article
  const saveEditedArticle = (id: string) => {
    setArticles(articles.map(a => {
      if (a.id === id) {
        return {
          ...a,
          title: editTitle,
          summary: editSummary,
          keyTakeaways: editTakeaways.split('\n').filter(line => line.trim()),
          editorialAnalysis: editAnalysis
        };
      }
      return a;
    }));
    setIsEditing(false);
    alert('💾 Article edits saved successfully!');
  };

  // Fetch from Option B and add to Main Board (AI Deconstructed)
  const handleAddFromHotTopics = (topic: HotTopic, bookmarkImmediately: boolean) => {
    const deconstructedArticle: CurrentAffairsArticle = {
      id: 'ca-deconstructed-' + Date.now(),
      title: topic.title,
      source: topic.source,
      date: new Date().toISOString().split('T')[0],
      category: topic.category,
      summary: `Crucial national development deconstructed with headings from authentic institutional repositories (${topic.source}).`,
      keyTakeaways: [
        ...topic.prelimsPoints.map(pt => `📌 PRELIMS FOCUS: ${pt}`),
        ...topic.mainsPoints.map(pt => `📝 MAINS ANALYSIS: ${pt}`)
      ],
      editorialAnalysis: `Institutional expert perspective: Strongly linked with ${topic.category}. Essential value addition for high scores in GS Optional & Mains.`,
      vocabulary: [
        { word: "Strategic Autonomy", meaning: "A state's ability to pursue national interests independently." }
      ],
      bookmarked: bookmarkImmediately
    };

    setArticles([deconstructedArticle, ...articles]);
    setSelectedArticleId(deconstructedArticle.id);
    setActiveSubTab('main');
    alert(`🚀 "${topic.title}" deconstructed using headings and added to Main Board!`);
  };

  const filteredArticles = articles.filter(a => {
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesBookmark = !showOnlyBookmarked || a.bookmarked;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBookmark && matchesSearch;
  });

  const activeArticle = articles.find(a => a.id === selectedArticleId) || filteredArticles[0];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 transition-all">
      
      {/* Top Navigation Sub-tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-850 pb-3">
        <button
          onClick={() => setActiveSubTab('main')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeSubTab === 'main'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
          }`}
        >
          <List className="w-4 h-4" /> Main Board ({filteredArticles.length})
        </button>
        <button
          onClick={() => setActiveSubTab('option-b')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeSubTab === 'option-b'
              ? 'bg-indigo-500 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Grid className="w-4 h-4" /> Institutional Hot Topics Dashboard (Option B)
        </button>
      </div>

      {activeSubTab === 'main' ? (
        /* Option A: Main Board View */
        <>
          {/* Intro Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-indigo-500/10 border border-amber-500/20 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-650 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Authentic Source Editorial Analyst</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
                  Master the Daily News with Mains Perspective
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  We deconstruct key takeaways, constitutional provisions, and complex vocabulary from daily editorials so you can save 2+ hours every morning.
                </p>
              </div>

              {/* Quick Filter toggle */}
              <button
                onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all shadow-md shrink-0 ${
                  showOnlyBookmarked 
                    ? 'bg-amber-500 text-slate-950 border-amber-400' 
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-850'
                }`}
              >
                <BookmarkCheck className={`w-4 h-4 ${showOnlyBookmarked ? 'text-slate-950 font-bold' : 'text-amber-500'}`} />
                <span>{showOnlyBookmarked ? '⭐ Bookmarked (Active)' : '⭐ View Bookmarked'}</span>
              </button>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 shadow-md">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <span className="text-xs text-slate-555 dark:text-slate-555 font-bold mr-1 flex items-center gap-1 shrink-0"><Filter className="w-3.5 h-3.5" /> Sector:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    selectedCategory === cat 
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' 
                      : 'bg-slate-100 dark:bg-slate-955 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-850'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search current affairs (e.g. Simultaneous elections, Semiconductors)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
            </div>

            {/* AI Add New Current Affairs Button */}
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-xl shadow-md hover:brightness-110 transition-all shrink-0"
            >
              <Bot className="w-4 h-4" /> {showAddForm ? 'Close AI Form' : 'Add with AI Assist'}
            </button>
          </div>

          {/* AI Add New Article Form with Authentic Institution Dropdown */}
          {showAddForm && (
            <div className="bg-slate-100 dark:bg-slate-900 border border-emerald-500/30 p-5 rounded-2xl shadow-xl space-y-4">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 text-sm">
                <Bot className="w-4 h-4" /> AI-Powered Institutional Digest Generator
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input 
                  type="text" 
                  placeholder="Enter topic title (e.g. Digital Personal Data Protection Act)" 
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  className="md:col-span-2 w-full bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white" 
                />

                <select 
                  value={newArticleSource}
                  onChange={(e) => setNewArticleSource(e.target.value as any)}
                  className="w-full bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="The Hindu">The Hindu</option>
                  <option value="Indian Express">Indian Express</option>
                  <option value="PIB">PIB</option>
                  <option value="Yojana">Yojana</option>
                  <option value="Vision IAS">Vision IAS</option>
                  <option value="Drishti IAS">Drishti IAS</option>
                  <option value="Insights on India">Insights on India</option>
                  <option value="Vajiram & Ravi">Vajiram & Ravi</option>
                </select>
              </div>

              <select 
                value={newArticleCategory} 
                onChange={(e) => setNewArticleCategory(e.target.value)}
                className="w-full bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white"
              >
                {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              
              <button 
                onClick={addNewArticleWithAI}
                disabled={aiLoading || !newArticleTitle.trim()}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold rounded-xl flex items-center justify-center gap-2 animate-pulse"
              >
                {aiLoading ? '🤖 Fetching & Generating smart summary...' : 'Deconstruct & Populate using AI'}
              </button>
            </div>
          )}

          {/* Main Content Layout: Left list of articles, Right detailed reading pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left List */}
            <div className="lg:col-span-5 space-y-3">
              {filteredArticles.length === 0 ? (
                <div className="py-12 text-center bg-slate-100 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                  <Newspaper className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-500">No news articles found</p>
                  <p className="text-xs text-slate-400 mt-1">Try clearing your filters or search keywords.</p>
                </div>
              ) : (
                filteredArticles.map((art) => {
                  const isSelected = activeArticle?.id === art.id;
                  const sourceColors = {
                    'The Hindu': 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-800/50',
                    'Indian Express': 'bg-red-500/10 text-red-600 dark:text-red-300 border-red-800/50',
                    'PIB': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-800/50',
                    'Yojana': 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-800/50',
                    'Vision IAS': 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-800/50',
                    'Drishti IAS': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-800/50',
                    'Insights on India': 'bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-800/50',
                    'Vajiram & Ravi': 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-800/50'
                  }[art.source];

                  return (
                    <div
                      key={art.id}
                      onClick={() => { setSelectedArticleId(art.id); setIsEditing(false); }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-500/10 border-amber-500 shadow-lg ring-1 ring-amber-500/30' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-455 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px]">
                        <div className="flex items-center gap-2 font-sans font-semibold">
                          <span className={`px-2 py-0.5 rounded border uppercase tracking-wider font-bold ${sourceColors}`}>
                            {art.source}
                          </span>
                          <span className="text-slate-400">{art.date}</span>
                        </div>

                        <button
                          onClick={(e) => toggleBookmark(art.id, e)}
                          className="p-1 rounded-md text-slate-450 dark:text-slate-400 hover:text-amber-500 transition-colors"
                        >
                          <Bookmark className={`w-4 h-4 ${art.bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-2">
                        {art.title}
                      </h3>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">{art.category}</span>
                        <span className="text-slate-500 text-[11px] font-medium flex items-center gap-1">
                          Read Full Analysis &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Reader view & Edit functionality */}
            <div className="lg:col-span-7">
              {activeArticle ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-2xl p-6 shadow-xl space-y-6 sticky top-24">
                  
                  {/* Top Action Row */}
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-555 dark:text-slate-300">
                      Source: <strong className="text-slate-900 dark:text-white">{activeArticle.source}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <button
                          onClick={() => saveEditedArticle(activeArticle.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-4 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" /> Save Edits
                        </button>
                      ) : (
                        <button
                          onClick={() => openEditMode(activeArticle)}
                          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold px-4 py-1.5 rounded-xl text-xs flex items-center gap-1 border border-slate-250 dark:border-slate-700"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Article Facts
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    /* Editable view */
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-amber-500 uppercase block mb-1">Topic Title</label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-amber-500 uppercase block mb-1">Summary</label>
                        <textarea
                          value={editSummary}
                          rows={4}
                          onChange={(e) => setEditSummary(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none font-serif"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-amber-500 uppercase block mb-1">Prelims & Mains Takeaways (One per line)</label>
                        <textarea
                          value={editTakeaways}
                          rows={5}
                          onChange={(e) => setEditTakeaways(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none font-serif"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-amber-500 uppercase block mb-1">GS Mains Value Addition</label>
                        <textarea
                          value={editAnalysis}
                          rows={3}
                          onChange={(e) => setEditAnalysis(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none font-serif"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Reading View */
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          {activeArticle.category}
                        </span>
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                          {activeArticle.title}
                        </h2>
                      </div>

                      {/* Summary */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1 font-sans">
                          <Lightbulb className="w-4 h-4" /> Editorial Summary
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-750 font-serif">
                          {activeArticle.summary}
                        </p>
                      </div>

                      {/* Bullet Points / Takeaways */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Prelims & Mains Key Takeaways
                        </h4>
                        <div className="space-y-2 bg-slate-50 dark:bg-slate-955/45 p-4 rounded-xl border border-slate-200 dark:border-slate-750 font-serif">
                          {activeArticle.keyTakeaways.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Editorial Analysis */}
                      {activeArticle.editorialAnalysis && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2 flex items-center gap-1 font-sans">
                            <ExternalLink className="w-4 h-4" /> Expert Mains Connect (GS Paper Relevance)
                          </h4>
                          <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 p-4 rounded-xl text-sm text-indigo-700 dark:text-indigo-200 leading-relaxed italic font-serif">
                            "{activeArticle.editorialAnalysis}"
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <button
                      onClick={(e) => toggleBookmark(activeArticle.id, e)}
                      className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                        activeArticle.bookmarked 
                          ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md' 
                          : 'bg-slate-100 dark:bg-slate-955 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${activeArticle.bookmarked ? 'fill-slate-950' : ''}`} />
                      {activeArticle.bookmarked ? 'Bookmarked for Exam Revision' : 'Bookmark this Topic'}
                    </button>

                    <span className="text-slate-455 dark:text-slate-400 italic font-medium">Updated daily at 7:00 AM IST</span>
                  </div>

                </div>
              ) : (
                <div className="py-20 text-center bg-slate-150 dark:bg-slate-800/40 rounded-2xl border border-slate-250 dark:border-slate-700">
                  <p className="text-slate-400">Select an article from the left panel to read the full analysis.</p>
                </div>
              )}
            </div>

          </div>
        </>
      ) : (
        /* Option B: Daily Hot Topics Dashboard */
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-emerald-500/10 border border-indigo-500/20 rounded-2xl p-6 shadow-sm">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Authentic Institutional Repositories (Drishti IAS, Vision IAS, Insights, PIB)</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
                Pick & Deconstruct Hot UPSC Topics
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Quickly select a trending topic simulated directly from authentic IAS repositories. Use our built-in AI-Deconstructor to populate clear heading-based Prelims & Mains points before adding them to your board.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotTopics.map((topic) => (
              <div 
                key={topic.id} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col justify-between gap-6"
              >
                <div className="space-y-4 font-sans">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase font-mono">
                      {topic.category}
                    </span>
                    <span className="text-xs text-slate-455 font-medium bg-slate-100 dark:bg-slate-955 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      Source: {topic.source}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-955 dark:text-white font-serif">{topic.title}</h3>

                  <div className="space-y-3">
                    <div>
                      <strong className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1.5">🎯 Prelims Crucial Facts</strong>
                      <div className="bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/10 space-y-1 font-serif">
                        {topic.prelimsPoints.map((pt, i) => (
                          <div key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold mt-0.5">&bull;</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <strong className="text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1.5">📝 Mains Analytical Points</strong>
                      <div className="bg-indigo-500/5 p-3.5 rounded-xl border border-indigo-500/10 space-y-1 font-serif">
                        {topic.mainsPoints.map((pt, i) => (
                          <div key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="text-indigo-500 font-bold mt-0.5">&bull;</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions: Pick, Add & Bookmark */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/85">
                  <button
                    onClick={() => handleAddFromHotTopics(topic, true)}
                    className="text-xs text-indigo-650 dark:text-indigo-450 hover:text-indigo-700 hover:underline font-bold flex items-center gap-1"
                  >
                    ⭐ Add & Bookmark Directly
                  </button>

                  <button
                    onClick={() => handleAddFromHotTopics(topic, false)}
                    className="bg-indigo-500 hover:bg-indigo-650 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm hover:shadow-indigo-500/20 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Pick & Add to Main Board
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
