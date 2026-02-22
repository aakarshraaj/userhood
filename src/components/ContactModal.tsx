import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "../utils/analytics";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending transmission...");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resultData = await response.json();

      if (resultData.success) {
        trackEvent('submit_contact_form', 'lead_generation', data.scope?.toString() || 'unknown');
        setResult("Transmission successful. We will respond shortly.");
        const form = e.target as HTMLFormElement;
        form.reset();
        setTimeout(() => {
          onClose();
          setResult("");
        }, 3000);
      } else {
        setResult(`Transmission failed: ${resultData.message}`);
      }
    } catch (error) {
      setResult("A network error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-white/10 border-b-0 sm:border-b p-5 sm:p-8 md:p-12 overflow-x-hidden rounded-t-2xl sm:rounded-none"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-full bg-primary"
              />
            </div>

            <button
              onClick={onClose}
              aria-label="Close Contact Modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/40 hover:text-white transition-colors p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X size={22} className="sm:w-6 sm:h-6" />
            </button>

            <div className="font-mono text-[10px] text-primary mb-6 sm:mb-8 uppercase tracking-widest">
              [ ESTABLISH_CONNECTION_PROTOCOL ]
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tighter pr-10">
              Initialize collaboration.
            </h2>
            <p className="text-sm text-slate-400 mb-6 sm:mb-8 pr-8">
              What happens next: we reply within 24–48 hours and suggest a short call if it's a fit.
            </p>

            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-[10px] text-white/40 uppercase">Full_Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors font-mono text-sm"
                    placeholder="IDENTIFY_YOURSELF"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-[10px] text-white/40 uppercase">Email_Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors font-mono text-sm"
                    placeholder="COMM_CHANNEL"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="scope" className="font-mono text-[10px] text-white/40 uppercase">Project_Scope</label>
                <div className="relative">
                  <select id="scope" name="scope" className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors font-mono text-sm appearance-none cursor-pointer">
                    <option className="bg-surface">BRAND_IDENTITY_SYSTEMS</option>
                    <option className="bg-surface">PRODUCT_STRATEGY_UX</option>
                    <option className="bg-surface">TECHNICAL_ARCHITECTURE</option>
                    <option className="bg-surface">FULL_STACK_INTERVENTION</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-white/40">
                    <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-[10px] text-white/40 uppercase">Message_Payload</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors font-mono text-sm resize-none"
                  placeholder="DESCRIBE_THE_MISSION"
                ></textarea>
              </div>

              {result && (
                <div className={`font-mono text-[12px] p-3 border ${result.includes('successful') ? 'border-green-500/50 text-green-400 bg-green-500/10' : result.includes('Sending') ? 'border-primary/50 text-primary bg-primary/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}>
                  {result}
                </div>
              )}

              <p className="text-[11px] text-white/40 leading-snug">
                We don't share your details. We use them only to reply and discuss your project.
              </p>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-black font-mono font-bold py-4 min-h-[48px] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "TRANSMITTING..." : "EXECUTE_TRANSMISSION"}
              </motion.button>
            </form>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-2 font-mono text-[8px] text-white/20 uppercase">
              <span>Encryption: AES-256</span>
              <span>Status: {isSubmitting ? "Processing" : "Ready_to_send"}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
