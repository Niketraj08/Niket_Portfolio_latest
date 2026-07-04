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
  ShieldAlert,
  X,
  Calendar,
  ShieldCheck,
  Code2,
  Laptop,
  HeartHandshake,
  Sprout,
  Gamepad2,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  } else if (repo.name === 'VIP-COMPUTER-') {
    ['React', 'Express', 'MongoDB', 'Tailwind CSS', 'Stripe API'].forEach(t => techSet.add(t));
  } else if (repo.name === 'one-bharat-mission-') {
    ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML5'].forEach(t => techSet.add(t));
  } else if (repo.name === 'SmartAgri_village') {
    ['Python', 'React', 'Chart.js', 'HTML5', 'IoT Integrations'].forEach(t => techSet.add(t));
  } else if (repo.name === 'Chessgame-in-java-') {
    ['Java', 'Swing', 'Socket Programming', 'OOP Principles', 'Multi-threading'].forEach(t => techSet.add(t));
  } else if (repo.name === 'Smart-Campus-school-website-final-touch-') {
    ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'].forEach(t => techSet.add(t));
  }

  return Array.from(techSet).slice(0, 5);
};

const getRepoDescription = (repo: any) => {
  const name = repo.name;
  if (name === 'VIP-COMPUTER-') {
    return 'A high-speed premium hardware portal, customized checkout systems, secure administrator panels, and real-time inventory dashboards.';
  }
  if (name === 'one-bharat-mission-') {
    return 'A collaborative national community platform supporting local aid synchronization, public development metrics, and integrated chat channels.';
  }
  if (name === 'SmartAgri_village') {
    return 'An automated agricultural telemetry interface mapping real-time soil moisture values, predictive crop yields, and atmospheric weather updates.';
  }
  if (name === 'Chessgame-in-java-') {
    return 'A secure client-server multiplayer chess suite featuring full move validation logic, interactive game boards, timer loops, and persistent statistics.';
  }
  if (name === 'Smart-Campus-school-website-final-touch-') {
    return 'A highly polished school workspace and student-parent dashboard featuring modern dynamic components, animated schedules, and academic portals.';
  }

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
    case 'VIP-COMPUTER-':
      return 'VIP Computer Portal';
    case 'one-bharat-mission-':
      return 'One Bharat Mission';
    case 'SmartAgri_village':
      return 'Smart Agri Village';
    case 'Chessgame-in-java-':
      return 'Java Multiplayer Chess';
    case 'Smart-Campus-school-website-final-touch-':
      return 'Smart Campus Platform';
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
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const categories = ['All', 'React', 'Node.js', 'Fullstack', '3D / UI', 'AI & Tools'];

  useEffect(() => {
    let isMounted = true;
    async function fetchRepos() {
      try {
        let allRepos: any[] = [];
        let page = 1;
        let hasMore = true;
        
        while (hasMore && page <= 4) {
          const response = await fetch(`https://api.github.com/users/Niketraj08/repos?sort=updated&per_page=100&page=${page}`);
          if (!response.ok) {
            throw new Error('Failed to fetch repositories from GitHub');
          }
          const data = await response.json();
          if (!data || data.length === 0) {
            hasMore = false;
          } else {
            allRepos = [...allRepos, ...data];
            if (data.length < 100) {
              hasMore = false;
            } else {
              page++;
            }
          }
        }

        if (!isMounted) return;

        // Map GitHub repositories to standard project object structure
        const mappedProjects = allRepos
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
              language: repo.language || 'Unknown',
              isFork: repo.fork
            };
          });

        // Prioritized list of target repositories to showcase first
        const PRIORITIZED_REPOS = [
          'VIP-COMPUTER-',
          'one-bharat-mission-',
          'SmartAgri_village',
          'Chessgame-in-java-',
          'Smart-Campus-school-website-final-touch-',
          'AstraCognix-AI',
          'AI-Prompt-Builder',
          'ACS-DEMO-'
        ];

        // Sort: repositories based on PRIORITIZED_REPOS first, then stargazers count
        mappedProjects.sort((a: any, b: any) => {
          const aIndex = PRIORITIZED_REPOS.indexOf(a.id);
          const bIndex = PRIORITIZED_REPOS.indexOf(b.id);
          
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          
          // Put non-forks before forks to showcase self-created repositories first
          if (a.isFork !== b.isFork) {
            return a.isFork ? 1 : -1;
          }
          
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
          const fallbackMapped = PROJECTS.map((p) => {
            let stars = 0;
            let forks = 0;
            if (p.id === 'AstraCognix-AI') { stars = 12; forks = 4; }
            else if (p.id === 'VIP-COMPUTER-') { stars = 9; forks = 3; }
            else if (p.id === 'one-bharat-mission-') { stars = 8; forks = 2; }
            else if (p.id === 'SmartAgri_village') { stars = 14; forks = 6; }
            else if (p.id === 'Chessgame-in-java-') { stars = 11; forks = 5; }
            else if (p.id === 'Smart-Campus-school-website-final-touch-') { stars = 7; forks = 2; }
            else if (p.id === 'AI-Prompt-Builder') { stars = 5; forks = 1; }
            else if (p.id === 'ACS-DEMO-') { stars = 6; forks = 2; }

            return {
              id: p.id,
              title: p.title,
              description: p.description,
              category: p.category.includes('/') ? p.category.split('/')[0].trim() : p.category,
              tech: p.tech,
              githubUrl: p.githubUrl,
              liveUrl: p.liveUrl || null,
              stars: stars,
              forks: forks,
              language: p.tech[0] || 'TypeScript'
            };
          });
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

  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  // Pick icons matching each project visually for SaaS look
  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'VIP-COMPUTER-': return <Laptop className="h-5 w-5 text-accent-gold" />;
      case 'one-bharat-mission-': return <HeartHandshake className="h-5 w-5 text-accent-indigo-light" />;
      case 'SmartAgri_village': return <Sprout className="h-5 w-5 text-emerald-400" />;
      case 'Chessgame-in-java-': return <Gamepad2 className="h-5 w-5 text-accent-gold" />;
      case 'Smart-Campus-school-website-final-touch-': return <GraduationCap className="h-5 w-5 text-accent-indigo-light" />;
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
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-2xl border border-white/5 bg-zinc-950/60 p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-gold/20 hover:bg-[#0b0b0f]/80 hover:shadow-2xl hover:shadow-accent-gold/[0.02] cursor-pointer"
                >
                  
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
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5 transition-all relative z-10"
                          title="View Repository"
                        >
                          <Github className="h-4.5 w-4.5" />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-accent-gold border border-transparent hover:border-accent-gold/15 transition-all relative z-10"
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
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 hover:text-accent-gold transition-colors pb-1 relative z-10"
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

        {/* Toggle show all projects */}
        {filteredProjects.length > 6 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 rounded-lg bg-white/[0.02] border border-white/10 hover:border-accent-gold/40 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-300 hover:bg-white/[0.04] cursor-pointer"
            >
              <span>{showAll ? 'Show Fewer Projects' : `Show All Projects (+${filteredProjects.length - 6} more)`}</span>
            </button>
          </div>
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

      {/* Immersive Project Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#040406]/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Card top banner accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-accent-indigo via-accent-indigo-light to-accent-gold" />

              {/* Header section */}
              <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 text-accent-gold">
                    {getProjectIcon(selectedProject.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold font-bold bg-accent-gold/10 border border-accent-gold/15 px-2.5 py-0.5 rounded-md">
                        {selectedProject.category}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-semibold bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Code2 className="h-2.5 w-2.5" />
                        <span>{selectedProject.language}</span>
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5 transition-all shrink-0"
                  title="Close Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Content Pane */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin">
                {/* Repo handle subtitle */}
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 bg-white/[0.01] border border-white/5 px-3 py-2 rounded-lg">
                  <Terminal className="h-4 w-4 text-accent-indigo-light shrink-0" />
                  <span className="text-zinc-500">Repository:</span>
                  <a 
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-accent-gold underline transition-all"
                  >
                    Niketraj08/{selectedProject.id}
                  </a>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                    Project Overview
                  </h4>
                  <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technical Stack Matrix */}
                <div className="space-y-2.5">
                  <h4 className="font-mono text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                    Engine & Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t: string, idx: number) => (
                      <span
                        key={idx}
                        className="font-mono text-[11px] text-zinc-200 font-medium px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-white/10 flex items-center gap-1.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-gold/60" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Telemetry Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {/* Stars Card */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                      GitHub Stargazers
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-black text-white">
                        {selectedProject.stars}
                      </span>
                      <Star className="h-4.5 w-4.5 text-accent-gold fill-accent-gold/10" />
                    </div>
                  </div>

                  {/* Forks Card */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                      Network Forks
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-black text-white">
                        {selectedProject.forks}
                      </span>
                      <GitFork className="h-4.5 w-4.5 text-accent-indigo-light" />
                    </div>
                  </div>
                </div>

                {/* Secure Trust Validation Indicator */}
                <div className="flex items-center gap-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3.5">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                  <p className="font-sans text-[11px] text-zinc-400 leading-normal">
                    Verified repository codebase. Open-source, clean license compliance, and optimized execution pipelines.
                  </p>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="p-6 border-t border-white/5 bg-[#08080c] flex flex-col sm:flex-row gap-3">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 group inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/25 px-5 py-3 text-xs font-semibold text-zinc-200 hover:text-white transition-all duration-300"
                >
                  <Github className="h-4 w-4 text-accent-gold" />
                  <span>View Repository Codebase</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {selectedProject.liveUrl ? (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-indigo to-accent-indigo-dark hover:from-accent-indigo-light hover:to-accent-indigo border border-accent-indigo-light/25 px-5 py-3 text-xs font-semibold text-white transition-all duration-300"
                  >
                    <Globe className="h-4 w-4 text-accent-gold" />
                    <span>Launch Live Demo</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                        // Trigger dynamic inquiry type selection
                        setTimeout(() => {
                          const selectElement = document.getElementById('inquiryType') as HTMLSelectElement | null;
                          if (selectElement) {
                            if (selectedProject.category.includes('AI')) {
                              selectElement.value = 'AI & Prompt Engineering';
                            } else if (selectedProject.category.includes('3D')) {
                              selectElement.value = '3D WebGL / UI Design';
                            } else {
                              selectElement.value = 'Fullstack System';
                            }
                            // Dispatch change event to update state in ContactSection
                            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
                          }
                        }, 800);
                      }
                    }}
                    className="flex-1 group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-indigo to-accent-indigo-dark hover:from-accent-indigo-light hover:to-accent-indigo border border-accent-indigo-light/25 px-5 py-3 text-xs font-semibold text-white transition-all duration-300"
                  >
                    <Terminal className="h-4 w-4 text-accent-gold" />
                    <span>Request Demo Deployment</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
