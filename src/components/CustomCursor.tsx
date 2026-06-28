import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";


export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [isRedline, setIsRedline] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [cursorColor, setCursorColor] = useState("#00f5ff"); // default cyan

  // Quad-flipping positions to keep text within viewport bounds
  const [positionState, setPositionState] = useState({ nearRight: false, nearBottom: false });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Check if device supports hover/touch
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

      // Estimate safety thresholds to prevent clipping
      const nearRight = e.clientX > window.innerWidth - 240;
      const nearBottom = e.clientY > window.innerHeight - 80;

      // Only dispatch state update on cross boundary to preserve performance
      setPositionState((prev) => {
        if (prev.nearRight !== nearRight || prev.nearBottom !== nearBottom) {
          return { nearRight, nearBottom };
        }
        return prev;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find nearest element with data-cursor-text or custom data-cursor
      const cursorTarget = target.closest("[data-cursor-text]") as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button']");

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor-text") || "";
        const customColor = cursorTarget.getAttribute("data-cursor-color");
        setHoverText(text);
        if (customColor) {
          setCursorColor(customColor);
        } else {
          setCursorColor("#00f5ff"); // default Userhood cyan
        }
      } else if (isInteractive) {
        const buttonText = isInteractive.textContent?.trim().slice(0, 24) || "";
        if (buttonText.startsWith("//")) {
          setHoverText(`Open ${buttonText.replace("//", "").trim()}`);
        } else {
          setHoverText(`Click to ${buttonText.toLowerCase() || "select"}`);
        }
        setCursorColor("#00f5ff");
      } else {
        setHoverText("");
        setCursorColor("#00f5ff");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch, isRedline, mouseX, mouseY]);

  if (isTouch || isRedline) return null;

  const { nearRight, nearBottom } = positionState;

  // Dynamic placement logic to prevent clipping near screen edges
  const getPlacementStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      transform: "translate3d(0, 0, 0)",
    };

    if (nearRight) {
      style.right = "12px";
      style.left = "auto";
      style.alignItems = "flex-end";
    } else {
      style.left = "12px";
      style.right = "auto";
      style.alignItems = "flex-start";
    }

    if (nearBottom) {
      style.bottom = "14px";
      style.top = "auto";
    } else {
      style.top = "14px";
      style.bottom = "auto";
    }

    return style;
  };

  // Dynamic border-radius corner styling (keep chat bubbles pointing cleanly to the cursor tip)
  const getRoundedClass = () => {
    if (nearRight && nearBottom) {
      return "rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-none";
    }
    if (nearRight) {
      return "rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-none";
    }
    if (nearBottom) {
      return "rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-none";
    }
    return "rounded-tr-md rounded-br-md rounded-bl-md rounded-tl-none";
  };

  return (
    <motion.div
      className="fixed left-0 top-0 pointer-events-none z-[9999] select-none"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    >
      {/* 1. Figma Pointer SVG Arrow */}
      <svg 
        width="14" 
        height="20" 
        viewBox="0 0 14 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.3))"
        }}
      >
        <path 
          d="M0 0L13.5 13.5L5.5 14L0 19.5V0Z" 
          fill={cursorColor} 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />
      </svg>

      {/* 2. Figma Multiplayer Label/Chat Bubble (Flipped dynamically to avoid overflow) */}
      <div style={getPlacementStyle()}>
        {hoverText ? (
          // Figma-style Live Chat Bubble
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 2 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 2 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className={`bg-primary text-black font-mono text-[9px] sm:text-[10px] font-black px-2 py-0.5 shadow-lg border border-black/10 flex items-center gap-1.5 whitespace-nowrap ${getRoundedClass()}`}
            style={{
              backgroundColor: cursorColor,
              color: cursorColor === "#00f5ff" ? "black" : "white"
            }}
          >
            {/* Live Chat Indicator Dot */}
            <span className="w-1 h-1 bg-current rounded-full animate-pulse" />
            <span>{hoverText}</span>
          </motion.div>
        ) : (
          // Figma-style User Name Tag
          <div 
            className={`font-mono text-[8px] font-bold px-1.5 py-0.5 shadow-md uppercase tracking-wider text-black select-none ${
              nearRight ? "rounded-tl rounded-bl rounded-br rounded-tr-none" : "rounded-tr rounded-br rounded-bl rounded-tl-none"
            }`}
            style={{
              backgroundColor: cursorColor,
            }}
          >
            VISITOR
          </div>
        )}
      </div>
    </motion.div>
  );
}
