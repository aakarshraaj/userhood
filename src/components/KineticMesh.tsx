import React, { useEffect, useRef, useState } from "react";
import { playTick } from "../utils/audio";

interface GridNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  force: number;
}

export default function KineticMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 800 });

  // References for animation state to prevent React re-render cycles
  const nodesRef = useRef<GridNode[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Resize listener
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Initialize nodes when dimensions change
  useEffect(() => {
    const { width, height } = dimensions;
    // Increase density slightly since it spans full height
    const cols = 16;
    const rows = 20;
    const newNodes: GridNode[] = [];

    const cellW = width / (cols - 1);
    const cellH = height / (rows - 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellW;
        const y = r * cellH;
        newNodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
        });
      }
    }

    nodesRef.current = newNodes;
  }, [dimensions]);

  // Main physics & rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Support high-DPI retina screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const springStrength = 0.035;
    const damping = 0.89;
    const repulsionRadius = 110;
    const repulsionForce = 0.3;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const nodes = nodesRef.current;
      const pointer = pointerRef.current;
      const ripples = ripplesRef.current;

      // Update physics for each node
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // 1. Spring back to original grid position
        const dxBase = node.baseX - node.x;
        const dyBase = node.baseY - node.y;
        node.vx += dxBase * springStrength;
        node.vy += dyBase * springStrength;

        // 2. Mouse Repulsion force
        if (pointer.active) {
          const dxMouse = pointer.x - node.x;
          const dyMouse = pointer.y - node.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < repulsionRadius && distMouse > 0) {
            const force = (repulsionRadius - distMouse) / repulsionRadius;
            const angle = Math.atan2(dyMouse, dxMouse);
            
            node.vx -= Math.cos(angle) * force * repulsionForce * 22;
            node.vy -= Math.sin(angle) * force * repulsionForce * 22;
          }
        }

        // 3. Click Ripple wave propagation
        for (let r = 0; r < ripples.length; r++) {
          const ripple = ripples[r];
          const dxRipple = node.x - ripple.x;
          const dyRipple = node.y - ripple.y;
          const distRipple = Math.sqrt(dxRipple * dxRipple + dyRipple * dyRipple);

          const thickness = 50;
          if (distRipple > ripple.radius - thickness && distRipple < ripple.radius + thickness) {
            const distanceDiff = Math.abs(distRipple - ripple.radius);
            const forceStrength = (thickness - distanceDiff) / thickness;
            const angle = Math.atan2(dyRipple, dxRipple);

            node.vx += Math.cos(angle) * forceStrength * ripple.force;
            node.vy += Math.sin(angle) * forceStrength * ripple.force;
          }
        }

        // Apply friction and update coordinates
        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;
      }

      // Update ripples
      ripplesRef.current = ripples
        .map((r) => ({ ...r, radius: r.radius + r.speed }))
        .filter((r) => r.radius < r.maxRadius);

      // Render Grid Lines (connect adjacent grid nodes)
      const cols = 16;
      const rows = 20;
      ctx.lineWidth = 0.55;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const currentNode = nodes[i];
          if (!currentNode) continue;

          // Connect Horizontal neighbor (right)
          if (c < cols - 1) {
            const rightNode = nodes[i + 1];
            if (rightNode) {
              const dx = rightNode.x - currentNode.x;
              const dy = rightNode.y - currentNode.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxDist = dimensions.width / (cols - 1) * 1.7;
              
              const alpha = Math.max(0.01, Math.min(0.2, 1 - dist / maxDist));
              ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(currentNode.x, currentNode.y);
              ctx.lineTo(rightNode.x, rightNode.y);
              ctx.stroke();
            }
          }

          // Connect Vertical neighbor (down)
          if (r < rows - 1) {
            const downNode = nodes[i + cols];
            if (downNode) {
              const dx = downNode.x - currentNode.x;
              const dy = downNode.y - currentNode.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxDist = dimensions.height / (rows - 1) * 1.7;

              const alpha = Math.max(0.01, Math.min(0.2, 1 - dist / maxDist));
              ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(currentNode.x, currentNode.y);
              ctx.lineTo(downNode.x, downNode.y);
              ctx.stroke();
            }
          }
        }
      }

      // Render Nodes (draw tiny dots at junctions)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        let glowRadius = 1;
        let isGlow = false;

        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            glowRadius = 2.5;
            isGlow = true;
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = isGlow ? "rgba(0, 245, 255, 0.95)" : "rgba(0, 245, 255, 0.3)";
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [dimensions]);

  // Pointer event handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    pointerRef.current.active = false;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Trigger click sound beep
    playTick();

    // Trigger ripple physics
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(dimensions.width, dimensions.height) * 0.95,
      speed: 7,
      force: 28,
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden bg-transparent select-none"
      style={{
        maskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0) 95%)",
        WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0) 95%)",
      }}
      data-cursor-text="TAP OR HOVER TO WARP MESH"
      data-cursor-color="#00f5ff"
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        className="w-full h-full block relative z-10"
      />
    </div>
  );
}
