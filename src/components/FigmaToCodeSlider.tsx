import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { playTick } from "../utils/audio";

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
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              Zero Drift.<br />Guaranteed.
            </h2>
          </div>
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

          {/* FIXED Static Header Labels to prevent overlaps */}
          <div className="absolute top-4 left-4 z-20 font-mono text-[10px] sm:text-xs text-red-500/80 uppercase tracking-widest flex items-center gap-1.5 select-none pointer-events-none">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span>FIGMA_BLUEPRINT</span>
          </div>
          <div className="absolute top-4 right-4 z-20 font-mono text-[10px] sm:text-xs text-primary/80 uppercase tracking-widest flex items-center gap-1.5 select-none pointer-events-none">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span>PRODUCTION_RENDER</span>
          </div>

          {/* Left Side: Figma Specification Blueprints (0% to sliderPosition%) */}
          <div
            className="absolute inset-0 bg-[#121214] overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Blueprint ruler lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            <div 
              className="absolute left-0 top-0 h-full p-4 sm:p-8 md:p-12 flex items-center justify-center font-mono select-none"
              style={{ width: containerWidth }}
            >
              {/* Figma Vector Spec Layout */}
              <div className="w-full max-w-[85%] xs:max-w-[90%] sm:max-w-xl border border-red-500/20 rounded-lg p-6 bg-[#0c0c0d] relative space-y-4 sm:space-y-6">
                
                {/* Red Figma dimension indicator overlays */}
                <div className="absolute -top-3 left-6 bg-red-500/80 text-white text-[8px] sm:text-[9px] px-2 py-0.5 font-bold font-mono rounded">
                  W: 100% | H: 140px
                </div>

                {/* Wireframe Mock Wave (Spec format) */}
                <div className="h-24 sm:h-32 border border-red-500/20 border-dashed bg-red-500/5 relative rounded flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full stroke-red-500/40 stroke-[1.5] fill-none p-4" viewBox="0 0 320 90" preserveAspectRatio="none">
                    {/* Draw static waveform specification with anchor nodes highlighted */}
                    <path d="M 0 45 C 40 10, 80 10, 120 45 C 160 80, 200 80, 240 45 C 280 10, 300 10, 320 45" />
                    
                    {/* Anchors/Vector Node Squares */}
                    <rect x="0" y="42" width="6" height="6" className="fill-red-500 stroke-none -translate-x-1/2 -translate-y-1/2" />
                    <rect x="120" y="42" width="6" height="6" className="fill-red-500 stroke-none -translate-x-1/2 -translate-y-1/2" />
                    <rect x="240" y="42" width="6" height="6" className="fill-red-500 stroke-none -translate-x-1/2 -translate-y-1/2" />
                    <rect x="320" y="42" width="6" height="6" className="fill-red-500 stroke-none -translate-x-1/2 -translate-y-1/2" />
                  </svg>
                  
                  {/* Figma-style Dimension Guideline Overlay */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none">
                    <div className="w-px h-3 bg-red-500/40" />
                    <div className="h-px bg-red-500/30 flex-1 mx-1 border-t border-dashed border-red-500/40" />
                    <span className="text-[8px] text-red-500/80 font-bold bg-[#0c0c0d] px-1">L: 320px</span>
                    <div className="h-px bg-red-500/30 flex-1 mx-1 border-t border-dashed border-red-500/40" />
                    <div className="w-px h-3 bg-red-500/40" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[8px] sm:text-[9px] text-red-500/40 uppercase">
                  <div>border-radius: 8px</div>
                  <div>padding: 24px</div>
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
              {/* Premium Shipped Component Visual */}
              <div className="w-full max-w-[85%] xs:max-w-[90%] sm:max-w-xl border border-primary/20 bg-[#0a0a0c]/90 backdrop-blur-md rounded-lg p-6 space-y-4 sm:space-y-6 shadow-[0_0_40px_rgba(0,245,255,0.03)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                {/* Shipped Chart (Interactive SVG Sine Wave!) */}
                <div className="h-24 sm:h-32 border border-white/5 bg-[#030304] relative rounded overflow-hidden flex items-center justify-center p-4">
                  <svg className="w-full h-full stroke-primary stroke-[1.5] fill-none" viewBox="0 0 320 90" preserveAspectRatio="none">
                    <motion.path d={getWavePath(0)} />
                    <motion.path d={getWavePath(1.5)} className="opacity-20 stroke-primary/30" />
                  </svg>
                </div>

                <div className="flex justify-between items-center text-[8px] sm:text-[9px] text-primary/40 uppercase">
                  <div>border-radius: 8px</div>
                  <div>padding: 24px</div>
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

