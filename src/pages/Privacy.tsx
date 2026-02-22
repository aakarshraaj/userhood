import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background-dark pt-32 pb-48 selection:bg-primary selection:text-black">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-[0.2em] hover:gap-4 transition-all"
          >
            <ArrowLeft size={14} /> Back_to_Home
          </Link>
        </motion.div>

        <header className="mb-24">
          <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.3em]">[ LEGAL_DOCUMENT // 0x01 ]</div>
          <h1 className="text-6xl font-black text-white tracking-tighter">Privacy Policy.</h1>
          <p className="text-white/40 font-mono text-[10px] mt-4 uppercase tracking-widest">Last Updated: February 2026</p>
        </header>

        <div className="space-y-12 text-slate-400 leading-relaxed font-light">
          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">01. Data Collection</h2>
            <p>
              We collect minimal data necessary to provide our services. This includes information you provide via our contact forms (name, email, project details) and technical data collected automatically (IP address, browser type) to ensure system security and performance.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">02. Data Usage</h2>
            <p>
              Your data is used exclusively for communication regarding your inquiries and the execution of our strategic interventions. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">03. Security Protocols</h2>
            <p>
              We implement industry-standard security measures to maintain the safety of your personal information. All data transmitted via our systems is encrypted and stored in secure environments.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">04. Cookies</h2>
            <p>
              Our platform uses essential cookies to maintain session state and improve user experience. We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">05. Contact</h2>
            <p>
              For any questions regarding this policy, please contact us via the established communication channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
