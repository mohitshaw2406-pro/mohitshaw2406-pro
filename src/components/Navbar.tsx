import React, { useState } from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { FileText, Mail, Menu, X, Terminal, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  onOpenReadme: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReadme, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Learning', href: '#learning' },
    { label: 'GitHub Stats', href: '#stats' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-indigo-500 to-cyan-400 p-[1.5px] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-300 font-mono text-sm">
                MS
              </span>
            </div>
          </div>
          <div>
            <span className="font-bold text-white tracking-wide text-sm sm:text-base flex items-center gap-1.5">
              {PROFILE_INFO.name}
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for projects" />
            </span>
            <span className="text-[11px] text-slate-400 block -mt-1 font-mono">
              @{PROFILE_INFO.handle}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-medium tracking-wider uppercase transition-colors hover:text-rose-400 ${
                activeSection === link.href.substring(1) ? 'text-rose-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenReadme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-rose-500/50 hover:bg-slate-800/90 text-xs text-slate-200 transition-all font-mono shadow-sm cursor-pointer"
            title="View original README.md file"
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            README.md
          </button>

          <a
            href={PROFILE_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PROFILE_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenReadme}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-rose-400 text-xs font-mono flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md bg-slate-900/60 text-slate-300 hover:text-rose-400 text-xs font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-3">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-900 text-xs text-slate-300 border border-slate-800"
            >
              <GithubIcon className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-900 text-xs text-cyan-300 border border-slate-800"
            >
              <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
