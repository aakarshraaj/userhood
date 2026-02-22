import { motion } from "motion/react";
import { ShieldAlert, Zap, Layers, ChevronRight } from "lucide-react";

const models = [
    {
        id: "ENGAGEMENT_01",
        title: "The Architecture Intervention",
        subtitle: "AUDIT & RESTRUCTURE",
        description: "A high-intensity, time-boxed intervention to identify and solve critical UX/UI fragmentation, technical debt, and disjointed brand experiences.",
        price: "Custom Scope",
        duration: "2-4 Weeks",
        metrics: [
            "Complete Codebase & Design System Audit",
            "Identification of Conversion Bottlenecks",
            "Strategic Restructuring Roadmap",
            "Immediate High-Impact Fixes"
        ],
        icon: <Zap className="w-8 h-8" />
    },
    {
        id: "ENGAGEMENT_02",
        title: "System Execution",
        subtitle: "END-TO-END DEPLOYMENT",
        featured: true,
        description: "We embed as your external CTO and Head of Design. We architect, build, and deploy the entire product from ground logic to final interface.",
        price: "Retained",
        duration: "3-6+ Months",
        metrics: [
            "Zero-Bloat External Strike Team",
            "Full Stack System Architecture",
            "Bespoke Visual Identity Integration",
            "Continuous Optimization & Scaling"
        ],
        icon: <Layers className="w-8 h-8" />
    },
    {
        id: "ENGAGEMENT_03",
        title: "On-Demand Oversight",
        subtitle: "RETAINED ADVISORY & FIXES",
        description: "We don't just build it and leave. We remain on standby to oversee new feature deployments, ensuring architectural and design integrity holds.",
        price: "Monthly Retainer",
        duration: "Ongoing",
        metrics: [
            "Direct Line to Lead Architects",
            "Weekly Strategic Reviews",
            "Design QA for Internal Dev Teams",
            "Emergency Code/Design Refactoring"
        ],
        icon: <ShieldAlert className="w-8 h-8" />
    }
];

interface EngagementModelsProps {
    onContactClick: () => void;
}

export default function EngagementModels({ onContactClick }: EngagementModelsProps) {
    return (
        <section className="py-16 md:py-24 lg:py-32 px-5 md:px-8 bg-[#030303] border-y border-white/5 relative overflow-hidden" id="engagement">
            <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none max-md:opacity-5" />

            <div className="max-w-[1440px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 md:gap-8">
                    <div className="max-w-2xl">
                        <div className="font-mono text-[10px] text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                            [ DEPLOYMENT_MODELS // PRICING ]
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                            Bandwidth <br /> Allocation.
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-sm font-light leading-snug">
                        We operate without account managers, junior devs, or layers of bloat. You interact directly with the architects.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
                    {models.map((model, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            onClick={onContactClick}
                            className={`p-6 sm:p-8 md:p-10 flex flex-col group cursor-pointer transition-all duration-500 relative bg-background-dark border min-h-0 ${model.featured ? 'border-primary/40 hover:border-primary' : 'border-white/10 hover:border-primary/30'} ${model.featured ? 'pt-10 md:pt-10' : ''}`}
                        >
                            {model.featured && (
                                <div className="absolute top-0 left-0 right-0 md:left-auto md:right-0 bg-primary text-black font-mono text-[8px] uppercase tracking-widest px-3 py-1.5 font-bold text-center md:text-left">
                                    Recommended_Pipeline
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex justify-between items-start gap-3 mb-6 md:mb-8 relative z-10">
                                <div className={`${model.featured ? 'text-primary' : 'text-white/40'} group-hover:text-primary transition-colors [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-8 md:[&>svg]:h-8`}>
                                    {model.icon}
                                </div>
                                <div className="font-mono text-[10px] text-white/20 tracking-widest shrink-0">{model.id}</div>
                            </div>

                            <div className="relative z-10 mb-6 md:mb-8 flex-grow min-w-0">
                                <div className="font-mono text-[10px] text-primary mb-1 md:mb-2 tracking-widest uppercase">{model.subtitle}</div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-primary transition-colors">{model.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{model.description}</p>
                            </div>

                            <div className="relative z-10 border-t border-white/10 pt-4 md:pt-6 mb-6 md:mb-8 group-hover:border-primary/30 transition-colors">
                                <div className="flex justify-between items-center gap-2 mb-4 md:mb-6">
                                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Est_Timeline</span>
                                    <span className="font-mono text-[10px] text-white font-bold bg-white/5 px-2 py-1 shrink-0">{model.duration}</span>
                                </div>
                                <ul className="space-y-2 md:space-y-3">
                                    {model.metrics.map((metric, i) => (
                                        <li key={i} className="flex items-start gap-2 md:gap-3">
                                            <ChevronRight className="w-4 h-4 text-primary shrink-0 opacity-50 group-hover:opacity-100 transition-opacity mt-0.5" />
                                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{metric}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative z-10 mt-auto flex items-center justify-between gap-3 min-h-[44px]">
                                <div className="font-mono text-sm text-white font-bold truncate">{model.price}</div>
                                <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 md:mt-16 flex justify-center px-2">
                    <div className="inline-flex items-center gap-2 md:gap-3 border border-white/10 bg-white/5 px-4 py-2.5 md:px-6 md:py-3 font-mono text-[9px] md:text-[10px] text-white/60 tracking-widest uppercase text-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                        <span className="break-words">CURRENT_BANDWIDTH: 1 SLOT REMAINING FOR UPCOMING QUATER</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
