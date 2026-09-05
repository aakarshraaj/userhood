import { useEffect, useRef, type PointerEvent } from "react";

type Shape = "arch" | "bean" | "bloom" | "drop" | "lozenge" | "orb" | "shield";
type Expression = "bright" | "calm" | "curious" | "focused" | "playful" | "steady" | "warm";

type AvatarProfile = {
  color: string;
  background: string;
  shape: Shape;
  expression: Expression;
  rotation: number;
  phase: number;
};

const profiles: Record<string, AvatarProfile> = {
  Kriti: {
    color: "#16cdbf",
    background: "#e8f8f4",
    shape: "arch",
    expression: "focused",
    rotation: -0.045,
    phase: 0.2,
  },
  Ashwin: {
    color: "#ff784f",
    background: "#fff0e8",
    shape: "lozenge",
    expression: "curious",
    rotation: 0.075,
    phase: 1.4,
  },
  Nishita: {
    color: "#7e6bf2",
    background: "#efecff",
    shape: "shield",
    expression: "playful",
    rotation: -0.07,
    phase: 2.1,
  },
  Priya: {
    color: "#f1bf2f",
    background: "#fff7d8",
    shape: "orb",
    expression: "bright",
    rotation: 0.025,
    phase: 2.8,
  },
  Somesh: {
    color: "#438cf2",
    background: "#e6f0ff",
    shape: "bean",
    expression: "calm",
    rotation: -0.08,
    phase: 3.6,
  },
  Uttkarsh: {
    color: "#b7db42",
    background: "#f2f8dc",
    shape: "drop",
    expression: "steady",
    rotation: 0.055,
    phase: 4.3,
  },
  Priyanka: {
    color: "#de6194",
    background: "#ffe8f1",
    shape: "bloom",
    expression: "warm",
    rotation: -0.035,
    phase: 5.1,
  },
};

const fallbackProfile: AvatarProfile = {
  color: "#ffffff",
  background: "#e9e9e9",
  shape: "orb",
  expression: "bright",
  rotation: 0,
  phase: 0,
};

const glanceSequence = [
  { x: 0, y: 0 },
  { x: 0.55, y: -0.18 },
  { x: -0.36, y: 0.24 },
  { x: 0.18, y: 0.34 },
  { x: -0.15, y: -0.28 },
];

function traceShape(context: CanvasRenderingContext2D, shape: Shape, size: number) {
  const s = size;
  context.beginPath();

  if (shape === "arch") {
    context.moveTo(-0.46 * s, 0.42 * s);
    context.lineTo(-0.46 * s, -0.06 * s);
    context.bezierCurveTo(-0.45 * s, -0.38 * s, -0.24 * s, -0.52 * s, 0.04 * s, -0.5 * s);
    context.bezierCurveTo(0.32 * s, -0.48 * s, 0.46 * s, -0.26 * s, 0.46 * s, 0.02 * s);
    context.lineTo(0.46 * s, 0.42 * s);
    context.quadraticCurveTo(0.16 * s, 0.5 * s, -0.46 * s, 0.42 * s);
  } else if (shape === "lozenge") {
    context.moveTo(-0.28 * s, -0.5 * s);
    context.bezierCurveTo(-0.04 * s, -0.56 * s, 0.33 * s, -0.45 * s, 0.47 * s, -0.2 * s);
    context.bezierCurveTo(0.58 * s, 0.04 * s, 0.42 * s, 0.38 * s, 0.16 * s, 0.49 * s);
    context.bezierCurveTo(-0.13 * s, 0.58 * s, -0.47 * s, 0.35 * s, -0.5 * s, 0.05 * s);
    context.bezierCurveTo(-0.53 * s, -0.2 * s, -0.45 * s, -0.42 * s, -0.28 * s, -0.5 * s);
  } else if (shape === "shield") {
    context.moveTo(-0.03 * s, -0.54 * s);
    context.bezierCurveTo(0.13 * s, -0.52 * s, 0.5 * s, 0.19 * s, 0.48 * s, 0.38 * s);
    context.bezierCurveTo(0.46 * s, 0.55 * s, -0.43 * s, 0.55 * s, -0.49 * s, 0.38 * s);
    context.bezierCurveTo(-0.54 * s, 0.22 * s, -0.21 * s, -0.51 * s, -0.03 * s, -0.54 * s);
  } else if (shape === "bean") {
    context.moveTo(-0.42 * s, -0.2 * s);
    context.bezierCurveTo(-0.32 * s, -0.52 * s, 0.13 * s, -0.57 * s, 0.39 * s, -0.34 * s);
    context.bezierCurveTo(0.61 * s, -0.14 * s, 0.34 * s, 0.08 * s, 0.47 * s, 0.29 * s);
    context.bezierCurveTo(0.58 * s, 0.48 * s, 0.1 * s, 0.58 * s, -0.2 * s, 0.47 * s);
    context.bezierCurveTo(-0.52 * s, 0.35 * s, -0.56 * s, 0.04 * s, -0.42 * s, -0.2 * s);
  } else if (shape === "drop") {
    context.moveTo(0.02 * s, -0.55 * s);
    context.bezierCurveTo(0.18 * s, -0.5 * s, 0.5 * s, -0.05 * s, 0.47 * s, 0.24 * s);
    context.bezierCurveTo(0.44 * s, 0.54 * s, -0.37 * s, 0.57 * s, -0.48 * s, 0.28 * s);
    context.bezierCurveTo(-0.58 * s, 0.02 * s, -0.14 * s, -0.52 * s, 0.02 * s, -0.55 * s);
  } else if (shape === "bloom") {
    context.moveTo(-0.08 * s, -0.52 * s);
    context.bezierCurveTo(0.18 * s, -0.6 * s, 0.31 * s, -0.34 * s, 0.5 * s, -0.18 * s);
    context.bezierCurveTo(0.65 * s, -0.02 * s, 0.38 * s, 0.17 * s, 0.36 * s, 0.38 * s);
    context.bezierCurveTo(0.33 * s, 0.6 * s, 0.03 * s, 0.46 * s, -0.19 * s, 0.5 * s);
    context.bezierCurveTo(-0.46 * s, 0.55 * s, -0.55 * s, 0.28 * s, -0.48 * s, 0.04 * s);
    context.bezierCurveTo(-0.42 * s, -0.19 * s, -0.33 * s, -0.44 * s, -0.08 * s, -0.52 * s);
  } else {
    context.moveTo(-0.48 * s, -0.07 * s);
    context.bezierCurveTo(-0.5 * s, -0.37 * s, -0.22 * s, -0.53 * s, 0.08 * s, -0.49 * s);
    context.bezierCurveTo(0.4 * s, -0.46 * s, 0.53 * s, -0.18 * s, 0.47 * s, 0.13 * s);
    context.bezierCurveTo(0.42 * s, 0.43 * s, 0.12 * s, 0.54 * s, -0.18 * s, 0.48 * s);
    context.bezierCurveTo(-0.46 * s, 0.42 * s, -0.56 * s, 0.2 * s, -0.48 * s, -0.07 * s);
  }

  context.closePath();
}

