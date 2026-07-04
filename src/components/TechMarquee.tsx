import { TECH_STACK } from '../data';
import ScrollReveal from './ScrollReveal';

export default function TechMarquee() {
  // Double the array to ensure perfect seamless loops
  const duplicatedStack = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <div className="py-8 border-y border-white/5 relative bg-[#09090d]/30 overflow-hidden pointer-events-none sm:pointer-events-auto">
      {/* Absolute side shadows for a premium fading overlay effect */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

      <ScrollReveal yOffset={10}>
        <div className="flex w-max flex-nowrap items-center gap-8 animate-infinite-scroll">
          {duplicatedStack.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.01] border border-white/5 shadow-inner"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
