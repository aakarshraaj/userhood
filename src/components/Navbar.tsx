import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { trackAnalyticsEvent } from "../utils/analytics";

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
          <Link to="/" className="flex min-h-11 shrink-0 items-center transition-opacity hover:opacity-80" onClick={() => setIsOpen(false)} aria-label="Userhood home">
            <Logo />
          </Link>
        </div>

        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          <div className="flex items-center gap-5 text-sm font-medium text-white/75 lg:gap-7">
            <Link to="/work" aria-current={pathname === "/work" || pathname.startsWith("/case-study/") ? "page" : undefined} onClick={handleLinkClick} className={`nav-link transition-colors hover:text-primary ${pathname === "/work" || pathname.startsWith("/case-study/") ? "text-primary" : ""}`}>Work</Link>
            <Link to="/services" aria-current={pathname === "/services" ? "page" : undefined} onClick={handleLinkClick} className={`nav-link transition-colors hover:text-primary ${pathname === "/services" ? "text-primary" : ""}`}>Services</Link>
            <Link to="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={handleLinkClick} className={`nav-link transition-colors hover:text-primary ${pathname === "/about" ? "text-primary" : ""}`}>About</Link>
            <Link to="/careers" aria-current={pathname.startsWith("/careers") ? "page" : undefined} onClick={handleLinkClick} className={`nav-link hidden transition-colors hover:text-primary lg:inline ${pathname.startsWith("/careers") ? "text-primary" : ""}`}>Careers</Link>
          </div>

          <div className="border-l border-white/10 pl-5">
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
              className="motion-drawer absolute right-0 top-full z-40 flex h-[calc(100dvh-3.5rem)] w-full max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-background-dark p-5 shadow-2xl sm:h-[calc(100dvh-4rem)] sm:p-7 md:hidden"
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
