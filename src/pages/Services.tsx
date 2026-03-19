import { motion } from "motion/react";
import { Cpu, Code2, BrainCircuit, Megaphone, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useSEO } from "../utils/seo";

const services = [
    {
        id: "SVC_01",
        icon: <Cpu className="w-8 h-8" />,
        category: "PRODUCT_DESIGN",
        title: "Product Design",
        description:
            "From zero-to-one discovery to pixel-perfect component systems. We design interfaces that convert, products that retain, and experiences that define categories.",
        deliverables: [
            "UX Research & User Journey Mapping",
            "Information Architecture",
            "High-Fidelity UI Design & Prototypes",
            "Design Systems & Component Libraries",
            "Usability Testing & Iteration",
        ],
    },
    {
        id: "SVC_02",
        icon: <Code2 className="w-8 h-8" />,
        category: "SOFTWARE_ENGINEERING",
        title: "Software Development",
        description:
            "Hardened full-stack systems built for velocity. We architect and ship production-grade code — from API design to frontend interactions — with zero bloat.",
        deliverables: [
            "Full-Stack Web & Mobile Engineering",
            "API Architecture & Backend Systems",
            "Performance Optimization & Scalability",
            "DevOps, CI/CD & Cloud Infrastructure",
            "Technical Debt Remediation",
        ],
    },
    {
        id: "SVC_03",
        icon: <BrainCircuit className="w-8 h-8" />,
        category: "AI_INTEGRATION",
        title: "AI & Intelligent Systems",
        description:
            "LLMs, agents, and custom AI pipelines embedded directly into your product layer. Not bolted-on features — native intelligence that changes what your product can do.",
        deliverables: [
            "LLM Integration & Fine-tuning",
            "AI-Powered Feature Engineering",
            "Custom Chatbots & Conversational Agents",
            "Intelligent Automation & Workflow AI",
            "AI Strategy & Capability Roadmapping",
        ],
    },
    {
        id: "SVC_04",
        icon: <Megaphone className="w-8 h-8" />,
        category: "BRAND_&_MARKETING",
        title: "Brand & Marketing",
        description:
            "Brand identity systems that hold from a favicon to a billboard. Positioning strategy, visual language, and go-to-market assets built for operators who move fast.",
        deliverables: [
            "Brand Identity & Visual Design",
            "Positioning & Messaging Strategy",
            "Marketing Site & Landing Page Design",
            "Content Strategy & Creative Direction",
            "Go-To-Market Asset Production",
        ],
    },
];

const faqs = [
    {
        q: "What types of clients do you work with?",
        a: "Funded startups from pre-seed to Series B, and enterprise teams modernizing their product stack. We're selective — we work best with operators who care deeply about craft and aren't afraid to move fast.",
    },
    {
        q: "Do you work on AI-native products?",
        a: "Yes. We architect and build AI-first products — from LLM integrations and custom fine-tuning to intelligent workflow automation and agentic systems. AI is not an add-on for us; it's a core engineering discipline.",
    },
    {
        q: "Can you redesign an existing product?",
        a: "Absolutely. Our Architecture Intervention model is built exactly for this — a time-boxed deep-dive into your existing product to identify fragmentation, technical debt, and UX friction, followed by a restructuring roadmap.",
    },
    {
        q: "How quickly can you start?",
        a: "We maintain limited bandwidth intentionally. Reach out via the contact form or WhatsApp — if there's a fit, we typically onboard within 1–2 weeks.",
    },
    {
        q: "Do you offer brand and marketing as a standalone service?",
        a: "Yes. Brand identity, positioning strategy, and go-to-market assets are offered independently. However, our most impactful engagements combine brand with product and engineering.",
    },
];

const serviceLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Userhood Services",
    itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            provider: {
                "@type": "Organization",
                name: "Userhood",
                url: "https://userhood.in",
            },
        },
    })),
};

const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
        },
    })),
};

