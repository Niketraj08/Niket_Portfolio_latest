import { useState, useEffect } from 'react';
import { PROJECTS } from '../data';
import { 
  FolderGit2, 
  ArrowUpRight, 
  Github, 
  Filter, 
  Sparkles, 
  Cpu, 
  Globe, 
  Activity, 
  Terminal, 
  Layout,
  Layers,
  Star,
  GitFork,
  ShieldAlert
} from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import GitHubCalendar from './GitHubCalendar';

// --- Mappings & Fallbacks for Clean Data Visualization ---

const getRepoCategory = (repo: any) => {
  const name = repo.name.toLowerCase();
  const lang = (repo.language || '').toLowerCase();
  const topics = (repo.topics || []).map((t: string) => t.toLowerCase());
  
  if (name.includes('ai') || name.includes('prompt') || topics.includes('ai') || topics.includes('prompt-engineering') || topics.includes('gemini')) {
    return 'AI & Tools';
  }
  if (name.includes('3d') || name.includes('threejs') || name.includes('3js') || name.includes('coverflow') || name.includes('animation') || topics.includes('3d') || topics.includes('threejs') || topics.includes('webgl') || topics.includes('animation') || name.includes('portfolio') || name.includes('folio')) {
    return '3D / UI';
  }
  if (name.includes('demo') || name.includes('website') || name.includes('portal') || topics.includes('fullstack') || topics.includes('mern') || topics.includes('nextjs')) {
    return 'Fullstack';
  }
  if (lang.includes('typescript') || lang.includes('javascript') || topics.includes('react') || topics.includes('nextjs') || name.includes('react')) {
    return 'React';
  }
  if (lang.includes('node') || name.includes('api') || name.includes('backend') || topics.includes('node') || topics.includes('express')) {
    return 'Node.js';
  }
  return 'Fullstack'; // default category
};

