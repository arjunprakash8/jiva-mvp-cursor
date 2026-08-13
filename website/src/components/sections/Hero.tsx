"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const BiometricWaveform = dynamic(
  () =>
    import("@/components/ui/BiometricWaveform").then((m) => m.BiometricWaveform),
  { ssr: false }
);

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-bg vignette">
      <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Biometric waveform — upper third */}
      <BiometricWaveform />

      {/* Headline — centered middle */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-[28vh] text-center">
        <motion.h1
          className="max-w-4xl font-serif text-5xl leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: cinematicEase, delay: 0.6 }}
        >
          <span className="block italic text-text/90">The Global Standard for</span>
          <span className="mt-2 block text-text">Biometric Intelligence.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-lg font-serif text-lg italic leading-relaxed text-text-muted md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: cinematicEase }}
        >
          Continuous, medical-grade health monitoring —
          <br className="hidden sm:block" />
          from the wrist, to the clinic, to the insurer.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="relative z-10 pb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8, ease: cinematicEase }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-text-dim">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
