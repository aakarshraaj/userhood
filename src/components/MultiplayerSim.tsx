import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playTick } from "../utils/audio";

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

interface SimulatedInteraction {
  name: string;
  color: string;
  message: string;
  targetType: "hero_title" | "mitsubishi_card" | "hyundai_card" | "inspect_btn" | "console_btn" | "cta_btn" | "heartbeat";
}

const interactionsPool: SimulatedInteraction[] = [
  {
    name: "Kriti",
    color: "#E100FF", // Deep Purple/Pink
    message: "Hey there! I'm Kriti. Exploring the canvas?",
    targetType: "hero_title",
  },
  {
    name: "Nishita",
    color: "#0044CC", // Deep Blue
    message: "Hi! I'm Nishita. Just dropping by to say hello.",
    targetType: "mitsubishi_card",
  },
  {
    name: "Ashwin",
    color: "#D94F00", // Darker Orange for better contrast
    message: "Hey! Ashwin here. Glad you stopped by.",
    targetType: "console_btn",
  },
  {
    name: "Somesh",
    color: "#007A33", // Deep Green
    message: "Yo! Somesh here. Hope you're having a great day.",
    targetType: "heartbeat",
  },
  {
    name: "Priyanka",
    color: "#C20030", // Deep Crimson Red
    message: "Hey! I'm Priyanka. Welcome to our little world!",
    targetType: "hyundai_card",
  },
  {
    name: "Uttkarsh",
    color: "#1E3A8A", // Navy Blue
    message: "Hello! Uttkarsh here. How's it going?",
    targetType: "inspect_btn",
  },
  {
    name: "Priya",
    color: "#6B21A8", // Deep Purple
    message: "Hey! I'm Priya. Thanks for checking out our work.",
    targetType: "cta_btn",
  },
  {
    name: "Ashwin",
    color: "#D94F00", // Darker Orange
    message: "Hi! Let us know if you want to chat.",
    targetType: "hero_title",
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
    if (hasTouch) return;

    const spawnSimulation = () => {
      // Pick a random guided interaction from the pool
      const interaction = interactionsPool[Math.floor(Math.random() * interactionsPool.length)];
      
      // Determine target coordinates on screen
      let targetX = window.innerWidth * 0.65;
      let targetY = window.innerHeight * 0.45;

      // Find targets dynamically on the active DOM viewport
      let targetElement: Element | null = null;

      switch (interaction.targetType) {
        case "hero_title":
          targetElement = document.querySelector("h1") || document.querySelector("p.text-slate-400");
          break;
        case "mitsubishi_card":
          targetElement = document.querySelector("[data-cursor-text*='Mitsubishi']");
          break;
        case "hyundai_card":
          targetElement = document.querySelector("[data-cursor-text*='Hyundai']");
          break;
        case "inspect_btn":
          targetElement = document.querySelector("button[aria-label='Inspect Spec Mode']");
          break;
        case "console_btn":
          targetElement = document.querySelector("button[aria-label='Toggle Developer Console']");
          break;
        case "cta_btn":
          // Find the "START THE CONVERSATION" cta button
          targetElement = Array.from(document.querySelectorAll("button")).find(
            (b) => b.textContent?.includes("CONVERSATION") || b.textContent?.includes("START")
          ) || null;
          break;
        case "heartbeat":
          targetElement = document.querySelector("#operational-heartbeat") || document.querySelector("section.py-12");
          break;
      }

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        // Hover coordinate: point slightly off-center (offset down-right)
        targetX = rect.left + rect.width * 0.5 + (Math.random() - 0.5) * 20;
        targetY = rect.top + rect.height * 0.5 + (Math.random() - 0.5) * 10;
      } else {
        // Fallback to random positions if target element is out of active scroll viewport
        targetX = window.innerWidth * 0.5 + (Math.random() - 0.5) * 200;
        targetY = window.innerHeight * 0.5 + (Math.random() - 0.5) * 200;
      }

      // Constrain coords to be within viewport margins
      targetX = Math.max(50, Math.min(window.innerWidth - 220, targetX));
      targetY = Math.max(80, Math.min(window.innerHeight - 80, targetY));

      const id = Date.now().toString();
      const name = interaction.name;
      const color = interaction.color;
      const chatText = interaction.message;
      
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
        delayBeforeTyping: 2500, // wait for transition curve (2.2s)
        exitX,
        exitY,
      });
      setTypedText("");
      setShowChat(false);
      setClickRipple(null);
    };

    // Spawn first simulation after 12 seconds, then every 25 seconds
    const initialTimer = setTimeout(spawnSimulation, 12000);
    const interval = setInterval(spawnSimulation, 28000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Typewriter and exit lifecycle
  useEffect(() => {
    if (!activeCursor) return;

    const revealTimer = setTimeout(() => {
      setShowChat(true);

      // Play click ripple sound and visual
      playTick();
      setClickRipple({ x: activeCursor.endX, y: activeCursor.endY });
      // Start typewriter effect
      let currentIdx = 0;
      const text = activeCursor.chatText;
      
      const typeInterval = setInterval(() => {
        if (currentIdx < text.length) {
          setTypedText(text.slice(0, currentIdx + 1));
          currentIdx++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }, activeCursor.delayBeforeTyping);

    // Slide off-screen after speech duration
    const exitTimer = setTimeout(() => {
      setShowChat(false);
      
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

      // Clear cursor after fly out concludes (1.5s)
      setTimeout(() => {
        setActiveCursor(null);
      }, 1500);

    }, activeCursor.delayBeforeTyping + 7000); // Greet for 7s

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
      
      {/* Click ripple indicators */}
      <AnimatePresence>
        {clickRipple && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-6 h-6 border rounded-full z-[9990]"
            style={{
              left: clickRipple.x - 12,
              top: clickRipple.y - 12,
              borderColor: activeCursor.color,
              boxShadow: `0 0 12px ${activeCursor.color}`
            }}
          />
        )}
      </AnimatePresence>

      {/* Simulated Teammate Cursor */}
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