export default function Services() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useSEO({
        title: "Services — Product Design, AI Development & Branding | Userhood",
        description:
            "Userhood's full range of services: product UX design, full-stack software development, AI integration & intelligent systems, and brand identity. Built for ambitious operators.",
        canonical: "https://userhood.in/services",
        jsonLd: [serviceLd, faqLd] as any,
    });

    return (
        <div className="min-h-screen bg-background-dark pt-20 sm:pt-28 pb-20 sm:pb-32 selection:bg-primary selection:text-black">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8">

                {/* Hero */}
                <header className="mb-20 sm:mb-32 md:mb-40 border-b border-white/5 pb-16 sm:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-[10px] text-primary mb-6 uppercase tracking-[0.3em] flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 bg-primary shrink-0 animate-pulse" />
                        [ SERVICE_CATALOGUE // CAPABILITY_INDEX ]
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-black text-white leading-[0.85] tracking-tighter mb-8"
                    >
                        What We<br /><span className="text-primary">Build.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light leading-snug max-w-2xl border-l-2 border-primary/20 pl-6"
                    >
                        Four disciplines. One studio. Zero handoff overhead between design, engineering, AI, and brand.
                    </motion.p>
                </header>

                {/* Services Grid */}
                <section className="mb-24 sm:mb-40" aria-label="Services">
                    <div className="grid gap-px bg-white/5 border border-white/5 lg:grid-cols-2">
                        {services.map((svc, index) => (
                            <motion.article
                                key={svc.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-background-dark p-8 sm:p-10 lg:p-14 flex flex-col group hover:bg-white/[0.02] transition-colors duration-500 relative overflow-hidden"
                                aria-label={svc.title}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="text-primary/40 group-hover:text-primary transition-colors duration-500">
                                        {svc.icon}
                                    </div>
                                    <span className="font-mono text-[9px] text-white/20 tracking-widest">{svc.id}</span>
                                </div>

                                <div className="relative z-10 flex-grow">
                                    <div className="font-mono text-[10px] text-primary mb-3 tracking-widest uppercase">{svc.category}</div>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter mb-5 group-hover:text-primary transition-colors duration-500">
                                        {svc.title}
                                    </h2>
                                    <p className="text-slate-400 leading-relaxed mb-8 text-base">{svc.description}</p>

                                    <ul className="space-y-3" aria-label={`${svc.title} deliverables`}>
                                        {svc.deliverables.map((d, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <ChevronRight className="w-4 h-4 text-primary/40 group-hover:text-primary shrink-0 mt-0.5 transition-colors duration-500" />
                                                <span className="text-sm text-slate-300">{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-24 sm:mb-40 max-w-3xl" aria-label="Frequently Asked Questions">
                    <div className="font-mono text-[10px] text-primary mb-8 uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                        [ FAQ // COMMON_QUERIES ]
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-12 sm:mb-16">
                        Questions<br />Answered.
                    </h2>

                    <div className="space-y-px border border-white/5 divide-y divide-white/5">
                        {faqs.map((faq, i) => (
                            <motion.details
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-background-dark open:bg-white/[0.02] transition-colors"
                            >
                                <summary className="flex items-center justify-between gap-4 p-6 sm:p-8 cursor-pointer list-none font-bold text-white text-base sm:text-lg tracking-tight hover:text-primary transition-colors">
                                    {faq.q}
                                    <ArrowRight className="w-4 h-4 shrink-0 text-primary/40 group-open:rotate-90 transition-transform duration-300" />
                                </summary>
                                <p className="px-6 sm:px-8 pb-6 sm:pb-8 text-slate-400 leading-relaxed text-sm sm:text-base">
                                    {faq.a}
                                </p>
                            </motion.details>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="border border-white/10 p-8 sm:p-12 lg:p-16 text-center bg-white/[0.01]">
                    <div className="font-mono text-[10px] text-primary mb-6 uppercase tracking-widest">[ READY_TO_DEPLOY ]</div>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">
                        Let's Build<br />Something Real.
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg font-light max-w-xl mx-auto mb-10">
                        We run lean on purpose. You work directly with the architects — no account managers, no bloat.
                    </p>
                    <a
                        href="/#contact"
                        className="inline-flex items-center gap-3 bg-primary text-black font-mono font-bold text-sm px-10 py-5 hover:bg-white transition-colors"
                    >
                        ESTABLISH_CONTACT <ArrowRight className="w-4 h-4" />
                    </a>
                </section>

            </div>
        </div>
    );
}
