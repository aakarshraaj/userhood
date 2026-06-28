import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeftRight, ArrowRight, Lock, Eye, BarChart3, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playTick, playSuccess } from "../utils/audio";

interface ProjectItem {
  id: string;
  client: string;
  metric: string;
  title: string;
  description: string;
  link: string;
  color: string;
  secondaryColor: string;
  tags: string[];
  graphic: React.ReactNode;
}

// Sleek high-fidelity card backdrops matching Active Theory / Metalab style
const MitsubishiGraphic = () => (
  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
    {/* Glowing cyan grid */}
    <div className="absolute inset-0 tech-grid opacity-25" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
    
    {/* Animated Sine Wave */}
    <svg className="absolute bottom-0 left-0 w-full h-[180px] text-cyan-400/20" viewBox="0 0 100 30" preserveAspectRatio="none">
      <motion.path
        d="M0,15 Q25,5 50,15 T100,15 L100,30 L0,30 Z"
        fill="currentColor"
        animate={{
          d: [
            "M0,15 Q25,5 50,15 T100,15 L100,30 L0,30 Z",
            "M0,15 Q25,25 50,15 T100,15 L100,30 L0,30 Z",
            "M0,15 Q25,5 50,15 T100,15 L100,30 L0,30 Z"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,20 Q25,10 50,20 T100,20 L100,30 L0,30 Z"
        fill="rgba(0, 245, 255, 0.05)"
        animate={{
          d: [
            "M0,20 Q25,25 50,20 T100,20 L100,30 L0,30 Z",
            "M0,20 Q25,5 50,20 T100,20 L100,30 L0,30 Z",
            "M0,20 Q25,25 50,20 T100,20 L100,30 L0,30 Z"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </svg>
    
    {/* Neon accent nodes */}
    <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
    <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
  </div>
);

const HyundaiGraphic = () => (
  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
    {/* Glowing orange grid */}
    <div className="absolute inset-0 tech-grid opacity-20" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

    {/* Equalizer-like bars rising up */}
    <div className="absolute bottom-6 right-6 flex items-end gap-1.5 h-[120px]">
      {[35, 65, 45, 85, 55, 95, 75].map((h, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-t bg-gradient-to-t from-orange-600/10 to-orange-500/30"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
    
    {/* Pulsing Concentric Circles */}
    <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full border border-orange-500/10 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border border-orange-500/5 flex items-center justify-center animate-pulse">
        <div className="w-16 h-16 rounded-full border border-orange-500/2" />
      </div>
    </div>
  </div>
);

const VoltSystemsGraphic = () => (
  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
    {/* Glowing purple grid */}
    <div className="absolute inset-0 tech-grid opacity-25" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

    {/* Radar Sweep HUD line */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-[280px] h-[280px] rounded-full border border-purple-500/10 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1/2 bg-gradient-to-b from-purple-500/30 to-transparent origin-bottom" />
      </motion.div>
    </div>

    {/* Tactical code streams */}
    <div className="absolute top-12 right-6 space-y-1 font-mono text-[7px] text-purple-400/20 text-right">
      <div>SYS_SECURE // TRUE</div>
      <div>ENCRYPT_KEY: AES_256</div>
      <div>HOST_IP: 192.168.1.94</div>
    </div>
  </div>
);

const projects: ProjectItem[] = [
  {
    id: "mitsubishi",
    client: "Mitsubishi Motors",
    metric: "-40% COGNITIVE LOAD",
    title: "Connected Car Ecosystem",
    description: "Reimagining the digital layer of the driving experience through predictive servicing and eco-driving gamification.",
    link: "/case-study/mitsubishi",
    color: "#00f5ff",
    secondaryColor: "rgba(0, 245, 255, 0.15)",
    tags: ["CONNECTED_CAR", "TELEMETRY", "UX_SYSTEMS"],
    graphic: <MitsubishiGraphic />,
  },
  {
    id: "hyundai",
    client: "Hyundai Global",
    metric: "+25% CONVERSION UPLIFT",
    title: "Click to Buy Retail",
    description: "Transformed global automotive purchasing into a digital-first buying experience with live inventory sync.",
    link: "/case-study/hyundai",
    color: "#FF5C00",
    secondaryColor: "rgba(255, 92, 0, 0.15)",
    tags: ["E_COMMERCE", "INTEGRATIONS", "DIGITAL_RETAIL"],
    graphic: <HyundaiGraphic />,
  },
  {
    id: "voltsystems",
    client: "Volt Systems",
    metric: "CLASSIFIED // RESTRICTED",
    title: "Secured Grid Operations",
    description: "Multi-layered grid cybersecurity HUD designed for tactical critical energy asset defense operations.",
    link: "#",
    color: "#E100FF",
    secondaryColor: "rgba(225, 0, 255, 0.15)",
    tags: ["CYBERSECURITY", "RESTRICTED", "TACTICAL_HUD"],
    graphic: <VoltSystemsGraphic />,
  },
];

export default function Showcase3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelTime = useRef(0);
  const navigate = useNavigate();

  // Mouse hover coordinate tracking for 3D card tilt
  const [tiltCoords, setTiltCoords] = useState({ rotateX: 0, rotateY: 0 });

  const handleNext = () => {
    playTick();
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setTiltCoords({ rotateX: 0, rotateY: 0 });
  };

  const handlePrev = () => {
    playTick();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTiltCoords({ rotateX: 0, rotateY: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 850) return; // Prevent fast wheel scrolling
    
    if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
      lastWheelTime.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    
    // Find mouse coordinate relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Calculate rotation limits (-15 to 15 degrees)
    const rotateY = (x / (rect.width / 2)) * 14;
    const rotateX = -(y / (rect.height / 2)) * 14;

    setTiltCoords({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTiltCoords({ rotateX: 0, rotateY: 0 });
  };

  const handleCardClick = (index: number, link: string) => {
    if (index !== activeIndex) {
      playTick();
      setActiveIndex(index);
      setTiltCoords({ rotateX: 0, rotateY: 0 });
    } else {
      if (link !== "#") {
        playSuccess();
        navigate(link);
      }
    }
  };

  const activeProject = projects[activeIndex];

  return (
    <div 
      className="relative w-full min-h-[640px] bg-black/60 border border-white/5 rounded-2xl flex flex-col justify-between p-6 md:p-10 overflow-hidden select-none"
      onWheel={handleWheel}
    >
      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
      <div 
        className="absolute inset-0 bg-radial-glow opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at 50% 50%, ${activeProject.color}15, transparent)`,
        }}
      />

      {/* Top Controller Header */}
      <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 border-b border-white/5 pb-5">
        <div className="flex items-center gap-3">
          <ArrowLeftRight size={14} className="text-primary animate-pulse" />
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
            SCROLL_OR_CLICK_TO_REVOLVE // PERSPECTIVE_DECK
          </span>
        </div>

        {/* Arrow Navigation Toggle */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-mono text-[9px] text-white">
          <button 
            onClick={handlePrev}
            className="hover:text-primary transition-colors px-1 cursor-pointer font-black"
          >
            &lt;&lt;
          </button>
          <span className="text-white/40 tracking-wider">
            {activeProject.client.toUpperCase()}
          </span>
          <button 
            onClick={handleNext}
            className="hover:text-primary transition-colors px-1 cursor-pointer font-black"
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      {/* Center 3D Cover Flow Deck Container */}
      <div className="relative flex-1 w-full h-[400px] flex items-center justify-center perspective-[1200px]">
        {projects.map((p, i) => {
          const diff = i - activeIndex;
          
          // Determine 3D spacing coordinates
          let xOffset = 0;
          let zOffset = 0;
          let rY = 0;
          let opacity = 0;
          let scale = 1;
          let zIndex = 10;
          let pointerEvents: "auto" | "none" = "auto";

          if (diff === 0) {
            // Active Center Card
            xOffset = 0;
            zOffset = 180;
            rY = 0;
            opacity = 1;
            scale = 1;
            zIndex = 30;
            pointerEvents = "auto";
          } else if (diff === -1 || (diff === 2 && activeIndex === 0)) {
            // Left Card (clearly visible, rotated inwards, pushed back)
            xOffset = -280;
            zOffset = -120;
            rY = 48; // Angle inwards towards the center card
            opacity = 0.45;
            scale = 0.85;
            zIndex = 20;
            pointerEvents = "auto";
          } else if (diff === 1 || (diff === -2 && activeIndex === 2)) {
            // Right Card (clearly visible, rotated inwards, pushed back)
            xOffset = 280;
            zOffset = -120;
            rY = -48; // Angle inwards towards the center card
            opacity = 0.45;
            scale = 0.85;
            zIndex = 20;
            pointerEvents = "auto";
          } else {
            // Out of viewport limit cards
            xOffset = diff < 0 ? -450 : 450;
            zOffset = -300;
            rY = diff < 0 ? 70 : -70;
            opacity = 0;
            scale = 0.7;
            zIndex = 5;
            pointerEvents = "none";
          }

          const isCenter = diff === 0;

          return (
            <motion.div
              key={p.id}
              onClick={() => handleCardClick(i, p.link)}
              onMouseMove={isCenter ? handleMouseMove : undefined}
              onMouseLeave={isCenter ? handleMouseLeave : undefined}
              animate={{
                x: xOffset,
                z: zOffset,
                rotateY: isCenter ? rY + tiltCoords.rotateY : rY,
                rotateX: isCenter ? tiltCoords.rotateX : 0,
                opacity,
                scale,
              }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 95,
              }}
              className="absolute w-[290px] h-[350px] sm:w-[325px] sm:h-[365px] bg-neutral-950/80 border rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer group backface-hidden"
              style={{
                zIndex,
                transformStyle: "preserve-3d",
                pointerEvents,
                borderColor: isCenter ? `${p.color}50` : "rgba(255,255,255,0.06)",
                boxShadow: isCenter ? `0 25px 50px rgba(0,0,0,0.8), 0 0 40px ${p.color}15, inset 0 0 25px ${p.color}05` : "none",
              }}
            >
              {/* Glowing Neon Graphic Backdrop inside the card */}
              {p.graphic}

              {/* Edge highlight lines */}
              {isCenter && (
                <>
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 z-20" />
                  <div className="absolute -inset-px border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-20" />
                </>
              )}

              {/* Card Header */}
              <div className="relative z-20 flex justify-between items-start">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                  REF // {p.id.toUpperCase()}_STUDY
                </span>
                <span 
                  className="font-mono text-[9px] font-bold px-2 py-0.5 rounded border"
                  style={{
                    color: p.color,
                    borderColor: `${p.color}40`,
                    backgroundColor: `${p.color}05`,
                  }}
                >
                  {p.metric}
                </span>
              </div>

              {/* Card Body */}
              <div className="relative z-20 mt-auto space-y-4">
                <div>
                  <div className="font-mono text-[10px] text-primary tracking-widest uppercase mb-1">
                    {p.client}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                    {p.description}
                  </p>
                </div>

                {/* Tags and CTA */}
                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                  <div className="flex gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-[7px] text-white/20 border border-white/5 px-1.5 py-0.5 rounded bg-white/[0.01]">
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.link !== "#" ? (
                    <span className="text-primary font-mono text-[9px] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      VIEW_STUDY <ArrowRight size={10} className="shrink-0" />
                    </span>
                  ) : (
                    <span className="text-white/25 font-mono text-[9px] flex items-center gap-1.5">
                      CLASSIFIED <Lock size={9} className="shrink-0" />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Checklist Sidebar and Ask Input */}
      <div className="relative z-10 grid md:grid-cols-12 gap-6 border-t border-white/5 pt-6 items-end">
        {/* Bottom Left Checklist */}
        <div className="md:col-span-6 space-y-3">
          <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
            WHAT ARE YOU LOOKING FOR?
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[9px] text-white/60">
            <span 
              onClick={() => { playTick(); setActiveIndex(1); }}
              className="text-primary hover:text-white transition-colors cursor-pointer"
            >
              -&gt; DIGITAL_RETAIL_PLATFORMS
            </span>
            <span 
              onClick={() => { playTick(); setActiveIndex(0); }}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              -&gt; CONNECTED_VEHICLES_TELEMETRY
            </span>
            <span 
              onClick={() => { playTick(); setActiveIndex(2); }}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              -&gt; CYBER_DEFENSE_TACTICAL_HUDs
            </span>
          </div>
        </div>

        {/* Bottom Right Interactive Console Trigger */}
        <div className="md:col-span-6 flex flex-col items-stretch md:items-end gap-2">
          <div className="w-full max-w-sm">
            <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-1.5">
              ASK STUDIO CONSOLE //
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask us anything (e.g. 'stack', 'timeline')..." 
                disabled
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 font-mono text-[10px] text-white/50 placeholder-white/20 outline-none"
              />
              <button 
                onClick={() => {
                  playTick();
                  // Trigger developer console open
                  const btn = document.querySelector("button[aria-label='Toggle Developer Console']") as HTMLButtonElement;
                  if (btn) btn.click();
                }}
                className="bg-primary/10 border border-primary/20 hover:bg-primary/25 text-primary font-mono text-[9px] font-bold px-3 py-2 rounded-lg cursor-pointer transition-colors active:scale-95 whitespace-nowrap"
              >
                OPEN TERMINAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
