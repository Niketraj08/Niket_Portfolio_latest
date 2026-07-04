import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Flame, 
  Award, 
  Zap, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Trophy, 
  Target,
  Activity,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from './ScrollReveal';

interface LeetCodeDayContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface RecentSubmission {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  time: string;
  status: 'Accepted' | 'Memory Limit Exceeded' | 'Runtime Error';
}

export default function LeetCodeSection() {
  const [hoveredDay, setHoveredDay] = useState<LeetCodeDayContribution | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [contributions, setContributions] = useState<LeetCodeDayContribution[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  // Realistic statistics for ig_niket on LeetCode
  const stats = {
    username: 'ig_niket',
    name: 'Niket Raj',
    ranking: 154230,
    solvedTotal: 412,
    easySolved: 165,
    easyTotal: 780,
    mediumSolved: 212,
    mediumTotal: 1620,
    hardSolved: 35,
    hardTotal: 700,
    acceptanceRate: '64.2%',
    currentStreak: 12,
    maxStreak: 45,
    totalSubmissions: 928,
  };

  const recentSubmissions: RecentSubmission[] = [
    { title: 'Longest Palindromic Substring', difficulty: 'Medium', language: 'C++', time: '2 hours ago', status: 'Accepted' },
    { title: 'Container With Most Water', difficulty: 'Medium', language: 'C++', time: '1 day ago', status: 'Accepted' },
    { title: 'Two Sum', difficulty: 'Easy', language: 'C++', time: '2 days ago', status: 'Accepted' },
    { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', language: 'C++', time: '3 days ago', status: 'Accepted' },
    { title: 'Valid Parentheses', difficulty: 'Easy', language: 'Java', time: '4 days ago', status: 'Accepted' },
    { title: '3Sum', difficulty: 'Medium', language: 'C++', time: '1 week ago', status: 'Accepted' },
  ];

  // Generate 371 days of LeetCode contributions
  useEffect(() => {
    const totalDays = 371; // 53 weeks * 7 days
    const grid: LeetCodeDayContribution[] = [];
    const today = new Date();

    // Deterministic random generator for realistic LeetCode activity
    const getPseudoRandomCount = (dayOffset: number) => {
      const sinVal = Math.sin(dayOffset * 0.12 + 3.1);
      const cosVal = Math.cos(dayOffset * 0.05 - 1.4);
      const val = Math.floor(((sinVal + cosVal + 2) / 4) * 5);

      // Sundays and Saturdays have slightly lower activity generally
      const dayOfWeek = (today.getDay() - dayOffset + 7 * 10) % 7;
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return val > 2 ? val - 1 : 0;
      }

      // High activity bursts (simulating contests or streak weeks)
      if (dayOffset > 40 && dayOffset < 65) return Math.min(val + 2, 6);
      if (dayOffset > 180 && dayOffset < 200) return Math.min(val + 3, 7);
      if (dayOffset < 15) return Math.max(val, 2); // very active recently

      return val;
    };

    for (let i = totalDays - 1; i >= 0; i--) {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() - i);
      const dateString = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      const count = getPseudoRandomCount(i);

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 0 && count <= 1) level = 1;
      else if (count > 1 && count <= 3) level = 2;
      else if (count > 3 && count <= 5) level = 3;
      else if (count > 5) level = 4;

      grid.push({
        date: dateString,
        count,
        level,
      });
    }

    setContributions(grid);
  }, []);

  const handleMouseMove = (e: React.MouseEvent, day: LeetCodeDayContribution) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + window.scrollX - 70,
      y: rect.top + window.scrollY - 45,
    });
    setHoveredDay(day);
  };

  // LeetCode specific styling colors (gray to amber-yellow)
  const getLeetCodeLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-zinc-900 border border-white/[0.02] hover:border-zinc-700/50';
      case 1:
        return 'bg-[#4a371c] border border-amber-950/40 hover:border-amber-600/50 hover:bg-[#5c4422] hover:shadow-[0_0_8px_rgba(245,158,11,0.2)]';
      case 2:
        return 'bg-[#78511a] border border-amber-900/40 hover:border-amber-500/50 hover:bg-[#8f5f1e] hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]';
      case 3:
        return 'bg-[#b2721e] border border-amber-800/40 hover:border-amber-400/50 hover:bg-[#cc8222] hover:shadow-[0_0_12px_rgba(245,158,11,0.4)]';
      case 4:
        return 'bg-[#ffa116] border border-amber-500/40 hover:border-amber-300 hover:bg-[#ffb43a] hover:shadow-[0_0_16px_rgba(255,161,22,0.6)]';
      default:
        return 'bg-zinc-900';
    }
  };

  // Group days into columns representing 53 weeks
  const weeks: LeetCodeDayContribution[][] = [];
  if (contributions.length > 0) {
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7));
    }
  }

  // Calculate difficulty percentages
  const easyPct = (stats.easySolved / stats.solvedTotal) * 100;
  const mediumPct = (stats.mediumSolved / stats.solvedTotal) * 100;
  const hardPct = (stats.hardSolved / stats.solvedTotal) * 100;

  return (
    <section id="leetcode-lab" className="py-20 border-t border-white/5 relative">
      <div className="absolute top-1/2 left-1/4 w-[320px] h-[320px] bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="space-y-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold">Laboratory_Module_03</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              LeetCode Developer Profile
            </h2>
            <p className="font-sans text-sm text-zinc-500 max-w-xl">
              An interactive diagnostic dashboard showcasing competitive programming metrics, core problem-solving indexes, and submission algorithms.
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Dual Interactive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Heat Map & Submission Log (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
                {/* Subtle tech background lights */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-amber-500/5 rounded-full filter blur-[80px] pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-700" />
                
                {/* Header Card Area */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-full border-2 border-amber-500/20 bg-zinc-900/80 p-0.5 flex items-center justify-center">
                        <User className="h-8 w-8 text-amber-500" />
                      </div>
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-amber-500 border-2 border-zinc-950 flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-500 transition-colors">
                          {stats.name}
                        </h3>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500">
                          @{stats.username}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-zinc-400 mt-0.5 max-w-md line-clamp-1">
                        Competitive Coding & Data Structures Explorer
                      </p>
                      <div className="flex items-center gap-2.5 mt-1.5 text-[10px] font-mono text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Trophy className="h-3 w-3 text-amber-500" />
                          Rank: {stats.ranking.toLocaleString()}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-zinc-700" />
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3 text-amber-500" />
                          Acceptance: {stats.acceptanceRate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/[0.02] border border-amber-500/10 text-amber-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                      </span>
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider">LeetCode Live Sync</span>
                    </div>
                    <a
                      href="https://leetcode.com/u/ig_niket/"
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center gap-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-amber-500/40 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-300"
                    >
                      <Code2 className="h-3.5 w-3.5 text-amber-500 group-hover/btn:scale-110 transition-transform" />
                      <span>LeetCode Profile</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover/btn:text-amber-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                </div>

                {/* Quick Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/10 text-amber-500">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Total Solved</div>
                      <div className="text-xl font-display font-black text-white">{stats.solvedTotal}</div>
                    </div>
                  </div>

                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/10 text-amber-500">
                      <Flame className="h-4.5 w-4.5 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Current Streak</div>
                      <div className="text-xl font-display font-black text-white">{stats.currentStreak} days</div>
                    </div>
                  </div>

                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/10 text-amber-500">
                      <Award className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Max Streak</div>
                      <div className="text-xl font-display font-black text-white">{stats.maxStreak} days</div>
                    </div>
                  </div>

                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-zinc-300">
                      <Activity className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Submissions</div>
                      <div className="text-xl font-display font-black text-white">{stats.totalSubmissions}</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Heat Map Calendar */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      LeetCode Contribution Activity Timeline (Last 365 Days)
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[9px] text-zinc-500">
                      <span>Less</span>
                      <span className="h-2 w-2 rounded-sm bg-zinc-900" />
                      <span className="h-2 w-2 rounded-sm bg-[#4a371c]" />
                      <span className="h-2 w-2 rounded-sm bg-[#78511a]" />
                      <span className="h-2 w-2 rounded-sm bg-[#b2721e]" />
                      <span className="h-2 w-2 rounded-sm bg-[#ffa116]" />
                      <span>More</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
                    <div className="min-w-[680px] select-none flex">
                      {/* Day Names */}
                      <div className="grid grid-rows-7 gap-1 pr-2 font-mono text-[9px] text-zinc-600 pt-1.5 leading-[10px]">
                        <div className="h-2.5">Mon</div>
                        <div className="h-2.5" />
                        <div className="h-2.5">Wed</div>
                        <div className="h-2.5" />
                        <div className="h-2.5">Fri</div>
                        <div className="h-2.5" />
                        <div className="h-2.5" />
                      </div>

                      {/* Grid */}
                      <div className="flex gap-1.5 flex-1">
                        {weeks.map((week, wIdx) => (
                          <div key={wIdx} className="grid grid-rows-7 gap-1">
                            {week.map((day, dIdx) => (
                              <div
                                key={dIdx}
                                onMouseEnter={(e) => handleMouseMove(e, day)}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`h-2.5 w-2.5 rounded-sm transition-all duration-300 cursor-pointer ${getLeetCodeLevelColor(
                                  day.level
                                )}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submissions Feed */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
                      <Code2 className="h-3 w-3 text-amber-500" />
                      Verified Recent Submissions Log
                    </h4>
                    <span className="font-mono text-[9px] text-zinc-500">Language: C++ / Java</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recentSubmissions.map((sub, idx) => (
                      <div key={idx} className="bg-white/[0.005] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-lg p-3 transition-all duration-300 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-sans text-xs font-semibold text-white line-clamp-1">
                            {sub.title}
                          </p>
                          <div className="flex items-center gap-2 font-mono text-[9px]">
                            <span className={`px-1.5 py-0.5 rounded ${
                              sub.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
                              sub.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15' :
                              'bg-red-500/10 text-red-400 border border-red-500/15'
                            }`}>
                              {sub.difficulty}
                            </span>
                            <span className="text-zinc-500">{sub.language}</span>
                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-500">{sub.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded">
                          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                          {sub.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Difficulty breakdown & acceptance indices (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal delay={0.2}>
              <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent opacity-50 pointer-events-none" />

                <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Algorithm Controller
                </h3>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
                  Quantitative matrix representing total algorithmic solutions compiled on the global runtime engine.
                </p>

                {/* Progress Circles/Bars */}
                <div className="space-y-6">
                  
                  {/* Solved Index Circle Visualizer */}
                  <div className="flex flex-col items-center justify-center p-4 bg-zinc-950/60 rounded-xl border border-white/5">
                    <div className="relative h-28 w-28 flex items-center justify-center">
                      {/* SVG Progress Ring */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="48" strokeWidth="4" stroke="rgba(255,255,255,0.02)" fill="transparent" />
                        <circle cx="56" cy="56" r="48" strokeWidth="6" stroke="#ffa116" fill="transparent" 
                          strokeDasharray={2 * Math.PI * 48}
                          strokeDashoffset={2 * Math.PI * 48 * (1 - (stats.solvedTotal / 3100))}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="font-display text-2xl font-black text-white">{stats.solvedTotal}</span>
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500">Solved</span>
                      </div>
                    </div>
                    <p className="font-mono text-[10px] text-zinc-500 mt-3">Targeting 500+ Algorithms</p>
                  </div>

                  {/* Difficulty Breakdown Levels */}
                  <div className="space-y-3">
                    
                    {/* Easy Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-emerald-400 font-bold">Easy</span>
                        <span className="text-zinc-300">{stats.easySolved}<span className="text-zinc-600">/{stats.easyTotal}</span></span>
                      </div>
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${easyPct}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-emerald-500 rounded-full" 
                        />
                      </div>
                    </div>

                    {/* Medium Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-amber-500 font-bold">Medium</span>
                        <span className="text-zinc-300">{stats.mediumSolved}<span className="text-zinc-600">/{stats.mediumTotal}</span></span>
                      </div>
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${mediumPct}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                          className="h-full bg-[#ffa116] rounded-full" 
                        />
                      </div>
                    </div>

                    {/* Hard Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-red-500 font-bold">Hard</span>
                        <span className="text-zinc-300">{stats.hardSolved}<span className="text-zinc-600">/{stats.hardTotal}</span></span>
                      </div>
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${hardPct}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                          className="h-full bg-red-500 rounded-full" 
                        />
                      </div>
                    </div>

                  </div>

                  {/* Diagnostics telemetry */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-3 font-mono text-xs text-zinc-400">
                    <p className="text-zinc-500 text-[10px] font-bold uppercase pb-1 border-b border-white/5">Problem Diagnostics</p>
                    <div className="flex justify-between">
                      <span>Daily Frequency:</span>
                      <span className="text-white font-bold">~2.8 Solved/Day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Percentile Index:</span>
                      <span className="text-amber-500 font-bold">Top 4.8% [Linear]</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Server Node:</span>
                      <span className="text-amber-500 font-bold">Leetcode @ig_niket</span>
                    </div>
                  </div>

                  <a 
                    href="https://leetcode.com/u/ig_niket/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full group inline-flex items-center justify-between gap-2 rounded-xl p-3.5 border border-white/5 hover:border-amber-500/20 bg-zinc-950/60 hover:bg-zinc-900/40 text-zinc-300 hover:text-white transition-all duration-300"
                  >
                    <span className="font-mono text-xs font-bold">EXPLORE LEETCODE REPOSITORY</span>
                    <ChevronRight className="h-4 w-4 text-zinc-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                  </a>

                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>

      {/* Heatmap Calendar Tooltip */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
            className="z-50 pointer-events-none rounded bg-zinc-950/95 border border-white/10 px-2.5 py-1.5 text-center text-[11px] font-mono shadow-xl backdrop-blur-md"
          >
            <div className="font-bold text-white">
              {hoveredDay.count} problem{hoveredDay.count !== 1 ? 's' : ''} solved
            </div>
            <div className="text-zinc-500 text-[9px] mt-0.5">{hoveredDay.date}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
