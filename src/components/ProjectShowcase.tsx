import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface ProjectShowcaseFrame {
  src: string;
  alt: string;
}

interface ProjectShowcaseProps {
  frames: ProjectShowcaseFrame[];
  accent: string;
  startDelay?: number;
}

export default function ProjectShowcase({ frames, accent, startDelay = 0 }: ProjectShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setMotionAllowed(!mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.28 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motionAllowed || !isVisible || frames.length < 2) return;

    let shuffleTimer = 0;

    const moveFrontCard = () => {
      setIsLeaving(true);
      shuffleTimer = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % frames.length);
        setIsLeaving(false);
      }, 520);
    };

    let intervalTimer = 0;
    const firstMoveTimer = window.setTimeout(() => {
      moveFrontCard();
      intervalTimer = window.setInterval(moveFrontCard, 4300);
    }, 1800 + startDelay);

    return () => {
      window.clearTimeout(firstMoveTimer);
      window.clearTimeout(shuffleTimer);
      window.clearInterval(intervalTimer);
    };
  }, [frames.length, isVisible, motionAllowed, startDelay]);

  return (
    <div
      ref={rootRef}
      className="work-showcase relative aspect-[16/10] overflow-hidden"
      style={{ "--showcase-accent": accent } as CSSProperties}
      aria-hidden="true"
    >
      <div className="work-showcase-glow absolute inset-0" />

      <div className="absolute inset-x-5 bottom-5 top-7 sm:inset-x-7 sm:bottom-7 sm:top-9 md:inset-x-8">
        {frames.map((frame, index) => {
          const position = (index - activeIndex + frames.length) % frames.length;
          const visiblePosition = Math.min(position, 3);
          const isFront = position === 0;
          const restingTransforms = [
            "translate3d(-9px, 10px, 0) scale(0.965) rotate(-0.4deg)",
            "translate3d(5px, -3px, 0) scale(0.945) rotate(0.9deg)",
            "translate3d(19px, -15px, 0) scale(0.925) rotate(1.8deg)",
            "translate3d(29px, -22px, 0) scale(0.91) rotate(2.4deg)",
          ];
          const frameStyle = {
            zIndex: frames.length - position,
            opacity: position < 3 ? 1 : 0,
            transform: restingTransforms[visiblePosition],
          } as CSSProperties;

          return (
            <figure
              key={frame.src}
              className={`work-showcase-frame absolute inset-0 overflow-hidden bg-[#111] ${isFront && isLeaving ? "is-leaving" : ""}`}
              style={frameStyle}
            >
              <img src={frame.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </figure>
          );
        })}
      </div>

      <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-3.5">
        {frames.map((frame, index) => (
          <span
            key={frame.src}
            className={`block h-1 rounded-full transition-[width,background-color,opacity] duration-500 ${index === activeIndex ? "w-5 bg-[var(--showcase-accent)] opacity-100" : "w-1 bg-white opacity-35"}`}
          />
        ))}
      </div>
    </div>
  );
}
