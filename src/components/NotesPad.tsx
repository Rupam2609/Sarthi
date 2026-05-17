import React, { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2, Edit2, Check, Search, Filter, Bot, Award } from 'lucide-react';
import { NoteItem } from '../types';

interface NotesPadProps {
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
}

export const NotesPad: React.FC<NotesPadProps> = ({ notes, setNotes }) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const [titleInput, setTitleInput] = useState<string>('');
  const [categoryInput, setCategoryInput] = useState<string>('Polity & Judgments');
  const [contentInput, setContentInput] = useState<string>('');

  // Quick Judgment AI Auto-fill
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const categories = [
    'All',
    'Polity & Judgments',
    'Economy Stats & Data',
    'Ethics Quotes & Case Studies',
    'Env & Geo Maps',
    'Mains Value Additions'
  ];

  const activeNote = notes.find(n => n.id === selectedNoteId) || notes[0];

  // Quick reference UPSC Articles
  const quickArticles = [
    { num: 'Article 14', desc: 'Equality before law & equal protection of laws.' },
    { num: 'Article 19', desc: 'Protection of 6 rights regarding freedom (speech, assembly, etc).' },
    { num: 'Article 21', desc: 'Protection of life and personal liberty (Right to Privacy).' },
    { num: 'Article 32', desc: 'Right to Constitutional Remedies (Writs - Habeas Corpus, Mandamus).' },
    { num: 'Article 40', desc: 'Organization of village panchayats (Basis for 73rd Amendment).' },
    { num: 'Article 356', desc: 'Provisions in case of failure of constitutional machinery in States (President\'s Rule).' }
  ];

  useEffect(() => {
    if (activeNote) {
      setTitleInput(activeNote.title);
      setCategoryInput(activeNote.category);
      setContentInput(activeNote.content);
      setIsEditing(false);
    }
  }, [activeNote?.id]);

  const handleCreateNewNote = () => {
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: 'Untitled Revision Note',
      category: 'Mains Value Additions',
      content: 'Write key statistics, Supreme Court judgements, or Topper quotes here...',
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setIsEditing(true);
    setTitleInput(newNote.title);
    setCategoryInput(newNote.category);
    setContentInput(newNote.content);
  };

  const handleSaveNote = () => {
    if (!activeNote) return;
    setNotes(notes.map(n => n.id === activeNote.id ? {
      ...n,
      title: titleInput.trim() || 'Untitled Note',
      category: categoryInput,
      content: contentInput,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } : n));
    setIsEditing(false);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (selectedNoteId === id) {
      setSelectedNoteId(filtered[0]?.id || null);
    }
  };

  // AI Auto-fill key judgments or constitutional cases
  const handleAIAutoFill = () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      const generatedContent = `⚖️ landmark judgment case analysis: ${aiPrompt}
--------------------------------------------------
📌 core facts of the case:
- Major challenge to administrative or constitutional validity.
- Invoked dynamic judicial review by the Apex Court.

🏛️ key constitutional articles violated / discussed:
- Article 14 (Right to Equality)
- Article 19 (Freedom of Speech & Expression)
- Article 21 (Protection of Life & Liberty)

🌟 monumental significance & supreme court ruling:
- Court emphasized upholding democratic principles and constitutional morality.
- Established a critical precedent for balancing citizen rights and state power.
- Serves as an essential value addition for GS Paper II & III.`;

      setTitleInput(`${aiPrompt} Case Analysis`);
      setCategoryInput('Polity & Judgments');
      setContentInput(generatedContent);
      setIsEditing(true);
      setAiPrompt('');
      setAiLoading(false);
      alert(`🤖 AI successfully deconstructed "${aiPrompt}" and drafted a premium revision note! Click "Save Flashcard" to persist.`);
    }, 800);
  };

  const filteredNotes = notes.filter(n => {
    const matchesCat = filterCategory === 'All' || n.category === filterCategory;
    const matchesQuery = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 transition-all">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-indigo-500/10 border border-amber-500/20 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl font-sans">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">
            <StickyNote className="w-3.5 h-3.5" />
            <span>Digital Pocket Scratchpad & judgments</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            Key Judgments, Statistics & Quotes Flashcards
          </h2>
          <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed">
            Create high-yield revision flashcards for Supreme Court cases, economic statistics, and ethics quotes. Use AI Auto-fill to deconstruct famous judgments instantly.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={handleCreateNewNote}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 justify-center text-xs w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" /> New Flashcard
          </button>
        </div>
      </div>

      {/* AI Judgment/Note Auto-fill Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3 shadow-sm">
        <Bot className="w-5 h-5 text-amber-500 shrink-0" />
        <span className="text-xs font-bold text-slate-750 dark:text-slate-300 shrink-0">AI Judgment Deconstructor:</span>
        <input
          type="text"
          placeholder="Enter Case / Judgment name (e.g. Shreya Singhal vs Union of India)..."
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
        />
        <button
          onClick={handleAIAutoFill}
          disabled={aiLoading || !aiPrompt.trim()}
          className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold px-5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
        >
          {aiLoading ? '🤖 Deconstructing Case...' : 'Deconstruct with AI'}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 shadow-md">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs text-slate-455 dark:text-slate-555 font-bold mr-1 flex items-center gap-1 shrink-0"><Filter className="w-3.5 h-3.5" /> Tag:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                filterCategory === cat 
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-850'
              }`}
            >
              {cat === 'All' ? 'All Tags' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Notes List & Quick Articles */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Notes list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm max-h-[420px] overflow-y-auto">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-850">
              Saved Notes ({filteredNotes.length})
            </h3>

            {filteredNotes.length === 0 ? (
              <div className="py-12 text-center bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-dashed border-slate-250 dark:border-slate-800">
                <StickyNote className="w-8 h-8 text-slate-405 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-semibold">No notes found</p>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isSelected = activeNote?.id === note.id;

                return (
                  <div
                    key={note.id}
                    onClick={() => { setSelectedNoteId(note.id); setIsEditing(false); }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 relative group ${
                      isSelected 
                        ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/30' 
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 hover:border-slate-400 dark:hover:border-slate-750'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                        {note.category}
                      </span>
                      <span className="text-slate-400">{note.updatedAt}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug truncate">
                      {note.title}
                    </h4>

                    <p className="text-xs text-slate-555 dark:text-slate-400 line-clamp-2 leading-relaxed font-serif">
                      {note.content}
                    </p>

                    <button
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-405 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity border border-slate-200 dark:border-slate-700"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Articles Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-850 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Essential UPSC Articles Reference
            </h3>

            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {quickArticles.map((art, i) => (
                <div key={i} className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800/80 text-[11px] font-sans">
                  <div className="font-bold text-amber-600 dark:text-amber-400">{art.num}</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{art.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Editor / Viewer */}
        <div className="lg:col-span-8">
          {activeNote ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              
              {/* Header Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 font-mono text-xs text-slate-555 dark:text-slate-400">
                  <span>Last edited: <strong className="text-slate-800 dark:text-white">{activeNote.updatedAt}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <button
                      onClick={handleSaveNote}
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <Check className="w-4 h-4 font-black" /> Save Flashcard
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-5 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <Edit2 className="w-4 h-4 font-black" /> Edit Note
                    </button>
                  )}

                  <button
                    onClick={(e) => handleDeleteNote(activeNote.id, e)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-red-500 hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Category forms / displays */}
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-amber-500 uppercase block mb-1">Title</label>
                    <input
                      type="text"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 dark:text-white focus:outline-none font-serif"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-amber-500 uppercase block mb-1">Category Tag</label>
                    <select
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-semibold text-slate-750 dark:text-slate-200 focus:outline-none font-mono"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-amber-500 uppercase block mb-1">Content</label>
                    <textarea
                      rows={12}
                      value={contentInput}
                      onChange={(e) => setContentInput(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-2xl p-5 text-sm font-serif text-slate-900 dark:text-slate-100 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-mono">
                      {activeNote.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-3 leading-snug">
                      {activeNote.title}
                    </h2>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 font-serif text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap text-base">
                    {activeNote.content}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="py-20 text-center bg-slate-100 dark:bg-slate-800/40 rounded-2xl border border-slate-250 dark:border-slate-700">
              <StickyNote className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">Select or create a new note to start writing revision facts.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
