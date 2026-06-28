import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Car, Brain, Landmark, Terminal, ArrowRight } from "lucide-react";
import { playTick, playSuccess } from "../utils/audio";

interface SectorCard {
  id: string;
  num: string;
  name: string;
  tag: string;
  color: string;
  link: string;
  icon: React.ReactNode;
}

export default function FigmaToCodeSlider() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [time, setTime] = useState(0);

  // Animation ticks for graphics
  useEffect(() => {
    let animationId: number;
    const tick = () => {
      setTime((t) => t + 0.05);
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleCardClick = (link: string) => {
    if (link === "#") {
      playTick();
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } else {
      playSuccess();
      navigate(link);
    }
  };

  const sectors: SectorCard[] = [
    {
      id: "mobility",
      num: "01",
      name: "Connected Mobility",
      tag: "AUTOMOTIVE // TELEMATICS",
      color: "#00f5ff", // Cyan
      link: "/case-studies/mitsubishi",
      icon: <Car size={14} />
    },
    {
      id: "ai",
      num: "02",
      name: "Intelligent AI",
      tag: "LLM AGENTS // VECTOR DB",
      color: "#E100FF", // Purple
      link: "#",
      icon: <Brain size={14} />
    },
    {
      id: "fintech",
      num: "03",
      name: "FinTech Infra",
      tag: "LEDGERS // SECURE API",
      color: "#00FF66", // Green
      link: "#",
      icon: <Landmark size={14} />
    },
    {
      id: "saas",
      num: "04",
      name: "SaaS & DevTools",
      tag: "MULTIPLAYER // CANVASES",
      color: "#FF5C00", // Orange
      link: "#",
      icon: <Terminal size={14} />
    }
  ];

  // Visual widgets for each card
  const renderMobilityGraphic = (isHovered: boolean) => {
    const scale = isHovered ? 1.05 : 1;
    return (
      <motion.div 
        animate={{ scale }} 
        className="w-full h-full flex items-center justify-center relative"
      >
        <div className="w-28 h-28 rounded-full border border-[#00f5ff]/15 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#00f5ff]/35 animate-spin-slow" />
          <div className="w-16 h-16 rounded-full border border-[#00f5ff]/10" />
          
          {/* Scanning radar line */}
          <div 
            className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent to-[#00f5ff] origin-left"
            style={{ 
              transform: `rotate(${time * 80}deg)`, 
              left: "50%",
              top: "50%",
              boxShadow: "0 0 6px #00f5ff"
            }}
          />
          {/* Needle speed indicator */}
          <div 
            className="w-1 h-12 bg-[#00f5ff] origin-bottom absolute bottom-1/2 transition-transform duration-300"
            style={{ transform: `rotate(${-40 + Math.sin(time * 1.5) * 30}deg)` }}
          />
          <div className="w-3 h-3 rounded-full bg-black border border-[#00f5ff] absolute z-10" />
        </div>
      </motion.div>
    );
  };

  const renderAIGraphic = (isHovered: boolean) => {
    const scale = isHovered ? 1.05 : 1;
    return (
      <motion.div 
        animate={{ scale }}
        className="w-full h-full flex items-center justify-center relative"
      >
        <svg className="w-28 h-28 stroke-[#E100FF]/25 stroke-[1] fill-none overflow-visible">
          {/* Constellation lines */}
          <line x1="15%" y1="15%" x2="50%" y2="50%" />
          <line x1="85%" y1="15%" x2="50%" y2="50%" />
          <line x1="15%" y1="85%" x2="50%" y2="50%" />
          <line x1="85%" y1="85%" x2="50%" y2="50%" />
          <line x1="50%" y1="15%" x2="50%" y2="85%" />

          {/* Core connection rings */}
          <circle cx="50%" cy="50%" r={isHovered ? 8 + Math.sin(time * 3) * 2 : 6} className="stroke-[#E100FF] stroke-[2] fill-black" />
          <circle cx="15%" cy="15%" r="3" className="fill-[#E100FF] stroke-none" />
          <circle cx="85%" cy="15%" r="3" className="fill-[#E100FF] stroke-none" />
          <circle cx="15%" cy="85%" r="3" className="fill-[#E100FF] stroke-none" />
          <circle cx="85%" cy="85%" r="3" className="fill-[#E100FF] stroke-none" />
          <circle cx="50%" cy="15%" r="3" className="fill-[#E100FF] stroke-none" />
          <circle cx="50%" cy="85%" r="3" className="fill-[#E100FF] stroke-none" />
        </svg>
      </motion.div>
    );
  };

  const renderFinTechGraphic = (isHovered: boolean) => {
    const scale = isHovered ? 1.05 : 1;
    return (
      <motion.div 
        animate={{ scale }}
        className="w-full h-full flex flex-col justify-center items-center font-mono text-[8px] text-[#00FF66]/40 gap-1.5"
      >
        <div className="w-28 bg-[#00FF66]/5 border border-[#00FF66]/10 rounded p-2 space-y-1">
          <div className="flex justify-between border-b border-[#00FF66]/10 pb-0.5 text-[7px] text-[#00FF66]/20">
            <span>TX_HASH</span>
            <span>STATUS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/30">0x34a1</span>
            <span className="text-[#00FF66]">SECURE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/30">0x81b0</span>
            <span className="text-[#00FF66]">SECURE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/30">0x98f2</span>
            <span className="text-[#E100FF] animate-pulse">PENDING</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSaaSGraphic = (isHovered: boolean) => {
    const scale = isHovered ? 1.05 : 1;
    return (
      <motion.div 
        animate={{ scale }}
        className="w-full h-full flex items-center justify-center relative"
      >
        <div className="w-28 h-20 border border-[#FF5C00]/25 rounded bg-[#FF5C00]/5 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,92,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,92,0,0.03)_1px,transparent_1px)] bg-[size:8px_8px]" />
          
          <motion.div 
            className="w-14 h-8 border border-[#FF5C00]/40 rounded bg-black/60 flex items-center justify-center relative"
            animate={{ 
              rotateX: isHovered ? 15 : 0,
              rotateY: isHovered ? 25 : 0,
              scale: isHovered ? 1.1 : 1 
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 border border-[#FF5C00] bg-black" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-[#FF5C00] bg-black" />
            <span className="font-mono text-[6px] text-[#FF5C00] tracking-widest font-bold">GRID</span>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const renderCardGraphic = (id: string, isHovered: boolean) => {
    switch (id) {
      case "mobility":
        return renderMobilityGraphic(isHovered);
      case "ai":
        return renderAIGraphic(isHovered);
      case "fintech":
        return renderFinTechGraphic(isHovered);
      case "saas":
        return renderSaaSGraphic(isHovered);
      default:
        return null;
    }
  };

  return (
    <section className="py-20 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#050506] relative overflow-hidden" id="sectors">
      {/* Subtle global gradient grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,rgba(0,245,255,0.01),transparent)] pointer-events-none" />
      
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
        
        {/* Header Block - extremely simple and clean */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <div className="font-mono text-xs text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2 flex-wrap">
              <span className="w-1.5 h-1.5 bg-primary shrink-0" />
              [ VERTICAL_EXPERTISE // INDUSTRIES ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              Vertical Focus.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-400 max-w-sm font-light leading-snug">
            We build for high-stakes industries, mapping complex data structures to high-fidelity consumer experiences.
          </p>
        </div>

        {/* Clean, minimalist 4-column cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {sectors.map((s) => (
            <SectorGridCard 
              key={s.id} 
              sector={s} 
              onCardClick={handleCardClick}
              renderGraphic={renderCardGraphic}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

interface SectorGridCardProps {
  key?: string;
  sector: SectorCard;
  onCardClick: (link: string) => void;
  renderGraphic: (id: string, isHovered: boolean) => React.ReactNode;
}

function SectorGridCard({ sector, onCardClick, renderGraphic }: SectorGridCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onCardClick(sector.link)}
      onMouseEnter={() => { playTick(); setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-text={sector.link !== "#" ? "VIEW CASE" : "CLASSIFIED"}
      className="bg-[#08080a] border rounded-2xl p-6 relative group overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-500 h-[280px] sm:h-[300px] select-none"
      style={{
        borderColor: isHovered ? `${sector.color}50` : "rgba(255,255,255,0.06)",
        boxShadow: isHovered 
          ? `0 15px 35px rgba(0,0,0,0.6), 0 0 25px ${sector.color}08, inset 0 0 15px ${sector.color}03` 
          : "none"
      }}
    >
      {/* Background ambient pulse on card hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at 50% 50%, ${sector.color}08, transparent)`
        }}
      />

      {/* Top Meta info */}
      <div className="relative z-10 flex justify-between items-center border-b border-white/5 pb-3">
        <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
          {sector.num} // {sector.tag}
        </span>
        <div 
          className="text-white/20 transition-colors duration-300"
          style={{ color: isHovered ? sector.color : "inherit" }}
        >
          {sector.icon}
        </div>
      </div>

      {/* Middle Animated Graphic - The Hero element */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-4">
        {renderGraphic(sector.id, isHovered)}
      </div>

      {/* Bottom Title */}
      <div className="relative z-10 flex justify-between items-center border-t border-white/5 pt-3">
        <span 
          className="text-sm font-bold text-white group-hover:text-white transition-colors duration-300"
        >
          {sector.name}
        </span>
        <div 
          className="text-white/20 transition-all duration-500 transform group-hover:translate-x-1"
          style={{ color: isHovered ? sector.color : "inherit" }}
        >
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
