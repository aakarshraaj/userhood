import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SystemArchitectureAnim = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
    <div className="relative w-32 h-32">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 rounded-sm border border-primary/50 bg-background-dark/80 flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.2)]"
          style={{
            top: i === 0 ? '0%' : '70%',
            left: i === 0 ? '50%' : i === 1 ? '10%' : '90%',
            x: '-50%'
          }}
          animate={{
            y: [0, -5, 0],
            borderColor: ['rgba(0,245,255,0.3)', 'rgba(0,245,255,0.8)', 'rgba(0,245,255,0.3)']
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </motion.div>
      ))}

      <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
        <motion.path
          d="M 50 15 L 20 70 M 50 15 L 80 70 M 20 70 L 80 70"
          stroke="rgba(0,245,255,0.3)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  </div>
);

const UserFlowAnim = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
    <div className="relative w-full h-full flex flex-col justify-center gap-6 px-8">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <motion.div
            className="w-12 h-1 bg-primary/20 rounded-full overflow-hidden relative"
          >
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-1/3 bg-primary"
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
            />
          </motion.div>
          <div className="w-4 h-4 rounded-full border border-primary/40" />
          <motion.div
            className="w-8 h-1 bg-primary/20 rounded-full"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        </div>
      ))}
    </div>
  </div>
);

const ComponentLibraryAnim = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        className="w-16 h-16 border-2 border-primary/40 rounded-lg p-2 flex flex-col gap-2"
        animate={{ rotate: [0, 90, 90, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-4 rounded-sm bg-primary/20" />
        <div className="w-full h-full rounded-sm border border-primary/20" />
      </motion.div>
      <motion.div
        className="w-16 h-16 border-2 border-primary/40 rounded-full p-2 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-8 h-8 rounded-full bg-primary/20" />
      </motion.div>
      <motion.div
        className="w-full col-span-2 h-8 border-2 border-primary/40 rounded-md p-1 flex items-center gap-2"
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-4 h-4 rounded-full bg-primary/40" />
        <div className="w-12 h-2 rounded-full bg-primary/20" />
      </motion.div>
    </div>
  </div>
);

const WhiteboardAnim = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
    <svg className="absolute inset-0 w-full h-full stroke-primary/40 stroke-[2] fill-none" viewBox="0 0 200 200">
      <motion.path
        d="M 20 100 Q 50 20 100 100 T 180 100"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
      />
      <motion.circle
        cx="100" cy="100" r="10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, delay: 1.5, repeatType: "reverse" }}
      />
      <motion.rect
        x="30" y="50" width="20" height="20"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 10 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  </div>
);

const artifacts = [
  {
    title: "System Architecture",
    category: "ENGINEERING",
    Component: SystemArchitectureAnim
  },
  {
    title: "User Flow Mapping",
    category: "STRATEGY",
    Component: UserFlowAnim
  },
  {
    title: "Component Library",
    category: "DESIGN_SYSTEM",
    Component: ComponentLibraryAnim
  },
  {
    title: "Logical Ideation",
    category: "DISCOVERY",
    Component: WhiteboardAnim
  }
];

const Placeholder = ({ label, AnimComponent, aspect = "aspect-[3/4]", className = "" }: { label: string, AnimComponent: any, aspect?: string, className?: string }) => (
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

export default function ProcessGallery() {
  return (
    <section className="py-16 md:py-24 lg:py-48 px-5 md:px-8 bg-background-dark overflow-hidden border-y border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col xl:flex-row justify-between xl:items-end mb-12 md:mb-24 gap-6 md:gap-8 relative z-10">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary shrink-0" />
              [ PROCESS_ARTIFACTS // TANGIBLE_OUTPUT ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter md:mix-blend-difference">
              From Logic<br />to Interface.
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-sm font-light leading-snug">
            We document every stage of the intervention. These artifacts represent the rigorous engineering that drives our visual output.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 group/grid">
          {artifacts.map((artifact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative cursor-default md:cursor-crosshair md:hover:-translate-y-2 lg:hover:-translate-y-4 transition-transform duration-500"
            >
              <Placeholder label={artifact.title} AnimComponent={artifact.Component} />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500 hidden md:block" />

              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none z-10">
                <div className="font-mono text-[8px] text-primary mb-1 md:mb-2 uppercase tracking-widest">{artifact.category}</div>
                <h3 className="text-white font-bold tracking-tight text-base md:text-lg">{artifact.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
