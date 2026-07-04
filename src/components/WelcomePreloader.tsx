import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Cpu, Code2, Network, Sparkles } from 'lucide-react';

interface WelcomePreloaderProps {
  onComplete: () => void;
  key?: string;
}

export default function WelcomePreloader({ onComplete }: WelcomePreloaderProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const diagnosticSteps = [
    { text: 'SYSTEM_BOOT: Initiating AstraCognix kernel v3.5.2...', delay: 200, icon: <Cpu className="h-4 w-4 text-accent-gold" /> },
    { text: 'NET_SEC: Establishing secure TLS pipeline to GitHub API...', delay: 500, icon: <Network className="h-4 w-4 text-accent-indigo-light" /> },
    { text: 'DB_SYNC: Resolving public repository index for "Niketraj08"...', delay: 400, icon: <Code2 className="h-4 w-4 text-accent-gold" /> },
    { text: 'API_GET: Fetching contribution frequency calendar matrix...', delay: 600, icon: <Terminal className="h-4 w-4 text-accent-indigo-light" /> },
    { text: 'SYS_AUTH: Validating Web3Forms submission key [52946004-...]...', delay: 350, icon: <Shield className="h-4 w-4 text-emerald-400" /> },
    { text: 'UI_READY: Rendering high-fidelity developer dashboard workspace.', delay: 400, icon: <Sparkles className="h-4 w-4 text-accent-gold animate-pulse" /> },
  ];

  useEffect(() => {
    let logIndex = 0;
    let timer: NodeJS.Timeout;

    const runLogs = () => {
      if (logIndex < diagnosticSteps.length) {
        const step = diagnosticSteps[logIndex];
        setLogs(prev => [...prev, step.text]);
        setCurrentStep(logIndex);
        
        // Update progress incrementally
        setProgress(Math.floor(((logIndex + 1) / diagnosticSteps.length) * 100));

        logIndex++;
        timer = setTimeout(runLogs, step.delay);
      } else {
        // Complete preloader slightly after the last log completes
        timer = setTimeout(() => {
          onComplete();
        }, 800);
      }
    };

    timer = setTimeout(runLogs, 150);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 bg-[#060608] z-[9999] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Background cyber grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-indigo/10 rounded-full filter blur-[150px]" />
      </div>

      <div className="w-full max-w-lg relative z-10 flex flex-col gap-6">
        
        {/* Upper branding header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0c0c14] to-[#161626] border border-white/10 shadow-2xl shadow-accent-indigo/20 relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-accent-gold/5 blur-md" />
            <Sparkles className="h-7 w-7 text-accent-gold" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="space-y-1"
          >
            <h1 className="font-display text-lg font-black tracking-widest text-white uppercase">
              Niketraj Portfolio
            </h1>
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
              AstraCognix OS / Developer System Loading
            </p>
          </motion.div>
        </div>

        {/* Diagnostic Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl border border-white/5 bg-zinc-950/80 backdrop-blur-md p-5 shadow-2xl flex flex-col gap-4 relative min-h-[220px]"
        >
          {/* Top terminal bar */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
            </div>
            <span className="font-mono text-[9px] text-zinc-600 font-bold tracking-widest uppercase">
              diag_telemetry.log
            </span>
          </div>

          {/* Logs Output Feed */}
          <div className="flex-1 font-mono text-[11px] text-zinc-400 space-y-2 h-[130px] overflow-y-auto scrollbar-thin">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5"
              >
                <div className="shrink-0">
                  {diagnosticSteps[index]?.icon || <Terminal className="h-3.5 w-3.5 text-zinc-600" />}
                </div>
                <span className={index === currentStep ? 'text-white font-semibold' : 'text-zinc-500'}>
                  {log}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Loading Progress Metrics */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
            <span className="font-semibold uppercase tracking-wider">SYSTEM_INITIALIZATION</span>
            <span className="text-accent-gold font-bold">{progress}%</span>
          </div>
          {/* Progress outer track */}
          <div className="h-1.5 w-full bg-white/[0.02] border border-white/5 rounded-full overflow-hidden p-[1px]">
            {/* Progress inner bar */}
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-accent-indigo via-accent-indigo-light to-accent-gold rounded-full"
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}
