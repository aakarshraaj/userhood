import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";
import FooterPlayground from "./FooterPlayground";
import UserhoodLogo from "./UserhoodLogo";

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[#050505]" role="contentinfo">
      <FooterPlayground />

      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 px-5 py-14 font-mono text-xs uppercase tracking-[0.1em] text-white/75 md:flex-row md:gap-12 md:px-6 md:py-16">
        <div className="space-y-3 md:space-y-4">
          <Link to="/" className="hover:opacity-80 transition-opacity inline-block" aria-label="Userhood homepage">
            <UserhoodLogo className="w-20 text-white/70 md:w-[100px]" />
          </Link>
          <p className="max-w-[15rem] font-sans text-sm normal-case leading-relaxed tracking-normal text-white/55">Dreaming as a Service.</p>
          <div className="text-xs md:text-xs break-words">© 2026 USERHOOD. ALL_RIGHTS_RESERVED.</div>
        </div>

        <div className="grid w-full min-w-0 grid-cols-2 gap-8 sm:gap-12 md:w-auto md:grid-cols-3 md:gap-16">
          <div className="flex flex-col gap-2">
            <div className="text-white mb-4">Navigation</div>
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/work" className="hover:text-primary transition-colors">Work</Link>
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/careers" className="hover:text-primary transition-colors">Careers</Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-white/70 mb-4">Contact</div>
            <a href="mailto:hello@userhood.in" className="break-all normal-case transition-colors hover:text-primary">hello@userhood.in</a>
            <a href={`https://wa.me/917498908702?text=${encodeURIComponent("Hey Userhood! I came across your work and want to chat about a potential collaboration.")}`} onClick={() => trackAnalyticsEvent("whatsapp_click", { source: "footer" })} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp</a>
            <a href="https://in.linkedin.com/company/userhood" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://instagram.com/userhood.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-white mb-4">Legal</div>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
