import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Car, Zap, ShoppingCart, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { playTick } from "../utils/audio";


const interventions = [
  {
    id: "mitsubishi",
    title: "Designing a Connected Car Ecosystem",
    client: "Mitsubishi Motors Australia",
    description: "Reimagining the digital layer of the driving experience through predictive servicing and eco-driving gamification. Reduced cognitive load by 40%.",
    icon: <Car className="w-6 h-6" />,
    tag: "AUTOMOTIVE_UX",
    link: "/case-study/mitsubishi",
    featured: true,
    metric: "+20% Efficiency"
  },
  {
    id: "hyundai",
    title: "Hyundai Click to Buy",
    client: "Hyundai Global",
    description: "End-to-end automotive e-commerce transformation. Converting complex dealership workflows into a streamlined, confidence-driven digital buying platform.",
    icon: <ShoppingCart className="w-6 h-6" />,
    tag: "AUTO_ECOMMERCE",
    link: "/case-study/hyundai",
    featured: false,
    metric: "+25% Conversion"
  },
  {
    id: "dummy-1",
    title: "Next-Gen Energy Grid Visualization",
    client: "VoltSystems Global",
    description: "Real-time monitoring and predictive maintenance for decentralized renewable energy networks. Enabled 10x throughput for grid operators.",
    icon: <Zap className="w-6 h-6" />,
    tag: "ENERGY_INFRA",
    link: "#",
    featured: false,
    metric: "10x Throughput"
  }
];

