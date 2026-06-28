import { motion } from "motion/react";
import { ArrowLeft, Clock, Car, Users, Lightbulb, Code, BarChart3, Zap, Map, Settings, ShieldCheck, CheckCircle2, ShoppingCart, CreditCard, ClipboardCheck, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSEO } from "../utils/seo";
import { playTick } from "../utils/audio";


function ConfiguratorWidget() {
  const [activeColor, setActiveColor] = useState("#00f5ff");
  const [colorName, setColorName] = useState("CYAN_NEON");

  const colors = [
    { hex: "#00f5ff", name: "CYAN_NEON" },
    { hex: "#E100FF", name: "PURPLE_PHANTOM" },
    { hex: "#FF5C00", name: "ORANGE_VELOCITY" },
    { hex: "#ffffff", name: "WHITE_PULSE" },
  ];

  return (
    <div className="w-full aspect-video bg-black/60 border border-white/10 rounded-xl p-6 font-mono text-[10px] text-primary relative overflow-hidden flex flex-col justify-between select-none">
      <div className="flex justify-between items-center opacity-40 border-b border-white/5 pb-2">
        <span>VARIANT_CONFIGURATOR // STEP_03</span>
        <span className="animate-pulse">● STAGED</span>
      </div>

      <div className="flex-1 flex gap-6 items-center my-4">
        {/* Car Outline Vector */}
        <div className="w-3/5 h-full relative border border-white/5 rounded flex items-center justify-center bg-white/[0.01]">
          <svg className="w-4/5 h-4/5 overflow-visible" viewBox="0 0 100 60" fill="none" style={{ color: activeColor }}>
            <motion.path
              d="M 10,40 C 10,40 12,30 20,28 C 28,26 35,12 55,12 C 75,12 85,25 90,30 C 95,35 95,40 95,40 L 90,45 L 75,45 C 75,40 70,40 70,45 L 30,45 C 30,40 25,40 25,45 L 10,40 Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="rgba(255,255,255,0.01)"
              animate={{ stroke: activeColor }}
              transition={{ duration: 0.3 }}
            />
            {/* Wheels */}
            <circle cx="27.5" cy="45" r="5" stroke="currentColor" strokeWidth="1" fill="#000" />
            <circle cx="72.5" cy="45" r="5" stroke="currentColor" strokeWidth="1" fill="#000" />
          </svg>
          <div className="absolute top-2 left-2 text-[7px] text-white/30">MODEL_3D: OPT_LOADED</div>
        </div>

        {/* Color Chips */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          <div className="text-white/40 text-[7px] uppercase">Select paint code:</div>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  playTick();
                  setActiveColor(c.hex);
                  setColorName(c.name);
                }}
                className="w-5 h-5 rounded-full border border-white/20 relative active:scale-90 transition-transform cursor-pointer"
                style={{
                  backgroundColor: c.hex,
                  boxShadow: activeColor === c.hex ? `0 0 8px ${c.hex}` : "none",
                  borderColor: activeColor === c.hex ? "#fff" : "rgba(255,255,255,0.2)",
                }}
                aria-label={c.name}
              />
            ))}
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/5 mt-1">
            <div className="text-white/30 text-[7px]">CONFIG_CODE:</div>
            <div className="text-white font-bold">{colorName}</div>
          </div>
        </div>
      </div>

      <div className="text-[8px] text-white/30 border-t border-white/5 pt-2 flex justify-between">
        <span>ASSET_RENDER: STREAMING_CDN</span>
        <span>INTEGRITY: 100%</span>
      </div>
    </div>
  );
}

