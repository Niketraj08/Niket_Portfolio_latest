import { SKILL_CATEGORIES } from '../data';
import { 
  Code2, 
  Layers, 
  Server, 
  ChevronRight
} from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import TiltCard from './TiltCard';

// Renders extremely high-fidelity custom SVG icons for specific skills
const renderCustomSkillIcon = (name: string) => {
  const norm = name.toLowerCase().trim();
  if (norm.includes('c++')) {
    return (
      <svg className="h-3.5 w-3.5 rounded-sm overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes cpp-pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 1px rgba(0,89,156,0.4)); }
            50% { transform: scale(1.08); filter: drop-shadow(0 0 4px rgba(0,89,156,0.8)); }
          }
          .cpp-anim { animation: cpp-pulse 2s infinite ease-in-out; }
        `}</style>
        <g className="cpp-anim" transformOrigin="center">
          <rect width="24" height="24" rx="4" fill="#00599C" />
          <text x="50%" y="65%" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">C++</text>
        </g>
      </svg>
    );
  }
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg className="h-3.5 w-3.5 rounded-sm overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes js-glow {
            0%, 100% { filter: drop-shadow(0 0 1px rgba(247,223,30,0.3)); }
            50% { filter: drop-shadow(0 0 3px rgba(247,223,30,0.8)); }
          }
          .js-anim { animation: js-glow 2.5s infinite ease-in-out; }
        `}</style>
        <g className="js-anim">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <text x="75%" y="80%" textAnchor="end" fill="black" fontSize="11" fontWeight="bold" fontFamily="monospace">JS</text>
        </g>
      </svg>
    );
  }
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg className="h-3.5 w-3.5 rounded-sm overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes ts-shine {
            0% { transform: translateX(-15px); }
            100% { transform: translateX(15px); }
          }
          .ts-shine-line {
            animation: ts-shine 3s infinite linear;
          }
        `}</style>
        <g>
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <mask id="ts-mask">
            <rect width="24" height="24" rx="4" fill="white" />
          </mask>
          <g mask="url(#ts-mask)">
            <line x1="-10" y1="0" x2="-5" y2="24" stroke="rgba(255,255,255,0.4)" strokeWidth="4" className="ts-shine-line" />
          </g>
          <text x="75%" y="80%" textAnchor="end" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">TS</text>
        </g>
      </svg>
    );
  }
  if (norm === 'java' || norm.includes('jvm')) {
    return (
      <svg className="h-3.5 w-3.5 overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes java-steam {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(-1.5px); opacity: 1; }
          }
          .steam-line { animation: java-steam 1.8s infinite ease-in-out; }
          .steam-line-delayed { animation: java-steam 1.8s infinite ease-in-out; animation-delay: 0.9s; }
        `}</style>
        <rect width="24" height="24" rx="4" fill="#5382a1" />
        <path d="M7 7.5c.5-.8-.5-1.2 0-2 .5-.8 1-.8.5-1.5" stroke="#f8981d" strokeWidth="1" strokeLinecap="round" className="steam-line" />
        <path d="M10.5 7.5c.5-.8-.5-1.2 0-2 .5-.8 1-.8.5-1.5" stroke="#f8981d" strokeWidth="1" strokeLinecap="round" className="steam-line-delayed" />
        <path d="M14 7.5c.5-.8-.5-1.2 0-2 .5-.8 1-.8.5-1.5" stroke="#f8981d" strokeWidth="1" strokeLinecap="round" className="steam-line" />
        <path d="M5 9h12c0 0 0 5-6 5s-6-5-6-5z" fill="#ffffff" />
        <path d="M17 10c1 0 1.5.5 1.5 1s-.5 1-1.5 1" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 15h16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (norm.includes('python')) {
    return (
      <svg className="h-3.5 w-3.5 overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes python-sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(4deg); }
          }
          .py-snake { animation: python-sway 3s infinite ease-in-out; }
        `}</style>
        <g className="py-snake" transformOrigin="center">
          <path d="M12 2C9.24 2 7 4.24 7 7v2h5v1h-7c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h2v-2c0-1.66 1.34-3 3-3h5c1.66 0 3-1.34 3-3V7c0-2.76-2.24-5-5-5zm-2 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#3776AB" />
          <path d="M12 22c2.76 0 5-2.24 5-5v-2h-5v-1h7c1.66 0 3-1.34 3-3v-4c0-1.66-1.34-3-3-3h-2v2c0 1.66-1.34 3-3 3h-5c-1.66 0-3 1.34-3 3v4c0 2.76 2.24 5 5 5zm2-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FFE272" />
        </g>
      </svg>
    );
  }
  if (norm.includes('sql')) {
    return (
      <svg className="h-3.5 w-3.5 text-accent-gold overflow-visible" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <style>{`
          @keyframes db-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-1.5px); }
          }
          .db-anim { animation: db-bounce 2s infinite ease-in-out; }
        `}</style>
        <g className="db-anim">
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="rgba(245,158,11,0.15)" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </g>
      </svg>
    );
  }
  if (norm === 'react') {
    return (
      <svg className="h-3.5 w-3.5 animate-[spin_8s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
      </svg>
    );
  }
  if (norm.includes('framer motion')) {
    return (
      <svg className="h-3.5 w-3.5 overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes fm-float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-1px) scale(1.05); }
          }
          .fm-anim { animation: fm-float 2.5s infinite ease-in-out; }
        `}</style>
        <g className="fm-anim" transformOrigin="center">
          <path d="M4 0h16v8l-8 8-8-8V0zM12 8l8 8H4l8-8zm-8 8h16v8L12 16l-8 8v-8z" fill="#F024B6" />
        </g>
      </svg>
    );
  }
  if (norm.includes('tailwind')) {
    return (
      <svg className="h-3.5 w-3.5 overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes tw-wave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-0.8px) skewX(2deg); }
          }
          .tw-anim { animation: tw-wave 3s infinite ease-in-out; }
        `}</style>
        <g className="tw-anim" transformOrigin="center">
          <path d="M12 6.094c2.274-3.541 5.434-3.535 7.575-1.2 2.14 2.336.535 6.004-2.825 8.167-3.36 2.162-6.521 2.156-8.662-.18-2.14-2.336-.535-6.004 2.825-8.167v.001zm-6.353 6.13c2.275-3.54 5.434-3.534 7.575-1.199 2.141 2.336.535 6.004-2.825 8.167-3.36 2.162-6.521 2.156-8.662-.18-2.14-2.336-.536-6.004 2.825-8.167v.001z" fill="#06B6D4" />
        </g>
      </svg>
    );
  }
  if (norm.includes('node')) {
    return (
      <svg className="h-3.5 w-3.5 rounded-sm overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes node-pulse {
            0%, 100% { filter: drop-shadow(0 0 1px rgba(51,153,51,0.3)); }
            50% { filter: drop-shadow(0 0 3px rgba(51,153,51,0.8)); }
          }
          .node-anim { animation: node-pulse 2s infinite ease-in-out; }
        `}</style>
        <g className="node-anim">
          <rect width="24" height="24" rx="4" fill="#339933" />
          <text x="50%" y="65%" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">Node</text>
        </g>
      </svg>
    );
  }
  if (norm.includes('next.js') || norm === 'nextjs') {
    return (
      <svg className="h-3.5 w-3.5 rounded-full bg-black border border-white/20 overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes next-pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          .next-anim { animation: next-pulse 2.5s infinite ease-in-out; }
        `}</style>
        <g className="next-anim">
          <path d="M16.5 16.5L9.5 8H8.5V16H9.7V9.8L15.3 16.5H16.5Z" fill="white" />
          <rect x="15.2" y="8" width="1.2" height="8" fill="white" />
        </g>
      </svg>
    );
  }
  if (norm === 'github') {
    return (
      <svg className="h-3.5 w-3.5 text-white overflow-visible" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <style>{`
          @keyframes gh-glow {
            0%, 100% { filter: drop-shadow(0 0 1px rgba(255,255,255,0.2)); }
            50% { filter: drop-shadow(0 0 4px rgba(255,255,255,0.7)); }
          }
          .gh-anim { animation: gh-glow 2s infinite ease-in-out; }
        `}</style>
        <path className="gh-anim" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor" />
      </svg>
    );
  }
  if (norm.includes('git') && !norm.includes('actions')) {
    return (
      <svg className="h-3.5 w-3.5 text-[#F05032] overflow-visible" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <style>{`
          @keyframes commit-pulse {
            0%, 100% { opacity: 0.4; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          .commit-dot { animation: commit-pulse 1.8s infinite ease-in-out; }
          .commit-dot-delayed { animation: commit-pulse 1.8s infinite ease-in-out; animation-delay: 0.9s; }
        `}</style>
        <g>
          <path d="M18 15V9a4 4 0 0 0-4-4H9" />
          <line x1="6" y1="9" x2="6" y2="15" />
          <circle cx="18" cy="18" r="3" fill="#F05032" className="commit-dot" transformOrigin="18px 18px" />
          <circle cx="6" cy="6" r="3" fill="#F05032" className="commit-dot-delayed" transformOrigin="6px 6px" />
          <circle cx="6" cy="18" r="3" fill="#F05032" className="commit-dot" transformOrigin="6px 18px" />
        </g>
      </svg>
    );
  }
  if (norm.includes('actions')) {
    return (
      <svg className="h-3.5 w-3.5 rounded-sm overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes action-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .action-anim { animation: action-pulse 2s infinite ease-in-out; }
        `}</style>
        <g className="action-anim" transformOrigin="center">
          <rect width="24" height="24" rx="4" fill="#2088FF" />
          <path d="M7 11V6h3v5H7zm7 0V6h3v5h-3zm-7 7v-5h10v5H7z" fill="white" />
        </g>
      </svg>
    );
  }
  return <Code2 className="h-3.5 w-3.5 text-zinc-500" />;
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 border-t border-white/5 relative">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-accent-gold/5 rounded-full filter blur-[110px] pointer-events-none" />

      <div className="space-y-12">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent-gold font-bold">Skills_Module_02</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Categorized Core Competencies
            </h2>
            <p className="font-sans text-sm text-zinc-500 max-w-xl">
              Hover over cards for real-time 3D depth tilt. Performance indexes are assessed on academic and project implementations.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <StaggerItem key={category.id}>
              <TiltCard maxTilt={6} className="h-full">
                <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/5 bg-[#0b0b0f]/80 flex flex-col justify-between h-full relative group overflow-hidden">
                  {/* Dynamic hovering corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-indigo/10 to-transparent opacity-50 group-hover:from-accent-gold/15 transition-all duration-300 pointer-events-none" />

                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/10 text-accent-gold group-hover:border-accent-gold/25 transition-colors duration-300">
                        {category.id === 'languages' ? <Code2 className="h-5 w-5" /> : category.id === 'frameworks' ? <Layers className="h-5 w-5" /> : <Server className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-accent-gold transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Class {category.id}</p>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-zinc-400 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Skill List */}
                    <div className="space-y-4.5">
                      {category.skills.map((skill, sIdx) => {
                        return (
                          <div key={sIdx} className="space-y-1.5 group/skill">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="flex items-center gap-2 text-zinc-300 group-hover/skill:text-white transition-colors">
                                {renderCustomSkillIcon(skill.name)}
                                {skill.name}
                              </span>
                              <span className="text-zinc-500 font-medium">{skill.level}%</span>
                            </div>
                            
                            {/* Premium Progress Bar */}
                            <div className="h-1.5 w-full bg-white/[0.02] rounded-full overflow-hidden border border-white/5">
                              <div 
                                className="h-full rounded-full bg-gradient-to-r from-accent-indigo-dark via-accent-indigo to-accent-gold transition-all duration-1000 ease-out"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Visual metadata footer on SaaS dashboard */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-zinc-600">
                    <span>SECURITY: VERIFIED</span>
                    <span className="flex items-center gap-0.5 group-hover:text-accent-gold transition-colors">
                      INDEXED <ChevronRight className="h-2 w-2" />
                    </span>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
