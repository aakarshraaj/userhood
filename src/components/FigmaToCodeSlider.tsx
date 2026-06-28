import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Car, Brain, Landmark, Terminal, ArrowRight, CheckCircle2, Shield, Activity, RefreshCw } from "lucide-react";
import { playTick, playSuccess } from "../utils/audio";

interface Sector {
  id: string;
  name: string;
  tag: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  specs: string[];
  link: string;
}

export default function FigmaToCodeSlider() {
  const navigate = useNavigate();
  const [activeSector, setActiveSector] = useState<string>("mobility");
  const [toast, setToast] = useState(false);
  const [time, setTime] = useState(0);

  // Time ticker for graphics animation loop
  useEffect(() => {
    let animationId: number;
    const tick = () => {
      setTime((t) => t + 0.05);
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleSectorClick = (id: string) => {
    playTick();
    setActiveSector(id);
  };

  const handleCaseLink = (link: string) => {
    if (link === "#") {
      playTick();
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } else {
      playSuccess();
      navigate(link);
    }
  };

  const sectors: Sector[] = [
    {
      id: "mobility",
      name: "Connected Mobility",
      tag: "AUTOMOTIVE // IoT // FLEET",
      icon: <Car size={16} />,
      color: "#00f5ff", // Cyan
      description: "We architect low-latency telematics pipelines and dashboard UI systems that synchronize vehicle diagnostics with cloud services in under 50 milliseconds.",
      specs: [
        "CAN-Bus data stream decoding",
        "WebGL-rendered instrument clusters",
        "Predictive vehicle health telemetry",
        "Dealer service integration endpoints"
      ],
      link: "/case-studies/mitsubishi"
    },
    {
      id: "ai",
      name: "Intelligent AI Agents",
      tag: "LLMs // VECTOR_DB // RAG",
      icon: <Brain size={16} />,
      color: "#E100FF", // Purple
      description: "We design and build custom agentic interfaces, orchestrating multi-LLM workflows with stream-based token rendering and real-time canvas memory systems.",
      specs: [
        "Serverless streaming architecture",
        "Vector database embeddings",
        "Active context state caching",
        "Human-in-the-loop audit pipelines"
      ],
      link: "#"
    },
    {
      id: "fintech",
      name: "FinTech Infrastructure",
      tag: "LEDGERS // SECURE_APIS // TRADING",
      icon: <Landmark size={16} />,
      color: "#00FF66", // Green
      description: "We deploy high-integrity billing ledgers and Plaid/Stripe custom routing systems, guaranteeing transaction atomicity and sub-second checkout latencies.",
      specs: [
        "Double-entry cryptographic logging",
        "Custom Stripe escrow workflows",
        "AES-256 field-level encryption",
        "Plaid authentication routers"
      ],
      link: "#"
    },
    {
      id: "saas",
      name: "SaaS & DevTools",
      tag: "MULTIPLAYER // CANVAS // AST",
      icon: <Terminal size={16} />,
      color: "#FF5C00", // Orange
      description: "We develop complex web applications, designing collaborative whiteboard canvases, custom compilers, and drag-and-drop workflow builders.",
      specs: [
        "Framer Motion spring state sync",
        "Collaborative Yjs state synchronization",
        "AST compiler code parsing",
        "Virtual DOM layout scaling"
      ],
      link: "#"
    }
  ];

  const currentSector = sectors.find((s) => s.id === activeSector) || sectors[0];

  // Helper graphics for the center panel based on active industry
  const renderMobilityGraphic = () => {
    // Speedometer dial & radar scanline
    const angle = 45 + Math.sin(time) * 35;
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        {/* Radar dial */}
        <div className="w-36 h-36 rounded-full border border-[#00f5ff]/20 flex items-center justify-center relative">
          <div className="w-24 h-24 rounded-full border border-[#00f5ff]/10 flex items-center justify-center" />
          <div className="absolute inset-0 rounded-full border border-dashed border-[#00f5ff]/30 animate-spin-slow" />
          
          {/* Diagnostic scanner beam */}
          <div 
            className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent to-[#00f5ff] origin-left"
            style={{ 
              transform: `rotate(${time * 65}deg)`, 
              left: "50%",
              top: "50%",
              boxShadow: "0 0 8px #00f5ff"
            }}
          />

          {/* Core needle indicator */}
          <motion.div 
            className="w-1.5 h-16 bg-[#00f5ff] rounded-full origin-bottom absolute bottom-1/2"
            style={{ rotate: angle }}
          />
          <div className="w-4 h-4 rounded-full bg-black border-2 border-[#00f5ff] z-10 absolute" />
        </div>
        <span className="font-mono text-[7px] text-[#00f5ff] mt-4 tracking-widest uppercase">
          DIAGNOSTIC_SCAN // RPM: {Math.round(2000 + Math.sin(time) * 800)}
        </span>
      </div>
    );
  };

  const renderAIGraphic = () => {
    // Floating neural network dots
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <svg className="w-40 h-40 stroke-[#E100FF]/30 stroke-[0.75] fill-none overflow-visible">
          {/* Connector lines dynamic */}
          {[
            { x1: 20, y1: 20, x2: 80, y2: 40 },
            { x1: 80, y1: 40, x2: 140, y2: 20 },
            { x1: 20, y1: 80, x2: 80, y2: 40 },
            { x1: 80, y1: 40, x2: 140, y2: 80 },
            { x1: 80, y1: 40, x2: 80, y2: 120 },
            { x1: 20, y1: 80, x2: 80, y2: 120 },
            { x1: 140, y1: 80, x2: 80, y2: 120 }
          ].map((line, i) => (
            <line 
              key={i}
              x1={`${line.x1}%`} 
              y1={`${line.y1}%`} 
              x2={`${line.x2}%`} 
              y2={`${line.y2}%`} 
            />
          ))}

          {/* Active node pulses */}
          {[
            { cx: 20, cy: 20, r: 4 },
            { cx: 80, cy: 40, r: 6, pulse: true },
            { cx: 140, cy: 20, r: 4 },
            { cx: 20, cy: 80, r: 4 },
            { cx: 140, cy: 80, r: 4 },
            { cx: 80, cy: 120, r: 5 }
          ].map((node, i) => (
            <g key={i}>
              {node.pulse && (
                <circle 
                  cx={`${node.cx}%`} 
                  cy={`${node.cy}%`} 
                  r={`${node.r + Math.sin(time * 2) * 4}`} 
                  className="stroke-[#E100FF] fill-none opacity-40" 
                />
              )}
              <circle 
                cx={`${node.cx}%`} 
                cy={`${node.cy}%`} 
                r={node.r} 
                className="fill-black stroke-[#E100FF] stroke-[2]"
              />
            </g>
          ))}
        </svg>
        <span className="font-mono text-[7px] text-[#E100FF] mt-2 tracking-widest uppercase">
          AGENTIC_ORCHESTRATOR // TOKENS: {Math.round(45 + Math.sin(time) * 15)}/s
        </span>
      </div>
    );
  };

  const renderFinTechGraphic = () => {
    // Digital matrix transaction ledger
    const rows = [
      { id: "TX_4021", hash: "0x8fa1", amt: "$1,240.00", status: "SECURE" },
      { id: "TX_4022", hash: "0x34bc", amt: "$450.50", status: "SECURE" },
      { id: "TX_4023", hash: "0x9812", amt: "$9,800.00", status: "PENDING" },
      { id: "TX_4024", hash: "0x1102", amt: "$12.45", status: "SECURE" }
    ];

    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center px-4 font-mono text-[9px]">
        <div className="w-full bg-black/40 border border-[#00FF66]/20 rounded-lg p-3 space-y-2.5">
          <div className="flex justify-between items-center text-[#00FF66]/50 border-b border-[#00FF66]/10 pb-1.5 text-[8px] uppercase tracking-wider">
            <span>TX_HASH</span>
            <span>AMOUNT</span>
            <span>INTEGRITY</span>
          </div>
          {rows.map((row, i) => (
            <div key={row.id} className="flex justify-between items-center text-slate-300">
              <span className="text-white/40">{row.hash}</span>
              <span className="font-bold text-white">{row.amt}</span>
              <span 
                className="text-[7.5px] px-1 rounded border" 
                style={{ 
                  color: row.status === "SECURE" ? "#00FF66" : "#E100FF",
                  borderColor: row.status === "SECURE" ? "rgba(0,255,102,0.2)" : "rgba(225,0,255,0.2)",
                  backgroundColor: row.status === "SECURE" ? "rgba(0,255,102,0.02)" : "rgba(225,0,255,0.02)"
                }}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
        <span className="font-mono text-[7px] text-[#00FF66] mt-4 tracking-widest uppercase flex items-center gap-1">
          <Activity size={8} className="animate-pulse" /> LEDGER_INTEGRITY // VERIFIED
        </span>
      </div>
    );
  };

  const renderSaaSGraphic = () => {
    // Elastic wireframe editor grid
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="w-36 h-28 border border-[#FF5C00]/20 rounded bg-black/40 relative overflow-hidden flex items-center justify-center p-3">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,92,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,92,0,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
          
          {/* Wireframe mock visual boxes */}
          <motion.div 
            className="w-20 h-14 border border-[#FF5C00]/40 rounded bg-[#FF5C00]/5 flex items-center justify-center relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-[#FF5C00] bg-black" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-[#FF5C00] bg-black" />
            <span className="font-mono text-[7px] text-[#FF5C00]/60">SPRING_GRID</span>
          </motion.div>
        </div>
        <span className="font-mono text-[7px] text-[#FF5C00] mt-4 tracking-widest uppercase">
          INTERACTIVE_CANVAS // COMPILED: OK
        </span>
      </div>
    );
  };

  const renderCenterGraphic = () => {
    switch (activeSector) {
      case "mobility":
        return renderMobilityGraphic();
      case "ai":
        return renderAIGraphic();
      case "fintech":
        return renderFinTechGraphic();
      case "saas":
        return renderSaaSGraphic();
      default:
        return null;
    }
  };

  return (
    <section className="py-20 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#050506] relative overflow-hidden" id="sectors">
      {/* Dynamic ambient background glow that shifts color depending on active sector */}
      <div 
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-30" 
        style={{
          background: `radial-gradient(circle 800px at 50% -20%, ${currentSector.color}15, transparent)`
        }}
      />
      
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-[#0c0c0e] border border-primary/40 px-5 py-3 font-mono text-xs text-primary uppercase tracking-widest shadow-[0_0_30px_rgba(0,245,255,0.15)] flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 bg-primary animate-pulse shrink-0" />
            CASE_STUDY: CLASSIFIED // Clearance_Pending
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2 flex-wrap">
              <span className="w-1.5 h-1.5 bg-primary shrink-0" />
              [ VERTICAL_EXPERTISE // INDUSTRIES_SERVED ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              Vertical Focus.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-400 max-w-sm font-light leading-snug">
            We build for high-stakes industries, mapping complex data structures and compliance layers to high-fidelity consumer experiences.
          </p>
        </div>

        {/* Sectors Interactive HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. Left Column: Sector Switchboard */}
          <div className="lg:col-span-4 flex flex-col gap-4 select-none">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSectorClick(s.id)}
                className="w-full text-left p-5 border rounded-xl bg-black/40 cursor-pointer transition-all duration-300 relative group overflow-hidden flex items-center justify-between"
                style={{
                  borderColor: activeSector === s.id ? `${s.color}60` : "rgba(255,255,255,0.06)",
                  boxShadow: activeSector === s.id ? `0 10px 30px rgba(0,0,0,0.6), inset 0 0 15px ${s.color}05` : "none"
                }}
              >
                {/* Active side indicator glow */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-[3px] transition-transform duration-300"
                  style={{
                    backgroundColor: s.color,
                    transform: activeSector === s.id ? "scaleY(1)" : "scaleY(0)"
                  }}
                />
                
                <div className="relative z-10 flex gap-4 items-center">
                  <div 
                    className="p-2.5 rounded-lg border transition-colors duration-300"
                    style={{
                      color: activeSector === s.id ? s.color : "rgba(255,255,255,0.3)",
                      borderColor: activeSector === s.id ? `${s.color}30` : "rgba(255,255,255,0.08)",
                      backgroundColor: activeSector === s.id ? `${s.color}08` : "rgba(255,255,255,0.02)"
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-0.5">
                      {s.tag}
                    </span>
                    <span 
                      className="text-sm font-bold transition-colors duration-300"
                      style={{ color: activeSector === s.id ? "#ffffff" : "rgba(255,255,255,0.6)" }}
                    >
                      {s.name}
                    </span>
                  </div>
                </div>

                <div 
                  className="text-white/20 group-hover:text-white/50 transition-colors duration-300 pr-1"
                  style={{ color: activeSector === s.id ? s.color : "inherit" }}
                >
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* 2. Center Column: Live Vector Telemetry Graphic (Visual Wow) */}
          <div className="lg:col-span-4 bg-black/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center min-h-[280px] relative overflow-hidden select-none">
            <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex items-center justify-center"
              >
                {renderCenterGraphic()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Right Column: Description & Technical Checklist */}
          <div className="lg:col-span-4 bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between select-none">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-white/50 font-mono text-[10px] uppercase tracking-widest pb-3 border-b border-white/5">
                <Shield size={12} style={{ color: currentSector.color }} />
                <span>SECTOR_TECHNICAL_METRICS</span>
              </div>

              <div className="space-y-4">
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {currentSector.description}
                </p>

                {/* Tech Checklist */}
                <div className="space-y-2.5">
                  <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                    Key Competencies // Specs
                  </div>
                  {currentSector.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs text-slate-300">
                      <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: currentSector.color }} />
                      <span className="font-light">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* View case study CTA */}
            <div className="mt-8 pt-4 border-t border-white/5">
              <button
                onClick={() => handleCaseLink(currentSector.link)}
                className="w-full py-3 rounded-xl font-mono text-xs uppercase tracking-widest text-center cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group"
                style={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px border rgba(255,255,255,0.06)",
                  boxShadow: "none"
                }}
                onMouseEnter={() => {
                  playTick();
                }}
              >
                {currentSector.link !== "#" ? "View_Related_Case_Study" : "Clearance_Pending // Classified"}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" style={{ color: currentSector.color }} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
