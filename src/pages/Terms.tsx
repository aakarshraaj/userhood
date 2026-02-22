import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Terms() {
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
          <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.3em]">[ LEGAL_DOCUMENT // 0x02 ]</div>
          <h1 className="text-6xl font-black text-white tracking-tighter">Terms of Service.</h1>
          <p className="text-white/40 font-mono text-[10px] mt-4 uppercase tracking-widest">Last Updated: February 2026</p>
        </header>

        <div className="space-y-12 text-slate-400 leading-relaxed font-light">
          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">01. Engagement Terms</h2>
            <p>
              By accessing this platform or engaging our services, you agree to be bound by these Terms of Service. Our work is governed by specific Master Service Agreements (MSA) and Statements of Work (SOW) tailored to each strategic intervention.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">02. Intellectual Property</h2>
            <p>
              Unless otherwise specified in a signed agreement, all methodologies, frameworks, and code patterns developed by Userhood Systems remain our intellectual property. Client-specific deliverables are transferred upon full payment as defined in the SOW.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">03. Confidentiality</h2>
            <p>
              We maintain strict confidentiality regarding all client data and project details. We expect the same level of non-disclosure regarding our internal processes and proprietary systems.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">04. Limitation of Liability</h2>
            <p>
              Userhood Systems shall not be liable for any indirect, incidental, or consequential damages arising from the use of our digital products or strategic consulting services beyond the fees paid for the specific engagement.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">05. Governing Law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction in which Userhood Systems is registered, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
