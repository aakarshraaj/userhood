import { motion } from "motion/react";
import { Search, PenTool, Terminal } from "lucide-react";

const BrandIdentityAnim = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
    <div className="relative w-32 h-32 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 border border-primary/30 rounded-full"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-4 border-2 border-primary/50 mix-blend-screen"
        animate={{ rotate: [0, -90, -180] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className="w-8 h-8 bg-primary shadow-[0_0_20px_rgba(0,245,255,0.5)] rotate-45 transform mix-blend-screen" />
    </div>
  </div>
);

const ProductStrategyAnim = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
    <div className="relative w-full h-full max-w-[200px] max-h-[150px]">
      {/* Whiteboard/Marker connection path */}
      <svg className="absolute inset-0 w-full h-full stroke-primary/50 stroke-[1.5] fill-none" style={{ strokeDasharray: "4 4" }} viewBox="0 0 200 150">
        <motion.path
          d="M 50 80 Q 100 30 150 60"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />
        <motion.path
          d="M 150 60 Q 120 120 80 110"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 1 }}
        />
      </svg>

      {/* Sticky Notes */}
      <motion.div
        className="absolute top-[60px] left-[30px] w-10 h-10 bg-background-dark border border-primary/40 shadow-lg flex flex-col gap-1 p-1.5 backdrop-blur-sm"
        animate={{ rotate: [-4, 0, -4], scale: [1, 1.05, 1], y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-0.5 bg-primary/40 rounded-full" />
        <div className="w-3/4 h-0.5 bg-primary/20 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-[30px] left-[130px] w-12 h-12 bg-primary/5 border border-primary/50 shadow-lg flex flex-col gap-1.5 p-2 backdrop-blur-sm"
        animate={{ rotate: [6, 2, 6], scale: [1, 1.02, 1], y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="w-full h-1 bg-primary/50 rounded-full" />
        <div className="w-5/6 h-0.5 bg-primary/30 rounded-full" />
        <div className="w-1/2 h-0.5 bg-primary/20 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-[90px] left-[80px] w-10 h-10 bg-background-dark border border-primary/30 shadow-lg flex flex-col gap-1 p-1.5 backdrop-blur-sm"
        animate={{ rotate: [2, -2, 2], y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-full h-0.5 bg-primary/30 rounded-full" />
        <div className="w-full h-0.5 bg-primary/30 rounded-full" />
      </motion.div>
    </div>
  </div>
);

const EngineeringSystemsAnim = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
    <div className="relative w-32 h-32 grid grid-cols-3 grid-rows-3 gap-2">
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-primary/20 border border-primary/10 rounded-sm"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: (i % 3) * 0.2 + Math.floor(i / 3) * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  </div>
);

const steps = [
  {
    id: "0x01_IDENTITY",
    title: "Brand Identity",
    description: "The philosophical DNA that dictates every subsequent choice across the system architecture.",
    icon: <Search className="text-primary" size={20} />,
    Component: BrandIdentityAnim
  },
  {
    id: "0x02_STRATEGY",
    title: "Product Strategy",
    description: "Translating values into deterministic user loops and conversion logic.",
    icon: <PenTool className="text-primary" size={20} />,
    Component: ProductStrategyAnim
  },
  {
    id: "0x03_SYSTEMS",
    title: "Engineering Systems",
    description: "Hardened technical frameworks built for rapid, reliable expansion without degradation.",
    icon: <Terminal className="text-primary" size={20} />,
    Component: EngineeringSystemsAnim
  }
];



const Placeholder = ({ label, AnimComponent, aspect = "aspect-video", className = "" }: { label: string, AnimComponent: any, aspect?: string, className?: string }) => (
  <div className={`${aspect} bg-white/[0.02] border border-white/10 relative overflow-hidden group ${className} hover:border-primary/30 transition-colors duration-500`}>
    <div className="absolute inset-0 tech-grid opacity-20 group-hover:opacity-40 transition-opacity" />
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <AnimComponent />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent opacity-80 pointer-events-none" />
    <div className="absolute top-4 left-4 font-mono text-[8px] text-white/40 uppercase relative z-10 mix-blend-screen tracking-widest pl-2 border-l border-primary/50">
      Artifact_Ref // {label.replace(/\s+/g, '_')}
    </div>
  </div>
);

export default function PhilosophySection() {
  return (
    <section className="py-16 md:py-24 lg:py-48 px-5 md:px-8 bg-background-dark border-y border-white/5" id="philosophy">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-4 md:sticky md:top-32">
            <div className="font-mono text-[10px] text-primary mb-6 md:mb-8 uppercase tracking-[0.2em]">[ SECTION_02 // PHILOSOPHY ]</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8 md:mb-12">
              Design is<br />Decision<br />Architecture.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-6 md:mb-8">
              We operate as systems engineers. Brand is the source code. Engineering is the execution layer.
            </p>
            <div className="w-12 h-1 bg-primary/20" />
          </div>

          <div className="md:col-span-8 space-y-16 md:space-y-24 lg:space-y-48">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center group"
              >
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <span className="font-mono text-primary text-[10px]">{step.id}</span>
                    <div className="w-8 h-px bg-primary/20" />
                    {step.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                    {step.description}
                  </p>
                </div>
                <div className="order-1 md:order-2 min-h-[180px] md:min-h-0">
                  <Placeholder label={step.title} AnimComponent={step.Component} aspect="aspect-[4/3]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
