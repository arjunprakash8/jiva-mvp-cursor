"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HealthScoreGaugeProps {
  score?: number;
  className?: string;
}

export function HealthScoreGauge({
  score = 84,
  className = "",
}: HealthScoreGaugeProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const displayScore = inView || reduced ? score : 0;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (displayScore / 100) * circumference;
  const color =
    score >= 80 ? "#34D399" : score >= 60 ? "#22D3EE" : "#EF4444";

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <svg ref={ref} width="180" height="180" viewBox="0 0 180 180">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="rgba(30, 51, 84, 0.6)"
          strokeWidth="6"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform="rotate(-90 90 90)"
          style={{
            transition: reduced ? "none" : "stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <text
          x="90"
          y="85"
          textAnchor="middle"
          className="fill-text font-serif text-4xl"
          style={{ fontSize: "36px" }}
        >
          {displayScore}
        </text>
        <text
          x="90"
          y="108"
          textAnchor="middle"
          fill="#5C6F8C"
          style={{ fontSize: "11px", fontFamily: "var(--font-jetbrains)" }}
        >
          HEALTH SCORE
        </text>
      </svg>
      <div className="mt-4 flex gap-4 font-mono text-[10px] uppercase tracking-wider text-text-dim">
        <span className="text-signal">≥80 Healthy</span>
        <span className="text-accent">60–79 Normal</span>
        <span>&lt;60 At Risk</span>
      </div>
    </div>
  );
}
