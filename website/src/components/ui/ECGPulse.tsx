"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ECGPulseProps {
  className?: string;
  width?: number | string;
  height?: number;
  animated?: boolean;
  color?: string;
}

export function ECGPulse({
  className = "",
  width = "100%",
  height = 48,
  animated = true,
  color = "#22D3EE",
}: ECGPulseProps) {
  const reduced = useReducedMotion();

  const path =
    "M0,24 L20,24 L28,24 L32,8 L36,40 L40,16 L44,32 L48,24 L80,24 L88,24 L92,10 L96,38 L100,18 L104,30 L108,24 L140,24 L148,24 L152,8 L156,40 L160,16 L164,32 L168,24 L200,24 L208,24 L212,10 L216,38 L220,18 L224,30 L228,24 L260,24 L280,24";

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 280 48"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
        className={animated && !reduced ? "animate-ecg-scroll" : undefined}
        style={
          animated && !reduced
            ? { strokeDasharray: 600, strokeDashoffset: 600 }
            : undefined
        }
      />
    </svg>
  );
}
