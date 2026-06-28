import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Factory, Plane, Zap, Building2, Heart, ShieldAlert, Trophy, DollarSign, ArrowRight 
} from "lucide-react";
import { playTick, playSuccess } from "../utils/audio";

interface IndustryCard {
  id: string;
  num: string;
  name: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
  items: string[];
  link: string;
}

export default function FigmaToCodeSlider() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

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

  const industries: IndustryCard[] = [
    {
      id: "manufacturing",
      num: "01",
      name: "Manufacturing",
      sub: "Industry 5.0 // Shopfloor",
      color: "#FF9F00", // Amber
      icon: <Factory size={16} />,
      items: [
        "Intelligent EHS Diagnostics",
        "Asset Lifecycle Management",
        "Digital Shopfloor Optimization"
      ],
      link: "#"
    },
    {
      id: "aviation",
      num: "02",
      name: "Aviation",
      sub: "Airlines & Airports // Ops",
      color: "#00b5ff", // Sky Blue
      icon: <Plane size={16} />,
      items: [
        "Intelligent Baggage Routing",
        "Digital Concierge Systems",
        "Pilot & Crew Roster Management"
      ],
      link: "#"
    },
    {
      id: "energy",
      num: "03",
      name: "Energy",
      sub: "Mobility & Grid Stability",
      color: "#FFE600", // Yellow
      icon: <Zap size={16} />,
      items: [
        "AI Enabled Auditing",
        "EV Charging Ecosystems",
        "Fuel Spillage Detection"
      ],
      link: "#"
    },
    {
      id: "corporate",
      num: "04",
      name: "Corporate",
      sub: "Core Systems & Employee CX",
      color: "#A0AEC0", // Slate
      icon: <Building2 size={16} />,
      items: [
        "Intelligent Employee Portals",
        "Corporate Comm Platforms",
        "Visitor Experience Systems"
      ],
      link: "#"
    },
    {
      id: "healthtech",
      num: "05",
      name: "HealthTech",
      sub: "Medtech & Lifesciences",
      color: "#FF3B30", // Red/Pink
      icon: <Heart size={16} />,
      items: [
        "Plasma Donor Management",
        "DNA Sequence Analysis",
        "Cancer Detection Platforms"
      ],
      link: "#"
    },
    {
      id: "government",
      num: "06",
      name: "Government",
      sub: "State & Local Integrations",
      color: "#00FF66", // Emerald
      icon: <ShieldAlert size={16} />,
      items: [
        "Agent Management Portals",
        "Senior Citizen Care",
        "Secure NSDL Data Gateways"
      ],
      link: "#"
    },
    {
      id: "sports",
      num: "07",
      name: "Sports",
      sub: "Players & Fan Ecosystems",
      color: "#7E57C2", // Indigo
      icon: <Trophy size={16} />,
      items: [
        "Intelligent Video Streaming",
        "Fan Engagement Applications",
        "Players Fitness Telemetry"
      ],
      link: "#"
    },
    {
      id: "fintech",
      num: "08",
      name: "FinTech",
      sub: "Banking & Insurance",
      color: "#00F5FF", // Cyan
      icon: <DollarSign size={16} />,
      items: [
        "CX for Retail Bank Branches",
        "Agentic AI Cloud Governance",
        "Payment Gateway Routing"
      ],
      link: "/case-studies/mitsubishi" // Connecting FinTech/Automotive cross section to Mitsubishi
    }
  ];

  return (
    <section className="py-20 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#050506] relative overflow-hidden" id="sectors">
      {/* Subtle background radial glows */}
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
            FRAMEWORK: CLASSIFIED // Clearance_Pending
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2 flex-wrap">
              <span className="w-1.5 h-1.5 bg-primary shrink-0" />
              [ ENTERPRISE_CAPABILITIES // SECTOR_FRAMEWORKS ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              Industry Frameworks.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-400 max-w-sm font-light leading-snug">
            We deliver production-ready software frameworks across eight vertical domains, matching strict architecture rules to premium user experience.
          </p>
        </div>

        {/* 8-Column Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {industries.map((ind) => (
            <IndustryGridCard 
              key={ind.id} 
              industry={ind} 
              onCardClick={handleCardClick}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
interface IndustryGridCardProps {
  key?: string;
  industry: IndustryCard;
  onCardClick: (link: string) => void;
}

function IndustryGridCard({ industry, onCardClick }: IndustryGridCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onCardClick(industry.link)}
      onMouseEnter={() => { playTick(); setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-text={industry.link !== "#" ? "EXPLORE" : "CLASSIFIED"}
      className="bg-[#08080a] border rounded-none p-6 relative group overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-500 min-h-[260px] select-none"
      style={{
        borderColor: isHovered ? `${industry.color}50` : "rgba(255,255,255,0.06)",
        boxShadow: isHovered 
          ? `0 15px 30px rgba(0,0,0,0.5), 0 0 25px ${industry.color}05, inset 0 0 15px ${industry.color}02` 
          : "none"
      }}
    >
      {/* Background ambient radial glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 180px at 50% 50%, ${industry.color}05, transparent)`
        }}
      />
      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-center border-b border-white/5 pb-3">
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">
          {industry.num} // {industry.sub}
        </span>
        <div 
          className="transition-colors duration-300"
          style={{ color: isHovered ? industry.color : "rgba(255,255,255,0.25)" }}
        >
          {industry.icon}
        </div>
      </div>

      {/* Middle: Minimalist framework items list */}
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 my-5">
        {industry.items.map((item, i) => (
          <div key={i} className="flex gap-2.5 items-center">
            <span 
              className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300" 
              style={{ backgroundColor: isHovered ? industry.color : "rgba(255,255,255,0.15)" }}
            />
            <span className="text-[13.5px] text-slate-400 group-hover:text-slate-200 transition-colors duration-300 font-light truncate">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Title */}
      <div className="relative z-10 flex justify-between items-center border-t border-white/5 pt-3">
        <span className="text-[15px] font-bold text-white">
          {industry.name}
        </span>
        <div 
          className="text-white/20 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1"
          style={{ color: isHovered ? industry.color : "inherit" }}
        >
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
