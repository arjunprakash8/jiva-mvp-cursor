"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ecgPoint(x: number): number {
  const cycle = x % 120;
  if (cycle < 15) return Math.sin(cycle * 0.4) * 2;
  if (cycle < 20) return -3 + (cycle - 15) * 0.5;
  if (cycle < 25) return -35 + (cycle - 20) * 14;
  if (cycle < 30) return 35 - (cycle - 25) * 12;
  if (cycle < 35) return -15 + (cycle - 30) * 2;
  if (cycle < 50) return Math.sin((cycle - 35) * 0.3) * 4;
  return Math.sin(cycle * 0.15) * 3;
}

function ppgPoint(x: number): number {
  return Math.sin(x * 0.08) * 18 + Math.sin(x * 0.16) * 6;
}

export function BiometricWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawTrace = (
      getY: (x: number) => number,
      color: string,
      lineWidth: number,
      yOffset: number,
      scrollOffset: number
    ) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = 0.85;

      for (let x = 0; x <= width; x += 1) {
        const wx = x + scrollOffset;
        const y = height / 2 + yOffset + getY(wx);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawAnnotations = (scrollOffset: number) => {
      const labels = [
        { x: 0.08, text: "P" },
        { x: 0.22, text: "QRS" },
        { x: 0.35, text: "T" },
        { x: 0.5, text: "JIVA AI" },
        { x: 0.62, text: "HRV · RMSSD 42ms" },
        { x: 0.75, text: "SpO₂ 98%" },
        { x: 0.88, text: "72 BPM" },
      ];

      ctx.font = "10px var(--font-jetbrains), monospace";
      ctx.fillStyle = "rgba(92, 111, 140, 0.7)";
      ctx.textAlign = "center";

      labels.forEach(({ x, text }) => {
        const px = ((x * width * 3 - scrollOffset * 0.3) % width + width) % width;
        ctx.fillText(text, px, height * 0.22);
      });

      ctx.textAlign = "left";
      ctx.fillText("t₀", 12, height - 12);
      ctx.textAlign = "right";
      ctx.fillText("now", width - 12, height - 12);

      ctx.font = "9px var(--font-jetbrains), monospace";
      ctx.textAlign = "center";
      ctx.fillText("256 Hz", width * 0.15, height * 0.78);
      ctx.fillText("PPG 25 Hz", width * 0.7, height * 0.78);
      ctx.fillText("36.6°C", width * 0.85, height * 0.78);
    };

    const drawInferenceNode = () => {
      const cx = width * 0.5;
      const cy = height / 2;
      const r = 28;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 211, 238, 0.06)";
      ctx.fill();

      ctx.font = "9px var(--font-jetbrains), monospace";
      ctx.fillStyle = "rgba(34, 211, 238, 0.8)";
      ctx.textAlign = "center";
      ctx.fillText("INFERENCE", cx, cy - 4);
      ctx.fillStyle = "rgba(52, 211, 153, 0.7)";
      ctx.fillText("Health Score 84", cx, cy + 10);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const scroll = reduced ? 0 : offsetRef.current;

      drawTrace(ecgPoint, "rgba(34, 211, 238, 0.9)", 1, -12, scroll);
      drawTrace(ppgPoint, "rgba(52, 211, 153, 0.5)", 1, 14, scroll * 0.7);
      drawTrace(
        (x) => ppgPoint(x * 0.9 + 40) * 0.6,
        "rgba(224, 180, 99, 0.35)",
        1,
        0,
        scroll * 1.1
      );

      drawInferenceNode();
      drawAnnotations(scroll);

      if (!reduced) {
        offsetRef.current += 0.4;
        animId = requestAnimationFrame(render);
      }
    };

    resize();
    render();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-x-0 top-[8%] h-[32vh] w-full opacity-90"
      aria-hidden="true"
    />
  );
}
