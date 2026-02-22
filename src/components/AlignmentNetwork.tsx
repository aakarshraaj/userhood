import { useState } from "react";
import { motion } from "motion/react";
import { PenTool, Target, Terminal, Activity } from "lucide-react";

export default function AlignmentNetwork() {
    const [activeNode, setActiveNode] = useState<"brand" | "product" | "engineering" | null>(null);

    const nodes = {
        brand: {
            id: "brand",
            title: "BRAND_IDENTITY",
            icon: <PenTool size={20} />,
            position: "top-0 left-1/2 -translate-x-1/2",
            metrics: [
                { label: "DESIGN_SYSTEM", value: "SYNCED" },
                { label: "TYPOGRAPHY", value: "JETBRAINS_MONO" },
                { label: "COLOR_SPACE", value: "P3_GAMUT" }
            ]
        },
        engineering: {
            id: "engineering",
            title: "ENGINEERING_CORE",
            icon: <Terminal size={20} />,
            position: "bottom-0 left-0",
            metrics: [
                { label: "ARCHITECTURE", value: "REACT_19" },
                { label: "BUILD_TOOL", value: "VITE_6" },
                { label: "LATENCY", value: "< 40ms" }
            ]
        },
        product: {
            id: "product",
            title: "PRODUCT_LOGIC",
            icon: <Target size={20} />,
            position: "bottom-0 right-0",
            metrics: [
                { label: "USER_FLOWS", value: "DETERMINISTIC" },
                { label: "CONVERSION_RATE", value: "OPTIMIZED" },
                { label: "ENGAGEMENT", value: "MAXIMIZED" }
            ]
        }
    };

    return (
        <div className="relative w-full max-w-lg aspect-square mx-auto mt-12 md:mt-0 font-mono">
            {/* Background Grid */}
            <div className="absolute inset-0 tech-grid opacity-20 rounded-full mix-blend-screen" />
            <div className="absolute inset-4 border border-white/5 rounded-full" />
            <div className="absolute inset-12 border border-white/5 border-dashed rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Engineering to Brand */}
                <motion.line
                    x1="20" y1="80" x2="50" y2="20"
                    stroke={activeNode === 'brand' || activeNode === 'engineering' ? '#00f5ff' : 'rgba(255,255,255,0.1)'}
                    strokeWidth="0.5"
                    className="transition-colors duration-500"
                />
                {/* Product to Brand */}
                <motion.line
                    x1="80" y1="80" x2="50" y2="20"
                    stroke={activeNode === 'brand' || activeNode === 'product' ? '#00f5ff' : 'rgba(255,255,255,0.1)'}
                    strokeWidth="0.5"
                    className="transition-colors duration-500"
                />
                {/* Engineering to Product */}
                <motion.line
                    x1="20" y1="80" x2="80" y2="80"
                    stroke={activeNode === 'engineering' || activeNode === 'product' ? '#00f5ff' : 'rgba(255,255,255,0.1)'}
                    strokeWidth="0.5"
                    className="transition-colors duration-500"
                />

                {/* Animated Data Packets */}
                <circle r="1" fill="#00f5ff" className="animate-pulse">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 20 80 L 50 20" />
                </circle>
                <circle r="1" fill="#00f5ff" className="animate-pulse">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 80 80 L 50 20" />
                </circle>
                <circle r="1" fill="#00f5ff" className="animate-pulse">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 20 80 L 80 80" />
                </circle>
            </svg>

            {/* Nodes */}
            {Object.values(nodes).map((node) => (
                <div
                    key={node.id}
                    className={`absolute ${node.position} w-32 h-32 -mx-16 -my-16 flex items-center justify-center z-20 cursor-crosshair group`}
                    onMouseEnter={() => setActiveNode(node.id as any)}
                    onMouseLeave={() => setActiveNode(null)}
                >
                    {/* Node Core */}
                    <div className={`relative flex items-center justify-center w-12 h-12 bg-background-dark border transition-all duration-300 ${activeNode === node.id ? 'border-primary shadow-[0_0_20px_rgba(0,245,255,0.3)]' : 'border-white/20 group-hover:border-primary/50'}`}>
                        <div className={`text-${activeNode === node.id ? 'primary' : 'white/40'} transition-colors duration-300`}>
                            {node.icon}
                        </div>

                        {/* Spinning bracket ornament */}
                        {activeNode === node.id && (
                            <>
                                <div className="absolute -inset-2 border border-primary/30 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }} />
                                <div className="absolute -inset-4 border border-primary/10 border-b-transparent rounded-full animate-spin-reverse" style={{ animationDuration: '4s' }} />
                            </>
                        )}
                    </div>

                    {/* Label */}
                    <div className="absolute top-full mt-4 text-center">
                        <div className={`text-[10px] tracking-widest font-bold transition-colors duration-300 ${activeNode === node.id ? 'text-primary' : 'text-white/60'}`}>
                            {node.title}
                        </div>
                    </div>
                </div>
            ))}

            {/* Center Hub / Data Screen */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={false}
                    animate={{ opacity: activeNode ? 1 : 0.3, scale: activeNode ? 1 : 0.95 }}
                    className={`w-full max-w-[180px] bg-background-dark/80 backdrop-blur-md border ${activeNode ? 'border-primary/40' : 'border-white/10'} p-4 flex flex-col items-center justify-center transition-colors duration-500`}
                >
                    {activeNode ? (
                        <div className="w-full space-y-3">
                            <div className="text-primary text-[10px] flex items-center gap-2 border-b border-primary/20 pb-2 mb-2">
                                <Activity size={10} className="animate-pulse" />
                                {nodes[activeNode].title}_METRICS
                            </div>
                            {nodes[activeNode].metrics.map((metric, i) => (
                                <div key={i} className="flex justify-between items-center text-[9px] w-full">
                                    <span className="text-white/40">{metric.label}</span>
                                    <span className="text-white font-bold text-right">{metric.value}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-[10px] text-white/20 text-center uppercase tracking-widest">
                            Awaiting_Query<br />
                            Hover_Nodes
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
