import { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data';
import { ArrowUpRight, Copy, Check, Terminal, Play, Server, Database, FileDown } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [activeCommand, setActiveCommand] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles setup
    const particleCount = Math.min(50, Math.floor((width * height) / 16000));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', handleMouseMove);
    parent?.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle futuristic cyber grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render and connect particles
      particles.forEach((p, idx) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interaction with mouse: pull slightly towards mouse if close
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          p.x += dxMouse * 0.01;
          p.y += dyMouse * 0.01;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = distMouse < 150 ? 'rgba(212, 163, 89, 0.6)' : 'rgba(129, 140, 248, 0.2)';
        ctx.fill();

        // Connect nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 110) * 0.08;
            ctx.strokeStyle = distMouse < 120 
              ? `rgba(212, 163, 89, ${alpha * 1.6})` 
              : `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      parent?.removeEventListener('mousemove', handleMouseMove);
      parent?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-20 lg:pt-0 pb-12 overflow-hidden">
      {/* Dynamic Interactive Cybernetic Node Network Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

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

            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/10 hover:border-accent-gold/40 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.08]"
            >
              <FileDown className="h-4 w-4 text-accent-gold" />
              <span>Resume</span>
            </a>

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
