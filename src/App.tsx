import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { FlightManagementDemo } from './components/FlightManagementDemo';
import { GlassmorphismLoginDemo } from './components/GlassmorphismLoginDemo';
import { LearningSection } from './components/LearningSection';
import { GitHubStatsSection } from './components/GitHubStatsSection';
import { ContactSection } from './components/ContactSection';
import { ReadmeViewerModal } from './components/ReadmeViewerModal';
import { Code, Terminal, Sparkles, FolderGit2 } from 'lucide-react';

export const App: React.FC = () => {
  const [readmeModalOpen, setReadmeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'learning', 'stats', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500/30 selection:text-rose-200">
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenReadme={() => setReadmeModalOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Hero with Waving Banner & Typing Text */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Tech Stack Animated & Interactive */}
        <SkillsSection />

        {/* Featured Projects with Interactive Live Demos */}
        <section id="projects" className="py-16 border-t border-slate-900 bg-slate-950/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 rounded bg-rose-500/10 text-rose-400">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold">
                    README.md / Featured Projects
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>📌 Projects (Interactive Execution)</span>
                </h2>
                <p className="mt-1 text-slate-400 text-sm max-w-2xl">
                  Interactive real-time simulators and live sandboxes built to reflect the full feature set of Mohit's projects.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>2 Interactive Demos Active</span>
              </div>
            </div>

            {/* Project 1: Flight Management System */}
            <div className="mb-12">
              <FlightManagementDemo />
            </div>

            {/* Project 2: Login Form UI (Glassmorphism) */}
            <div>
              <GlassmorphismLoginDemo />
            </div>
          </div>
        </section>

        {/* Currently Learning Roadmap */}
        <LearningSection />

        {/* Live GitHub Stats & Contribution Graph */}
        <GitHubStatsSection />

        {/* Contact & Connect Section */}
        <ContactSection />
      </main>

      {/* Raw README Viewer Modal */}
      <ReadmeViewerModal
        isOpen={readmeModalOpen}
        onClose={() => setReadmeModalOpen(false)}
      />
    </div>
  );
};

export default App;
