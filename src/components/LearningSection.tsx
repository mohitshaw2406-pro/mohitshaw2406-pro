import React, { useState } from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { Sprout, CheckCircle2, ChevronRight, BookOpen, GitBranch, Database, Layout } from 'lucide-react';

export const LearningSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topicDeepDives: Record<string, string[]> = {
    'Data Structures & Algorithms': [
      'Time & Space Complexity analysis (Big-O)',
      'Binary Search, Two Pointers & Sliding Window patterns',
      'Binary Trees, BST traversal & recursion depth',
      'Graph representations (Adjacency Matrix/List), BFS, DFS'
    ],
    'Database Management (DBMS)': [
      'Relational schema design and 1NF, 2NF, 3NF Normalization',
      'ACID properties, Isolation levels and Concurrency control',
      'Writing performant JOINs, Subqueries and Group By aggregates',
      'B-Tree Indexing and query execution plan optimization'
    ],
    'Git & GitHub Version Control': [
      'Atomic commits and conventional commit messages',
      'Feature branching, rebasing vs merging',
      'Resolving merge conflicts safely',
      'GitHub Actions CI/CD workflows and release tagging'
    ],
    'Frontend + Backend Full-Stack': [
      'Designing RESTful APIs with JSON payloads and HTTP status codes',
      'State management and reactive UI component architectures',
      'Asynchronous request handling, error boundaries and loading states',
      'Authentication patterns, JWTs and secure headers'
    ]
  };

  return (
    <section id="learning" className="py-16 border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 rounded bg-emerald-500/10 text-emerald-400">
            <Sprout className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-semibold">
            README.md / Continuous Education
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>🌱 Currently Learning</span>
        </h2>
        <p className="mt-1 text-slate-400 text-sm max-w-xl">
          Core technical domains Mohit is studying, implementing, and sharpening every day.
        </p>

        {/* Learning Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROFILE_INFO.currentlyLearning.map((item, idx) => {
            const isExpanded = selectedTopic === idx;
            const subtopics = topicDeepDives[item.title] || [];

            return (
              <div
                key={item.title}
                className={`p-5 rounded-xl border transition-all ${
                  isExpanded
                    ? 'bg-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 select-none">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTopic(isExpanded ? null : idx)}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono shrink-0 transition-colors cursor-pointer"
                    title="Toggle topic details"
                  >
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-emerald-400' : ''}`}
                    />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 text-slate-400">
                    <span>Curriculum Mastery</span>
                    <span className="text-emerald-400 font-semibold">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Subtopic Accordion */}
                {isExpanded && subtopics.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Key Competencies Practiced:
                    </div>
                    {subtopics.map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