function MitsubishiTelemetry() {
  return (
    <div className="w-full h-[180px] bg-black/40 border border-white/5 rounded p-4 font-mono text-[9px] text-[#00f5ff]/70 relative overflow-hidden flex flex-col justify-between select-none">
      <div className="flex justify-between items-center opacity-40 border-b border-white/5 pb-1.5">
        <span>UI_EFFICIENCY_TELEMETRY</span>
        <span className="animate-pulse">● RUNNING</span>
      </div>
      
      {/* SVG Line Graph */}
      <svg className="w-full h-[90px] overflow-visible" viewBox="0 0 200 90">
        {/* Grid lines */}
        <line x1="0" y1="15" x2="200" y2="15" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
        <line x1="0" y1="45" x2="200" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
        <line x1="0" y1="75" x2="200" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
        
        {/* Stretched/Struck path */}
        <motion.path
          d="M 10,75 L 50,70 L 90,40 L 130,48 L 170,15 L 190,12"
          fill="none"
          stroke="#00f5ff"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        />
        
        {/* Pulsing indicator node at peak */}
        <motion.circle
          cx="170"
          cy="15"
          r="4"
          fill="#00f5ff"
          animate={{ r: [3, 6, 3], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <circle cx="170" cy="15" r="8" fill="none" stroke="#00f5ff" strokeWidth="0.5" className="animate-ping" />
        
        {/* Labels */}
        <text x="12" y="85" fill="rgba(255,255,255,0.3)">T_0</text>
        <text x="175" y="25" fill="#00f5ff" fontWeight="bold">+20%</text>
      </svg>

      <div className="flex justify-between items-center border-t border-white/5 pt-1.5 text-[8px] text-white/40">
        <span>LOAD_FACTOR: -40%</span>
        <span>SYS_LATENCY: &lt;14ms</span>
      </div>
    </div>
  );
}

function HyundaiTelemetry() {
  return (
    <div className="w-full h-[160px] bg-black/40 border border-white/5 rounded p-4 font-mono text-[9px] text-[#00f5ff]/70 relative overflow-hidden flex flex-col justify-between select-none">
      <div className="flex justify-between items-center opacity-40 border-b border-white/5 pb-1.5">
        <span>CONVERSION_UPLIFT_FUNNEL</span>
        <span className="animate-pulse">● CALC</span>
      </div>

      <div className="flex items-end justify-around h-[80px] pt-4 px-2">
        {/* Bar 1 */}
        <div className="flex flex-col items-center gap-1 w-1/4">
          <span className="text-white/30 text-[7px]">BASE</span>
          <motion.div 
            className="w-full bg-white/10 border border-white/10 rounded-t-sm"
            initial={{ height: 0 }}
            animate={{ height: 25 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <span className="text-white/40 text-[8px]">3.2%</span>
        </div>

        {/* Bar 2 */}
        <div className="flex flex-col items-center gap-1 w-1/4">
          <span className="text-white/30 text-[7px]">V1_UI</span>
          <motion.div 
            className="w-full bg-[#00f5ff]/20 border border-[#00f5ff]/30 rounded-t-sm"
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
          />
          <span className="text-primary/70 text-[8px]">4.1%</span>
        </div>

        {/* Bar 3 */}
        <div className="flex flex-col items-center gap-1 w-1/4">
          <span className="text-primary text-[7px] font-bold">UPLIFT</span>
          <motion.div 
            className="w-full bg-[#00f5ff] rounded-t-sm relative shadow-[0_0_12px_rgba(0,245,255,0.4)]"
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-t-sm" />
          </motion.div>
          <span className="text-primary font-bold text-[8px]">5.2%</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-white/5 pt-1.5 text-[8px] text-white/40">
        <span>RATE: +25%</span>
        <span>SAMPLE: 14.2K/D</span>
      </div>
    </div>
  );
}

function VoltSystemsTelemetry() {
  return (
    <div className="w-full h-[160px] bg-[#0c0505]/40 border border-red-500/10 rounded p-4 font-mono text-[9px] text-red-500/60 relative overflow-hidden flex flex-col justify-between select-none">
      <div className="flex justify-between items-center opacity-40 border-b border-red-500/10 pb-1.5">
        <span>ENCRYPTED_TELEMETRY</span>
        <span className="animate-pulse text-red-500">● SECURE</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 my-1.5 relative">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-12 h-12 rounded-full border border-red-500/20 border-dashed animate-spin-slow" />
        </motion.div>

        <Lock className="w-4 h-4 text-red-500/40 animate-pulse" />
        <span className="text-[7px] text-red-500/40 uppercase tracking-[0.2em] animate-pulse">RESTRICTED_ACCESS</span>
      </div>

      <div className="flex justify-between items-center border-t border-red-500/10 pt-1.5 text-[8px] text-red-500/30">
        <span>GRID: 400_ERR</span>
        <span>CLEARANCE: REQ</span>
      </div>
    </div>
  );
}

export default function StrategicInterventions() {

  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const handleCardClick = (link: string) => {
    if (link === "#") {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } else {
      navigate(link);
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 px-5 md:px-8 bg-background-dark border-y border-white/5 relative" id="case-studies">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-surface border border-primary/40 px-5 py-3 font-mono text-xs text-primary uppercase tracking-widest shadow-[0_0_30px_rgba(0,245,255,0.15)] flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 bg-primary animate-pulse shrink-0" />
            CASE_STUDY: CLASSIFIED // Clearance_Pending
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2 flex-wrap">
              <span className="w-1.5 h-1.5 bg-primary shrink-0" />
              [ STRATEGIC_INTERVENTIONS // CASE_STUDIES ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              High-Stakes<br />Deployments.
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-sm font-light leading-snug">
            We don't just build features. We architect ecosystems that redefine market positions and drive deterministic growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 border border-white/5">
          {interventions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCardClick(item.link)}
              onMouseEnter={() => playTick()}
              data-cursor-text={`Case: ${item.client} | ${item.metric}`}
              className={`${item.featured ? 'lg:col-span-8 md:col-span-12 col-span-12' : 'lg:col-span-4 md:col-span-12 col-span-12'}
                p-6 sm:p-8 md:p-10 lg:p-12 bg-background-dark hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden flex flex-col cursor-pointer active:scale-[0.99]`}
            >

              {/* Dynamic Accent Lines & Border Glow on Hover */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 ease-out z-20" />
              <div className="absolute -inset-px border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full min-w-0">
                <div className="flex justify-between items-start gap-3 mb-8 md:mb-10">
                  <span className="font-mono text-xs text-white/20 group-hover:text-primary transition-colors duration-500 shrink-0">
                    {item.tag}
                  </span>
                  <div className="text-primary opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 shrink-0 [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                    {item.icon}
                  </div>
                </div>

                {item.id === "mitsubishi" ? (
                  // Asymmetric layout split for featured Mitsubishi dashboard
                  <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-between w-full h-full min-w-0 mt-auto">
                    {/* Left Column: Description Details */}
                    <div className="w-full lg:w-[58%] flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                          <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80 group-hover:opacity-100 truncate">
                            {item.client}
                          </span>
                          <div className="h-px flex-1 min-w-[20px] bg-primary/10 group-hover:bg-primary/30 transition-colors duration-500" />
                          <span className="font-mono text-xs text-primary font-bold bg-primary/10 px-2 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                            {item.metric}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-tight group-hover:text-primary transition-colors duration-500 break-words">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-auto pt-2">
                        <span className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-500">
                          View_Case_Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-500 shrink-0" />
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Live Vector Line Graph Dashboard */}
                    <div className="w-full lg:w-[38%] flex items-center justify-center shrink-0">
                      <MitsubishiTelemetry />
                    </div>
                  </div>
                ) : (
                  // Vertical telemetry stack for smaller card modules (Hyundai & VoltSystems)
                  <div className="mt-auto min-w-0 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                        <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80 group-hover:opacity-100 truncate">
                          {item.client}
                        </span>
                        <div className="h-px flex-1 min-w-[20px] bg-primary/10 group-hover:bg-primary/30 transition-colors duration-500" />
                        <span className="font-mono text-xs text-primary font-bold bg-primary/10 px-2 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                          {item.metric}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight group-hover:text-primary transition-colors duration-500 break-words">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>

                    {/* Embedded Telemetry Panel */}
                    <div className="mb-6 z-20">
                      {item.id === "hyundai" ? <HyundaiTelemetry /> : <VoltSystemsTelemetry />}
                    </div>

                    <div className="mt-auto">
                      {item.link !== "#" ? (
                        <span className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-500">
                          View_Case_Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-500 shrink-0" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-white/40 font-mono text-xs uppercase tracking-widest group-hover:text-white/60 transition-colors duration-500">
                          Coming_Soon <ArrowRight size={14} className="shrink-0" />
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {item.featured && (
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-screen scale-110 group-hover:scale-100 transform hidden md:block">
                  <div className="absolute inset-0 tech-grid" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
