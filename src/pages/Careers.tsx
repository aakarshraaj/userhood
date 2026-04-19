import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase } from "lucide-react";
import { jobs } from "../data/jobs";
import { useSEO } from "../utils/seo";

export default function Careers() {
    useSEO({
        title: "Careers | Userhood",
        description: "Join Userhood and help us build world-class digital products and AI solutions. We are looking for top-tier talent.",
        canonical: "https://userhood.in/careers",
    });

    return (
        <div className="min-h-screen bg-background-dark text-white pt-24 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl"
                >
                    <div className="font-mono text-[10px] text-primary tracking-widest uppercase mb-6 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-primary"></span>
                        open_positions
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-8">
                        Build the future <br />
                        <span className="text-white/40">with Userhood.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 mb-16 max-w-2xl leading-relaxed">
                        We are always on the lookout for exceptional talent. If you have a passion for design, technology, and building products that matter, we'd love to hear from you.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-6 max-w-5xl">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                to={`/careers/${job.slug}`}
                                className="group block border border-white/10 bg-white/[0.02] p-6 md:p-8 hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none" />

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="font-mono text-[10px] uppercase text-primary bg-primary/10 px-3 py-1 tracking-widest inline-block border border-primary/20">
                                                {job.department}
                                            </span>
                                            <span className="font-mono text-[10px] uppercase text-white/50 tracking-widest inline-block">
                                                {job.location} • {job.type}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-medium group-hover:text-primary transition-colors flex items-center gap-3">
                                            {job.title}
                                        </h2>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark group-hover:border-primary transition-all duration-300">
                                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {jobs.length === 0 && (
                        <div className="py-12 border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center">
                            <Briefcase className="w-12 h-12 text-white/20 mb-4" />
                            <h3 className="text-xl font-medium mb-2">No open positions currently</h3>
                            <p className="text-white/50 max-w-md">We aren't actively hiring for any specific roles right now, but feel free to reach out with your portfolio anyway.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
