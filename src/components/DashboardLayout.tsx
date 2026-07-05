import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Spotlight from './Spotlight';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeSection, setActiveSection] = useState('hero');

  // Set up active section tracking with IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'about', 'leetcode-lab', 'skills', 'projects', 'education', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger activation near vertical center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-zinc-300 antialiased flex">
      {/* Background radial accent grids */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Cursor Follow spotlight */}
      <Spotlight />

      {/* Fixed Navigation Sidebar */}
      <Sidebar activeSection={activeSection} />

      {/* Main Panel Content (Shifted on Desktop) */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 xl:pl-72 z-10 overflow-hidden">
        
        {/* Scrollable content pane */}
        <main className="flex-1 px-6 sm:px-10 lg:px-12 py-6 overflow-y-auto space-y-12">
          {children}
        </main>

      </div>
    </div>
  );
}
