import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { trackAnalyticsEvent } from "../utils/analytics";
import UserhoodLogo from "./UserhoodLogo";
import UserhoodMonogram from "./UserhoodMonogram";

interface NavbarProps {
  onContactClick: () => void;
  onMenuOpenChange?: (isOpen: boolean) => void;
}

const menuFocusableSelector = "a[href], button:not([disabled])";

export default function Navbar({ onContactClick, onMenuOpenChange }: NavbarProps) {
  const { pathname, hash } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    onMenuOpenChange?.(isOpen);
  }, [isOpen, onMenuOpenChange]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const mainContent = document.getElementById("main-content");
    const footer = document.getElementById("site-footer");
    document.body.style.overflow = "hidden";
    mainContent?.setAttribute("inert", "");
    mainContent?.setAttribute("aria-hidden", "true");
    footer?.setAttribute("inert", "");
    footer?.setAttribute("aria-hidden", "true");
    const focusFrame = window.requestAnimationFrame(() => {
      const firstLink = menuRef.current?.querySelector<HTMLElement>("a[href]");
      firstLink?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const menuItems = Array.from(menuRef.current.querySelectorAll<HTMLElement>(menuFocusableSelector)).filter(
        (element) => element.getClientRects().length > 0
      );
      const firstItem = menuItems[0];
      const lastItem = menuItems[menuItems.length - 1];
      if (!firstItem || !lastItem) return;

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        toggleRef.current?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        toggleRef.current?.focus();
      } else if (document.activeElement === toggleRef.current) {
        event.preventDefault();
        (event.shiftKey ? lastItem : firstItem).focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      mainContent?.removeAttribute("inert");
      mainContent?.removeAttribute("aria-hidden");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="safe-area-inset-top fixed top-0 z-[90] w-full border-b border-white/10 bg-background-dark/95 backdrop-blur-xl" aria-label="Main navigation">
      <div className="relative z-50 mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:h-16 sm:px-6 md:px-8">
        <div className="flex min-w-0 items-center">
          <Link to="/" className="flex min-h-11 shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80" onClick={() => setIsOpen(false)} aria-label="Userhood home">
            <span className="userhood-monogram-tile flex h-8 w-8 shrink-0 items-center justify-center bg-white sm:h-9 sm:w-9" aria-hidden="true">
              <UserhoodMonogram className="h-[22px] w-[22px] text-[#090b0e] sm:h-6 sm:w-6" />
            </span>
            <UserhoodLogo className="h-[19px] w-[100px] text-white sm:h-[23px] sm:w-[120px]" />
          </Link>
        </div>

        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          <div className="flex items-center gap-5 text-sm font-medium text-white/75 lg:gap-7">
            <Link to="/work" aria-current={pathname === "/work" || pathname.startsWith("/case-study/") ? "page" : undefined} onClick={handleLinkClick} className={`nav-link transition-colors hover:text-primary ${pathname === "/work" || pathname.startsWith("/case-study/") ? "text-primary" : ""}`}>Work</Link>
            <Link to="/services" aria-current={pathname === "/services" ? "page" : undefined} onClick={handleLinkClick} className={`nav-link transition-colors hover:text-primary ${pathname === "/services" ? "text-primary" : ""}`}>Services</Link>
            <Link to="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={handleLinkClick} className={`nav-link transition-colors hover:text-primary ${pathname === "/about" ? "text-primary" : ""}`}>About</Link>
            <Link to="/careers" aria-current={pathname.startsWith("/careers") ? "page" : undefined} onClick={handleLinkClick} className={`nav-link hidden transition-colors hover:text-primary lg:inline ${pathname.startsWith("/careers") ? "text-primary" : ""}`}>Careers</Link>
          </div>

          <div className="pl-2">
            <button
              type="button"
              onClick={onContactClick}
              className="motion-button min-h-[42px] whitespace-nowrap bg-primary px-4 py-2 text-sm font-bold text-black hover:bg-white"
            >
              Discuss your build
            </button>
          </div>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white/75 transition-colors hover:text-white md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="primary-mobile-menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <>
            <div
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
              className="motion-backdrop absolute inset-x-0 top-full z-30 h-[calc(100dvh-3.5rem)] bg-black/70 backdrop-blur-sm sm:h-[calc(100dvh-4rem)] md:hidden"
            />
            <div
              ref={menuRef}
              id="primary-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="motion-drawer absolute right-0 top-full z-40 flex h-[calc(100dvh-3.5rem)] w-full max-w-sm flex-col overflow-y-auto bg-background-dark p-5 shadow-2xl sm:h-[calc(100dvh-4rem)] sm:p-7 md:hidden"
            >
              <div className="border-b border-white/10 pb-5">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Navigate</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Inspect the work, understand the engagement, or speak directly with the team.</p>
              </div>

              <div className="flex flex-col border-b border-white/10 py-3 text-xl font-bold text-white">
                <Link to="/work" aria-current={pathname === "/work" || pathname.startsWith("/case-study/") ? "page" : undefined} onClick={handleLinkClick} className={`flex min-h-[54px] items-center justify-between border-b border-white/5 transition-colors hover:text-primary ${pathname === "/work" || pathname.startsWith("/case-study/") ? "text-primary" : ""}`}>Selected work <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/services" aria-current={pathname === "/services" ? "page" : undefined} onClick={handleLinkClick} className={`flex min-h-[54px] items-center justify-between border-b border-white/5 transition-colors hover:text-primary ${pathname === "/services" ? "text-primary" : ""}`}>Services <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={handleLinkClick} className={`flex min-h-[54px] items-center justify-between border-b border-white/5 transition-colors hover:text-primary ${pathname === "/about" ? "text-primary" : ""}`}>About <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/careers" aria-current={pathname.startsWith("/careers") ? "page" : undefined} onClick={handleLinkClick} className={`flex min-h-[54px] items-center justify-between transition-colors hover:text-primary ${pathname.startsWith("/careers") ? "text-primary" : ""}`}>Careers <ArrowRight className="h-4 w-4" /></Link>
              </div>

              <div className="mt-auto space-y-3 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onContactClick();
                  }}
                  className="motion-button flex min-h-[52px] w-full items-center justify-between bg-primary px-5 py-4 text-base font-bold text-black hover:bg-white"
                >
                  Discuss your build <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={`https://wa.me/917498908702?text=${encodeURIComponent("Hey Userhood! I came across your work and want to chat about a potential collaboration.")}`}
                  onClick={() => trackAnalyticsEvent("whatsapp_click", { source: "navbar_mobile_menu" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-button flex min-h-[48px] items-center justify-center gap-3 border border-white/15 text-sm font-bold text-white hover:border-[#25D366] hover:text-[#25D366]"
                >
                  <WhatsAppIcon size={18} /> Talk on WhatsApp
                </a>
              </div>
            </div>
        </>
      )}
    </nav>
  );
}

function WhatsAppIcon({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
