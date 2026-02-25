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
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setResult("Error: Missing VITE_WEB3FORMS_ACCESS_KEY in .env");
      setIsSubmitting(false);
      return;
    }

    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        trackEvent('submit_contact_form', 'lead_generation', formData.get("scope")?.toString() || 'unknown');
        setResult("Transmission successful. We will respond shortly.");
        const form = e.target as HTMLFormElement;
        form.reset();
        setTimeout(() => {
          onClose();
          setResult("");
        }, 3000);
      } else {
        setResult(`Transmission failed: ${data.message}`);
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

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-[0.3em]">
                  <span className="bg-surface px-4 text-white/20 font-mono">Or_Direct_Access</span>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href={`https://wa.me/917498908702?text=${encodeURIComponent("Hey Userhood! I came across your work and want to chat about a potential collaboration.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] py-3 transition-all group"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Connect_via_WhatsApp</span>
              </motion.a>
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
