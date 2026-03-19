import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const SCROLL_THRESHOLD = 400;

interface StickyContactCTAProps {
  onContactClick: () => void;
}

export default function StickyContactCTA({ onContactClick }: StickyContactCTAProps) {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || !isMobile) {
      setShow(false);
      return;
    }
    const handleScroll = () => {
      setShow(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, isMobile]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-4 right-4 z-40 md:hidden flex justify-center pointer-events-none"
        >
          <motion.button
            onClick={onContactClick}
            className="pointer-events-auto bg-primary text-black font-mono text-xs font-bold px-6 py-3 rounded-full shadow-lg hover:bg-white transition-colors min-h-[44px]"
            whileTap={{ scale: 0.98 }}
          >
            Talk to us
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
