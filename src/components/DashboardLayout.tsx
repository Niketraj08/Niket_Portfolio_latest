import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Spotlight from './Spotlight';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  Database,
  Calendar,
  Layers
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Notifications content
  const mockNotifications = [
    { id: 1, text: 'GEC CSE Capstone review scheduled', time: '10m ago', unread: true },
    { id: 2, text: 'SaaS Pulse dashboard successfully compiled', time: '1h ago', unread: true },
    { id: 3, text: '8 core skills updated to level index', time: '1d ago', unread: false },
  ];

  useEffect(() => {
    // Current UTC/EST Date string formatted elegantly
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    setCurrentTimeStr(now.toLocaleDateString('en-US', options));
  }, []);

  // Set up active section tracking with IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
    
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
        
        {/* Upper SaaS Header Console (Desktop Only) */}
        <header className="hidden lg:flex h-16 items-center justify-between px-8 border-b border-white/5 bg-zinc-950/20 backdrop-blur-md sticky top-0 z-30">
          
          {/* Metadata Search Mockup */}
          <div className="flex items-center gap-3 w-80">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                readOnly
                placeholder="Query student index database..."
                className="w-full text-xs rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 focus:outline-none pl-9.5 pr-4 py-2 text-zinc-400 placeholder-zinc-600 transition-all font-mono"
              />
            </div>
            <span className="font-mono text-[9px] text-zinc-600 border border-white/5 bg-white/[0.01] px-1.5 py-0.5 rounded uppercase font-semibold">
              GEC_OS
            </span>
          </div>

          {/* Utility Widgets row */}
          <div className="flex items-center gap-5">
            
            {/* Calendar widget */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 bg-white/[0.01] border border-white/5 px-2.5 py-1.5 rounded-lg">
              <Calendar className="h-3 w-3 text-accent-gold" />
              <span>{currentTimeStr || 'JULY 4'}</span>
            </div>

            {/* Micro DB telemetry state */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 bg-white/[0.01] border border-white/5 px-2.5 py-1.5 rounded-lg">
              <Database className="h-3 w-3 text-accent-indigo-light" />
              <span className="text-zinc-500">Node:</span>
              <span className="text-accent-gold font-bold">ST_ONLINE</span>
            </div>

            {/* Notification bell dropdown menu */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/5"
              >
                <Bell className="h-4 w-4" />
                {mockNotifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
                )}
              </button>

              {/* Notification card dropdown panel */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2.5 w-72 rounded-xl border border-white/5 bg-zinc-950 p-4 shadow-xl z-20 space-y-3 font-mono text-xs">
                    <p className="font-bold text-[10px] uppercase text-zinc-500 tracking-wider flex items-center justify-between pb-1.5 border-b border-white/5">
                      <span>System Notifications</span>
                      <Layers className="h-3 w-3 text-accent-gold" />
                    </p>
                    <div className="space-y-2.5">
                      {mockNotifications.map((n) => (
                        <div key={n.id} className="space-y-1">
                          <p className={`leading-snug ${n.unread ? 'text-zinc-200 font-semibold' : 'text-zinc-500'}`}>
                            {n.text}
                          </p>
                          <span className="text-[9px] text-zinc-600">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mini profile avatar widget */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent-indigo-dark to-accent-gold flex items-center justify-center font-display text-xs font-bold text-zinc-950">
                NR
              </div>
              <div className="text-[10px] font-mono leading-tight">
                <p className="text-zinc-300 font-bold">niket_raj</p>
                <p className="text-zinc-500 text-[9px]">ROOT_SYS</p>
              </div>
            </div>

          </div>
        </header>

        {/* Scrollable content pane */}
        <main className="flex-1 px-6 sm:px-10 lg:px-12 py-6 overflow-y-auto space-y-12">
          {children}
        </main>

      </div>
    </div>
  );
}
