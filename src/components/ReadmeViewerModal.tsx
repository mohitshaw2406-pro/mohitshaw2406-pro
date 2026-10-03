import React, { useState } from 'react';
import { X, Copy, Check, FileText, Code2, Eye } from 'lucide-react';

interface ReadmeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RAW_README_CONTENT = `<!-- ======================= BANNER ======================= -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=180&section=header&text=MOHIT%20SHAW&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=35"/>
</p>

<p align="center">
 <img src="https://readme-typing-svg.herokuapp.com?color=%23F72C5B&size=28&center=true&vCenter=true&width=600&lines=Computer+Science+Student;Aspiring+Full-Stack+Developer;Python+%7C+MySQL+%7C+Java+%7C+C;HTML+%7C+CSS+%7C+JavaScript;Building+Projects+Every+Day!">
</p>

---

# 🚀 About Me

- 🎓 CSE Student  
- 🐍 Learning **Python**, **MySQL**, **Data Structures**  
- 🌐 Aiming to become a **Full-Stack Developer**  
- ⚡ Love building real-world applications  
- 🌱 Improving step-by-step, every single day  

---

# 🎨 Tech Stack (Animated)

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,mysql,html,css,js,git,github,flask,react,bootstrap,vscode,figma&theme=dark" />
</p>

---

# 📌 Projects

## 🔥 ✈️ Flight Management System  
**Tech:** Python + MySQL  
**✨ Features:**  
- Add, update, delete flights  
- Passenger booking  
- Destination-wise search  
- Seat management  
- SQL database operations  

---

## 🔥 🧮 Login - Form - UI (GUI)  
**Tech:** HTML + CSS  
**✨ Features:**  
- Clean GUI  
- Fully responsive  
- Glassmorphoism UI  
---

# 🌱 Currently Learning

- Data Structures & Algorithms  
- Database Management  
- Git + GitHub  
- Frontend + Backend  

---

# 📊 GitHub Stats (Neon Dark Mode)

<p align="center">
  <img width="48%" src="https://github-readme-stats.vercel.app/api?username=mohitshaw2406-pro&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000" />
  <img width="48%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=mohitshaw2406-pro&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000" />
</p>

---

# 🔥 Contribution Graph

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=mohitshaw2406-pro&theme=tokyo-night&hide_border=true" />
</p>

---

# 🔗 Connect With Me

- 🌐 **LinkedIn:** www.linkedin.com/in/mohit-shaw-17007a345
- 📧 **Email:** mohitshaw.24.06@gmail.com  

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=150&section=footer"/>
</p>
`;

export const ReadmeViewerModal: React.FC<ReadmeViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'raw' | 'preview'>('raw');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(RAW_README_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-400" />
            <span className="font-mono text-xs font-bold text-white">/README.md</span>
            <span className="text-[11px] text-slate-500 font-mono">(Repository Source)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setViewMode('raw')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'raw' ? 'bg-rose-500/20 text-rose-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Raw Markdown
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'preview' ? 'bg-rose-500/20 text-rose-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Rendered Preview
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 flex-1 bg-slate-950/70">
          {viewMode === 'raw' ? (
            <pre className="whitespace-pre-wrap leading-relaxed select-text font-mono text-rose-100/90">
              {RAW_README_CONTENT}
            </pre>
          ) : (
            <div className="space-y-6 text-sm text-slate-200 font-sans">
              <div className="text-center">
                <img
                  src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=180&section=header&text=MOHIT%20SHAW&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=35"
                  alt="Header"
                  className="mx-auto rounded-lg max-w-full"
                />
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h3 className="text-lg font-bold text-white mb-2">🚀 About Me</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
                  <li>🎓 CSE Student</li>
                  <li>🐍 Learning Python, MySQL, Data Structures</li>
                  <li>🌐 Aiming to become a Full-Stack Developer</li>
                  <li>⚡ Love building real-world applications</li>
                  <li>🌱 Improving step-by-step, every single day</li>
                </ul>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h3 className="text-lg font-bold text-white mb-2">🎨 Tech Stack (Animated)</h3>
                <div className="flex justify-center py-2">
                  <img
                    src="https://skillicons.dev/icons?i=python,mysql,html,css,js,git,github,flask,react,bootstrap,vscode,figma&theme=dark"
                    alt="Skills"
                  />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h3 className="text-lg font-bold text-white mb-2">📌 Projects</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <h4 className="font-bold text-rose-400">✈️ Flight Management System (Python + MySQL)</h4>
                    <p className="text-xs text-slate-400">Add, update, delete flights • Passenger booking • Destination search • Seat management • SQL operations</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <h4 className="font-bold text-pink-400">🧮 Login - Form - UI (HTML + CSS)</h4>
                    <p className="text-xs text-slate-400">Clean GUI • Fully responsive • Glassmorphoism UI</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