function eyeAngles(expression: Expression): [number, number] {
  if (expression === "focused") return [-0.13, 0.13];
  if (expression === "curious") return [-0.04, 0.2];
  if (expression === "playful") return [0.2, -0.14];
  if (expression === "calm") return [1.42, 1.42];
  if (expression === "steady") return [-0.08, -0.08];
  if (expression === "warm") return [0.11, -0.11];
  return [0.03, 0.03];
}

type TeamAvatarProps = {
  name: string;
  className?: string;
};

export default function TeamAvatar({ name, className = "" }: TeamAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ active: false, x: 0, y: 0 });
  const profile = profiles[name] ?? fallbackProfile;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let currentX = 0;
    let currentY = 0;
    let visible = true;
    let running = false;

    const scheduleRender = () => {
      if (!running && visible) {
        running = true;
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      scheduleRender();
    };

    const render = (time: number) => {
      running = false;
      const still = reduceMotion.matches;
      const idleIndex = Math.floor((time / 2400 + profile.phase) % glanceSequence.length);
      const idle = (still ? glanceSequence[0] : glanceSequence[idleIndex]) ?? { x: 0, y: 0 };
      const targetX = pointerRef.current.active ? pointerRef.current.x : idle.x;
      const targetY = pointerRef.current.active ? pointerRef.current.y : idle.y;
      const easing = still ? 1 : 0.075;
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      context.clearRect(0, 0, width, height);
      context.fillStyle = profile.background;
      context.fillRect(0, 0, width, height);

      const size = Math.min(width * 0.62, height * 0.7);
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      context.save();
      context.translate(centerX, centerY);
      context.rotate(profile.rotation);

      context.save();
      context.translate(size * 0.045, size * 0.06);
      traceShape(context, profile.shape, size);
      context.fillStyle = "rgba(12, 12, 12, 0.1)";
      context.fill();
      context.restore();

      traceShape(context, profile.shape, size);
      context.fillStyle = profile.color;
      context.fill();

      const [leftAngle, rightAngle] = eyeAngles(profile.expression);
      const lookX = currentX * size * 0.055;
      const lookY = currentY * size * 0.04;
      const eyeWidth = Math.max(5, size * 0.052);
      const eyeHeight = Math.max(11, size * 0.14);
      const blinkPhase = still ? 1 : (time / 1000 + profile.phase * 1.9) % 5.4;
      const blink = blinkPhase > 5.12 ? Math.max(0.12, Math.abs(blinkPhase - 5.26) / 0.14) : 1;
      const eyeY = -size * 0.015 + lookY;

      const drawEye = (x: number, angle: number) => {
        context.save();
        context.translate(x + lookX, eyeY);
        context.rotate(angle);
        context.scale(1, blink);
        context.beginPath();
        context.roundRect(-eyeWidth / 2, -eyeHeight / 2, eyeWidth, eyeHeight, eyeWidth / 2);
        context.fillStyle = "#121212";
        context.fill();
        context.restore();
      };

      drawEye(-size * 0.145, leftAngle);
      drawEye(size * 0.145, rightAngle);
      context.restore();

      if (!still) scheduleRender();
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) scheduleRender();
    }, { rootMargin: "120px" });
    const handleMotionPreference = () => scheduleRender();

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    reduceMotion.addEventListener("change", handleMotionPreference);
    resize();
    scheduleRender();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reduceMotion.removeEventListener("change", handleMotionPreference);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [profile]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      active: true,
      x: Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)),
      y: Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)),
    };
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      role="img"
      aria-label={`${name}, represented by an animated abstract Userhood character`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerRef.current = { active: false, x: 0, y: 0 };
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
    </div>
  );
}
