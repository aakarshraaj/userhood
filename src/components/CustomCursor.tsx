import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [isRedline, setIsRedline] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "ping">("default");
  const [isClicked, setIsClicked] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring (creates the fluid, liquid lag effect)
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports touch
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouch(hasTouch);
    };

    // Monitor Redline mode class
    const checkRedline = () => {
      setIsRedline(document.body.classList.contains("redline-active"));
    };

    checkDevice();
    checkRedline();

    const observer = new MutationObserver(checkRedline);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isTouch || isRedline) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find nearest element with data-cursor attribute or interactive tags
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea");

      if (cursorTarget) {
        const val = cursorTarget.getAttribute("data-cursor") as any;
        setCursorState(val || "default");
        
        if (val === "view") {
          setHoverText("VIEW_CASE");
        } else if (val === "ping") {
          setHoverText("PING_STATUS");
        } else {
          setHoverText("");
        }
      } else if (isInteractive) {
        setCursorState("hover");
        setHoverText("");
      } else {
        setCursorState("default");
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch, isRedline, mouseX, mouseY]);

  if (isTouch || isRedline) return null;

  // Dynamic values depending on cursor state
  const getRingVariants = () => {
    let size = 32;
    let bg = "rgba(0, 245, 255, 0)";
    let border = "1px solid rgba(0, 245, 255, 0.2)";

    if (isClicked) {
      size = 24;
    } else {
      switch (cursorState) {
        case "hover":
          size = 48;
          bg = "rgba(0, 245, 255, 0.05)";
          border = "1px solid rgba(0, 245, 255, 0.5)";
          break;
        case "view":
          size = 72;
          bg = "rgba(10, 10, 12, 0.9)";
          border = "1px solid rgba(0, 245, 255, 0.4)";
          break;
        case "ping":
          size = 64;
          bg = "rgba(10, 10, 12, 0.9)";
          border = "1px solid rgba(0, 245, 255, 0.4)";
          break;
        default:
          size = 32;
      }
    }

    return {
      width: size,
      height: size,
      backgroundColor: bg,
      border,
    };
  };

  const getDotVariants = () => {
    let scale = 1;
    if (cursorState === "view" || cursorState === "ping" || cursorState === "hover") {
      scale = 0;
    }
    return {
      scale: isClicked ? 0.7 : scale,
    };
  };

  const ringStyles = getRingVariants();
  const dotStyles = getDotVariants();

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] select-none mix-blend-screen">
      
      {/* Outer Spring Ring */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          width: ringStyles.width,
          height: ringStyles.height,
          backgroundColor: ringStyles.backgroundColor,
          border: ringStyles.border,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {/* Hover text label */}
        {hoverText && (
          <span className="font-mono text-[8px] text-primary tracking-widest font-black uppercase text-center leading-none select-none pointer-events-none">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 0,
          top: 0,
          x: mouseX,
          y: mouseY,
        }}
        animate={dotStyles}
        transition={{ duration: 0.1 }}
      />
      
    </div>
  );
}
