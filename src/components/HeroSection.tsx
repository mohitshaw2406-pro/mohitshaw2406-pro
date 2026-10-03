import React, { useState, useEffect } from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { ArrowDown, Copy, Check, ExternalLink, Sparkles, Terminal, Code2, Plane, Layout } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Typing animation effect mirroring readme-typing-svg
  useEffect(() => {
    const currentFullLine = PROFILE_INFO.typingLines[currentLineIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullLine.length) {
          setDisplayedText(currentFullLine.substring(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentFullLine.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentLineIndex((prev) => (prev + 1) % PROFILE_INFO.typingLines.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentLineIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-64 bg-gradient-to-r from-rose-600/20 via-indigo-600/20 to-cyan-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Capsule Render Header Banner from README */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/50 relative">
          <img
            src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=180&section=header&text=MOHIT%20SHAW&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=35"
            alt="MOHIT SHAW Banner"
            className="w-full object-cover select-none"
            loading="eager"
          />
          <div className="absolute top-3 right-4 hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700/50 text-[11px] text-slate-300 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            profile: mohitshaw2406-pro
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Dynamic Typing Title */}
        <div className="min-h-[70px] sm:min-h-[80px] flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-rose-500/25 shadow-lg shadow-rose-950/20">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-300 font-mono">
              {displayedText}
            </span>
            <span className="w-2.5 h-6 sm:h-8 bg-rose-500 inline-block animate-pulse -mb-0.5"></span>
          </div>
        </div>

        <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Welcome to the interactive portfolio and live project hub of{' '}
          <span className="text-white font-semibold">Mohit Shaw</span>. Computer science student building real-world software across frontend, backend, and relational databases.
        </p>

        {/* Quick Highlights / Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            🎓 CSE Student
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-cyan-300 flex items-center gap-1.5">
            🐍 Python & MySQL
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-rose-300 flex items-center gap-1.5">
            ⚡ Full-Stack Aspirant
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-emerald-300 flex items-center gap-1.5">
            🌱 Building Every Day
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <Code2 className="w-4 h-4" />
            Explore Projects & Demos
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800/90 text-slate-200 border border-slate-700/80 text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            {copiedEmail ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <a
            href={PROFILE_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-800/50 text-xs sm:text-sm font-medium transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            LinkedIn Profile
          </a>
        </div>

        {/* Quick project jump cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
          <a
            href="#flight-demo"
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all group flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white group-hover:text-indigo-300">
                  Flight Management System
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Python + MySQL simulation with live seat booking & SQL queries.
              </p>
            </div>
          </a>

          <a
            href="#login-demo"
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 transition-all group flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:scale-105 transition-transform">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white group-hover:text-pink-300">
                  Glassmorphism Login UI
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono">
                  Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Modern responsive glass GUI with interactive blur and theme customizer.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
