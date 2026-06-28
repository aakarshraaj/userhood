import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playTick, playSuccess } from "../utils/audio";

interface SimulatedCursor {
  id: string;
  name: string;
  color: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  chatText: string;
  delayBeforeTyping: number;
  exitX: number;
  exitY: number;
}

const teammatePool = [
  {
    name: "Kriti",
    color: "#E100FF",
    messages: [
      "Aligning Mitsubishi dashboard columns...",
      "Mitsubishi eco-gamification UI v2 updated",
      "Obsessive design review: inspect tool verified",
      "Checking Hyundai checkout CTA alignment...",
    ],
    targetSelectors: [
      "#case-studies",
      "[data-cursor-text*='Mitsubishi']",
      "nav",
    ],
  },
  {
    name: "Ashwin",
    color: "#FF5C00",
    messages: [
      "Optimizing SSR latency: payload < 12.5ms",
      "Mesh canvas vertex update deployed",
      "Auditing dealership consolidated database...",
      "Grid baseline coordinate latency checks ok",
    ],
    targetSelectors: [
      "#operational-heartbeat",
      "[data-cursor-text*='Hyundai']",
      "h1",
    ],
  },
];

export default function MultiplayerSim() {
  const [activeCursor, setActiveCursor] = useState<SimulatedCursor | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (hasTouch) return; // Disable multiplayer sim on mobile to keep it ultra clean

    const spawnSimulation = () => {
      // Pick a random teammate
      const teammate = teammatePool[Math.floor(Math.random() * teammatePool.length)];
      
      // Determine target coordinates on screen
      let targetX = window.innerWidth * 0.65 + (Math.random() - 0.5) * 150;
      let targetY = window.innerHeight * 0.45 + (Math.random() - 0.5) * 150;

      // Try to find a target element to hover organically
      for (const selector of teammate.targetSelectors) {
        const el = document.querySelector(selector);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Hover near the element
          targetX = rect.left + rect.width * 0.5 + (Math.random() - 0.5) * 40;
          targetY = rect.top + rect.height * 0.5 + (Math.random() - 0.5) * 20;
          break;
        }
      }

      // Constrain coordinates within screen margins
      targetX = Math.max(50, Math.min(window.innerWidth - 200, targetX));
      targetY = Math.max(80, Math.min(window.innerHeight - 80, targetY));

      const id = Date.now().toString();
      const name = teammate.name;
      const color = teammate.color;
      const chatText = teammate.messages[Math.floor(Math.random() * teammate.messages.length)];
      
      // Spawn from off-screen margins
      const side = Math.floor(Math.random() * 4);
      let startX = -100;
      let startY = -100;
      if (side === 0) { // Top
        startX = Math.random() * window.innerWidth;
        startY = -100;
      } else if (side === 1) { // Right
        startX = window.innerWidth + 100;
        startY = Math.random() * window.innerHeight;
      } else if (side === 2) { // Bottom
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight + 100;
      } else { // Left
        startX = -100;
        startY = Math.random() * window.innerHeight;
      }

      // Exit coordinates
      const exitSide = (side + 2) % 4; // Exit opposite side
      let exitX = -100;
      let exitY = -100;
      if (exitSide === 0) {
        exitX = Math.random() * window.innerWidth;
        exitY = -100;
      } else if (exitSide === 1) {
        exitX = window.innerWidth + 100;
        exitY = Math.random() * window.innerHeight;
      } else if (exitSide === 2) {
        exitX = Math.random() * window.innerWidth;
        exitY = window.innerHeight + 100;
      } else {
        exitX = -100;
        exitY = Math.random() * window.innerHeight;
      }

      setActiveCursor({
        id,
        name,
        color,
        startX,
        startY,
        endX: targetX,
        endY: targetY,
        chatText,
        delayBeforeTyping: 2500, // animation takes 2.2s
        exitX,
        exitY,
      });
      setTypedText("");
      setShowChat(false);
      setClickRipple(null);
    };

    // Spawn first simulation after 18 seconds, then every 28 seconds
    const initialTimer = setTimeout(spawnSimulation, 15000);
    const interval = setInterval(spawnSimulation, 32000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Animate live chat typing sequence
  useEffect(() => {
    if (!activeCursor) return;

    // 1. Reveal chat bubble once cursor lands at destination
    const revealTimer = setTimeout(() => {
      setShowChat(true);

      // Play soft click ripple
      playTick();
      setClickRipple({ x: activeCursor.endX, y: activeCursor.endY });

      // Start typewriter effect
      let currentIdx = 0;
      const text = activeCursor.chatText;
      
      const typeInterval = setInterval(() => {
        if (currentIdx < text.length) {
          setTypedText(text.slice(0, currentIdx + 1));
          currentIdx++;
          // mechanical click sound periodically
          if (currentIdx % 3 === 0) {
            playTick();
          }
        } else {
          clearInterval(typeInterval);
        }
      }, 55);

      return () => clearInterval(typeInterval);
    }, activeCursor.delayBeforeTyping);

    // 2. Fly off-screen after collaboration is completed
    const exitTimer = setTimeout(() => {
      setShowChat(false);
      
      // Trigger slide out exit
      setActiveCursor((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          startX: prev.endX,
          startY: prev.endY,
          endX: prev.exitX,
          endY: prev.exitY,
        };
      });

      // Clear cursor model after exit slide concludes (1.5s)
      setTimeout(() => {
        setActiveCursor(null);
      }, 1500);

    }, activeCursor.delayBeforeTyping + 6500); // collaborate for 6.5 seconds

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
    };
  }, [activeCursor]);

  if (!activeCursor) return null;

  // Determine if it is near the right viewport border to flip bubble alignment
  const nearRight = activeCursor.endX > window.innerWidth - 240;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden select-none">
      
      {/* Click ripple visual indicator */}
      <AnimatePresence>
        {clickRipple && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-6 h-6 border border-primary rounded-full z-[9990]"
            style={{
              left: clickRipple.x - 12,
              top: clickRipple.y - 12,
              borderColor: activeCursor.color,
              boxShadow: `0 0 10px ${activeCursor.color}`
            }}
          />
        )}
      </AnimatePresence>

      {/* Simulated Teammate Cursor Pointer */}
      <motion.div
        initial={{ x: activeCursor.startX, y: activeCursor.startY }}
        animate={{ x: activeCursor.endX, y: activeCursor.endY }}
        transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute left-0 top-0 z-[9991]"
      >
        {/* Figma cursor SVG pointer */}
        <svg 
          width="14" 
          height="20" 
          viewBox="0 0 14 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))"
          }}
        >
          <path 
            d="M0 0L13.5 13.5L5.5 14L0 19.5V0Z" 
            fill={activeCursor.color} 
            stroke="black" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
        </svg>

        {/* Dynamic Name Tag & Typewriter Chat Bubble */}
        <div 
          className="absolute left-[12px] top-[14px] flex flex-col items-start gap-1"
          style={{
            left: nearRight ? "auto" : "12px",
            right: nearRight ? "12px" : "auto",
            alignItems: nearRight ? "flex-end" : "flex-start"
          }}
        >
          <AnimatePresence>
            {showChat ? (
              // Figma Multiplayer Live Chat Bubble
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 3 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 3 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={`bg-primary text-white font-mono text-[9px] sm:text-[10px] font-black px-2 py-0.5 shadow-lg border border-black/10 flex items-center gap-1.5 whitespace-nowrap ${
                  nearRight ? "rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-none" : "rounded-tr-md rounded-br-md rounded-bl-md rounded-tl-none"
                }`}
                style={{
                  backgroundColor: activeCursor.color,
                }}
              >
                {/* Typing status blinking indicator dot */}
                <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                <span>{typedText || "..."}</span>
              </motion.div>
            ) : (
              // Figma multiplayer user tag
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`font-mono text-[8px] font-bold px-1.5 py-0.5 shadow-md uppercase tracking-wider text-black select-none ${
                  nearRight ? "rounded-tl rounded-bl rounded-br rounded-tr-none" : "rounded-tr rounded-br rounded-bl rounded-tl-none"
                }`}
                style={{
                  backgroundColor: activeCursor.color,
                }}
              >
                {activeCursor.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </div>
  );
}
