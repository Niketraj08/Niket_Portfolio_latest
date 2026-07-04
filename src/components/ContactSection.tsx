import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send, 
  Check, 
  Copy, 
  Lock, 
  HelpCircle, 
  ArrowUpRight 
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentStatus, setSentStatus] = useState<null | 'success' | 'error'>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    
    // Simulate high-speed SaaS secure webhook transmission
    setTimeout(() => {
      setIsSending(false);
      setSentStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSentStatus(null), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 border-t border-white/5 relative">
      {/* Background soft lighting */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="space-y-12">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent-gold font-bold">Gateway_Module_05</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Initiate API Connection
            </h2>
            <p className="font-sans text-sm text-zinc-500 max-w-xl">
              Establish a direct routing tunnel to my inbox for internships, freelancing queries, or generic computer science evaluations.
            </p>
          </div>
        </ScrollReveal>

        {/* Form and CTA Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Support Channels Hub (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-5">
              
              {/* Primary Email Connection Block */}
              <ScrollReveal delay={0.1}>
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#09090d]/80 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-gold/10 to-transparent opacity-50 group-hover:from-accent-gold/20 transition-all pointer-events-none" />
                  
                  <span className="font-mono text-[9px] uppercase text-zinc-500 font-bold tracking-wider block mb-2">Primary Node Endpoint</span>
                  <h3 className="font-display text-lg font-bold text-white mb-1.5">Direct Email Port</h3>
                  <p className="text-zinc-400 text-xs mb-4">Responsive within sub-24 hours. Secured SSL channel.</p>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="flex-1 flex items-center gap-2.5 px-4.5 py-3 rounded-lg bg-white/[0.02] border border-white/10 hover:border-accent-gold/30 hover:bg-white/[0.04] text-zinc-300 hover:text-white transition-all text-xs font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      <Mail className="h-4 w-4 text-accent-gold shrink-0" />
                      {PERSONAL_INFO.email}
                    </a>

                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center justify-center gap-2.5 px-4.5 py-3 rounded-lg bg-zinc-900 border border-white/5 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all active:scale-95"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-4 w-4 text-accent-gold" />
                          <span className="font-mono text-xs">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 text-zinc-500" />
                          <span className="font-mono text-xs">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              {/* Social Channels Tunnel */}
              <ScrollReveal delay={0.2}>
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-zinc-950/40 space-y-4">
                  <span className="font-mono text-[9px] uppercase text-zinc-500 font-bold tracking-wider block">External Sync Pipelines</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-lg bg-white/[0.01] border border-white/5 hover:border-accent-indigo/30 hover:bg-accent-indigo/[0.02] text-zinc-400 hover:text-white transition-all"
                    >
                      <span className="flex items-center gap-2 text-xs font-semibold">
                        <Linkedin className="h-4 w-4 text-[#0077b5]" />
                        LinkedIn
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-white" />
                    </a>

                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-lg bg-white/[0.01] border border-white/5 hover:border-accent-gold/30 hover:bg-accent-gold/[0.02] text-zinc-400 hover:text-white transition-all"
                    >
                      <span className="flex items-center gap-2 text-xs font-semibold">
                        <Github className="h-4 w-4 text-white" />
                        GitHub
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-white" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* API Status Credentials Footer block */}
            <ScrollReveal delay={0.3}>
              <div className="rounded-xl border border-white/5 bg-[#0a0a0f] p-4.5 space-y-3">
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono font-bold uppercase">
                  <Lock className="h-3.5 w-3.5 text-accent-gold" />
                  <span>Secure Transmission Specs</span>
                </div>
                <div className="grid grid-cols-2 gap-3 font-mono text-[9px] text-zinc-600 leading-tight">
                  <div>
                    <p className="text-zinc-500">TUNNEL STATUS</p>
                    <p className="text-emerald-500 font-bold">READY (SSL_AES)</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">TLS AUTHENTICATION</p>
                    <p className="text-zinc-400">SESSION_PASS_GEC</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Secure Message Webhook Dispatcher (Right 3 columns) */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.15}>
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-zinc-950/60 h-full flex flex-col justify-between">
                
                <form onSubmit={handleSubmit} className="space-y-5.5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <div className="space-y-0.5">
                      <h3 className="font-display text-lg font-bold text-white tracking-tight">Interactive Dispatcher</h3>
                      <p className="font-mono text-[9px] uppercase text-zinc-500 tracking-wider font-semibold">Method: POST /api/v1/message</p>
                    </div>
                    <HelpCircle className="h-4.5 w-4.5 text-zinc-600" />
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="font-mono text-[10px] uppercase text-zinc-500 font-bold tracking-wider block">
                      Client Sender Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alexis Vance"
                      className="w-full rounded-lg bg-zinc-900/50 border border-white/10 hover:border-zinc-700 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/40 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 transition-all font-sans"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-mono text-[10px] uppercase text-zinc-500 font-bold tracking-wider block">
                      Sender Callback Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. alexis@corporation.com"
                      className="w-full rounded-lg bg-zinc-900/50 border border-white/10 hover:border-zinc-700 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/40 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 transition-all font-sans"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-mono text-[10px] uppercase text-zinc-500 font-bold tracking-wider block">
                      Payload Description (Message)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Specify project parameters or internship interview outlines..."
                      className="w-full rounded-lg bg-zinc-900/50 border border-white/10 hover:border-zinc-700 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold/40 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 transition-all font-sans resize-none"
                    />
                  </div>

                  {/* Submit Trigger button */}
                  <button
                    type="submit"
                    disabled={isSending || sentStatus === 'success'}
                    className={`w-full flex items-center justify-center gap-2.5 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-[0.99] ${
                      sentStatus === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : 'bg-gradient-to-r from-accent-indigo to-accent-indigo-dark text-white border border-accent-indigo-light/25 hover:from-accent-indigo-light hover:to-accent-indigo shadow-md shadow-accent-indigo/5 hover:shadow-accent-indigo/15'
                    }`}
                  >
                    {isSending ? (
                      <span className="font-mono text-xs flex items-center gap-2">
                        <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        TRANSMITTING_MESSAGE...
                      </span>
                    ) : sentStatus === 'success' ? (
                      <span className="font-mono text-xs flex items-center gap-2">
                        <Check className="h-4 w-4" /> SECURE_TRANSMISSION_COMPLETE
                      </span>
                    ) : (
                      <>
                        <span>Submit Secure Dispatch</span>
                        <Send className="h-3.5 w-3.5 text-zinc-200" />
                      </>
                    )}
                  </button>

                  {/* Dynamic Alert Feed */}
                  {sentStatus === 'success' && (
                    <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/15 p-3.5">
                      <p className="font-mono text-[10px] text-emerald-400 font-bold uppercase mb-1">Response: 202 ACCEPTED</p>
                      <p className="font-sans text-[11px] text-zinc-400">
                        Thank you, Alexis. Your dispatch request was processed successfully. I'll get back to you immediately on your callback address.
                      </p>
                    </div>
                  )}

                </form>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
