import React, { useState } from 'react';
import { Layout, Lock, Mail, User, Eye, EyeOff, Sparkles, Sliders, Code2, Check, ArrowRight } from 'lucide-react';

export const GlassmorphismLoginDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('mohit.dev@example.com');
  const [password, setPassword] = useState('securepass123');
  const [name, setName] = useState('Mohit Shaw');
  const [blurAmount, setBlurAmount] = useState(16);
  const [opacity, setOpacity] = useState(15);
  const [bgGradient, setBgGradient] = useState<'aurora' | 'sunset' | 'cyberpunk' | 'midnight'>('aurora');
  const [showCode, setShowCode] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const backgroundGradients = {
    aurora: 'from-purple-900 via-indigo-950 to-slate-950',
    sunset: 'from-rose-900 via-purple-950 to-slate-950',
    cyberpunk: 'from-pink-950 via-cyan-950 to-slate-950',
    midnight: 'from-blue-950 via-slate-900 to-black'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccess(true);
    setTimeout(() => setAuthSuccess(false), 3000);
  };

  return (
    <div id="login-demo" className="p-5 sm:p-7 rounded-2xl bg-slate-900/80 border border-pink-900/50 shadow-2xl">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Layout className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              🧮 Login - Form - UI (GUI)
            </h3>
            <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono text-xs">
              HTML + CSS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Clean, fully responsive Glassmorphism UI with real-time backdrop-filter controls and code inspector.
          </p>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-mono border border-slate-700 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-pink-400" />
          {showCode ? 'Hide CSS Code' : 'Inspect Glass CSS'}
        </button>
      </div>

      {/* Controls Bar for Glass Effect */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-slate-400">Backdrop Blur:</span>
            <input
              type="range"
              min="4"
              max="32"
              value={blurAmount}
              onChange={(e) => setBlurAmount(Number(e.target.value))}
              className="w-24 accent-pink-500 cursor-pointer"
            />
            <span className="text-pink-300 w-8">{blurAmount}px</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Opacity:</span>
            <input
              type="range"
              min="5"
              max="35"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-20 accent-pink-500 cursor-pointer"
            />
            <span className="text-pink-300 w-8">{opacity}%</span>
          </div>
        </div>

        {/* Theme background chooser */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 mr-1">Backdrop:</span>
          {(['aurora', 'sunset', 'cyberpunk', 'midnight'] as const).map((bg) => (
            <button
              key={bg}
              onClick={() => setBgGradient(bg)}
              className={`px-2 py-1 rounded text-[10px] capitalize transition-colors ${
                bgGradient === bg
                  ? 'bg-pink-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* Code Inspector (if toggled) */}
      {showCode && (
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-pink-500/30 font-mono text-[11px] text-pink-200 overflow-x-auto">
          <div className="text-slate-400 mb-1">// Pure CSS Glassmorphism Rules</div>
          <pre>{`.glass-card {
  background: rgba(255, 255, 255, ${opacity / 100});
  backdrop-filter: blur(${blurAmount}px);
  -webkit-backdrop-filter: blur(${blurAmount}px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 16px;
}`}</pre>
        </div>
      )}

      {/* Interactive Glassmorphism Stage */}
      <div
        className={`mt-6 rounded-2xl p-6 sm:p-12 relative overflow-hidden bg-gradient-to-br ${backgroundGradients[bgGradient]} transition-all duration-700 min-h-[460px] flex items-center justify-center`}
      >
        {/* Decorative glowing gradient spheres behind glass */}
        <div className="absolute top-8 left-12 w-48 h-48 bg-pink-500/30 rounded-full blur-2xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-14 w-56 h-56 bg-cyan-500/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* The Glassmorphism Card */}
        <div
          style={{
            background: `rgba(255, 255, 255, ${opacity / 100})`,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.45)'
          }}
          className="w-full max-w-sm rounded-2xl p-6 sm:p-8 relative z-10 transition-all text-slate-100"
        >
          {/* Top Pill / Tabs */}
          <div className="flex rounded-xl bg-black/25 p-1 mb-6 border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'register'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-white tracking-tight">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h4>
            <p className="text-xs text-white/70 mt-1">
              {activeTab === 'login'
                ? 'Enter credentials to access account'
                : 'Join our developer community'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-black/20 hover:bg-black/25 focus:bg-black/30 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-pink-400 transition-all"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-black/20 hover:bg-black/25 focus:bg-black/30 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-pink-400 transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-black/20 hover:bg-black/25 focus:bg-black/30 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-pink-400 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {activeTab === 'login' && (
              <div className="flex items-center justify-between text-[11px] text-white/70">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-pink-500 rounded" />
                  Remember me
                </label>
                <a href="#login-demo" className="text-pink-300 hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold tracking-wide shadow-lg shadow-pink-900/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{activeTab === 'login' ? 'Sign In to Portal' : 'Register Now'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {authSuccess && (
            <div className="mt-4 p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs text-center flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>UI Simulation Successful!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
