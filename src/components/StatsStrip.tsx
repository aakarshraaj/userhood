import { motion } from "motion/react";

const stats = [
    {
        value: "12",
        unit: "weeks",
        label: "avg. time to MVP",
        sub: "Industry averages 11 months"
    },
    {
        value: "23+",
        unit: "products",
        label: "shipped to date",
        sub: "Zero failed launches"
    },
    {
        value: "1",
        unit: "team",
        label: "design + engineering",
        sub: "Unified execution"
    },
];

export default function StatsStrip() {
    return (
        <section className="border-y border-white/5 bg-white/[0.01] overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="px-8 md:px-12 lg:px-16 py-8 md:py-10 group cursor-default hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="flex items-end gap-2 mb-1">
                                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors duration-300">
                                    {stat.value}
                                </span>
                                <span className="text-primary font-mono text-sm mb-2 font-bold">{stat.unit}</span>
                            </div>
                            <div className="font-mono text-[10px] text-white/50 uppercase tracking-[0.15em] mb-1">
                                {stat.label}
                            </div>
                            <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.12em]">
                                {stat.sub}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
