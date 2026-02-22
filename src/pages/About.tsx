import { motion } from "motion/react";
import { Terminal, Code, Cpu, ShieldCheck, Users, Clock, Globe } from "lucide-react";
import { useEffect } from "react";

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const timeline = [
        { year: "2020", title: "SYSTEM_INITIALIZATION", desc: "Studio founded to bridge the gap between aesthetic design and rigorous engineering." },
        { year: "2022", title: "CORE_EXPANSION", desc: "Expanded the team beyond the two founders to include specialized protocol engineers and visual architects." },
        { year: "2024", title: "GLOBAL_DEPLOYMENT", desc: "Scaled operations to handle high-stakes, decentralized architecture for global enterprises." }
    ];

    const team = [
        { name: "Raj", role: "Co-Founder // Protocol Lead", icon: <Terminal size={20} />, desc: "Design Evangelist." },
        { name: "Ashwin", role: "Co-Founder // Product and Brand Matrix", icon: <Code size={20} />, desc: "Product DNA and user cognitive load optimization." },
        { name: "0xDesigner", role: "Lead UI/UX Architect", icon: <Cpu size={20} />, desc: "Translating brand systems into component libraries." },
        { name: "Dev_Null", role: "Senior Systems Engineer", icon: <ShieldCheck size={20} />, desc: "Backend infrastructure and latency reduction." },
    ];

    return (
        <div className="min-h-screen pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-5 sm:px-8 bg-background-dark">
            <div className="max-w-[1000px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-[10px] text-primary mb-4 sm:mb-6 flex items-center gap-2 flex-wrap"
                >
                    <span className="w-2 h-2 bg-primary shrink-0" />
                    ACCESSING_ROOT_DIRECTORY // ABOUT_US
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-10 sm:mb-16"
                >
                    THE<br />COMPANY.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-24"
                >
                    {/* Mission Section */}
                    <div className="grid md:grid-cols-12 gap-12">
                        <div className="md:col-span-8 space-y-8">
                            <h2 className="text-2xl font-bold text-white mb-6">MISSION_STATEMENT</h2>
                            <p className="text-xl text-slate-300 font-light leading-relaxed">
                                We are a design-driven, design-obsessed studio led by two co-founders, powered by a dedicated core team. We build platforms where the aesthetic vision dictates the technical execution.
                            </p>

                            <p className="text-lg text-slate-400 leading-relaxed">
                                We've seen too many engineering teams build robust systems with terrible UX, and design agencies create beautiful concepts that can't be coded. We bridge that gap by elevating design to the highest priority, then architecting the code necessary to bring it to life flawlessly.
                            </p>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                By maintaining a specialized team of design-obsessed experts, we build scalable platforms that don't compromise on speed, stability, or aesthetic superiority.
                            </p>
                        </div>

                        <div className="md:col-span-4 space-y-6">
                            <div className="bg-surface border border-white/10 p-6">
                                <div className="font-mono text-[10px] text-primary uppercase border-b border-primary/20 pb-4 mb-6">
                                    Operational_Tenets
                                </div>
                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <Cpu className="text-primary shrink-0" size={16} />
                                        <div>
                                            <div className="text-white font-bold text-sm mb-1">Design is Paramount</div>
                                            <div className="text-slate-500 text-xs">Engineering exists to serve the aesthetic and interactive vision, never to compromise it.</div>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <Globe className="text-primary shrink-0" size={16} />
                                        <div>
                                            <div className="text-white font-bold text-sm mb-1">Global Standards</div>
                                            <div className="text-slate-500 text-xs">Architecting systems robust enough for global deployment.</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-3">
                            <Clock className="text-primary" /> SYSTEM_TIMELINE
                        </h2>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/10">
                            {timeline.map((item, index) => (
                                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group md:w-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/50 bg-background-dark/80 text-primary font-bold z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                                        <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                                    </div>

                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-white/10 p-6 group-hover:border-primary/30 transition-colors">
                                        <div className="font-mono text-primary text-[10px] mb-2">{item.year}</div>
                                        <h3 className="text-white font-bold mb-2">{item.title}</h3>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="grid md:grid-cols-12 gap-16 pt-16 border-t border-white/5">
                        <div className="md:col-span-4 space-y-6">
                            <h2 className="text-4xl font-bold text-white tracking-tighter">
                                The Team
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                We're a compact team of specialized operators with a strong belief that true innovation is never done in isolation, but in the open, with various disciplines coming together to architect unique experiences.
                            </p>
                        </div>

                        <div className="md:col-span-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-16">
                                {[
                                    { name: "Raj", role: "Co-founder", seed: "Raj" },
                                    { name: "Ashwin", role: "Co-founder", seed: "Ashwin" },
                                    { name: "Nishita", role: "Designer", seed: "Nishi9" },
                                    { name: "Priya", role: "Sales Expert", seed: "Priya12" },
                                    { name: "Somesh", role: "Product and Customer", seed: "Sam14" },
                                    { name: "Priyanka", role: "Designer", seed: "Priyanka" }
                                ].map((member, idx) => (
                                    <div key={idx} className="flex flex-col items-center group cursor-default">
                                        {/* Avatar Container */}
                                        <div className="w-24 h-24 md:w-32 md:h-32 mb-6 bg-zinc-200 rounded-full overflow-hidden border border-white/10 group-hover:border-primary transition-colors flex items-center justify-center">
                                            <img
                                                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member.seed}&backgroundColor=transparent`}
                                                alt={member.name}
                                                className="w-[120%] h-[120%] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                        {/* Info */}
                                        <h3 className="font-mono text-lg text-white font-bold tracking-widest uppercase mb-1">{member.name}</h3>
                                        <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider text-center">{member.role}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
