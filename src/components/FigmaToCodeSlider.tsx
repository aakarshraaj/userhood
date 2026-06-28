import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Code, Eye, RefreshCw, BarChart2, Check } from "lucide-react";
import { playTick, playSuccess } from "../utils/audio";

export default function FigmaToCodeSlider() {
  const [padding, setPadding] = useState(24);
  const [radius, setRadius] = useState(12);
  const [themeColor, setThemeColor] = useState("#00f5ff");
  const [inspectMode, setInspectMode] = useState(true);
  const [time, setTime] = useState(0);

  // States to trigger code glow highlight animation on value changes
  const [flashPadding, setFlashPadding] = useState(false);
  const [flashRadius, setFlashRadius] = useState(false);
  const [flashColor, setFlashColor] = useState(false);

  useEffect(() => {
    setFlashPadding(true);
    const t = setTimeout(() => setFlashPadding(false), 800);
    return () => clearTimeout(t);
  }, [padding]);

  useEffect(() => {
    setFlashRadius(true);
    const t = setTimeout(() => setFlashRadius(false), 800);
    return () => clearTimeout(t);
  }, [radius]);

  useEffect(() => {
    setFlashColor(true);
    const t = setTimeout(() => setFlashColor(false), 800);
    return () => clearTimeout(t);
  }, [themeColor]);

  // Real-time animation tick for the live SVG wave chart
  useEffect(() => {
    let animationId: number;
    const tick = () => {
      setTime((t) => t + 0.05);
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getWavePath = () => {
    let points = [];
    const width = 280;
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      const y = 35 + Math.sin(i * 0.28 + time) * 12 + Math.cos(i * 0.15 + time * 0.4) * 6;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  const getThemeColorName = () => {
    if (themeColor === "#00f5ff") return "CYAN";
    if (themeColor === "#FF5C00") return "ORANGE";
    return "PURPLE";
  };

  return (
    <section className="py-20 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#050506] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,rgba(0,245,255,0.02),transparent)]" />
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2 flex-wrap">
              <span className="w-1.5 h-1.5 bg-primary shrink-0" />
              [ FIGMA_TO_CODE_COMPILER // DESIGN_SYSTEMS ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              Zero Drift.<br />Guaranteed.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-400 max-w-sm font-light leading-snug">
            Inspect our design system compiler in real time. Modify layout properties and witness React assets and code variables adapt with pixel-perfect synchrony.
          </p>
        </div>

        {/* Sandbox Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. Left Control Panel (Figma constraints inputs) */}
          <div className="lg:col-span-3 bg-black/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-8 select-none">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-white/50 font-mono text-[10px] uppercase tracking-widest pb-3 border-b border-white/5">
                <Settings size={12} className="text-primary animate-spin-slow" />
                <span>FIGMA_CONSTRAINTS_INPUT</span>
              </div>

              {/* Padding constraint */}
              <div className="space-y-3">
                <div className="flex justify-between font-mono text-[9px] text-white/40 uppercase">
                  <span>Padding (Gap)</span>
                  <span className="text-primary font-bold">{padding}px</span>
                </div>
                <div className="flex gap-2">
                  {[16, 24, 32, 40].map((val) => (
                    <button
                      key={val}
                      onClick={() => { playTick(); setPadding(val); }}
                      className={`flex-1 py-2 font-mono text-[10px] border rounded-lg transition-all cursor-pointer ${
                        padding === val 
                          ? "bg-primary/20 border-primary text-white font-bold" 
                          : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                      }`}
                    >
                      {val}px
                    </button>
                  ))}
                </div>
              </div>

              {/* Corner radius constraint */}
              <div className="space-y-3">
                <div className="flex justify-between font-mono text-[9px] text-white/40 uppercase">
                  <span>Border Radius</span>
                  <span className="text-primary font-bold">{radius}px</span>
                </div>
                <div className="flex gap-2">
                  {[0, 8, 16, 24].map((val) => (
                    <button
                      key={val}
                      onClick={() => { playTick(); setRadius(val); }}
                      className={`flex-1 py-2 font-mono text-[10px] border rounded-lg transition-all cursor-pointer ${
                        radius === val 
                          ? "bg-primary/20 border-primary text-white font-bold" 
                          : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                      }`}
                    >
                      {val}px
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent hue selection */}
              <div className="space-y-3">
                <div className="flex justify-between font-mono text-[9px] text-white/40 uppercase">
                  <span>Accent Tone</span>
                  <span className="text-primary font-bold" style={{ color: themeColor }}>{getThemeColorName()}</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { hex: "#00f5ff", name: "Cyan" },
                    { hex: "#FF5C00", name: "Orange" },
                    { hex: "#E100FF", name: "Purple" }
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => { playTick(); setThemeColor(c.hex); }}
                      className={`flex-1 py-2 font-mono text-[9px] border rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        themeColor === c.hex
                          ? "bg-white/10 border-white/30 text-white font-bold"
                          : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.hex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inspect Spec Mode Toggle */}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-white/40 uppercase">Inspect Blueprint Redlines</span>
                <button
                  onClick={() => { playTick(); setInspectMode(!inspectMode); }}
                  className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${inspectMode ? "bg-primary" : "bg-white/10"}`}
                >
                  <motion.div 
                    layout
                    className="w-4 h-4 rounded-full bg-black absolute top-0.5 left-0.5" 
                    animate={{ x: inspectMode ? 20 : 0 }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Center Live Sandbox Canvas (Figma blueprint / Web Component) */}
          <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center relative min-h-[380px] overflow-hidden">
            {/* Design Spec Grid backdrop */}
            <div className="absolute inset-0 tech-grid opacity-15" />
            
            <AnimatePresence>
              {inspectMode && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Visual Specimen Card Wrapper */}
            <div className="relative w-full max-w-sm z-10 transition-all duration-300">
              
              {/* Corner Spec labels when inspecting */}
              <AnimatePresence>
                {inspectMode && (
                  <>
                    {/* Width and Height indicator */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500/80 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded shadow-md border border-red-400/20"
                    >
                      W: 320px | H: 220px
                    </motion.div>

                    {/* Corner Radius Spec lines */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-3 -left-3 font-mono text-[8px] text-red-500 font-bold border-t border-l border-dashed border-red-500/50 w-6 h-6 pt-1 pl-1"
                    >
                      R: {radius}px
                    </motion.div>

                    {/* Outer padding guidelines */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 border border-dashed border-red-500/20 pointer-events-none rounded-2xl"
                      style={{
                        margin: `-${padding}px`,
                        borderRadius: `${radius + padding}px`
                      }}
                    />

                    {/* Vertical guideline indicator */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                      className="absolute -right-3 top-1/2 -translate-y-1/2 font-mono text-[8px] text-red-500 font-bold flex items-center gap-1"
                    >
                      <div className="w-px h-12 bg-red-500/40" />
                      <span>P: {padding}px</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Shipped Component (Live Specimen Card) */}
              <div 
                className="bg-[#0b0b0d]/90 border transition-all duration-300 relative shadow-2xl overflow-hidden"
                style={{
                  padding: `${padding}px`,
                  borderRadius: `${radius}px`,
                  borderColor: inspectMode ? "rgba(239, 68, 68, 0.25)" : `${themeColor}40`,
                  boxShadow: inspectMode ? "none" : `0 15px 35px rgba(0,0,0,0.6), 0 0 20px ${themeColor}05`,
                }}
              >
                {/* Embedded dynamic graph wave */}
                <div className="h-28 border border-white/5 bg-[#030304] rounded-lg overflow-hidden flex items-center justify-center p-3 relative">
                  <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
                  
                  <svg className="w-full h-full fill-none stroke-[1.5]" viewBox="0 0 280 70" preserveAspectRatio="none" style={{ stroke: themeColor }}>
                    <path d={getWavePath()} />
                    <path d={getWavePath()} className="opacity-15 stroke-[1] scale-y-75 translate-y-4" />
                  </svg>
                  
                  <span className="absolute top-2 left-2 font-mono text-[7px] text-white/20 uppercase tracking-widest">
                    LIVE_RENDER_CANVAS // ZERO_DRIFT
                  </span>
                </div>

                {/* Card labels */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-mono text-[8px] tracking-widest uppercase" style={{ color: themeColor }}>
                      FIDELITY_VERIFICATION
                    </div>
                    <div className="text-white text-xs font-bold font-mono">
                      COMPILER // SUCCESS
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-mono text-[8px] bg-white/5 text-white/40 border border-white/10 px-1.5 py-0.5 rounded">
                      R: {radius}px
                    </span>
                    <span className="font-mono text-[8px] bg-white/5 text-white/40 border border-white/10 px-1.5 py-0.5 rounded">
                      P: {padding}px
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Canvas Indicator Label */}
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/30 uppercase tracking-widest pointer-events-none">
              {inspectMode ? "SPEC_BLUEPRINT_MODE // REDLINE_ACTIVE" : "PRODUCTION_RENDER_MODE // INTERACTIVE"}
            </div>
          </div>

          {/* 3. Right Code Panel (Live Compiled Code Block) */}
          <div className="lg:col-span-4 bg-black/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-white/50 font-mono text-[10px] uppercase tracking-widest pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Code size={12} className="text-primary animate-pulse" />
                <span>COMPILED_REACT_ASSETS</span>
              </div>
              <span className="text-[8px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">
                100% MATCH
              </span>
            </div>

            {/* Code editor block container */}
            <div className="flex-1 bg-[#020203] border border-white/5 rounded-xl p-5 font-mono text-[10.5px] leading-relaxed text-slate-400 overflow-x-auto select-all">
              <span className="text-purple-400">const</span> <span className="text-blue-400">FidelityCard</span> = () =&gt; (<br />
              &nbsp;&nbsp;&lt;<span className="text-green-400">div</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">className</span>=<span className="text-teal-400">"bg-[#0b0b0d] border shadow-2xl"</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">style</span>=&nbsp;&#123;&#123;<br />
              
              {/* Padding line - glows green when value updates */}
              <div className={`transition-all duration-300 py-0.5 px-1 rounded ${flashPadding ? "bg-primary/20 text-[#00f5ff] font-bold" : ""}`}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding: <span className="text-orange-400">"{padding}px"</span>,
              </div>

              {/* Radius line - glows green when value updates */}
              <div className={`transition-all duration-300 py-0.5 px-1 rounded ${flashRadius ? "bg-primary/20 text-[#00f5ff] font-bold" : ""}`}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;borderRadius: <span className="text-orange-400">"{radius}px"</span>,
              </div>

              {/* Color line - glows green when value updates */}
              <div className={`transition-all duration-300 py-0.5 px-1 rounded ${flashColor ? "bg-primary/20 text-[#00f5ff] font-bold" : ""}`}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;borderColor: <span className="text-orange-400">"{themeColor}"</span>,
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&#125;&#125;<br />
              &nbsp;&nbsp;&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">TelemetryWave</span> color=<span className="text-orange-400">"{themeColor}"</span> /&gt;<br />
              &nbsp;&nbsp;&lt;/<span className="text-green-400">div</span>&gt;<br />
              );
            </div>

            {/* Status logs block */}
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg font-mono text-[8px] text-white/30 space-y-1">
              <div>&gt; COMPILATION_STATE: SUCCESSFUL</div>
              <div>&gt; COMPILE_LATENCY: 0.04ms</div>
              <div className="text-primary font-bold">&gt; RESOLVED_DRIFT: 0.0000px (PIXEL_PERFECT)</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
