import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { jobs } from "../data/jobs";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

export default function JobDetail() {
    const { slug } = useParams<{ slug: string }>();
    const job = jobs.find(j => j.slug === slug);

    useSEO(job ? getPageSEO("salesIntern") : {
        title: "Job Not Found | Userhood",
        description: "This job listing is no longer available.",
        canonical: getPageSEO("careers").canonical,
        robots: "noindex, nofollow",
        ogImage: null,
        ogType: "article",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!job) {
        return (
            <main data-page-id="jobNotFound" className="min-h-screen bg-background-dark text-white pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-medium mb-6">Position not found</h1>
                <p className="text-white/75 mb-8 max-w-md">The job you are looking for may have been filled or the link is incorrect.</p>
                <Link to="/careers" className="text-primary hover:text-white transition-colors border border-primary/20 hover:border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Careers
                </Link>
            </main>
        );
    }

    return (
        <main data-page-id="salesIntern" className="min-h-screen bg-background-dark text-white pt-24 pb-32 relative">
            <div className="absolute inset-0 scanline opacity-20" />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-24 relative z-10">
                <div className="mb-12">
                    <Link to="/careers" className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors font-mono text-xs tracking-[0.14em] uppercase mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to open positions
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    <div className="lg:col-span-8">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="font-mono text-xs uppercase text-primary bg-primary/10 px-3 py-1 tracking-widest border border-primary/20">
                                {job.department}
                            </span>
                            <span className="font-mono text-xs uppercase text-white/70 tracking-[0.14em]">
                                {job.type}
                            </span>
                            <span className="font-mono text-[1px] text-white/30">•</span>
                            <span className="font-mono text-xs uppercase text-white/70 tracking-[0.14em]">
                                {job.location}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-8">
                            {job.title}
                        </h1>

                        <div className="grid gap-5 text-white/80">
                            <section className="content-card p-6 md:p-8">
                                <h2 className="text-xl font-medium text-white mb-6 font-mono tracking-tighter uppercase">01 // The_Role</h2>
                                <p className="text-lg leading-relaxed text-white/70">
                                    {job.description}
                                </p>
                            </section>

                            <section className="content-card p-6 md:p-8">
                                <h2 className="text-xl font-medium text-white mb-6 font-mono tracking-tighter uppercase">02 // Key_Responsibilities</h2>
                                <ul className="space-y-4">
                                    {job.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex items-start gap-4 text-white/70">
                                            <span className="text-primary mt-1 flex-shrink-0">›</span>
                                            <span className="text-lg leading-relaxed">{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="content-card p-6 md:p-8">
                                <h2 className="text-xl font-medium text-white mb-6 font-mono tracking-tighter uppercase">03 // What_We_Look_For</h2>
                                <ul className="space-y-4">
                                    {job.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-4 text-white/70">
                                            <span className="text-primary mt-1 flex-shrink-0">›</span>
                                            <span className="text-lg leading-relaxed">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {job.benefits && job.benefits.length > 0 && (
                                <section className="content-card p-6 md:p-8">
                                    <h2 className="text-xl font-medium text-white mb-6 font-mono tracking-tighter uppercase">04 // Perks_&_Benefits</h2>
                                    <ul className="space-y-4">
                                        {job.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-4 text-white/70">
                                                <span className="text-primary mt-1 flex-shrink-0">›</span>
                                                <span className="text-lg leading-relaxed">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="content-card sticky top-32 p-8 backdrop-blur-sm">
                            <h2 className="text-2xl font-medium mb-4">Ready to build?</h2>
                            <p className="text-white/70 mb-8 leading-relaxed">
                                We're looking for ambitious builders who want to make a real impact. If you think you're a fit, we want to hear from you.
                            </p>

                            <a
                                href={job.googleFormLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 bg-primary text-background-dark py-4 px-6 hover:bg-white transition-all text-base font-bold group"
                            >
                                Apply for this role
                                <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </a>

                            <div className="mt-6 text-center text-white/75 text-sm">
                                Takes about 5 minutes to apply.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
