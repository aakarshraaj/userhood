import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../utils/seo";

export default function Terms() {
  useSEO({
    title: "Terms of Service | Userhood",
    description: "The terms that apply when you use the Userhood website, and how they relate to separate client engagement agreements.",
    canonical: "https://www.userhood.in/terms",
  });
  return (
    <main className="min-h-screen bg-background-dark pt-32 pb-48 selection:bg-primary selection:text-black">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all"
          >
            <ArrowLeft size={14} /> Back_to_Home
          </Link>
        </motion.div>

        <header className="mb-24">
          <div className="font-mono text-xs text-primary mb-4 uppercase tracking-[0.3em]">[ LEGAL_DOCUMENT // 0x02 ]</div>
          <h1 className="text-6xl font-black text-white tracking-tighter">Terms of Service.</h1>
          <p className="text-white/50 font-mono text-xs mt-4 uppercase tracking-widest">Last updated: 5 September 2026</p>
        </header>

        <div className="space-y-12 text-slate-300 leading-relaxed font-light">
          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">01. These are website terms</h2>
            <p>
              These terms govern your use of the Userhood website. They do not create a client relationship, statement of work, warranty, service level, or obligation to accept a project. Any paid engagement is governed by a separate written proposal, statement of work, or services agreement signed by the relevant parties. If that agreement conflicts with these website terms, the signed agreement controls the engagement.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">02. Permitted use</h2>
            <p>
              You may browse this website and share links to its public pages for legitimate personal or business evaluation. You may not attempt to disrupt the site, bypass security controls, scrape it in a way that harms availability, misrepresent Userhood, or reuse the site’s protected content and visual identity as your own.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">03. Content and intellectual property</h2>
            <p>
              Unless a page says otherwise, the website’s copy, original graphics, design, and code presentation are owned by Userhood or used with permission. Client and third-party names, trademarks, and product marks belong to their respective owners. Case-study pages describe team experience within the evidence boundaries stated on those pages and do not imply endorsement by the named organisation.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">04. Accuracy and availability</h2>
            <p>
              We aim to keep public information accurate and the website available, but content may become outdated and availability may be interrupted. Website content is general information, not legal, financial, security, or other professional advice. Commercial scope, timing, pricing, ownership, confidentiality, acceptance criteria, and liability are established only in a signed engagement agreement.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">05. External services</h2>
            <p>
              The website links to services operated by other organisations, including WhatsApp, LinkedIn, Instagram, Google Forms, and service-provider policy pages. Their terms and privacy practices govern your use of those services. A link does not make Userhood responsible for their availability, content, or conduct.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">06. Liability for website use</h2>
            <p>
              To the extent permitted by applicable law, Userhood is not responsible for indirect or consequential loss arising solely from use of, or inability to use, this public website. Nothing here limits liability that cannot legally be limited. Liability arising from client services is handled by the signed agreement for those services.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">07. Law, changes, and contact</h2>
            <div className="space-y-4">
              <p>These website terms are governed by applicable laws of India. A signed client agreement may specify a different or more precise governing-law and dispute-resolution clause for that engagement.</p>
              <p>We may update these terms when the website or our practices change. The date above identifies the current version. Questions can be sent to <a className="text-white underline underline-offset-4 hover:text-primary" href="mailto:hello@userhood.in">hello@userhood.in</a>.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