function EmiSimulatorWidget() {
  const [downPayment, setDownPayment] = useState(20); // 20% or 40%
  const [tenure, setTenure] = useState(36); // 36 or 60 months

  // Calculate mock values
  const totalCost = 45000;
  const downPaymentAmount = (totalCost * downPayment) / 100;
  const financedAmount = totalCost - downPaymentAmount;
  const monthlyEmi = Math.round((financedAmount * 1.05) / tenure); // 5% interest rate simple calc

  return (
    <div className="w-full aspect-video bg-black/60 border border-white/10 rounded-xl p-6 font-mono text-[10px] text-primary relative overflow-hidden flex flex-col justify-between select-none">
      <div className="flex justify-between items-center opacity-40 border-b border-white/5 pb-2">
        <span>EMI_SIMULATOR_ENGINE // FINANCE_LAYER</span>
        <span className="animate-pulse">● EVALUATING</span>
      </div>

      <div className="flex-1 flex gap-6 items-center my-4">
        {/* Cost breakdown visual split bar */}
        <div className="w-[45%] h-full flex flex-col justify-center gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-white/40 text-[7px]">
              <span>DOWN_PAYMENT</span>
              <span className="text-white">{downPayment}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
              <motion.div 
                className="bg-primary h-full"
                animate={{ width: `${downPayment}%` }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="bg-white/10 h-full flex-grow"
                animate={{ width: `${100 - downPayment}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[8px]">
            <button 
              onClick={() => { playTick(); setDownPayment(20); }} 
              className={`py-1 border rounded text-[7px] cursor-pointer ${downPayment === 20 ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
            >
              20% DOWN
            </button>
            <button 
              onClick={() => { playTick(); setDownPayment(40); }} 
              className={`py-1 border rounded text-[7px] cursor-pointer ${downPayment === 40 ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
            >
              40% DOWN
            </button>
            <button 
              onClick={() => { playTick(); setTenure(36); }} 
              className={`py-1 border rounded text-[7px] cursor-pointer ${tenure === 36 ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
            >
              36 MO
            </button>
            <button 
              onClick={() => { playTick(); setTenure(60); }} 
              className={`py-1 border rounded text-[7px] cursor-pointer ${tenure === 60 ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
            >
              60 MO
            </button>
          </div>
        </div>

        {/* Calculated Monthly EMI */}
        <div className="flex-grow flex flex-col justify-center bg-white/[0.01] border border-white/5 p-4 rounded text-center">
          <div className="text-white/30 text-[7px] uppercase tracking-wider mb-1">ESTIMATED_PAYMENT</div>
          <motion.div 
            key={monthlyEmi}
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-black text-white tracking-tight"
          >
            ${monthlyEmi}<span className="text-[10px] font-normal text-white/40">/MO</span>
          </motion.div>
          <div className="text-[7px] text-white/30 mt-2">
            FINANCED: ${financedAmount.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="text-[8px] text-white/30 border-t border-white/5 pt-2 flex justify-between">
        <span>INTEREST_RATE: 5.0% APR</span>
        <span>TAX_LOGIC: AUTOMATED</span>
      </div>
    </div>
  );
}

function DealerMapWidget() {
  const [selectedDealer, setSelectedDealer] = useState("HYUNDAI_CENTER_CITY");
  const [inventory, setInventory] = useState(12);

  const dealers = [
    { id: "HYUNDAI_CENTER_CITY", name: "Hyundai Center City", dist: "1.2mi", stock: 12, x: 45, y: 35 },
    { id: "METRO_AUTO_DEPOT", name: "Metro Auto Depot", dist: "3.4mi", stock: 8, x: 75, y: 25 },
    { id: "PACIFIC_BAY_MOTORS", name: "Pacific Bay Motors", dist: "5.8mi", stock: 4, x: 25, y: 65 },
  ];

  return (
    <div className="w-full aspect-video bg-black/60 border border-white/10 rounded-xl p-6 font-mono text-[10px] text-primary relative overflow-hidden flex flex-col justify-between select-none">
      <div className="flex justify-between items-center opacity-40 border-b border-white/5 pb-2">
        <span>DEALER_INVENTORY_MATCH // MAP_HUD</span>
        <span className="animate-pulse">● LIVE_SYNC</span>
      </div>

      <div className="flex-1 flex gap-6 items-center my-4">
        {/* Radar Map view grid */}
        <div className="w-[45%] h-full relative border border-white/5 rounded flex items-center justify-center bg-white/[0.01] overflow-hidden">
          {/* Coordinate grid lines */}
          <div className="absolute inset-0 tech-grid opacity-10" />
          
          <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 100 100">
            {/* Grid radar sweep */}
            <circle cx="50" cy="50" r="45" stroke="rgba(0, 245, 255, 0.05)" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="25" stroke="rgba(0, 245, 255, 0.05)" strokeWidth="0.5" fill="none" />
            
            {/* Dealer ping nodes */}
            {dealers.map((d) => (
              <g key={d.id}>
                <circle 
                  cx={d.x} 
                  cy={d.y} 
                  r={selectedDealer === d.id ? "4.5" : "3.5"} 
                  fill={selectedDealer === d.id ? "#00f5ff" : "rgba(0, 245, 255, 0.4)"}
                  className="cursor-pointer pointer-events-auto"
                  onClick={() => {
                    playTick();
                    setSelectedDealer(d.id);
                    setInventory(d.stock);
                  }}
                  style={{
                    filter: selectedDealer === d.id ? "drop-shadow(0 0 4px #00f5ff)" : "none"
                  }}
                />
                {selectedDealer === d.id && (
                  <circle 
                    cx={d.x} 
                    cy={d.y} 
                    r="8" 
                    fill="none" 
                    stroke="#00f5ff" 
                    strokeWidth="0.5" 
                    className="animate-ping" 
                  />
                )}
              </g>
            ))}
          </svg>
          <div className="absolute bottom-2 left-2 text-[7px] text-white/30">RADIUS: 10mi</div>
        </div>

        {/* Selected Dealer info box */}
        <div className="flex-grow space-y-2">
          {dealers.map((d) => (
            <div 
              key={d.id}
              onClick={() => {
                playTick();
                setSelectedDealer(d.id);
                setInventory(d.stock);
              }}
              className={`p-2 rounded border transition-all cursor-pointer ${selectedDealer === d.id ? 'bg-primary/10 border-primary text-white' : 'bg-white/[0.01] border-white/5 text-white/40'}`}
            >
              <div className="flex justify-between font-bold">
                <span>{d.name.split(" ").slice(1).join("_").toUpperCase()}</span>
                <span>{d.dist}</span>
              </div>
              {selectedDealer === d.id && (
                <div className="text-[7.5px] text-primary mt-1">
                  INVENTORY_MATCH // {d.stock} UNITS_FOUND
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-[8px] text-white/30 border-t border-white/5 pt-2 flex justify-between">
        <span>FULFILLMENT_ROUTE: DIGITAL_SECURE_HOLD</span>
        <span>LAST_SYNC: JUST_NOW</span>
      </div>
    </div>
  );
}

const InteractiveArtifact = ({ label }: { label: string }) => {
  if (label.includes("Configurator")) {
    return <ConfiguratorWidget />;
  }
  if (label.includes("Simulation") || label.includes("Quotation")) {
    return <EmiSimulatorWidget />;
  }
  return <DealerMapWidget />;
};

export default function CaseStudyHyundai({ onContactClick }: { onContactClick: () => void }) {

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useSEO({
    title: "Hyundai Click to Buy — Automotive E-Commerce Case Study | Userhood",
    description: "How Userhood engineered Hyundai's global digital retail platform — transforming complex dealership workflows into a streamlined buying experience with 25% conversion uplift.",
    canonical: "https://userhood.in/case-study/hyundai",
  });
  return (
    <div className="min-h-screen bg-background-dark pt-20 sm:pt-24 pb-20 sm:pb-32 selection:bg-primary selection:text-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 sm:mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all min-h-[44px] items-center"
          >
            <ArrowLeft size={14} /> Back_to_Archives
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-16 sm:mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-primary mb-6 sm:mb-8 uppercase tracking-[0.3em]"
          >
            [ UX & ENGINEERING CASE STUDY ]
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-4 sm:mb-6"
          >
            Hyundai Click to <span className="text-primary">Buy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-lg sm:text-xl text-slate-400 font-light leading-snug mb-6 sm:mb-8 max-w-2xl"
          >
            End-to-end automotive e-commerce for Hyundai Global; streamlined dealership workflows and drove conversion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-16"
          >
            End-to-End Automotive E-Commerce
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-12 text-white/40 font-mono text-xs uppercase tracking-widest border-y border-white/5 py-12"
          >
            <div className="space-y-3">
              <span className="text-primary/40 block">STRATEGY</span>
              <div className="flex items-center gap-2 text-white">
                <Globe size={12} className="text-primary" />
                Digital Commerce Transformation
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-primary/40 block">EXECUTION</span>
              <div className="flex items-center gap-2 text-white">
                <Code size={12} className="text-primary" />
                E-Commerce Systems Eng
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-primary/40 block">OUTCOME</span>
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck size={12} className="text-primary" />
                Global Platform Rollout
              </div>
            </div>
          </motion.div>
        </header>

        {/* The Brief */}
        <section className="grid md:grid-cols-12 gap-16 mb-48">
          <div className="md:col-span-5">
            <h2 className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-8">00_THE_BRIEF</h2>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              The automotive industry is shifting from dealership-first purchasing to digital-first ownership journeys. Hyundai’s “Click to Buy” initiative aimed to provide customers with a fully online vehicle purchasing experience — from discovery to final order.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="p-12 bg-white/[0.02] border border-white/5 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
              <p className="text-3xl md:text-4xl text-white font-medium leading-tight tracking-tight">
                "Transforming complex dealership workflows into a streamlined, user-friendly e-commerce system that builds trust in high-value online purchases."
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="mb-48">
          <h2 className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-16">01_THE_FRICTION</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Price Opacity", desc: "Traditional car buying involves hidden fees and complex dealership-only calculations." },
              { title: "Decision Fatigue", desc: "Comparing variants, fuel types, and financing options is traditionally overwhelming." },
              { title: "Fragmented Journey", desc: "A disconnect between online research and the final physical purchase/delivery." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-background-dark">
                <h3 className="text-white font-bold mb-4 uppercase tracking-tight text-base">{item.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* UX Strategy: The 7 Stages */}
        <section className="mb-48">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-mono text-xs text-primary uppercase tracking-[0.2em]">02_UX_STRATEGY</h2>
            <span className="font-mono text-xs text-white/20">METHODOLOGY: PROGRESSIVE_COMMITMENT</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              "Discovery", "Fuel Type", "Configuration", "Dealer Select", "Validation", "Financing", "Final Order"
            ].map((stage, i) => (
              <div key={i} className="p-6 border border-white/5 bg-white/[0.01] text-center group hover:border-primary/40 transition-colors">
                <div className="font-mono text-primary text-xs mb-4">STAGE_0{i + 1}</div>
                <div className="text-white font-bold text-xs uppercase tracking-widest">{stage}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Solution Pillars */}
        <section className="mb-48">
          <h2 className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-24 text-center">03_SOLUTION_PILLARS</h2>

          <div className="space-y-32">
            {/* Pillar 1: Discovery & Configuration */}
            <div className="grid md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-5 space-y-8">
                <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                  <Settings size={14} className="text-primary" />
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">Configuration Engine</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter leading-[0.9]">Personalization<br />without Friction.</h3>
                <p className="text-slate-400 leading-relaxed">
                  We redesigned the variant selection process using progressive disclosure. Real-time car image updates and clear price difference indicators enable confident personalization.
                </p>
                <ul className="space-y-4">
                  {["Real-time Asset Rendering", "Variant Dependency Logic", "Price Recalculation Engine"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/60 font-mono text-xs uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-7">
                <InteractiveArtifact label="Variant Configurator UI" />
              </div>
            </div>

            {/* Pillar 2: Financial Transparency */}
            <div className="grid md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <InteractiveArtifact label="Quotation & EMI Simulation" />
              </div>
              <div className="md:col-span-5 space-y-8 order-1 md:order-2">
                <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                  <CreditCard size={14} className="text-primary" />
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">Financial Clarity</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter leading-[0.9]">Transparent<br />Quotations.</h3>
                <p className="text-slate-400 leading-relaxed">
                  Transforming hidden dealership calculations into digital clarity. Our EMI simulation engine provides real-time cost breakdowns, including taxes and registration fees.
                </p>
                <div className="p-6 bg-primary/5 border border-primary/20">
                  <p className="text-xs text-primary font-mono leading-tight uppercase">
                    FINANCE_CALCULATION_ENGINE: AUTOMATED_TAX_LOGIC
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3: Hybrid Fulfillment */}
            <div className="grid md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-5 space-y-8">
                <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                  <ClipboardCheck size={14} className="text-primary" />
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">Hybrid Flow</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter leading-[0.9]">Digital to<br />Physical.</h3>
                <p className="text-slate-400 leading-relaxed">
                  Seamlessly connecting the online booking with local dealership fulfillment. Users can schedule test drives or finalize orders with geo-located dealer integration.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Map size={16} className="text-primary" />
                    <span className="font-mono text-xs text-white/40 uppercase">Dealer Sync</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={16} className="text-primary" />
                    <span className="font-mono text-xs text-white/40 uppercase">Order Tracking</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7">
                <InteractiveArtifact label="Dealer Selection & Booking" />
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="mb-48">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-mono text-xs text-primary uppercase tracking-[0.2em]">04_SYSTEM_ARCHITECTURE</h2>
            <span className="font-mono text-xs text-white/20">INFRASTRUCTURE: MULTI_LAYER_INTEGRATION</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Product Config Engine", desc: "Handles variant logic, pricing updates, and compatibility validation." },
              { title: "Dealer & Inventory", desc: "Connects local dealership systems to digital purchase flow." },
              { title: "Financial Computation", desc: "Calculates EMI, taxes, fees, insurance, and discounts." },
              { title: "Payment & Order", desc: "Handles transaction security and booking confirmation." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/5 bg-white/[0.01]">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="font-mono text-xs text-primary">{i + 1}</span>
                </div>
                <h3 className="text-white font-bold mb-4 uppercase tracking-tight text-sm">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-48 py-24 border-y border-white/5">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-primary uppercase tracking-widest">01_CONVERSION</h4>
              <div className="text-6xl font-black text-white tracking-tighter">+25%</div>
              <p className="text-slate-400 text-sm leading-relaxed">Increase in lead-to-booking conversion rate through simplified variant selection.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-primary uppercase tracking-widest">02_TRUST_SCORE</h4>
              <div className="text-6xl font-black text-white tracking-tighter">92%</div>
              <p className="text-slate-400 text-sm leading-relaxed">User rating for pricing transparency and financial clarity during the checkout process.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-primary uppercase tracking-widest">03_VELOCITY</h4>
              <div className="text-6xl font-black text-white tracking-tighter">-30%</div>
              <p className="text-slate-400 text-sm leading-relaxed">Reduction in average buying decision timeline compared to traditional dealership journeys.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <footer className="text-center py-24">
          <div className="max-w-2xl mx-auto space-y-12">
            <h3 className="text-5xl font-bold text-white tracking-tighter leading-tight">Looking to digitize complex purchase journeys?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="bg-primary text-black px-12 py-5 font-mono font-bold text-xs uppercase tracking-[0.2em] w-full sm:w-auto"
              >
                ESTABLISH_CONNECTION
              </motion.button>
              <Link
                to="/"
                className="text-white/40 hover:text-white font-mono text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Return_to_Archives
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
