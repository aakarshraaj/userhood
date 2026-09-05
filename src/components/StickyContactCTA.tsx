import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface StickyContactCTAProps {
  onContactClick: () => void;
  suppressed?: boolean;
}

export default function StickyContactCTA({ onContactClick, suppressed = false }: StickyContactCTAProps) {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/" || suppressed) {
      setShow(false);
      return;
    }

    const checkVisibility = () => {
      if (window.innerWidth >= 768 || document.querySelector("[data-analytics-consent-banner]")) {
        setShow(false);
        return;
      }

      const firstSectionAfterHero = document.getElementById("case-studies");
      const finalCTA = document.getElementById("contact");
      const footer = document.getElementById("site-footer");

      if (!firstSectionAfterHero || !finalCTA || !footer) {
        setShow(false);
        return;
      }

      const heroHasCleared = firstSectionAfterHero.getBoundingClientRect().top <= 72;
      const finalCTAHasEntered = finalCTA.getBoundingClientRect().top <= window.innerHeight;
      const footerHasEntered = footer.getBoundingClientRect().top <= window.innerHeight;

      setShow(heroHasCleared && !finalCTAHasEntered && !footerHasEntered);
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);
    const pageObserver = new MutationObserver(checkVisibility);
    pageObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      pageObserver.disconnect();
    };
  }, [location.pathname, suppressed]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-4 right-4 z-40 flex justify-center md:hidden"
        >
          <button
            type="button"
            onClick={onContactClick}
            className="pointer-events-auto flex min-h-[48px] items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-bold text-black shadow-2xl transition-colors hover:bg-white"
          >
            Discuss your build <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
