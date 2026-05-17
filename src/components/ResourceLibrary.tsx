import React, { useState } from 'react';
import { Library, CheckCircle2, Circle, ExternalLink, BookOpen, Filter, Search, Plus, Trash2, Edit3, Check } from 'lucide-react';
import { ResourceBook } from '../types';

interface ResourceLibraryProps {
  resources: ResourceBook[];
  setResources: React.Dispatch<React.SetStateAction<ResourceBook[]>>;
}

export const ResourceLibrary: React.FC<ResourceLibraryProps> = ({ resources, setResources }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Custom Book Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookSubject, setNewBookSubject] = useState('');
  const [newBookType, setNewBookType] = useState<ResourceBook['type']>('Standard Reference');
  const [newBookChapters, setNewBookChapters] = useState('');

  // Editing book states
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editBookTitle, setEditBookTitle] = useState('');
  const [editBookAuthor, setEditBookAuthor] = useState('');
  const [editBookSubject, setEditBookSubject] = useState('');
  const [editBookChapters, setEditBookChapters] = useState('');

  const types = ['All', 'NCERT', 'Standard Reference', 'Report / Docs'];

  const toggleBookCompleted = (id: string) => {
    setResources(resources.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitle.trim()) return;

    const newBook: ResourceBook = {
      id: 'book-' + Date.now(),
      title: newBookTitle.trim(),
      authorOrSource: newBookAuthor.trim() || 'Standard Source',
      subject: newBookSubject.trim() || 'General GS',
      type: newBookType,
      recommendedChapters: newBookChapters.trim() || 'All Chapters',
      completed: false
    };

    setResources([newBook, ...resources]);
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookSubject('');
    setNewBookChapters('');
    setShowAddForm(false);
    alert('📚 New study book successfully added to your custom booklist!');
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to remove this book from your tracking checklist?')) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const handleSaveBookEdits = () => {
    if (!editingBookId) return;
    setResources(resources.map(r => {
      if (r.id === editingBookId) {
        return {
          ...r,
          title: editBookTitle,
          authorOrSource: editBookAuthor,
          subject: editBookSubject,
          recommendedChapters: editBookChapters
        };
      }
      return r;
    }));
    setEditingBookId(null);
    alert('💾 Book edits saved successfully!');
  };

  const filteredResources = resources.filter(r => {
    const matchesType = selectedType === 'All' || r.type === selectedType;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.authorOrSource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const completedCount = resources.filter(r => r.completed).length;
  const totalCount = resources.length;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 transition-all font-sans">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-indigo-500/10 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">
            <Library className="w-3.5 h-3.5" />
            <span>Standard Booklist & Essential Reports</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            Read 10 Books 10 Times, Not 100 Books Once
          </h2>
          <p className="text-slate-650 dark:text-slate-300 text-sm">
            Curated list of standard reference books, NCERTs, and Government reports. You can add custom books, edit chapters list, or delete records freely.
          </p>
        </div>

        {/* Progress Widget */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-250 dark:border-slate-800 min-w-[200px] text-center shrink-0">
          <div className="text-xs font-semibold text-slate-455 dark:text-slate-400 uppercase tracking-wider mb-1">
            Booklist Completion
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono mb-2">
            {completedCount} / {totalCount}
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all duration-500" 
              style={{ width: `${totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Add custom book form toggler & Search filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-205 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 shadow-md">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs text-slate-555 dark:text-slate-500 font-semibold mr-1 flex items-center gap-1 shrink-0"><Filter className="w-3.5 h-3.5" /> Resource Type:</span>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedType === type 
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-955 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-850'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search books, authors, subjects (e.g. Laxmikanth, Spectrum, Polity)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? 'Close Form' : 'Add Custom Book'}
        </button>
      </div>

      {/* Custom Book Adder form panel */}
      {showAddForm && (
        <form onSubmit={handleAddBook} className="bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 p-5 rounded-2xl shadow-xl space-y-4 animate-fade-in">
          <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Load Custom Book to List
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input 
              type="text" 
              placeholder="Book Title (e.g. Indian Art & Culture)" 
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              className="w-full bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none" 
              required
            />
            <input 
              type="text" 
              placeholder="Author or Publisher (e.g. Nitin Singhania)" 
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              className="w-full bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none" 
            />
            <input 
              type="text" 
              placeholder="Subject Name (e.g. History)" 
              value={newBookSubject}
              onChange={(e) => setNewBookSubject(e.target.value)}
              className="w-full bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select 
              value={newBookType} 
              onChange={(e) => setNewBookType(e.target.value as any)}
              className="w-full bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="NCERT">NCERT Textbook</option>
              <option value="Standard Reference">Standard Reference Book</option>
              <option value="Report / Docs">Govt Report / Docs</option>
            </select>

            <input 
              type="text" 
              placeholder="Recommended Chapters (e.g. Chapters 2-5, 8, 12)" 
              value={newBookChapters}
              onChange={(e) => setNewBookChapters(e.target.value)}
              className="w-full bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none" 
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-655 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            Submit Book checklist
          </button>
        </form>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-slate-100 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-250 dark:border-slate-700 animate-fade-in">
            <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-500">No books found matching criteria</h3>
            <p className="text-xs text-slate-455 mt-1">Try searching with a different keyword.</p>
          </div>
        ) : (
          filteredResources.map((item) => {
            const typePillStyle = {
              'NCERT': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
              'Standard Reference': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
              'Report / Docs': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
              'Magazine': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-sans font-bold text-[10px]'
            }[item.type];

            const isEditing = editingBookId === item.id;

            return (
              <div 
                key={item.id} 
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                  item.completed 
                    ? 'bg-slate-100/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-750 shadow-sm'
                }`}
              >
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${typePillStyle}`}>
                      {item.type}
                    </span>

                    <span className="text-xs text-slate-555 dark:text-slate-400 font-semibold bg-slate-50 dark:bg-slate-955 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      {item.subject}
                    </span>
                  </div>

                  {isEditing ? (
                    /* Book Field Editors */
                    <div className="space-y-2 pt-2">
                      <input 
                        type="text" 
                        value={editBookTitle}
                        onChange={(e) => setEditBookTitle(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none font-serif font-bold" 
                      />
                      <input 
                        type="text" 
                        value={editBookAuthor}
                        onChange={(e) => setEditBookAuthor(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none" 
                      />
                      <input 
                        type="text" 
                        value={editBookSubject}
                        onChange={(e) => setEditBookSubject(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none" 
                      />
                      <input 
                        type="text" 
                        value={editBookChapters}
                        onChange={(e) => setEditBookChapters(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none font-mono" 
                      />
                      <button
                        onClick={handleSaveBookEdits}
                        className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold rounded-lg flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Save Book Edits
                      </button>
                    </div>
                  ) : (
                    /* Static details */
                    <>
                      <div>
                        <h3 className={`text-base font-bold leading-snug font-serif ${item.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-amber-605 dark:text-amber-400 font-semibold mt-1">By {item.authorOrSource}</p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-serif">
                        <strong className="text-slate-400 block mb-1 text-[10px] uppercase font-mono tracking-wider">📌 recommended chapters:</strong>
                        <span className="text-slate-700 dark:text-slate-200 leading-relaxed">{item.recommendedChapters}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                  
                  {/* Completed check box */}
                  <button
                    onClick={() => toggleBookCompleted(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      item.completed
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {item.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/15 animate-pulse" /> : <Circle className="w-4 h-4 text-slate-400" />}
                    <span>{item.completed ? 'Completed' : 'Mark Read'}</span>
                  </button>

                  {/* Edit & Delete Buttons */}
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={() => {
                        setEditingBookId(item.id);
                        setEditBookTitle(item.title);
                        setEditBookAuthor(item.authorOrSource);
                        setEditBookSubject(item.subject);
                        setEditBookChapters(item.recommendedChapters);
                      }}
                      className="p-1.5 rounded bg-slate-50 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-400"
                      title="Edit Book Info"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteBook(item.id)}
                      className="p-1.5 rounded bg-slate-50 hover:bg-slate-200 dark:bg-slate-955 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-red-500"
                      title="Delete Book"
                    >
                      <Trash2 className="w-3.5 h-3.5 font-bold" />
                    </button>

                    {item.buyLink && (
                      <a
                        href={item.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-slate-400 hover:text-amber-500 flex items-center gap-1 transition-colors ml-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
