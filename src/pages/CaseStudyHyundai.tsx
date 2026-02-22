import { motion } from "motion/react";
import { ArrowLeft, Clock, Car, Users, Lightbulb, Code, BarChart3, Zap, Map, Settings, ShieldCheck, CheckCircle2, ShoppingCart, CreditCard, ClipboardCheck, Globe } from "lucide-react";
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

export default function CaseStudyHyundai({ onContactClick }: { onContactClick: () => void }) {
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
            Hyundai Click to <span className="text-primary">Buy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-lg sm:text-xl text-slate-400 font-light leading-snug mb-6 sm:mb-8 max-w-2xl"
          >
            End-to-end automotive e-commerce for Hyundai Global; streamlined dealership workflows and drove conversion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] mb-16"
          >
            End-to-End Automotive E-Commerce
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
                <Globe size={12} className="text-primary" />
                Digital Commerce Transformation
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-primary/40 block">EXECUTION</span>
              <div className="flex items-center gap-2 text-white">
                <Code size={12} className="text-primary" />
                E-Commerce Systems Eng
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-primary/40 block">OUTCOME</span>
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck size={12} className="text-primary" />
                Global Platform Rollout
              </div>
            </div>
          </motion.div>
        </header>

        {/* The Brief */}
        <section className="grid md:grid-cols-12 gap-16 mb-48">
          <div className="md:col-span-5">
            <h2 className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-8">00_THE_BRIEF</h2>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              The automotive industry is shifting from dealership-first purchasing to digital-first ownership journeys. Hyundai’s “Click to Buy” initiative aimed to provide customers with a fully online vehicle purchasing experience — from discovery to final order.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="p-12 bg-white/[0.02] border border-white/5 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
              <p className="text-3xl md:text-4xl text-white font-medium leading-tight tracking-tight">
                "Transforming complex dealership workflows into a streamlined, user-friendly e-commerce system that builds trust in high-value online purchases."
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="mb-48">
          <h2 className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-16">01_THE_FRICTION</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Price Opacity", desc: "Traditional car buying involves hidden fees and complex dealership-only calculations." },
              { title: "Decision Fatigue", desc: "Comparing variants, fuel types, and financing options is traditionally overwhelming." },
              { title: "Fragmented Journey", desc: "A disconnect between online research and the final physical purchase/delivery." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-background-dark">
                <h3 className="text-white font-bold mb-4 uppercase tracking-tight text-base">{item.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* UX Strategy: The 7 Stages */}
        <section className="mb-48">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">02_UX_STRATEGY</h2>
            <span className="font-mono text-[10px] text-white/20">METHODOLOGY: PROGRESSIVE_COMMITMENT</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              "Discovery", "Fuel Type", "Configuration", "Dealer Select", "Validation", "Financing", "Final Order"
            ].map((stage, i) => (
              <div key={i} className="p-6 border border-white/5 bg-white/[0.01] text-center group hover:border-primary/40 transition-colors">
                <div className="font-mono text-primary text-[8px] mb-4">STAGE_0{i + 1}</div>
                <div className="text-white font-bold text-[10px] uppercase tracking-widest">{stage}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Solution Pillars */}
        <section className="mb-48">
          <h2 className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-24 text-center">03_SOLUTION_PILLARS</h2>

          <div className="space-y-32">
            {/* Pillar 1: Discovery & Configuration */}
            <div className="grid md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-5 space-y-8">
                <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                  <Settings size={14} className="text-primary" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Configuration Engine</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter leading-[0.9]">Personalization<br />without Friction.</h3>
                <p className="text-slate-400 leading-relaxed">
                  We redesigned the variant selection process using progressive disclosure. Real-time car image updates and clear price difference indicators enable confident personalization.
                </p>
                <ul className="space-y-4">
                  {["Real-time Asset Rendering", "Variant Dependency Logic", "Price Recalculation Engine"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/60 font-mono text-[10px] uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-7">
                <Placeholder label="Variant Configurator UI" aspect="aspect-video" />
              </div>
            </div>

            {/* Pillar 2: Financial Transparency */}
            <div className="grid md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <Placeholder label="Quotation & EMI Simulation" aspect="aspect-video" />
              </div>
              <div className="md:col-span-5 space-y-8 order-1 md:order-2">
                <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                  <CreditCard size={14} className="text-primary" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Financial Clarity</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter leading-[0.9]">Transparent<br />Quotations.</h3>
                <p className="text-slate-400 leading-relaxed">
                  Transforming hidden dealership calculations into digital clarity. Our EMI simulation engine provides real-time cost breakdowns, including taxes and registration fees.
                </p>
                <div className="p-6 bg-primary/5 border border-primary/20">
                  <p className="text-[10px] text-primary font-mono leading-tight uppercase">
                    FINANCE_CALCULATION_ENGINE: AUTOMATED_TAX_LOGIC
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3: Hybrid Fulfillment */}
            <div className="grid md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-5 space-y-8">
                <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                  <ClipboardCheck size={14} className="text-primary" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Hybrid Flow</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter leading-[0.9]">Digital to<br />Physical.</h3>
                <p className="text-slate-400 leading-relaxed">
                  Seamlessly connecting the online booking with local dealership fulfillment. Users can schedule test drives or finalize orders with geo-located dealer integration.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Map size={16} className="text-primary" />
                    <span className="font-mono text-[10px] text-white/40 uppercase">Dealer Sync</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={16} className="text-primary" />
                    <span className="font-mono text-[10px] text-white/40 uppercase">Order Tracking</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7">
                <Placeholder label="Dealer Selection & Booking" aspect="aspect-video" />
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="mb-48">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">04_SYSTEM_ARCHITECTURE</h2>
            <span className="font-mono text-[10px] text-white/20">INFRASTRUCTURE: MULTI_LAYER_INTEGRATION</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Product Config Engine", desc: "Handles variant logic, pricing updates, and compatibility validation." },
              { title: "Dealer & Inventory", desc: "Connects local dealership systems to digital purchase flow." },
              { title: "Financial Computation", desc: "Calculates EMI, taxes, fees, insurance, and discounts." },
              { title: "Payment & Order", desc: "Handles transaction security and booking confirmation." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/5 bg-white/[0.01]">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="font-mono text-[10px] text-primary">{i + 1}</span>
                </div>
                <h3 className="text-white font-bold mb-4 uppercase tracking-tight text-sm">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-48 py-24 border-y border-white/5">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] text-primary uppercase tracking-widest">01_CONVERSION</h4>
              <div className="text-6xl font-black text-white tracking-tighter">+25%</div>
              <p className="text-slate-400 text-sm leading-relaxed">Increase in lead-to-booking conversion rate through simplified variant selection.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] text-primary uppercase tracking-widest">02_TRUST_SCORE</h4>
              <div className="text-6xl font-black text-white tracking-tighter">92%</div>
              <p className="text-slate-400 text-sm leading-relaxed">User rating for pricing transparency and financial clarity during the checkout process.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] text-primary uppercase tracking-widest">03_VELOCITY</h4>
              <div className="text-6xl font-black text-white tracking-tighter">-30%</div>
              <p className="text-slate-400 text-sm leading-relaxed">Reduction in average buying decision timeline compared to traditional dealership journeys.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <footer className="text-center py-24">
          <div className="max-w-2xl mx-auto space-y-12">
            <h3 className="text-5xl font-bold text-white tracking-tighter leading-tight">Looking to digitize complex purchase journeys?</h3>
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
