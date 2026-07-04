import { useState } from 'react';
import { EDUCATION } from '../data';
import { GraduationCap, Trophy, BookmarkCheck, Milestone, Calendar, ChevronRight } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function EducationSection() {
  const [selectedMilestone, setSelectedMilestone] = useState(EDUCATION[EDUCATION.length - 1].id);

  const activeData = EDUCATION.find(m => m.id === selectedMilestone) || EDUCATION[EDUCATION.length - 1];

  return (
    <section id="education" className="py-20 border-t border-white/5 relative">
      {/* Decorative ambient blur */}
      <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-accent-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="space-y-12">
        {/* Section Title */}
        <ScrollReveal>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent-gold font-bold">Timeline_Module_04</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Academic Milestones Trace
            </h2>
            <p className="font-sans text-sm text-zinc-500 max-w-xl">
              Track the step-by-step engineering progression and development records registered throughout college years.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Step List Controller (Left Column) */}
          <div className="lg:col-span-2 space-y-3 relative">
            {/* Connecting line */}
            <div className="absolute left-6.5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-accent-gold/50 via-accent-indigo/20 to-transparent pointer-events-none hidden sm:block" />

            <StaggerContainer className="space-y-3">
              {EDUCATION.map((item, idx) => {
                const isActive = selectedMilestone === item.id;
                return (
                  <StaggerItem key={item.id}>
                    <button
                      onClick={() => setSelectedMilestone(item.id)}
                      className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 relative group overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-accent-indigo/15 via-accent-gold/5 to-transparent border-accent-gold/30 text-white shadow-lg'
                          : 'bg-zinc-950/40 border-white/5 text-zinc-400 hover:bg-white/[0.02] hover:text-white'
                      }`}
                    >
                      {/* Node Index Icon */}
                      <div className={`relative z-10 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-300 border ${
                        isActive
                          ? 'bg-accent-gold text-zinc-950 border-accent-gold-light'
                          : 'bg-zinc-900 text-zinc-400 border-white/10 group-hover:border-zinc-500 group-hover:text-white'
                      }`}>
                        {idx + 1}
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                            Step_Record_{idx + 1}
                          </span>
                          <span className={`font-mono text-[10px] flex items-center gap-1 ${isActive ? 'text-accent-gold' : 'text-zinc-500'}`}>
                            <Calendar className="h-2.5 w-2.5" /> {item.period}
                          </span>
                        </div>
                        <h4 className="font-display text-sm font-bold tracking-tight">
                          {item.title}
                        </h4>
                      </div>

                      <ChevronRight className={`h-4 w-4 text-zinc-600 transition-transform ${isActive ? 'rotate-90 text-accent-gold translate-x-1' : 'group-hover:translate-x-0.5'}`} />
                    </button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Step Detail Display (Right Column) */}
          <div className="lg:col-span-3">
            <ScrollReveal key={selectedMilestone} delay={0.05} yOffset={10}>
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0b0b0f]/95 relative overflow-hidden h-full flex flex-col justify-between">
                
                {/* Background layout watermark */}
                <div className="absolute right-0 bottom-0 opacity-2 pointer-events-none translate-x-12 translate-y-12">
                  <GraduationCap className="h-72 w-72 text-white" />
                </div>

                <div className="space-y-6">
                  {/* Detail Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-white/5 pb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[10px] uppercase text-accent-gold tracking-widest bg-accent-gold/10 px-2 py-0.5 rounded-md font-semibold">
                          Active Timeline Node
                        </span>
                        {activeData.badge && (
                          <span className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/5">
                            {activeData.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-white tracking-tight">
                        {activeData.title}
                      </h3>
                      <p className="font-sans text-xs text-zinc-400 mt-1">
                        {activeData.institution}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 sm:text-right">
                      <Milestone className="h-4 w-4 text-accent-indigo" />
                      <span>{activeData.period}</span>
                    </div>
                  </div>

                  {/* Summary Narrative */}
                  <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
                    {activeData.description}
                  </p>

                  {/* Achievements List */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] uppercase text-zinc-500 font-bold tracking-wider flex items-center gap-1.5">
                      <Trophy className="h-3 w-3 text-accent-gold" />
                      Academic & Project Logged Achievements
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5">
                      {activeData.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 rounded-lg bg-white/[0.01] border border-white/5 p-3 hover:border-accent-gold/10 transition-colors"
                        >
                          <BookmarkCheck className="h-4 w-4 text-accent-gold shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-zinc-300 leading-relaxed">
                            {ach}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Registry ID Footer */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-zinc-600">
                  <span>GEC UNIVERSITY INDEX: REGISTERED_CSE_0{activeData.id.slice(-1)}</span>
                  <span>STATUS: SECURE_INTEGRITY</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
