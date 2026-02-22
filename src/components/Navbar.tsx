import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background-dark/90 backdrop-blur-xl safe-area-inset-top">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between font-mono text-[10px] tracking-tighter uppercase relative z-50">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link to="/" className="hover:opacity-80 transition-opacity shrink-0 flex items-center" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>
          <span className="text-white/40 hidden sm:inline truncate">[ ARCH_SYST_v.01 ]</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-12">
          <a href="/#case-studies" className="hover:text-primary transition-colors">// CASE_STUDIES</a>
          <a href="/#philosophy" className="hover:text-primary transition-colors">// PHILOSOPHY</a>
          <Link to="/about" className="hover:text-primary transition-colors">// THE_TEAM</Link>
          <a href="/#outcomes" className="hover:text-primary transition-colors">// OUTCOMES</a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContactClick}
            className="text-primary border border-primary/20 px-4 py-1.5"
          >
            ESTABLISH_CONTACT
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 sm:top-16 left-0 w-full bg-background-dark border-b border-white/5 p-5 sm:p-6 flex flex-col gap-5 sm:gap-6 md:hidden font-mono text-[10px] tracking-tighter uppercase z-40"
          >
            <a href="/#case-studies" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">// CASE_STUDIES</a>
            <a href="/#philosophy" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">// PHILOSOPHY</a>
            <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">// THE_TEAM</Link>
            <a href="/#outcomes" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">// OUTCOMES</a>
            <button
              onClick={() => {
                setIsOpen(false);
                onContactClick();
              }}
              className="text-primary border border-primary/20 px-4 py-3 w-full text-left bg-primary/5"
            >
              ESTABLISH_CONTACT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Logo() {
  return (
    <svg className="text-white w-[100px] sm:w-[120px] h-[19px] sm:h-[23px]" fill="none" height="23" viewBox="0 0 360 69" width="120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path clipRule="evenodd" d="M31.1441 13.773L31.1441 46.8461L9.83001 46.8461L9.83001 0.000344416L0.0183765 0.000343559L-0.00025177 56.6602L40.9561 56.6602L40.9561 13.773L31.1441 13.773Z" fill="currentColor" fillRule="evenodd"></path>
      <path clipRule="evenodd" d="M316.957 22.3862L350.03 22.3862L350.03 43.7003L316.957 43.7003L316.957 53.5119L359.844 53.5305L359.844 12.5742L316.957 12.5742L316.957 22.3862Z" fill="currentColor" fillRule="evenodd"></path>
      <path clipRule="evenodd" d="M252.775 10.0586C240.391 10.0586 229.927 18.6526 229.927 32.1868C229.927 45.7208 240.385 54.5842 252.775 54.5842C265.166 54.5842 275.717 45.7146 275.717 32.1868C275.717 18.6588 265.157 10.0586 252.775 10.0586ZM252.775 45.4806C245.643 45.4806 239.668 40.1594 239.668 32.1868C239.668 24.2141 245.637 19.0731 252.775 19.0731C259.914 19.0731 265.974 24.3115 265.974 32.1868C265.974 40.0619 259.912 45.4806 252.775 45.4806Z" fill="currentColor" fillRule="evenodd"></path>
      <path clipRule="evenodd" d="M288.864 10.0586C276.48 10.0586 266.016 18.6526 266.016 32.1868C266.016 45.7208 276.474 54.5842 288.864 54.5842C301.255 54.5842 311.806 45.7146 311.806 32.1868C311.806 18.6588 301.246 10.0586 288.864 10.0586ZM288.864 45.4806C281.732 45.4806 275.757 40.1594 275.757 32.1868C275.757 24.2141 281.726 19.0731 288.864 19.0731C296.003 19.0731 302.062 24.3115 302.062 32.1868C302.062 40.0619 296.001 45.4806 288.864 45.4806Z" fill="currentColor" fillRule="evenodd"></path>
      <path d="M177.029 11.6094V39.5415H159.884L177.029 55.0594H162.583L147.545 42.0799V55.0594H138.234V11.6094H177.029ZM147.545 30.2308H167.718V20.9201H147.545V30.2308Z" fill="currentColor"></path>
      <path d="M194.237 55.0594H184.927L184.927 11.6094L194.237 11.6094L194.237 55.0594Z" fill="currentColor"></path>
      <path d="M225.273 68.8348H215.963L215.962 11.6094L225.273 11.6094L225.273 68.8348Z" fill="currentColor"></path>
      <path d="M184.927 42.6451V33.3344H215.962V42.6451H184.927Z" fill="currentColor"></path>
      <path d="M132.028 11.6094V20.9201H105.648V28.679H125.821V37.9897H105.648V45.7487H132.028V55.0594H96.3369V11.6094H132.028Z" fill="currentColor"></path>
      <path d="M58.9611 34.8862H49.6504L49.6504 11.6094L58.9611 11.6094L58.9611 34.8862Z" fill="currentColor"></path>
      <path d="M88.4451 55.0594H79.1343V31.7826H88.4451V55.0594Z" fill="currentColor"></path>
      <path d="M51.2022 20.9201V11.6094H88.4451V20.9201H51.2022Z" fill="currentColor"></path>
      <path d="M57.4093 34.8862V25.5755H88.4451V34.8862H57.4093Z" fill="currentColor"></path>
      <path d="M49.6504 55.0594V45.7487H83.7897V55.0594H49.6504Z" fill="currentColor"></path>
    </svg>
  );
}
