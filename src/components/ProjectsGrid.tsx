import { useState } from 'react';
import { PROJECTS, PERSONAL_INFO } from '../data';
import { 
  FolderGit2, 
  ArrowUpRight, 
  Github, 
  Filter, 
  Sparkles, 
  Database, 
  ShieldAlert, 
  Cpu, 
  Lock, 
  GraduationCap, 
  Code2, 
  Globe, 
  Activity, 
  Terminal, 
  Layout,
  Layers 
} from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import GitHubCalendar from './GitHubCalendar';

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'React', 'Node.js', 'Fullstack', '3D / UI', 'AI & Tools'];

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    const lowerFilter = activeFilter.toLowerCase();
    
    if (lowerFilter === 'react') {
      return project.tech.some(t => t.toLowerCase().includes('react') || t.toLowerCase().includes('next.js'));
    }
    if (lowerFilter === 'node.js') {
      return project.tech.some(t => t.toLowerCase().includes('node') || t.toLowerCase().includes('express'));
    }
    if (lowerFilter === 'fullstack') {
      return project.category.toLowerCase().includes('full-stack') || project.category.toLowerCase().includes('fullstack');
    }
    if (lowerFilter === '3d / ui') {
      return project.category === '3D / UI';
    }
    if (lowerFilter === 'ai & tools') {
      return project.tech.some(t => t.toLowerCase().includes('api') || t.toLowerCase().includes('gemini')) || 
             project.id.toLowerCase().includes('prompt') || 
             project.id.toLowerCase().includes('ai');
    }
    return project.category === activeFilter;
  });

  // Pick icons matching each project visually for SaaS look
  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'AstraCognix-AI': return <Sparkles className="h-5 w-5 text-accent-gold" />;
      case 'AI-Prompt-Builder': return <Activity className="h-5 w-5 text-accent-indigo-light" />;
      case 'ACS-DEMO-': return <Globe className="h-5 w-5 text-accent-gold" />;
      case '3js-pratical': return <Cpu className="h-5 w-5 text-accent-indigo-light" />;
      case '3D-Coverflow': return <Layout className="h-5 w-5 text-accent-gold" />;
      case '3D-Animation-': return <Layers className="h-5 w-5 text-accent-indigo-light" />;
      case 'amber_folio': return <Terminal className="h-5 w-5 text-accent-gold" />;
      default: return <FolderGit2 className="h-5 w-5 text-accent-indigo-light" />;
    }
  };

  return (
    <section id="projects" className="py-20 border-t border-white/5 relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent-indigo/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="space-y-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <p className="font-sans text-sm text-zinc-500 max-w-xl">
                A selection of high-fidelity SaaS platforms, infrastructure telemetry suites, and AI engines built during my academic journey.
              </p>
            </div>

            {/* Filter Pill List */}
            <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white/[0.01] border border-white/5 p-1.5 backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-gradient-to-r from-accent-indigo to-accent-indigo-dark text-white border border-accent-indigo-light/25 shadow-md shadow-accent-indigo/5'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  {cat === 'All' && <Filter className="h-3 w-3 text-zinc-500" />}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <div className="group relative rounded-2xl border border-white/5 bg-zinc-950/60 p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-gold/20 hover:bg-[#0b0b0f]/80 hover:shadow-2xl hover:shadow-accent-gold/[0.02]">
                
                {/* Background soft hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-5">
                  {/* Card Top Row: Custom Icon & Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 group-hover:border-accent-gold/20 group-hover:bg-accent-gold/5 transition-all duration-500">
                      {getProjectIcon(project.id)}
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5 transition-all"
                        title="View Repository"
                      >
                        <Github className="h-4.5 w-4.5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-accent-gold border border-transparent hover:border-accent-gold/15 transition-all"
                          title="Launch Production Node"
                        >
                          <ArrowUpRight className="h-4.5 w-4.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold font-bold">
                        {project.category}
                      </span>
                      {project.metric && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-zinc-700" />
                          <span className="font-mono text-[9px] text-zinc-400 font-semibold bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-full">
                            {project.metric}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-accent-gold transition-colors duration-500">
                        {project.title}
                      </h3>
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 hover:text-accent-gold transition-colors pb-1"
                        title="View Repository on GitHub"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Niketraj08/{project.id}</span>
                      </a>
                    </div>
                    <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Badges Footer */}
                <div className="mt-8 pt-5 border-t border-white/5 flex flex-wrap gap-1.5">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] text-zinc-400 font-semibold px-2.5 py-1 rounded-md bg-white/[0.01] border border-white/5 group-hover:border-accent-indigo/20 transition-colors duration-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Live GitHub Calendar Integration */}
        <div className="pt-6">
          <GitHubCalendar />
        </div>

        {/* Click More to see entire GitHub Profile CTA */}
        <ScrollReveal delay={0.2} className="flex flex-col items-center justify-center pt-8 border-t border-white/5 space-y-4">
          <div className="text-center max-w-md">
            <h4 className="font-display text-sm font-bold text-white">Looking for more full-stack projects?</h4>
            <p className="font-sans text-xs text-zinc-500 mt-1">
              Click 'More' below to view my complete repository list, system architectures, and live open-source contributions.
            </p>
          </div>
          <a
            href="https://github.com/Niketraj08?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-accent-gold/40 px-6 py-3 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-300 transform active:scale-95"
          >
            <Github className="h-4 w-4 text-accent-gold group-hover:scale-110 transition-transform" />
            <span>More / View GitHub Repositories</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-accent-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
