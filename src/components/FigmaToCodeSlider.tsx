import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { playTick } from "../utils/audio";
import { Activity, Cpu, RefreshCw } from "lucide-react";

export default function FigmaToCodeSlider() {
  const [sliderPosition, setSliderPosition] = useState(40); // percentage (0 to 100)
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [containerWidth, setContainerWidth] = useState(600);
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const autoSlideDirection = useRef(1); // 1 for right, -1 for left

  // Measure container width dynamically for pixel-perfect card alignment
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-sliding loop (ping-pong between 30% and 70% for smooth showcase)
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        let next = prev + autoSlideDirection.current * 0.2;
        if (next >= 70) {
          autoSlideDirection.current = -1;
          next = 70;
        } else if (next <= 30) {
          autoSlideDirection.current = 1;
          next = 30;
        }
        return next;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isAutoSliding]);

  // Real-time animation time for the SVG wave chart
  useEffect(() => {
    let animationId: number;
    const tick = () => {
      setTime((t) => t + 0.07);
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    setIsAutoSliding(false); // Stop auto-sliding immediately on user interaction
    playTick();
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Generate an SVG path for the wave telemetry chart (width: 320, height: 90)
  const getWavePath = (offset: number) => {
    let points = [];
    const width = 320;
    const steps = 32;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      // Generate a smooth wave using sine functions
      const y = 45 + Math.sin(i * 0.25 + time + offset) * 16 + Math.cos(i * 0.12 + time * 0.5) * 8;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <section className="py-20 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#050506] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="font-mono text-xs text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary shrink-0 animate-pulse" />
              [ EXPERIMENTAL_LABS // DEVIATION_MEASUREMENT ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              Zero Drift.<br />Guaranteed.
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-sm font-light leading-relaxed">
            Drag the slider to compare the design blueprints with the actual running, animated production code. High-fidelity layouts executed without compromise.
          </p>
        </div>

        {/* Outer Slider Widget Box */}
        <div
          ref={containerRef}
          className="relative w-full h-[380px] md:h-[450px] border border-white/10 select-none overflow-hidden bg-[#070708] group cursor-ew-resize rounded-lg"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

          {/* FIXED Static Header Labels to prevent overlaps (text-xs for readability, hidden on extra small screens if necessary) */}
          <div className="absolute top-4 left-4 z-20 font-mono text-[10px] sm:text-xs text-red-500/80 uppercase tracking-widest flex items-center gap-1.5 select-none pointer-events-none">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="hidden xs:inline">[ FIGMA_SPECIFICATION_BLUEPRINT ]</span>
            <span className="xs:hidden">FIGMA_SPEC</span>
          </div>
          <div className="absolute top-4 right-4 z-20 font-mono text-[10px] sm:text-xs text-primary/80 uppercase tracking-widest flex items-center gap-1.5 select-none pointer-events-none">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="hidden xs:inline">[ SHIPPED_PRODUCTION_RENDER ]</span>
            <span className="xs:hidden">PRODUCTION_CODE</span>
          </div>

          {/* Left Side: Figma Specification Blueprints (0% to sliderPosition%) */}
          <div
            className="absolute inset-0 bg-[#161618] overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Blueprint ruler lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            <div 
              className="absolute left-0 top-0 h-full p-4 sm:p-8 md:p-12 flex items-center justify-center font-mono select-none"
              style={{ width: containerWidth }}
            >
              {/* Telemetry Panel Design Spec Layout */}
              <div className="w-full max-w-[85%] xs:max-w-[90%] sm:max-w-xl border border-red-500/30 rounded-lg p-4 sm:p-6 bg-[#121213] relative space-y-4 sm:space-y-6">
                
                {/* Red Figma dimension indicator overlays */}
                <div className="absolute -top-3 left-6 bg-red-500/90 text-white text-[8px] sm:text-[9px] px-2 py-0.5 font-bold font-mono rounded">
                  FRAME: TelemetryCard // w: 480px
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="text-[9px] sm:text-[10px] text-red-400 font-bold uppercase tracking-wider">
                      SPEC // category_tag
                    </div>
                    <div className="w-28 sm:w-36 h-6 bg-red-500/10 border border-red-500/20 border-dashed rounded flex items-center px-2 text-[9px] sm:text-[10px] text-red-400/50 truncate">
                      "DYNAMIC_WAVE"
                    </div>
                  </div>
                  {/* Figma Red Comment Box */}
                  <div className="bg-red-500/5 border border-red-500/20 p-2 sm:p-2.5 rounded text-[8px] sm:text-[10px] text-red-400 max-w-[120px] sm:max-w-[200px] shrink-0">
                    <div className="font-bold flex items-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                      <span>#1</span> Kriti:
                    </div>
                    "Align SVG wave path stroke precisely."
                  </div>
                </div>

                {/* Wireframe Mock Chart (Specs) */}
                <div className="h-20 sm:h-28 border border-red-500/20 border-dashed bg-red-500/5 relative rounded flex items-center justify-center overflow-hidden">
                  {/* SVG spec path */}
                  <svg className="w-full h-full stroke-red-500/30 stroke-2 fill-none p-2 sm:p-4" viewBox="0 0 320 90" preserveAspectRatio="none">
                    <path d="M 0 45 L 80 20 L 160 70 L 240 30 L 320 60" strokeDasharray="3 3" />
                  </svg>
                  <span className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 text-[8px] text-red-400/60 uppercase">PATH // static_spec</span>
                </div>

                <div className="flex justify-between items-center pt-1 sm:pt-2 text-[8px] sm:text-[9px]">
                  <div className="text-red-500/40 uppercase">Padding_x: 24px</div>
                  {/* Spec alignment marker */}
                  <div className="h-px bg-red-500/40 flex-1 mx-2 sm:mx-4 relative">
                    <span className="absolute left-1/2 -top-2 bg-[#121213] px-1 text-[8px] text-red-400 font-bold">GRID_SYNC</span>
                  </div>
                  <div className="text-red-500/40 uppercase">Border: 1px_solid</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Running Production Code (sliderPosition% to 100%) */}
          <div
            className="absolute inset-0 bg-[#070708] overflow-hidden pointer-events-none"
            style={{ left: `${sliderPosition}%`, width: `${100 - sliderPosition}%` }}
          >
            {/* Align content using mathematical margin offset to keep both sides pinned correctly at left: 0 */}
            <div
              className="absolute left-0 top-0 h-full p-4 sm:p-8 md:p-12 flex items-center justify-center"
              style={{ width: containerWidth, marginLeft: `-${(sliderPosition / 100) * containerWidth}px` }}
            >
              {/* Premium Shipped Component Visual (Telemetry Panel) */}
              <div className="w-full max-w-[85%] xs:max-w-[90%] sm:max-w-xl border border-primary/20 bg-[#0c0c0e]/95 backdrop-blur-md rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-[0_0_40px_rgba(0,245,255,0.05)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                <div className="flex justify-between items-start gap-4 relative z-10">
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <div className="font-mono text-[9px] sm:text-xs text-primary tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 inline-block rounded">
                      DYNAMIC_WAVE // INTERACTIVE
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Signal Diagnostics
                    </h3>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-primary/30 flex items-center justify-center text-primary bg-primary/5 shrink-0">
                    <Activity size={12} className="animate-pulse" />
                  </div>
                </div>

                {/* Shipped Chart (Interactive SVG Sine Wave!) */}
                <div className="h-20 sm:h-28 border border-white/5 bg-[#030304] relative rounded overflow-hidden flex items-center justify-center p-2 sm:p-4">
                  <svg className="w-full h-full stroke-primary stroke-[1.5] fill-none" viewBox="0 0 320 90" preserveAspectRatio="none">
                    <motion.path d={getWavePath(0)} />
                    <motion.path d={getWavePath(1.5)} className="opacity-30 stroke-primary/50" />
                  </svg>
                  
                  {/* Floating real-time stats overlays */}
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex items-center gap-1 font-mono text-[8px] text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                    <Cpu size={8} className="animate-spin" style={{ animationDuration: '4s' }} />
                    <span>60 FPS</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 sm:pt-2 relative z-10 text-[9px] sm:text-xs">
                  <div className="font-mono text-slate-400 flex items-center gap-1.5">
                    <RefreshCw size={10} className="text-primary animate-spin" style={{ animationDuration: '6s' }} />
                    <span>Drift: 0.00%</span>
                  </div>
                  <div className="font-mono text-primary font-bold">
                    LATENCY: &lt; 0.12ms
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-primary z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle Button */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-primary bg-[#0a0a0c] flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.4)] pointer-events-auto transition-transform hover:scale-110 active:scale-95 cursor-ew-resize"
              onMouseEnter={() => playTick()}
            >
              <div className="flex gap-0.5 justify-center items-center">
                <div className="w-[1.5px] h-3 bg-primary" />
                <div className="w-[1.5px] h-3 bg-primary" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
