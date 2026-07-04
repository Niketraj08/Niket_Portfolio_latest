import { PERSONAL_INFO, STATS } from '../data';
import { GraduationCap, Award, BookOpen, Layers2, Landmark } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import TiltCard from './TiltCard';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 border-t border-white/5">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-accent-indigo/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="space-y-12">
        
        {/* Section Title Header */}
        <ScrollReveal>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent-gold font-bold">About_Module_01</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Academic & Professional Profile
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1 & 2: Bio & Academic Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Bio Card */}
            <ScrollReveal delay={0.1}>
              <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
                {/* Accent glow corner */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-gold/10 rounded-full blur-2xl group-hover:bg-accent-gold/20 transition-colors duration-300" />
                
                <h3 className="font-display text-xl font-bold text-white mb-4">The Narrative</h3>
                <p className="font-sans text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>
                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase text-zinc-500 font-bold">Primary Focus</h4>
                    <p className="font-sans text-xs text-zinc-300 font-medium mt-1">Full-Stack SaaS Architectures</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase text-zinc-500 font-bold">Secondary Focus</h4>
                    <p className="font-sans text-xs text-zinc-300 font-medium mt-1">CI/CD, DevOps, Docker & AWS</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Academic Credentials Card */}
            <ScrollReveal delay={0.2}>
              <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.01] to-[#0d0d12] border-white/5 relative overflow-hidden group">
                <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-accent-gold" />
                  Institution Registry
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-500 font-bold">University / College</span>
                    <p className="text-sm font-semibold text-white tracking-wide">{PERSONAL_INFO.college}</p>
                    <p className="text-[11px] text-zinc-500">Btech Affiliated</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-500 font-bold">Academic Branch</span>
                    <p className="text-sm font-semibold text-white tracking-wide">{PERSONAL_INFO.branch}</p>
                    <p className="text-[11px] text-zinc-500">Computer Science Dept.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-500 font-bold">Enrollment Batch</span>
                    <p className="text-sm font-semibold text-accent-gold tracking-wide">{PERSONAL_INFO.batch}</p>
                    <p className="text-[11px] text-zinc-500">Graduation Year: 2026</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Column 3: Stats Widgets Card Grid */}
          <div className="lg:col-span-1">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {STATS.map((stat, i) => {
                // Pick corresponding icons to decorate stats
                const getIcon = (id: string) => {
                  switch (id) {
                    case 'projects': return <Layers2 className="h-4 w-4 text-accent-gold" />;
                    case 'technologies': return <BookOpen className="h-4 w-4 text-accent-indigo-light" />;
                    case 'certifications': return <Award className="h-4 w-4 text-accent-gold" />;
                    default: return <GraduationCap className="h-4 w-4 text-accent-indigo-light" />;
                  }
                };

                return (
                  <StaggerItem key={stat.id}>
                    <TiltCard maxTilt={8} className="h-full">
                      <div className="glass-panel p-5 rounded-xl border border-white/5 h-full flex flex-col justify-between relative group overflow-hidden">
                        {/* Dynamic background glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider font-bold">Metric_{i + 1}</span>
                          <div className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                            {getIcon(stat.id)}
                          </div>
                        </div>

                        <div>
                          <p className="font-display text-3xl font-bold text-white tracking-tight">
                            <AnimatedCounter 
                              value={stat.value} 
                              suffix={stat.suffix} 
                              prefix={stat.prefix} 
                            />
                          </p>
                          <h4 className="text-xs font-semibold text-zinc-300 mt-1">{stat.label}</h4>
                          <p className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed">{stat.description}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

        </div>

      </div>
    </section>
  );
}
