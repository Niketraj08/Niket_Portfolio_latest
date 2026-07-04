import { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data';
import { ArrowUpRight, Copy, Check, Terminal, Play, Server, Database } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [activeCommand, setActiveCommand] = useState(0);

  const commands = [
    { cmd: 'npx niketraj --info', reply: 'Resolving student credentials... Node successfully compiled.' },
    { cmd: 'niketraj --status', reply: 'Status: ACTIVE | Open for internships & final-year projects' },
    { cmd: 'niketraj --education', reply: 'GEC (Gandhi Engineering College) | Branch: CSE | Batch: 2022-2026' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-20 lg:pt-0 pb-12">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-accent-gold/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-accent-indigo/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl space-y-8 z-10">

        {/* Big Premium Animated Gradient Heading */}
        <ScrollReveal delay={0.2} yOffset={20}>
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Engineered for Speed.<br />
              <span className="gradient-text font-extrabold">Designed for Impact.</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
              Hi, I'm <strong className="font-semibold text-white">{PERSONAL_INFO.name}</strong>. {PERSONAL_INFO.tagline}
            </p>
          </div>
        </ScrollReveal>

        {/* Quick Dashboard Action CTA Buttons */}
        <ScrollReveal delay={0.3} yOffset={20}>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleScrollToContact}
              className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-gold to-accent-gold-dark hover:from-accent-gold-light hover:to-accent-gold px-5 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-accent-gold/10 hover:shadow-accent-gold/20 transition-all duration-300 transform active:scale-95"
            >
              Secure Connection
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 rounded-lg bg-white/[0.02] border border-white/10 hover:border-accent-gold/40 px-5 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-all duration-300 hover:bg-white/[0.04]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-accent-gold" />
                  <span className="font-mono">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-zinc-500" />
                  <span className="font-mono">{PERSONAL_INFO.email}</span>
                </>
              )}
            </button>
          </div>
        </ScrollReveal>

        {/* Developer Dashboard Live Console Shell Mockup */}
        <ScrollReveal delay={0.4} yOffset={25} className="w-full">
          <div className="rounded-xl border border-white/5 bg-[#0a0a0e]/90 shadow-2xl shadow-black/80 overflow-hidden font-mono text-xs text-zinc-400">
            {/* Console Header bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-accent-gold" />
                <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">niketraj_core.sh</span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-zinc-800" />
                <span className="h-2 w-2 rounded-full bg-zinc-800" />
                <span className="h-2 w-2 rounded-full bg-zinc-800" />
              </div>
            </div>

            {/* Console Content */}
            <div className="p-4 space-y-4 font-mono leading-relaxed min-h-[140px]">
              <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                <Server className="h-3 w-3" />
                <span>Host: Gandhi Engineering College</span>
                <span>•</span>
                <Database className="h-3 w-3" />
                <span>Instance: CSE-2022-2026</span>
              </div>

              {commands.map((cmdItem, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveCommand(idx)}
                  className={`cursor-pointer transition-colors p-2 rounded ${
                    activeCommand === idx ? 'bg-white/[0.02] border border-white/5' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Play className={`h-2.5 w-2.5 ${activeCommand === idx ? 'text-accent-gold' : 'text-zinc-600'}`} />
                    <span className="text-zinc-500">$</span>
                    <span className={activeCommand === idx ? 'text-white' : 'text-zinc-400'}>{cmdItem.cmd}</span>
                  </div>
                  {activeCommand === idx && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-1.5 pl-6 text-accent-gold-light/90 border-l border-accent-gold/20"
                    >
                      {cmdItem.reply}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
