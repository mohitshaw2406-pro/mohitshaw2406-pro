import React from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { User, Target, Zap, Sprout, Database, Code, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 rounded bg-rose-500/10 text-rose-400">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold">
            README.md / Section
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>🚀 About Me</span>
        </h2>
        <p className="mt-1 text-slate-400 text-sm max-w-2xl">
          Core profile and background details as curated in the repository.
        </p>

        {/* Grid of Bio Points */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROFILE_INFO.bioBulletPoints.map((point, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900/90 group"
            >
              <div className="text-3xl mb-3 select-none transform group-hover:scale-110 transition-transform inline-block">
                {point.icon}
              </div>
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-rose-300 transition-colors">
                {point.label}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}

          {/* Quick Metrics / Philosophy card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/30 to-purple-950/20 border border-indigo-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase mb-2">
                <Zap className="w-3.5 h-3.5" /> Core Mindset
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Writing clean code and developing structured databases daily. Every line of code is an opportunity to solve an authentic user challenge."
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-900/40 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Status: Active CSE</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready to Collaborate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
