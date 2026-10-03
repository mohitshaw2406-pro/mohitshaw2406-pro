import React, { useState } from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { BarChart3, Activity, ExternalLink, RefreshCw } from 'lucide-react';
import { GithubIcon } from './Icons';

export const GitHubStatsSection: React.FC = () => {
  const [statsError, setStatsError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=mohitshaw2406-pro&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&t=${refreshKey}`;
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=mohitshaw2406-pro&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000&t=${refreshKey}`;
  const graphUrl = `https://github-activity-graph.vercel.app/graph?username=mohitshaw2406-pro&theme=tokyo-night&hide_border=true&t=${refreshKey}`;

  return (
    <section id="stats" className="py-16 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
                README.md / Analytics
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>📊 GitHub Stats (Neon Dark Mode)</span>
            </h2>
            <p className="mt-1 text-slate-400 text-sm max-w-xl">
              Live statistics and contribution metrics synchronized with GitHub username{' '}
              <span className="font-mono text-cyan-300">@{PROFILE_INFO.handle}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              title="Refresh stat embeds"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              Open GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Stats 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GitHub Stats Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col items-center justify-center min-h-[195px] relative group hover:border-cyan-500/40 transition-all">
            <span className="text-xs font-mono text-slate-400 mb-2 self-start flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Profile Statistics
            </span>
            <img
              src={statsUrl}
              alt="Mohit's GitHub Stats"
              className="max-w-full h-auto drop-shadow-md transition-transform group-hover:scale-[1.02]"
              onError={() => setStatsError(true)}
              loading="lazy"
            />
          </div>

          {/* Top Languages Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col items-center justify-center min-h-[195px] relative group hover:border-indigo-500/40 transition-all">
            <span className="text-xs font-mono text-slate-400 mb-2 self-start flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Top Languages
            </span>
            <img
              src={langsUrl}
              alt="Mohit's Top Languages"
              className="max-w-full h-auto drop-shadow-md transition-transform group-hover:scale-[1.02]"
              onError={() => setStatsError(true)}
              loading="lazy"
            />
          </div>
        </div>

        {/* Contribution Graph Section from README */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1 rounded bg-rose-500/10 text-rose-400">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              🔥 Contribution Graph
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-x-auto hover:border-rose-500/40 transition-all">
            <div className="min-w-[650px] flex justify-center">
              <img
                src={graphUrl}
                alt="Mohit's Contribution Activity Graph"
                className="w-full max-w-4xl h-auto drop-shadow-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
