import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

interface InspectorSpecs {
  tag: string;
  className: string;
  width: number;
  height: number;
  fontFamily: string;
  fontSize: string;
  padding: string;
  margin: string;
}

export default function RedlineInspector() {
  const [active, setActive] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [specs, setSpecs] = useState<InspectorSpecs | null>(null);
  const rafId = useRef<number | null>(null);

  // Monitor class changes on body to toggle inspector
  useEffect(() => {
    const checkActive = () => {
      const isRedline = document.body.classList.contains("redline-active");
      setActive(isRedline);
      if (!isRedline) {
        setHoveredElement(null);
        setSpecs(null);
      }
    };

    checkActive();

    // Set up a MutationObserver to listen to class changes on body
    const observer = new MutationObserver(checkActive);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Track hover and mouse movement
  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Request animation frame to calculate bounding box smoothly
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        if (!target) return;

        // Find nearest inspectable child/parent, skip system elements
        const inspectable = target.closest(
          "h1, h2, h3, h4, h5, h6, p, a, button, img, svg, [role='button'], .group, .card, section, footer, nav"
        ) as HTMLElement;

        // Skip inspector container itself, body, and HTML root
        if (
          !inspectable || 
          inspectable.closest(".redline-inspector-overlay") || 
          inspectable.tagName === "BODY" || 
          inspectable.tagName === "HTML" ||
          inspectable.id === "root"
        ) {
          setHoveredElement(null);
          setSpecs(null);
          return;
        }

        if (inspectable !== hoveredElement) {
          setHoveredElement(inspectable);

          // Get specs
          const rect = inspectable.getBoundingClientRect();
          const computed = window.getComputedStyle(inspectable);

          setCoords({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
          });

          setSpecs({
            tag: inspectable.tagName.toLowerCase(),
            className: inspectable.className.split(" ").filter(c => c && !c.includes(":")).slice(0, 2).join("."),
            width: rect.width,
            height: rect.height,
            fontFamily: computed.fontFamily.split(",")[0].replace(/['"]/g, ""),
            fontSize: computed.fontSize,
            padding: `${computed.paddingTop} ${computed.paddingRight} ${computed.paddingBottom} ${computed.paddingLeft}`,
            margin: `${computed.marginTop} ${computed.marginRight} ${computed.marginBottom} ${computed.marginLeft}`,
          });
        } else {
          // Re-measure in case of layout shifts / animations
          const rect = inspectable.getBoundingClientRect();
          setCoords({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active, hoveredElement]);

  if (!active || !hoveredElement || !specs) return null;

  // Compute HUD overlay position (keep inside screen viewport limits)
  const hudX = mousePos.x + 20 + 250 > window.innerWidth ? mousePos.x - 260 : mousePos.x + 20;
  const hudY = mousePos.y + 20 + 200 > window.innerHeight ? mousePos.y - 210 : mousePos.y + 20;

  return (
    <div className="redline-inspector-overlay fixed inset-0 pointer-events-none z-[999] select-none font-mono">
      
      {/* 1. Target Bounding Box */}
      <div
        className="absolute border border-red-500 bg-red-500/5 transition-all duration-75 ease-out animate-pulse"
        style={{
          top: coords.top,
          left: coords.left,
          width: coords.width,
          height: coords.height,
        }}
      >
        {/* Dimension Tag */}
        <div className="absolute -top-5 left-0 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded leading-none">
          {specs.width.toFixed(0)} × {specs.height.toFixed(0)} px
        </div>

        {/* Padding Visualizers (Green borders representing inner padding values) */}
        {parseFloat(specs.padding) > 0 && (
          <div className="absolute inset-0 border border-green-500/20 bg-green-500/5 pointer-events-none" />
        )}
      </div>

      {/* 2. Alignment Crosshairs (Figma Spec Guides) */}
      <div 
        className="absolute border-l border-dashed border-red-400/30 transition-all duration-75 ease-out"
        style={{
          top: 0,
          bottom: 0,
          left: coords.left + coords.width / 2,
        }}
      />
      <div 
        className="absolute border-t border-dashed border-red-400/30 transition-all duration-75 ease-out"
        style={{
          left: 0,
          right: 0,
          top: coords.top + coords.height / 2,
        }}
      />

      {/* 3. Floating Spec HUD Card */}
      <motion.div
        className="fixed bg-background-dark/95 border border-primary/20 p-4 rounded shadow-2xl backdrop-blur-md w-[240px] text-[10px] text-slate-300 pointer-events-none flex flex-col gap-2.5"
        style={{
          left: hudX,
          top: hudY,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {/* HUD Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
          <span className="font-black text-primary uppercase text-[9px] truncate max-w-[150px]">
            {specs.tag}
            {specs.className ? `.${specs.className}` : ""}
          </span>
          <span className="text-[8px] bg-red-500/20 text-red-400 border border-red-500/20 px-1 rounded">
            SPEC
          </span>
        </div>

        {/* HUD Details */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-white/40">DIMENSIONS</span>
            <span className="text-white font-bold">{specs.width.toFixed(0)} × {specs.height.toFixed(0)}px</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/40">TYPOGRAPHY</span>
            <span className="text-white font-medium truncate max-w-[120px]">{specs.fontSize} / {specs.fontFamily}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/40">PADDING</span>
            <span className="text-green-400 font-medium truncate max-w-[140px]" title={specs.padding}>
              {specs.padding.split(" ").map(v => parseFloat(v).toFixed(0) + "px").join(" ")}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/40">MARGIN</span>
            <span className="text-orange-400 font-medium truncate max-w-[140px]" title={specs.margin}>
              {specs.margin.split(" ").map(v => parseFloat(v).toFixed(0) + "px").join(" ")}
            </span>
          </div>
        </div>

        {/* Alignment status indicator */}
        <div className="flex items-center gap-1.5 border-t border-white/5 pt-2 text-[8px] text-primary/80">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>FIGMA_SYNC: 0.00px DRIFT</span>
        </div>
      </motion.div>

    </div>
  );
}
