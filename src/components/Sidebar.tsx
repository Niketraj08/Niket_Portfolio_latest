import { useState } from 'react';
import { 
  Terminal, 
  User, 
  Cpu, 
  FolderGit2, 
  GraduationCap, 
  Mail, 
  Menu, 
  X,
  Code2
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

export default function Sidebar({ activeSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'Terminal / Home', icon: Terminal },
    { id: 'about', label: 'About', icon: User },
    { id: 'leetcode-lab', label: 'LeetCode Activity', icon: Code2 },
    { id: 'skills', label: 'Tech Skills', icon: Cpu },
    { id: 'projects', label: 'SaaS Projects', icon: FolderGit2 },
    { id: 'education', label: 'Education Path', icon: GraduationCap },
    { id: 'contact', label: 'Contact Gate', icon: Mail },
  ];

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-bg-dark/80 px-6 backdrop-blur-md lg:hidden">
        {/* Animated Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <svg className="h-8 w-8 text-accent-gold transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFBA73" />
                <stop offset="100%" stopColor="#5A5EB9" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" stroke="url(#logo-grad)" strokeWidth="4" strokeDasharray="30 15" className="animate-spin" style={{ animationDuration: '10s' }} />
            <path d="M35 30 L45 70 L55 30 L65 70" stroke="url(#logo-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight text-white">NIKET<span className="text-accent-gold">.RAJ</span></span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed bottom-0 top-16 lg:top-0 left-0 z-40 w-64 -translate-x-full border-r border-white/5 bg-zinc-950/90 p-6 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:bg-[#09090c] xl:w-72 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Logo Brand Block (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-3 py-2 border-b border-white/5 pb-6">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-indigo/10 to-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg className="h-7 w-7 text-accent-gold transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logo-grad-desktop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFBA73" />
                    <stop offset="100%" stopColor="#5A5EB9" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="42" stroke="url(#logo-grad-desktop)" strokeWidth="5" strokeDasharray="40 10" className="origin-center animate-spin" style={{ animationDuration: '15s' }} />
                <path d="M33 33 L45 67 L55 33 L67 67" stroke="url(#logo-grad-desktop)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="font-display font-bold tracking-tight text-white leading-tight">NIKET RAJ</h1>
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent-gold">CS Engineer • Portfolio</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className={`group flex w-full items-center gap-3.5 rounded-lg px-3.5 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-indigo/15 to-accent-gold/5 border border-accent-gold/25 text-accent-gold shadow-sm'
                      : 'text-zinc-400 border border-transparent hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-accent-gold' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`} />
                  <span className="font-sans tracking-wide">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
