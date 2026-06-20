import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Activity, ShieldCheck, Cpu, Terminal, Users } from "lucide-react";
import { playTick } from "../utils/audio";

export default function OperationalHeartbeat() {
  const [lastShipTime, setLastShipTime] = useState("04h 12m 34s");
  const [pulse, setPulse] = useState(true);

  // Simulate a live counting timer for the "last code ship"
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      const now = new Date();
      const hours = String(now.getHours() % 12).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setLastShipTime(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 border-b border-white/5 bg-background-dark/30 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        
        {/* Grid panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 font-mono text-xs uppercase tracking-widest text-slate-400">
          
          {/* Node 1: Bandwidth */}
          <div 
            className="p-6 md:p-8 bg-[#09090b] relative group hover:bg-[#0c0c0f] transition-all cursor-default"
            onMouseEnter={() => playTick()}
          >
            <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
              <Users size={14} className="text-primary" />
            </div>
            <div className="text-white/40 mb-3">Studio_Bandwidth</div>
            <div className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              1 slot available
            </div>
            <div className="text-white/20 text-xs">For Upcoming Quarter</div>
          </div>

          {/* Node 2: Pipeline status */}
          <div 
            className="p-6 md:p-8 bg-[#09090b] relative group hover:bg-[#0c0c0f] transition-all cursor-default"
            onMouseEnter={() => playTick()}
          >
            <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
              <Activity size={14} className="text-primary animate-pulse" />
            </div>
            <div className="text-white/40 mb-3">Pipeline_State</div>
            <div className="text-lg md:text-xl font-bold text-primary flex items-center gap-2 mb-1.5">
              <div className="flex gap-0.5 items-end h-3">
                <span className="w-1 h-2 bg-primary animate-pulse" />
                <span className="w-1 h-3 bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 h-1.5 bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              Running
            </div>
            <div className="text-white/20 text-xs">2 active deployments</div>
          </div>

          {/* Node 3: Last build */}
          <div 
            className="p-6 md:p-8 bg-[#09090b] relative group hover:bg-[#0c0c0f] transition-all cursor-default"
            onMouseEnter={() => playTick()}
          >
            <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
              <Terminal size={14} className="text-primary" />
            </div>
            <div className="text-white/40 mb-3">Last_Deployment</div>
            <div className="text-lg md:text-xl font-bold text-white mb-1.5">
              {lastShipTime}
            </div>
            <div className="text-white/20 text-xs">Ref // PROD_MAIN_MERGE</div>
          </div>

          {/* Node 4: Aesthetic Drift */}
          <div 
            className="p-6 md:p-8 bg-[#09090b] relative group hover:bg-[#0c0c0f] transition-all cursor-default"
            onMouseEnter={() => playTick()}
          >
            <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
              <ShieldCheck size={14} className="text-primary" />
            </div>
            <div className="text-white/40 mb-3">Aesthetic_Variance</div>
            <div className="text-lg md:text-xl font-bold text-primary mb-1.5">
              0.00% drift
            </div>
            <div className="text-white/20 text-xs">Pixel alignment verified</div>
          </div>

        </div>

      </div>
    </section>
  );
}
