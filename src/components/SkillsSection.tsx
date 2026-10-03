import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/profileData';
import { Layers, Terminal, Sparkles, Check, ExternalLink } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'Frontend', 'Backend & DB', 'Tools & Workflow'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-16 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-indigo-500/10 text-indigo-400">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-semibold">
                README.md / Tech Stack
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>🎨 Tech Stack (Animated & Interactive)</span>
            </h2>
            <p className="mt-1 text-slate-400 text-sm max-w-xl">
              Languages, libraries, database engines, and developer tools actively utilized across Mohit's builds.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live SkillIcons Animated Banner from README */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 mb-8 text-center backdrop-blur-sm">
          <p className="text-xs font-mono text-slate-400 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            Official Skill Icons Banner (as rendered in GitHub README)
          </p>
          <div className="overflow-x-auto py-2 flex justify-center">
            <img
              src="https://skillicons.dev/icons?i=python,mysql,html,css,js,git,github,flask,react,bootstrap,vscode,figma&theme=dark"
              alt="Mohit's Tech Stack Icons"
              className="max-w-full h-auto drop-shadow-md hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Interactive Skill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className={`p-4 rounded-xl border transition-all flex flex-col items-center text-center group cursor-default ${
                skill.highlight
                  ? 'bg-slate-900/80 border-slate-700/80 hover:border-rose-500/50 hover:bg-slate-850'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-2.5 shadow-inner border border-slate-800/80 group-hover:scale-110 transition-transform">
                <img
                  src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                  alt={skill.name}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                {skill.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
