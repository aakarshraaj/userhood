import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import UserhoodMonogram from "./UserhoodMonogram";

const INTRO_DURATION_MS = 2050;
let hasPlayedInCurrentDocument = false;

interface IntroFlight {
  x: number;
  y: number;
  scale: number;
  size: number;
}

export default function BrandIntro() {
  const [flight, setFlight] = useState<IntroFlight | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const finishTimerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const motionFrameRef = useRef<number | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const completedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    targetRef.current?.classList.remove("brand-intro-target-hidden");
    document.documentElement.classList.remove("brand-intro-running");

    hasPlayedInCurrentDocument = true;
    setFlight(null);
  }, []);

  useEffect(() => {
    if (hasPlayedInCurrentDocument || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = document.querySelector<HTMLElement>("[data-userhood-monogram-target]");
    if (!target) return;

    targetRef.current = target;
    target.classList.add("brand-intro-target-hidden");
    document.documentElement.classList.add("brand-intro-running");

    frameRef.current = window.requestAnimationFrame(() => {
      const targetBounds = target.getBoundingClientRect();
      const size = window.innerWidth < 640 ? 92 : 112;
      const x = targetBounds.left + targetBounds.width / 2 - window.innerWidth / 2;
      const y = targetBounds.top + targetBounds.height / 2 - window.innerHeight / 2;
      const scale = targetBounds.width / size;

      setFlight({
        x,
        y,
        scale,
        size,
      });

      finishTimerRef.current = window.setTimeout(finishIntro, INTRO_DURATION_MS + 160);
    });

    window.addEventListener("resize", finishIntro, { once: true });

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (motionFrameRef.current) window.cancelAnimationFrame(motionFrameRef.current);
      if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current);
      window.removeEventListener("resize", finishIntro);
      target.classList.remove("brand-intro-target-hidden");
      document.documentElement.classList.remove("brand-intro-running");
    };
  }, [finishIntro]);

  useEffect(() => {
    const mark = markRef.current;
    if (!flight || !mark) return;

    const holdDuration = 1320;
    const flightDuration = INTRO_DURATION_MS - holdDuration;
    const startedAt = performance.now();

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
    const cubicPoint = (start: number, controlOne: number, controlTwo: number, end: number, time: number) => {
      const inverse = 1 - time;
      return (
        inverse * inverse * inverse * start +
        3 * inverse * inverse * time * controlOne +
        3 * inverse * time * time * controlTwo +
        time * time * time * end
      );
    };

    const renderFrame = (now: number) => {
      const elapsed = Math.min(INTRO_DURATION_MS, now - startedAt);
      let x = 0;
      let y = 0;
      let scale = 1;
      let rotation = 0;
      let opacity = 1;
      let shadowAlpha = 0.14;

      if (elapsed < holdDuration) {
        const arrival = easeOutCubic(clamp01(elapsed / 170));
        const breathTime = clamp01((elapsed - 130) / (holdDuration - 130));
        const breath = Math.pow(Math.sin(Math.PI * breathTime), 2) * 0.065;

        opacity = arrival;
        scale = 0.78 + 0.22 * arrival + breath;
        shadowAlpha = 0.08 + 0.1 * arrival;
      } else {
        const rawProgress = clamp01((elapsed - holdDuration) / flightDuration);
        const time = easeOutCubic(rawProgress);

        x = cubicPoint(0, flight.x * 0.28, flight.x * 0.78, flight.x, time);
        y = cubicPoint(0, flight.y * 0.04, flight.y * 0.58, flight.y, time);
        scale = 1 + (flight.scale - 1) * time;
        rotation = -2.4 * Math.sin(Math.PI * time);
        shadowAlpha = 0.14 * (1 - time);
      }

      mark.style.opacity = `${opacity}`;
      mark.style.boxShadow = `0 24px 96px rgba(255, 255, 255, ${shadowAlpha})`;
      mark.style.transform = `translate3d(${x - flight.size / 2}px, ${y - flight.size / 2}px, 0) scale(${scale}) rotate(${rotation}deg)`;

      if (elapsed < INTRO_DURATION_MS) {
        motionFrameRef.current = window.requestAnimationFrame(renderFrame);
      } else {
        finishIntro();
      }
    };

    motionFrameRef.current = window.requestAnimationFrame(renderFrame);

    return () => {
      if (motionFrameRef.current) window.cancelAnimationFrame(motionFrameRef.current);
    };
  }, [finishIntro, flight]);

  if (!flight) return null;

  const style = {
    width: flight.size,
    height: flight.size,
    opacity: 0,
    transform: `translate3d(${-flight.size / 2}px, ${-flight.size / 2}px, 0) scale(0.78)`,
  } as CSSProperties;

  return (
    <div className="brand-intro-overlay" aria-hidden="true">
      <div className="brand-intro-curtain" />
      <div
        ref={markRef}
        className="brand-intro-mark"
        style={style}
      >
        <UserhoodMonogram className="h-[64%] w-[64%] text-[#0a0a0a]" />
      </div>
    </div>
  );
}
