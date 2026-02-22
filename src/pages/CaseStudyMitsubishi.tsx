import { motion } from "motion/react";
import { ArrowLeft, Clock, Car, Users, Lightbulb, Code, BarChart3, Zap, Map, Settings, ShieldCheck, CheckCircle2, Layout, Activity, Gauge } from "lucide-react";
import { Link } from "react-router-dom";

const Placeholder = ({ label, aspect = "aspect-video", className = "" }: { label: string, aspect?: string, className?: string }) => (
  <div className={`${aspect} bg-white/[0.03] border border-white/10 relative overflow-hidden group ${className}`}>
    <div className="absolute inset-0 tech-grid opacity-20"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="w-12 h-px bg-primary/20 mx-auto"></div>
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">{label}</span>
        <div className="w-12 h-px bg-primary/20 mx-auto"></div>
      </div>
    </div>
    <div className="absolute top-4 left-4 font-mono text-[8px] text-white/10 uppercase">Artifact_Ref // {label.replace(/\s+/g, '_')}</div>
  </div>
);

export default function CaseStudyMitsubishi({ onContactClick }: { onContactClick: () => void }) {
  return (
    <div className="min-h-screen bg-background-dark pt-20 sm:pt-24 pb-20 sm:pb-32 selection:bg-primary selection:text-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 sm:mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-[0.2em] hover:gap-4 transition-all min-h-[44px] items-center"
          >
            <ArrowLeft size={14} /> Back_to_Archives
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-16 sm:mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] text-primary mb-6 sm:mb-8 uppercase tracking-[0.3em]"
          >
            [ UX & ENGINEERING CASE STUDY ]
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-4 sm:mb-6"
          >
            Designing a<br />Connected Car<br /><span className="text-primary">Ecosystem.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-lg sm:text-xl text-slate-400 font-light leading-snug mb-6 sm:mb-8 max-w-2xl"
          >
            Reimagined the digital layer for Mitsubishi Motors Australia; reduced cognitive load by 40%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] bg-white/5 py-1 px-3 border border-white/10">Client: Mitsubishi Motors Australia</span>
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] bg-primary/5 py-1 px-3 border border-primary/20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              Status: Deployed
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-12 text-white/40 font-mono text-[10px] uppercase tracking-widest border-y border-white/5 py-12"
          >
            <div className="space-y-3">
              <span className="text-primary/40 block">STRATEGY</span>
              <div className="flex items-center gap-2 text-white">
                <Users size={12} className="text-primary" />
                Systems Architecture
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-primary/40 block">EXECUTION</span>
              <div className="flex items-center gap-2 text-white">
                <Code size={12} className="text-primary" />
                Full-Stack Engineering
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-primary/40 block">OUTCOME</span>
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck size={12} className="text-primary" />
                Production Deployed
              </div>
            </div>
          </motion.div>
        </header>

        {/* Post-Incident Report */}
        <section className="grid md:grid-cols-12 gap-16 mb-32 border-t border-white/5 pt-16">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[10px] text-red-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500"></span>
              00_CRITICAL_FAILURE // THE_INCIDENT
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl text-white font-light leading-relaxed tracking-tight mb-8">
              The hardware was ready. Sensors were streaming data. But the human interface was lagging, resulting in a disconnected driver experience that failed to utilize the available telemetry.
            </p>
            <div className="p-8 bg-red-500/5 border border-red-500/20 font-mono text-[10px] text-red-400 uppercase tracking-widest leading-loose">
              [SYSTEM_DIAGNOSIS]<br />
              &gt; COGNITIVE_LOAD: CRITICAL<br />
              &gt; DATA_VISUALIZATION: FRAGMENTED<br />
              &gt; DRIVER_ENGAGEMENT: LOW<br />
              [RECOMMENDATION]: IMMEDIATE_ARCHITECTURE_OVERHAUL
            </div>
          </div>
        </section>

        {/* The Architecture */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-t border-white/5 pt-16">
            <h2 className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary"></span>
              01_THE_ARCHITECTURE // SYSTEMS_LEVEL_FIXES
            </h2>
          </div>

          <div className="space-y-32">
            {/* Fix 1 */}
            <div className="grid md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-4 p-10 bg-white/[0.02] border border-white/5 flex flex-col">
                <div className="inline-flex items-center gap-4 mb-6">
                  <Layout size={16} className="text-primary" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Interface Restructuring</span>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tighter leading-[1] mb-6">Clarity at High Speed.</h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 flex-grow">
                  We reduced cognitive load by 40% through a radical simplification of the instrument cluster. Information is prioritized via state-machines dependent on driving context.
                </p>
                <div className="border-t border-white/5 pt-6 font-mono text-[8px] text-white/40 uppercase space-y-2">
                  <div>Action // Refactored Component Hierarchy</div>
                  <div>Action // Implemented Dynamic Triage System</div>
                </div>
              </div>
              <div className="md:col-span-8 bg-white/[0.02] border border-white/5 relative min-h-[300px]">
                <div className="absolute inset-0 tech-grid opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {/* Abstract UI representation */}
                  <div className="w-full h-full max-w-lg border border-primary/20 rounded-xl relative overflow-hidden bg-background-dark/50 backdrop-blur-md flex flex-col">
                    <div className="h-10 border-b border-primary/20 flex items-center px-4 gap-2">
                      <div className="w-16 h-2 bg-primary/20 rounded-full"></div>
                    </div>
                    <div className="flex-grow p-6 flex flex-col gap-4">
                      <div className="w-full h-32 bg-primary/10 rounded-lg flex items-end justify-center pb-4">
                        <div className="text-5xl font-mono font-bold text-primary">124<span className="text-xl text-primary/50">km/h</span></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-16 bg-primary/5 rounded-lg border border-primary/10"></div>
                        <div className="h-16 bg-primary/5 rounded-lg border border-primary/10"></div>
                        <div className="h-16 bg-primary/5 rounded-lg border border-primary/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pillar 2 */}
            <div className="grid md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <Placeholder label="Gamification & Feedback Loops" aspect="aspect-video" />
              </div>
              <div className="md:col-span-5 space-y-8 order-1 md:order-2">
                <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                  <Activity size={14} className="text-primary" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Behavioral Design</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter leading-[0.9]">Incentivizing<br />Efficiency.</h3>
                <p className="text-slate-400 leading-relaxed">
                  By gamifying eco-friendly driving habits, we saw a 20% increase in fuel efficiency across the pilot group. Real-time feedback loops turn safe driving into a rewarding experience.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 border border-white/5 bg-white/[0.01]">
                    <div className="text-2xl font-bold text-white mb-1">+20%</div>
                    <div className="font-mono text-[8px] text-white/20 uppercase">Efficiency Gain</div>
                  </div>
                  <div className="p-4 border border-white/5 bg-white/[0.01]">
                    <div className="text-2xl font-bold text-white mb-1">85%</div>
                    <div className="font-mono text-[8px] text-white/20 uppercase">User Adoption</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="grid md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-5 space-y-8">
                <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                  <Gauge size={14} className="text-primary" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Predictive Service</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter leading-[0.9]">Proactive<br />Maintenance.</h3>
                <p className="text-slate-400 leading-relaxed">
                  Transforming vehicle health from a source of anxiety into a managed service. The system predicts maintenance needs and seamlessly integrates with dealership scheduling.
                </p>
                <Placeholder label="Service Integration Flow" aspect="aspect-[4/3]" className="md:hidden" />
              </div>
              <div className="md:col-span-7">
                <Placeholder label="Predictive Health Dashboard" aspect="aspect-video" />
              </div>
            </div>
          </div>
        </section>

        {/* Telemetry (Impact) */}
        <section className="mb-48 py-16 border-y border-white/5">
          <h2 className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-16 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary"></span>
            02_TELEMETRY // DEPLOYMENT_METRICS
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            <div className="p-12 bg-background-dark hover:bg-white/[0.02] transition-colors relative group">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <BarChart3 className="text-primary/40" size={24} />
              </div>
              <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Cognitive Load</h4>
              <div className="text-6xl font-black text-white tracking-tighter mb-4">-40%</div>
              <p className="text-slate-400 text-sm leading-relaxed">Reduction in time-to-glance metrics verified by eye-tracking during QA.</p>
            </div>
            <div className="p-12 bg-background-dark hover:bg-white/[0.02] transition-colors relative group">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Activity className="text-primary/40" size={24} />
              </div>
              <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Eco-Driving Adoption</h4>
              <div className="text-6xl font-black text-white tracking-tighter mb-4">85%</div>
              <p className="text-slate-400 text-sm leading-relaxed">Of daily active users engaged with the newly deployed gamification framework.</p>
            </div>
            <div className="p-12 bg-background-dark hover:bg-white/[0.02] transition-colors relative group">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="text-primary/40" size={24} />
              </div>
              <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Maintenance Overhead</h4>
              <div className="text-6xl font-black text-white tracking-tighter mb-4">-15%</div>
              <p className="text-slate-400 text-sm leading-relaxed">Reduction in catastrophic failures due to predictive telemetry analysis.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <footer className="text-center py-24">
          <div className="max-w-2xl mx-auto space-y-12">
            <h3 className="text-5xl font-bold text-white tracking-tighter leading-tight">Ready to architect your next digital ecosystem?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="bg-primary text-black px-12 py-5 font-mono font-bold text-xs uppercase tracking-[0.2em] w-full sm:w-auto"
              >
                ESTABLISH_CONNECTION
              </motion.button>
              <Link
                to="/"
                className="text-white/40 hover:text-white font-mono text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                Return_to_Archives
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
