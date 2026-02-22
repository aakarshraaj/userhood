import { motion } from "motion/react";
import { Terminal, Users } from "lucide-react";

export default function FounderOrigin() {
    return (
        <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 bg-surface border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 md:space-y-8"
                    >
                        <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                            <Users size={12} className="shrink-0" />
                            [ ORIGIN_NODE // ARCHITECTS ]
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6 md:mb-8">
                            Design-obsessed<br />architecture.
                        </h2>

                        <div className="space-y-4 md:space-y-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
                            <p>
                                We are a design-driven studio. We believe that incredible engineering is useless if it's trapped behind a mediocre interface, and a beautiful interface is a liability if the code can't support it.
                            </p>
                            <p>
                                We are two co-founders leading a specialized core team of design-obsessed engineers. You are partnering with hybrid domain experts who elevate aesthetic vision through rigid technical execution.
                            </p>
                        </div>

                        <div className="pt-8 md:pt-12 flex items-center gap-4 md:gap-6">
                            <div className="w-11 h-11 md:w-12 md:h-12 bg-white/[0.03] flex items-center justify-center text-primary font-mono text-xs border border-white/10 shrink-0">
                                UH
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-white font-bold text-sm">Raj & Ashwin</span>
                                <span className="text-primary font-mono text-[9px] uppercase tracking-widest mt-1">Lead System Architects</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-full min-h-0"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full hidden md:block" />
                        <div className="relative bg-[#0d0d0f] border border-white/5 p-6 md:p-8 lg:p-12 overflow-hidden flex flex-col items-center justify-center min-h-[320px] md:min-h-0 md:h-full">
                            <div className="absolute inset-0 tech-grid opacity-10 max-md:opacity-5" />

                            <div className="relative z-10 w-full flex justify-center gap-8 sm:gap-12 md:gap-20 mb-8 md:mb-16 mt-4 md:mt-8">
                                <div className="flex flex-col items-center group min-w-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 bg-[#d8ebed] rounded-full overflow-hidden mb-4 md:mb-8 border-2 md:border-4 border-transparent group-hover:border-primary transition-all duration-300 flex items-center justify-center shrink-0">
                                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Akarsh&backgroundColor=transparent" alt="Akarsh" className="w-[125%] h-[125%] object-cover object-top" />
                                    </div>
                                    <h3 className="font-mono text-base md:text-xl text-white tracking-[0.2em] mb-1 md:mb-2">RAJ</h3>
                                    <div className="font-mono text-[8px] md:text-[9px] text-primary tracking-widest">CO-FOUNDER</div>
                                </div>
                                <div className="flex flex-col items-center group min-w-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 bg-[#d8ebed] rounded-full overflow-hidden mb-4 md:mb-8 border-2 md:border-4 border-transparent group-hover:border-primary transition-all duration-300 flex items-center justify-center shrink-0">
                                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ashwin&backgroundColor=transparent" alt="Ashwin" className="w-[125%] h-[125%] object-cover object-top" />
                                    </div>
                                    <h3 className="font-mono text-base md:text-xl text-white tracking-[0.2em] mb-1 md:mb-2">ASHWIN</h3>
                                    <div className="font-mono text-[8px] md:text-[9px] text-primary tracking-widest">CO-FOUNDER</div>
                                </div>
                            </div>

                            <div className="w-full mt-auto relative z-10 px-0">
                                <a href="/about" className="w-full bg-[#141416] border border-white/[0.08] hover:border-primary/50 py-4 md:py-5 px-4 md:px-6 flex items-center justify-between gap-3 transition-all group min-h-[48px]">
                                    <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-white/50 group-hover:text-white transition-colors truncate">VIEW_COMPLETE_ROSTER</span>
                                    <span className="text-primary text-sm shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
