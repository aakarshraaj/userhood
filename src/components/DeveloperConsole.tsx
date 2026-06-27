import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playTick, playSuccess, playStrike } from "../utils/audio";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

export default function DeveloperConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "USERHOOD DIGITAL SYSTEMS v1.0.0", type: "system" },
    { text: 'Type "help" to see available commands or press ` to close.', type: "system" },
    { text: "====================================================", type: "system" },
  ]);
  const [inputVal, setInputVal] = useState("");
  
  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Toggle console on ` key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "Tilde") {
        // Prevent toggle if user is typing inside text fields
        const active = document.activeElement;
        if (
          active && (
            active.tagName === "INPUT" || 
            active.tagName === "TEXTAREA" ||
            active.getAttribute("contenteditable") === "true"
          ) && active !== inputRef.current
        ) {
          return;
        }

        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) {
            playSuccess();
          } else {
            playStrike();
          }
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen to toggle events from Navbar
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => {
        const next = !prev;
        if (next) {
          playSuccess();
        } else {
          playStrike();
        }
        return next;
      });
    };
    window.addEventListener("toggle-developer-console", handleToggle);
    return () => window.removeEventListener("toggle-developer-console", handleToggle);
  }, []);

  // Focus input on console open or when console is clicked
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keep scrolled to bottom
  useEffect(() => {
    if (isOpen) {
      consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    playTick(); // Play analog click sound on typing
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputVal.trim();
      setInputVal("");
      
      if (!command) return;

      // Add input to history
      setHistory((prev) => [...prev, { text: `userhood@studio:~$ ${command}`, type: "input" }]);
      
      // Execute command
      executeCommand(command);
    }
  };

  const executeCommand = (cmdStr: string) => {
    const args = cmdStr.toLowerCase().split(" ");
    const command = args[0];

    switch (command) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { text: "AVAILABLE COMMANDS:", type: "system" },
          { text: "  help              - Display command overview", type: "output" },
          { text: "  about             - Studio philosophy & manifesto", type: "output" },
          { text: "  team / roster     - Display active developer status", type: "output" },
          { text: "  case <client>     - Details of case studies (mitsubishi / hyundai)", type: "output" },
          { text: "  ping              - Run server latency checks", type: "output" },
          { text: "  matrix            - Trigger digital stream simulation", type: "output" },
          { text: "  clear             - Clear terminal screen", type: "output" },
          { text: "  exit / close      - Close console console window", type: "output" },
        ]);
        break;

      case "about":
        setHistory((prev) => [
          ...prev,
          { text: "manifesto: Design-led engineering. We consolidate design specs and production code into a single process. Eliminating drift and launching MVPs in 12 weeks instead of 12 months.", type: "output" }
        ]);
        break;

      case "team":
      case "roster":
        setHistory((prev) => [
          ...prev,
          { text: "ACTIVE MULTIPLAYER WORKSPACE:", type: "system" },
          { text: "  • Kriti (Co-Founder) - DESIGNING [Component systems v2] (Color: #E100FF)", type: "output" },
          { text: "  • Ashwin (Co-Founder) - OPTIMIZING [SSR latency audit] (Color: #FF5C00)", type: "output" },
          { text: "  • UH Core Dev node 01 - DEPLOYING [Strategic case outcomes]", type: "output" },
          { text: "  • UH Core Dev node 02 - STANDBY [Ready to commit]", type: "output" },
        ]);
        break;

      case "case":
        const client = args[1];
        if (client === "hyundai") {
          setHistory((prev) => [
            ...prev,
            { text: "CLIENT: Hyundai Global", type: "system" },
            { text: "  • Platform: Global Click-to-Buy Automotive Commerce", type: "output" },
            { text: "  • Tech Stack: React, Vite, Node, Tailwind, Vercel", type: "output" },
            { text: "  • Metric: +25% Conversion Uplift", type: "output" },
            { text: "  • Summary: Dealer workflows consolidated into a unified buying platform.", type: "output" }
          ]);
        } else if (client === "mitsubishi") {
          setHistory((prev) => [
            ...prev,
            { text: "CLIENT: Mitsubishi Motors Australia", type: "system" },
            { text: "  • Platform: Connected Car Dashboard Companion App", type: "output" },
            { text: "  • Tech Stack: React Native, Swift, Kotlin, GraphQL", type: "output" },
            { text: "  • Metric: 40% Cognitive Load Reduction", type: "output" },
            { text: "  • Summary: Real-time predictive servicing & eco-driving gamification.", type: "output" }
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            { text: 'Client spec not found. Usage: "case hyundai" or "case mitsubishi"', type: "error" }
          ]);
        }
        break;

      case "ping":
        setHistory((prev) => [
          ...prev,
          { text: "PING userhood.in [76.76.21.21] with 64 bytes of data:", type: "system" },
          { text: "  64 bytes from 76.76.21.21: icmp_seq=1 ttl=56 time=14.2 ms", type: "output" },
          { text: "  64 bytes from 76.76.21.21: icmp_seq=2 ttl=56 time=12.8 ms", type: "output" },
          { text: "  64 bytes from 76.76.21.21: icmp_seq=3 ttl=56 time=13.5 ms", type: "output" },
          { text: "--- userhood.in ping statistics ---", type: "system" },
          { text: "  3 packets transmitted, 3 received, 0% packet loss, RTT avg = 13.5ms", type: "output" }
        ]);
        break;

      case "matrix":
        setHistory((prev) => [
          ...prev,
          { text: "Initializing matrix override...", type: "system" },
          { text: "  10110100 01101111 01100100 01110011", type: "output" },
          { text: "  01100100 01110010 01101001 01100110", type: "output" },
          { text: "  01110100 00100000 01111010 01100101", type: "output" },
          { text: "  System grid sync status: PERFECT. System integrity verified.", type: "output" }
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
      case "close":
        setIsOpen(false);
        playStrike();
        break;

      default:
        setHistory((prev) => [
          ...prev,
          { text: `bash: command not found: ${command}. Type "help" for instructions.`, type: "error" }
        ]);
    }
  };

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-white";
      case "error":
        return "text-red-500 font-bold";
      case "system":
        return "text-primary/70 font-semibold";
      default:
        return "text-slate-300";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="fixed top-0 inset-x-0 h-[380px] bg-background-dark/95 border-b border-primary/20 shadow-2xl backdrop-blur-xl z-[999] p-6 font-mono text-xs select-text overflow-hidden flex flex-col justify-between"
        onClick={() => inputRef.current?.focus()}
        data-cursor-text="TYPE TERMINAL COMMAND"
        data-cursor-color="#00f5ff"
      >
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            <span className="text-[10px] text-white/30 tracking-widest ml-3 uppercase">STUDIO_SHELL // BASH</span>
          </div>
          <div className="text-[10px] text-primary/40 uppercase">
            Press ` to close
          </div>
        </div>

        {/* Console Logs */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-white/10 pr-2">
          {history.map((line, idx) => (
            <div key={idx} className={`${getLineColor(line.type)} leading-relaxed whitespace-pre-wrap`}>
              {line.text}
            </div>
          ))}
          <div ref={consoleEndRef} />
        </div>

        {/* Input Prompter */}
        <div className="flex items-center gap-2 border-t border-white/5 pt-3">
          <span className="text-primary font-bold shrink-0">userhood@studio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-primary p-0 text-xs focus:ring-0 focus:border-none focus:outline-none"
            placeholder="enter command..."
            autoFocus
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
