import React, { useState } from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { Mail, Send, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate direct contact dispatch
    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName || 'Visitor'}`);
    const body = encodeURIComponent(`From: ${senderName} (${senderEmail})\n\nMessage:\n${message}`);
    window.open(`mailto:${PROFILE_INFO.email}?subject=${subject}&body=${body}`, '_blank');
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 border-t border-slate-900 bg-slate-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 rounded bg-rose-500/10 text-rose-400">
            <Mail className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold">
            README.md / Contact Channels
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>🔗 Connect With Me</span>
        </h2>
        <p className="mt-1 text-slate-400 text-sm max-w-xl">
          Feel free to reach out for software engineering internships, collaborative projects, or tech discussions.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct channels cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">Direct Email</span>
                    <span className="text-sm font-bold text-white break-all">{PROFILE_INFO.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Open Mail Client
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">LinkedIn Profile</span>
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {PROFILE_INFO.linkedinDisplay}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
            </a>

            {/* GitHub Profile Card */}
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 group-hover:scale-105 transition-transform">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">GitHub Repository</span>
                    <span className="text-sm font-bold text-white group-hover:text-slate-200 transition-colors">
                      github.com/{PROFILE_INFO.handle}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </a>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-rose-400" />
                <h3 className="text-base font-bold text-white">Send a Direct Note to Mohit</h3>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Your Email</label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Hi Mohit, I saw your flight management and UI projects and would like to talk about..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    Dispatches directly to {PROFILE_INFO.email}
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Compose & Send
                  </button>
                </div>

                {sentSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Prepared message in your default email client to Mohit!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Capsule Render Footer Waving Banner from README */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-900/40">
          <img
            src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=150&section=footer"
            alt="MOHIT SHAW Footer Banner"
            className="w-full object-cover select-none"
            loading="lazy"
          />
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Mohit Shaw (mohitshaw2406-pro). Built with React, Vite & Tailwind CSS.</p>
        </div>
      </div>
    </section>
  );
};
