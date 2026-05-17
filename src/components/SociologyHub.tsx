import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  BookOpen, 
  ChevronRight,
  Award,
  Lightbulb,
  Trash2,
  Edit3,
  Check
} from 'lucide-react';
import { SociologyThinker } from '../types';

interface SociologyHubProps {
  thinkers: SociologyThinker[];
  setThinkers: React.Dispatch<React.SetStateAction<SociologyThinker[]>>;
}

export const SociologyHub: React.FC<SociologyHubProps> = ({ thinkers, setThinkers }) => {
  const [activeThinkerId, setActiveThinkerId] = useState<string>(thinkers[0]?.id || '');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [newThinkerName, setNewThinkerName] = useState<string>('');

  // Form fields to add thinker
  const [newEra, setNewEra] = useState('Modern Era');
  const [newPerspective, setNewPerspective] = useState<SociologyThinker['perspective']>('Functionalist');

  // Thinker edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEra, setEditEra] = useState('');
  const [editPerspective, setEditPerspective] = useState<SociologyThinker['perspective']>('Functionalist');
  const [editTheories, setEditTheories] = useState('');
  const [editPyqs, setEditPyqs] = useState('');

  const activeThinker = thinkers.find(t => t.id === activeThinkerId) || thinkers[0];

  // AI helper to populate concepts automatically
  const handleAIDeconstruct = (thinkerId: string) => {
    setAiLoading(true);
    setTimeout(() => {
      setThinkers(prev => prev.map(t => {
        if (t.id === thinkerId) {
          return {
            ...t,
            aiDeconstructed: true,
            coreTheories: [
              ...t.coreTheories,
              `AI Synthesis: Integration of modern methodology & structural changes.`,
              `UPSC Application: Practical connection with Indian society structures.`
            ],
            keyConcepts: [
              ...t.keyConcepts,
              { concept: 'Methodological Pluralism', definition: 'Using multiple research designs to study complex social realities.' },
              { concept: 'Structural Constraints', definition: 'Societal boundaries limiting absolute individual agency.' }
            ],
            upscPyqs: [
              ...t.upscPyqs,
              `Explain the relevance of this thinker's core ideology in the era of global digital capitalism. (20 marks - AI Generated)`
            ]
          };
        }
        return t;
      }));
      setAiLoading(false);
      alert(`🤖 AI Deconstructed ${activeThinker?.name}! Key theories, value-added concepts, and UPSC practice questions have been automatically generated.`);
    }, 850);
  };

  // Add Thinker
  const handleCreateThinker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThinkerName.trim()) return;

    const newThinker: SociologyThinker = {
      id: 'thinker-' + Date.now(),
      name: newThinkerName.trim(),
      era: newEra,
      perspective: newPerspective,
      coreTheories: ['Click "AI Deconstruct" to generate theories instantly'],
      keyConcepts: [],
      upscPyqs: ['Practice: Analyze the methodology used by this thinker.'],
      aiDeconstructed: false
    };

    setThinkers([newThinker, ...thinkers]);
    setActiveThinkerId(newThinker.id);
    setNewThinkerName('');
    alert('✨ Thinker added successfully! Use AI Deconstruct to populate theories.');
  };

  // Edit Thinker Setup
  const openEditThinker = (thinker: SociologyThinker) => {
    setEditName(thinker.name);
    setEditEra(thinker.era);
    setEditPerspective(thinker.perspective);
    setEditTheories(thinker.coreTheories.join('\n'));
    setEditPyqs(thinker.upscPyqs.join('\n'));
    setIsEditing(true);
  };

  const saveEditedThinker = (id: string) => {
    setThinkers(thinkers.map(t => {
      if (t.id === id) {
        return {
          ...t,
          name: editName,
          era: editEra,
          perspective: editPerspective,
          coreTheories: editTheories.split('\n').filter(l => l.trim()),
          upscPyqs: editPyqs.split('\n').filter(l => l.trim())
        };
      }
      return t;
    }));
    setIsEditing(false);
    alert('💾 Thinker data updated successfully!');
  };

  const deleteThinker = (id: string) => {
    if (confirm('Are you sure you want to delete this thinker from the database?')) {
      const updated = thinkers.filter(t => t.id !== id);
      setThinkers(updated);
      setActiveThinkerId(updated[0]?.id || '');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-indigo-500/10 border border-violet-500/20 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 px-3 py-1 rounded-full text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sociology Optional Thinker Studio (Fully Editable)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
              Master Sociological Thinkers & Perspectives
            </h2>
            <p className="text-slate-650 dark:text-slate-300 text-sm">
              Deconstruct core theories of Marx, Durkheim, Weber, Srinivas, and Ghurye. You can add custom thinkers, edit era/theories, or delete records freely.
            </p>
          </div>

          {/* Thinker Adder Form */}
          <form onSubmit={handleCreateThinker} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-250 dark:border-slate-800 shadow-sm flex flex-col gap-2.5 w-full lg:w-96 shrink-0">
            <div className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase">Add New Thinker Card</div>
            <input 
              type="text" 
              placeholder="Enter Thinker Name (e.g. Talcott Parsons)" 
              value={newThinkerName} 
              onChange={(e) => setNewThinkerName(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none w-full"
            />
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" 
                placeholder="Era (e.g. 1902 – 1979)" 
                value={newEra} 
                onChange={(e) => setNewEra(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <select
                value={newPerspective}
                onChange={(e) => setNewPerspective(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1.5 rounded-lg text-xs text-slate-750 dark:text-slate-200 focus:outline-none"
              >
                <option value="Functionalist">Functionalist</option>
                <option value="Conflict">Conflict</option>
                <option value="Interactionist">Interactionist</option>
                <option value="Indian Sociology">Indian Sociology</option>
                <option value="Feminist">Feminist</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold py-2 rounded-lg transition-all shadow-sm"
            >
              Add Custom Thinker
            </button>
          </form>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column Thinker list */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Thinkers Database ({thinkers.length})
          </h3>

          {thinkers.map((thinker) => {
            const isSelected = thinker.id === activeThinkerId;
            return (
              <div
                key={thinker.id}
                onClick={() => { setActiveThinkerId(thinker.id); setIsEditing(false); }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected 
                    ? 'bg-violet-500/10 border-violet-500 shadow-md' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{thinker.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{thinker.era} • {thinker.perspective}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            );
          })}
        </div>

        {/* Right Column Detailed Thinker Analysis & Edit option */}
        <div className="lg:col-span-8">
          {activeThinker ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-755 rounded-2xl p-6 shadow-xl space-y-6">
              
              {/* Thinker Header Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/30">
                    {activeThinker.perspective} Perspective
                  </span>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-2">
                    {activeThinker.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Era: {activeThinker.era}</p>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <button
                      onClick={() => saveEditedThinker(activeThinker.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Edits
                    </button>
                  ) : (
                    <button
                      onClick={() => openEditThinker(activeThinker)}
                      className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 border border-slate-250 dark:border-slate-700"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Data
                    </button>
                  )}

                  <button
                    onClick={() => deleteThinker(activeThinker.id)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-red-505 rounded-xl border border-slate-200 dark:border-slate-700"
                    title="Delete Thinker"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>

                  <button
                    onClick={() => handleAIDeconstruct(activeThinker.id)}
                    disabled={aiLoading}
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:brightness-110 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-violet-500/20 transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    {aiLoading ? 'Deconstructing...' : 'AI Deconstruct'}
                  </button>
                </div>
              </div>

              {isEditing ? (
                /* Thinker Data Editor Fields */
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase block mb-1">Thinker Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase block mb-1">Era</label>
                    <input
                      type="text"
                      value={editEra}
                      onChange={(e) => setEditEra(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase block mb-1">Perspective</label>
                    <select
                      value={editPerspective}
                      onChange={(e) => setEditPerspective(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-750 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="Functionalist">Functionalist</option>
                      <option value="Conflict">Conflict</option>
                      <option value="Interactionist">Interactionist</option>
                      <option value="Indian Sociology">Indian Sociology</option>
                      <option value="Feminist">Feminist</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase block mb-1">Core Theories (One per line)</label>
                    <textarea
                      value={editTheories}
                      rows={4}
                      onChange={(e) => setEditTheories(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none font-serif"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase block mb-1">Practice PYQs (One per line)</label>
                    <textarea
                      value={editPyqs}
                      rows={3}
                      onChange={(e) => setEditPyqs(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none font-serif"
                    />
                  </div>
                </div>
              ) : (
                /* Reading View */
                <div className="space-y-6">
                  
                  {/* Theories */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2.5 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> Core Theories & Ideologies
                    </h4>
                    <div className="space-y-2 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-750 font-serif">
                      {activeThinker.coreTheories.map((theory, i) => (
                        <div key={i} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2">
                          <span className="text-violet-500 font-bold mt-0.5">&bull;</span>
                          <span>{theory}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High-Yield concepts */}
                  {activeThinker.keyConcepts && activeThinker.keyConcepts.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2.5 flex items-center gap-1 font-sans">
                        <Lightbulb className="w-4 h-4" /> High-Yield revision concepts
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                        {activeThinker.keyConcepts.map((concept, idx) => (
                          <div key={idx} className="bg-slate-550 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="text-xs font-bold text-violet-600 dark:text-violet-400">{concept.concept}</div>
                            <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{concept.definition}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* UPSC PYQs */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2.5 flex items-center gap-1 font-sans">
                      <Award className="w-4 h-4" /> UPSC CSE Optional PYQs & Practice Questions
                    </h4>
                    <div className="space-y-2 font-serif">
                      {activeThinker.upscPyqs.map((pyq, i) => (
                        <div key={i} className="p-3 bg-violet-50/50 dark:bg-violet-950/10 border border-violet-200 dark:border-violet-800/40 rounded-xl text-xs text-slate-800 dark:text-violet-200 italic leading-relaxed">
                          "{pyq}"
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="py-20 text-center bg-slate-100 dark:bg-slate-800/40 rounded-2xl border border-slate-250 dark:border-slate-700">
              <p className="text-slate-400 text-sm">Select a thinker from the database to view full analysis.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
