import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  RefreshCw, 
  Circle, 
  Search, 
  Award, 
  Plus, 
  Trash2, 
  Edit3, 
  Check 
} from 'lucide-react';
import { SyllabusItem, SyllabusStatus } from '../types';

interface SyllabusTrackerProps {
  syllabus: SyllabusItem[];
  setSyllabus: React.Dispatch<React.SetStateAction<SyllabusItem[]>>;
}

export const SyllabusTracker: React.FC<SyllabusTrackerProps> = ({ syllabus, setSyllabus }) => {
  const [selectedPaper, setSelectedPaper] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Custom Paper Management
  const [papers, setPapers] = useState<string[]>([
    'All', 
    'Prelims GS', 
    'Prelims CSAT', 
    'GS1', 
    'GS2', 
    'GS3', 
    'GS4', 
    'Sociology Optional Paper 1', 
    'Sociology Optional Paper 2'
  ]);
  const [showAddPaperForm, setShowAddPaperForm] = useState(false);
  const [newPaperName, setNewPaperName] = useState('');

  // Custom Topic Addition form
  const [showAddTopicForm, setShowAddTopicForm] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('General');
  const [newTopicPaper, setNewTopicPaper] = useState('GS1');

  // Edit Topic modal states
  const [editTopicId, setEditTopicId] = useState<string | null>(null);
  const [editTopicTitle, setEditTopicTitle] = useState('');
  const [editTopicDescription, setEditTopicDescription] = useState('');

  const statuses: { label: string; value: string }[] = [
    { label: 'All Statuses', value: 'All' },
    { label: '🔴 Not Started', value: 'not-started' },
    { label: '🟡 Reading / First Pass', value: 'reading' },
    { label: '🟢 Notes Completed', value: 'notes-done' },
    { label: '🏆 Multi-Revised', value: 'revised' }
  ];

  const updateStatus = (id: string, newStatus: SyllabusStatus) => {
    setSyllabus(syllabus.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const filteredItems = syllabus.filter(item => {
    const matchesPaper = selectedPaper === 'All' || item.paper === selectedPaper;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPaper && matchesStatus && matchesQuery;
  });

  // Calculate overall progress
  const calculateProgress = (items: SyllabusItem[]) => {
    if (items.length === 0) return 0;
    const score = items.reduce((acc, curr) => {
      if (curr.status === 'reading') return acc + 0.3;
      if (curr.status === 'notes-done') return acc + 0.7;
      if (curr.status === 'revised') return acc + 1.0;
      return acc;
    }, 0);
    return Math.round((score / items.length) * 100);
  };

  const overallProgress = calculateProgress(syllabus);
  const paperProgress = selectedPaper !== 'All' ? calculateProgress(syllabus.filter(i => i.paper === selectedPaper)) : overallProgress;

  // Custom Paper Management Functions
  const handleAddPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaperName.trim()) return;
    if (papers.includes(newPaperName.trim())) {
      alert('Paper category already exists!');
      return;
    }
    setPapers([...papers, newPaperName.trim()]);
    setNewPaperName('');
    setShowAddPaperForm(false);
    alert('✨ New Custom Syllabus paper category added!');
  };

  const handleDeletePaper = (paperName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (paperName === 'All') return;
    if (confirm(`Are you sure you want to delete the category "${paperName}"? All associated topics will also be deleted.`)) {
      setPapers(papers.filter(p => p !== paperName));
      setSyllabus(syllabus.filter(item => item.paper !== paperName));
      if (selectedPaper === paperName) {
        setSelectedPaper('All');
      }
    }
  };

  // Custom Topic Management Functions
  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const newTopic: SyllabusItem = {
      id: 'custom-topic-' + Date.now(),
      title: newTopicTitle.trim(),
      paper: newTopicPaper as any,
      category: newTopicCategory.trim(),
      description: newTopicDescription.trim() || 'No details added.',
      status: 'not-started'
    };

    setSyllabus([newTopic, ...syllabus]);
    setNewTopicTitle('');
    setNewTopicDescription('');
    setShowAddTopicForm(false);
    alert('🚀 New micro-topic successfully loaded into your Syllabus tracker!');
  };

  const handleDeleteTopic = (id: string) => {
    if (confirm('Are you sure you want to remove this topic from your syllabus tracking?')) {
      setSyllabus(syllabus.filter(item => item.id !== id));
    }
  };

  const handleSaveEdit = () => {
    if (!editTopicId) return;
    setSyllabus(syllabus.map(item => {
      if (item.id === editTopicId) {
        return {
          ...item,
          title: editTopicTitle,
          description: editTopicDescription
        };
      }
      return item;
    }));
    setEditTopicId(null);
    alert('💾 Changes saved to your syllabus topic!');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 transition-all">
      
      {/* Banner & Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-amber-500/5 to-purple-500/10 border border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Comprehensive Micro-Syllabus Management</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
              Fully Editable & Customizable UPSC Syllabus Tracker
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Add custom optional papers, create custom topic checklists, edit descriptions, or remove obsolete headings dynamically as you read.
            </p>
          </div>

          {/* Progress Widget */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-250 dark:border-slate-800 min-w-[220px] text-center">
            <div className="text-xs font-semibold text-slate-455 dark:text-slate-400 uppercase tracking-wider mb-1">
              {selectedPaper === 'All' ? 'Total Syllabus Mastery' : `${selectedPaper} Mastery`}
            </div>
            <div className="text-4xl font-black text-amber-600 dark:text-amber-400 font-mono mb-2">{paperProgress}%</div>
            <div className="h-2 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${paperProgress}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Paper Category Management Panel */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-850 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-2.5">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span>📑 Devoted Syllabus Paper Categories</span>
            <span className="text-[10px] text-slate-455 lowercase font-medium">(Click paper tab below to filter topics)</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddPaperForm(!showAddPaperForm)}
              className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-650 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg transition-all uppercase"
            >
              <Plus className="w-3.5 h-3.5" /> Add custom paper
            </button>
            <button
              onClick={() => setShowAddTopicForm(!showAddTopicForm)}
              className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-extrabold px-3 py-1.5 rounded-lg transition-all uppercase"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Topic
            </button>
          </div>
        </div>

        {/* Add custom paper form */}
        {showAddPaperForm && (
          <form onSubmit={handleAddPaper} className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Custom Paper Category Name (e.g. History Optional Paper 1)..."
              value={newPaperName}
              onChange={(e) => setNewPaperName(e.target.value)}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg"
            >
              Create Category
            </button>
          </form>
        )}

        {/* Add custom micro-topic form */}
        {showAddTopicForm && (
          <form onSubmit={handleAddTopic} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 font-sans">
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">➕ Load new Micro-Syllabus Topic</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Topic Title (e.g., Fundamental Duties & Citizenship)..."
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 px-3.5 py-2 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Syllabus Category / Subheading (e.g., Polity)..."
                value={newTopicCategory}
                onChange={(e) => setNewTopicCategory(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 px-3.5 py-2 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none"
              />
              <select
                value={newTopicPaper}
                onChange={(e) => setNewTopicPaper(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none"
              >
                {papers.filter(p => p !== 'All').map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Detailed description of syllabus guidelines..."
              value={newTopicDescription}
              rows={2}
              onChange={(e) => setNewTopicDescription(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 p-3 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg"
            >
              Submit Micro-Topic
            </button>
          </form>
        )}

        {/* Paper filter pills with delete capability */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none flex-wrap">
          {papers.map((p) => (
            <div
              key={p}
              onClick={() => setSelectedPaper(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                selectedPaper === p 
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' 
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800/80'
              }`}
            >
              <span>{p}</span>
              {p !== 'All' && (
                <button
                  onClick={(e) => handleDeletePaper(p, e)}
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-red-500 shrink-0"
                  title="Delete this paper category"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filter Status Dropdown & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 shadow-md">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-44 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
          >
            {statuses.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search keywords (e.g. Constitution, Monsoon, Ethics)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Syllabus Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-slate-100 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-250 dark:border-slate-700 animate-fade-in">
            <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-500">No syllabus topics found</h3>
            <p className="text-xs text-slate-455 mt-1">Try adjusting your paper filter or search query.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const statusConfig = {
              'not-started': { bg: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800', badge: 'bg-red-500/10 text-red-600 dark:text-red-455 border-red-500/20', icon: Circle, label: 'Not Started' },
              'reading': { bg: 'bg-white dark:bg-slate-900 border-yellow-600/40', badge: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-455 border-yellow-500/20', icon: RefreshCw, label: 'Reading Pass 1' },
              'notes-done': { bg: 'bg-white dark:bg-slate-900 border-emerald-600/40', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-455 border-emerald-500/20', icon: CheckCircle, label: 'Notes Ready' },
              'revised': { bg: 'bg-white dark:bg-slate-900 border-amber-500/50 shadow-amber-500/5 shadow-lg', badge: 'bg-amber-500/20 text-amber-750 dark:text-amber-300 border-amber-500/40', icon: Award, label: 'Multi-Revised 🏆' }
            }[item.status];

            const StatusIcon = statusConfig.icon;

            const isEditingItem = editTopicId === item.id;

            return (
              <div 
                key={item.id} 
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 ${statusConfig.bg}`}
              >
                <div className="space-y-2 font-sans">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700 uppercase tracking-widest">
                        {item.paper}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">• {item.category}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 shrink-0 ${statusConfig.badge}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </div>

                  {isEditingItem ? (
                    /* Editable micro fields */
                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        value={editTopicTitle}
                        onChange={(e) => setEditTopicTitle(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none"
                      />
                      <textarea
                        value={editTopicDescription}
                        rows={2}
                        onChange={(e) => setEditTopicDescription(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white rounded-lg focus:outline-none font-serif"
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold rounded-lg flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Save Topic Edits
                      </button>
                    </div>
                  ) : (
                    /* Static fields */
                    <>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug font-serif">{item.title}</h3>
                      <p className="text-xs text-slate-555 dark:text-slate-400 leading-relaxed line-clamp-2">{item.description}</p>
                    </>
                  )}
                </div>

                {/* Status Switcher & Delete/Edit Buttons */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium font-sans">
                  
                  {/* Edit/Delete actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditTopicId(item.id);
                        setEditTopicTitle(item.title);
                        setEditTopicDescription(item.description);
                      }}
                      className="p-1 rounded bg-slate-50 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-455 border border-slate-250 dark:border-slate-800"
                      title="Edit Topic Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTopic(item.id)}
                      className="p-1 rounded bg-slate-50 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-red-500 border border-slate-250 dark:border-slate-800"
                      title="Delete Topic"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 ml-auto">
                    {(['not-started', 'reading', 'notes-done', 'revised'] as SyllabusStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateStatus(item.id, st)}
                        className={`px-2 py-1 rounded transition-all ${
                          item.status === st 
                            ? 'bg-amber-500 text-slate-950 font-bold' 
                            : 'text-slate-455 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        {st === 'not-started' ? 'None' : st === 'reading' ? 'Read' : st === 'notes-done' ? 'Notes' : 'Revised'}
                      </button>
                    ))}
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