const getRepoTech = (repo: any) => {
  const techSet = new Set<string>();
  if (repo.language) {
    techSet.add(repo.language);
  }
  if (repo.topics && Array.isArray(repo.topics)) {
    repo.topics.forEach((topic: string) => {
      let formatted = topic.toLowerCase();
      if (formatted === 'react') formatted = 'React';
      else if (formatted === 'nextjs' || formatted === 'next-js') formatted = 'Next.js';
      else if (formatted === 'nodejs' || formatted === 'node-js') formatted = 'Node.js';
      else if (formatted === 'typescript') formatted = 'TypeScript';
      else if (formatted === 'javascript') formatted = 'JavaScript';
      else if (formatted === 'express') formatted = 'Express';
      else if (formatted === 'mongodb') formatted = 'MongoDB';
      else if (formatted === 'tailwindcss' || formatted === 'tailwind') formatted = 'Tailwind CSS';
      else if (formatted === 'threejs' || formatted === 'three-js') formatted = 'Three.js';
      else if (formatted === 'css' || formatted === 'css3') formatted = 'CSS3';
      else if (formatted === 'html' || formatted === 'html5') formatted = 'HTML5';
      else {
        formatted = formatted.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
      techSet.add(formatted);
    });
  }
  
  // Custom tech enhancements for specific known repos
  if (repo.name === 'AstraCognix-AI') {
    ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini API'].forEach(t => techSet.add(t));
  } else if (repo.name === 'AI-Prompt-Builder') {
    ['React', 'JavaScript', 'Node.js', 'Express', 'Tailwind CSS'].forEach(t => techSet.add(t));
  } else if (repo.name === 'ACS-DEMO-') {
    ['React', 'JavaScript', 'Node.js', 'Express', 'Tailwind CSS'].forEach(t => techSet.add(t));
  } else if (repo.name === '3js-pratical') {
    ['Three.js', 'WebGL', 'JavaScript', 'HTML5', 'Canvas API'].forEach(t => techSet.add(t));
  } else if (repo.name === '3D-Coverflow') {
    ['CSS3', 'HTML5', 'JavaScript', '3D Transforms'].forEach(t => techSet.add(t));
  } else if (repo.name === '3D-Animation-') {
    ['HTML5', 'CSS3', 'JavaScript', 'Keyframe Animation'].forEach(t => techSet.add(t));
  } else if (repo.name === 'amber_folio') {
    ['HTML5', 'CSS3', 'JavaScript', 'Responsive Layouts'].forEach(t => techSet.add(t));
  }

  return Array.from(techSet).slice(0, 5);
};

const getRepoDescription = (repo: any) => {
  if (repo.description && repo.description.trim().length > 0) {
    return repo.description;
  }
  
  switch (repo.name) {
    case 'AstraCognix-AI':
      return 'An advanced, full-stack AI development platform and prompt optimizer supporting dynamic models, fine-tuned developer insights, and generative agent pipelines.';
    case 'AI-Prompt-Builder':
      return 'A dynamic AI prompt engineering tool with customizable generation models, token counters, prompt template parameters, and local workspace storage.';
    case 'ACS-DEMO-':
      return 'ACS Community & Professional Development platform web application built with high-fidelity interactive modules, custom layouts, and real-time synchronization.';
    case '3js-pratical':
      return 'An interactive collection of WebGL experiments, camera mappings, complex particle structures, and hardware-accelerated 3D mesh rendering prototypes using Three.js.';
    case '3D-Coverflow':
      return 'A stunning 3D Coverflow layout and image slider effect using pure CSS 3D transforms, fluid perspective mappings, and tactile transition physics.';
    case '3D-Animation-':
      return 'Immersive interactive visual boards and animation triggers built using hardware-accelerated CSS properties, vector layers, and timing hooks.';
    case 'amber_folio':
      return 'An elegant and minimalist developer portfolio template featuring highly responsive grids, clean typography pairings, and optimized media rendering.';
    default:
      return repo.description || `Public open-source repository containing codebase for ${repo.name}, built and maintained by Niketraj08.`;
  }
};

const getRepoTitle = (repo: any) => {
  switch (repo.name) {
    case 'AstraCognix-AI':
      return 'AstraCognix AI Development Platform';
    case 'AI-Prompt-Builder':
      return 'AI Prompt Builder Core';
    case 'ACS-DEMO-':
      return 'ACS Professional Portal';
    case '3js-pratical':
      return '3JS Practical & WebGL Engine';
    case '3D-Coverflow':
      return '3D Coverflow Perspective Slider';
    case '3D-Animation-':
      return '3D Animation & Keyframe Studio';
    case 'amber_folio':
      return 'Amber Minimal Portfolio';
    default:
      return repo.name
        .replace(/[-_]+/g, ' ')
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
};

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'React', 'Node.js', 'Fullstack', '3D / UI', 'AI & Tools'];

  useEffect(() => {
    let isMounted = true;
    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/Niketraj08/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories from GitHub');
        }
        const data = await response.json();
        
        if (!isMounted) return;

        // Map GitHub repositories to standard project object structure
        const mappedProjects = data
          .filter((repo: any) => !repo.fork) // Keep only original repositories
          .map((repo: any) => {
            const category = getRepoCategory(repo);
            const tech = getRepoTech(repo);
            const description = getRepoDescription(repo);
            const title = getRepoTitle(repo);
            
            return {
              id: repo.name,
              title: title,
              description: description,
              category: category,
              tech: tech,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || null,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language || 'Unknown'
            };
          });

        // Sort: repositories with stars first, then alphabetically
        mappedProjects.sort((a: any, b: any) => {
          if (b.stars !== a.stars) {
            return b.stars - a.stars;
          }
          return a.id.localeCompare(b.id);
        });

        setProjects(mappedProjects);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching repos, falling back to static projects list:', err);
        if (isMounted) {
          // Robust elegant fallback to local projects
          const fallbackMapped = PROJECTS.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            category: p.category,
            tech: p.tech,
            githubUrl: p.githubUrl,
            liveUrl: p.liveUrl || null,
            stars: p.id === 'AstraCognix-AI' ? 1 : 0,
            forks: 0,
            language: p.tech[0] || 'TypeScript'
          }));
          setProjects(fallbackMapped);
          setLoading(false);
        }
      }
    }

    fetchRepos();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    const lowerFilter = activeFilter.toLowerCase();
    
    if (lowerFilter === 'react') {
      return project.tech.some((t: string) => t.toLowerCase().includes('react') || t.toLowerCase().includes('next.js'));
    }
    if (lowerFilter === 'node.js') {
      return project.tech.some((t: string) => t.toLowerCase().includes('node') || t.toLowerCase().includes('express'));
    }
    if (lowerFilter === 'fullstack') {
      return project.category.toLowerCase().includes('full-stack') || project.category.toLowerCase().includes('fullstack');
    }
    if (lowerFilter === '3d / ui') {
      return project.category === '3D / UI';
    }
    if (lowerFilter === 'ai & tools') {
      return project.category === 'AI & Tools' || 
             project.tech.some((t: string) => t.toLowerCase().includes('api') || t.toLowerCase().includes('gemini')) || 
             project.id.toLowerCase().includes('prompt') || 
             project.id.toLowerCase().includes('ai');
    }
    return project.category === activeFilter;
  });

  const displayedProjects = filteredProjects.slice(0, 6);

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

        {/* Loading State Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse rounded-2xl border border-white/5 bg-zinc-950/40 p-6 sm:p-7 h-[250px] flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-white/5" />
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-lg bg-white/5" />
                      <div className="h-8 w-8 rounded-lg bg-white/5" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-1/4 rounded bg-white/5" />
                    <div className="h-5 w-2/3 rounded bg-white/10" />
                    <div className="space-y-1.5">
                      <div className="h-3.5 w-full rounded bg-white/5" />
                      <div className="h-3.5 w-5/6 rounded bg-white/5" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded bg-white/5" />
                  <div className="h-6 w-16 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Projects Grid */
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedProjects.map((project) => (
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
                            title="Launch Live Demo"
                          >
                            <ArrowUpRight className="h-4.5 w-4.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold font-bold">
                          {project.category}
                        </span>
                        {project.stars > 0 && (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                            <span className="font-mono text-[9px] text-zinc-400 font-semibold bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Star className="h-2.5 w-2.5 text-accent-gold fill-accent-gold/25 animate-pulse" />
                              <span>{project.stars} Stars</span>
                            </span>
                          </>
                        )}
                        {project.forks > 0 && (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                            <span className="font-mono text-[9px] text-zinc-400 font-semibold bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <GitFork className="h-2.5 w-2.5 text-accent-indigo-light" />
                              <span>{project.forks} Forks</span>
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
                    {project.tech.map((t: string, idx: number) => (
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
        )}

        {/* Live GitHub Calendar Integration */}
        <div className="pt-6">
          <GitHubCalendar />
        </div>

        {/* Click More to see entire GitHub Profile CTA */}
        <ScrollReveal delay={0.2} className="flex flex-col items-center justify-center pt-8 border-t border-white/5 space-y-4">
          <div className="text-center max-w-md">
            <h4 className="font-display text-sm font-bold text-white">Want to explore all my repositories?</h4>
            <p className="font-sans text-xs text-zinc-500 mt-1">
              Click 'Get More' below to view my complete list of projects, live experimental deployments, and academic codebases on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Niketraj08?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-accent-indigo to-accent-indigo-dark hover:from-accent-indigo-light hover:to-accent-indigo border border-accent-indigo-light/25 hover:border-accent-gold/40 px-7 py-3 text-xs font-semibold text-white shadow-lg shadow-accent-indigo/10 hover:shadow-accent-indigo/20 transition-all duration-300 transform active:scale-95"
          >
            <Github className="h-4 w-4 text-accent-gold group-hover:scale-110 transition-transform" />
            <span>Get More / View GitHub Repositories</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-200 group-hover:text-accent-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
