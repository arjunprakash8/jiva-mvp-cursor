"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/CountUp";
import { ECGPulse } from "@/components/ui/ECGPulse";
import { staggerContainer, revealVariants } from "@/lib/motion";

const stages = [
  {
    phase: "Launch",
    title: "Kenya",
    description:
      "Live in Nairobi with a first insurance partner — building the foundational longitudinal dataset.",
  },
  {
    phase: "Scale",
    title: "Private Insurance",
    description:
      "Broaden across Kenya's private health insurance market — KES 73.5B and growing.",
  },
  {
    phase: "National & Regional",
    title: "SHA & East Africa",
    description:
      "Kenya's Social Health Authority (57M lives) and wider East African expansion.",
  },
  {
    phase: "Emerging Markets",
    title: "Global Scale",
    description:
      "India, US CMS RPM capture, and broader high-growth regions — the East African dataset as regulatory premium.",
  },
];

export function Markets() {
  return (
    <section
      id="markets"
      className="section-padding relative border-t border-border/30 bg-surface/40"
    >
      <ECGPulse className="mb-12 opacity-30" height={28} color="#E0B463" />

      <SectionReveal>
        <p className="eyebrow">06 — THE MARKETS</p>
        <h2 className="section-title mt-4 max-w-3xl">
          Launch in Kenya. Build the data moat. Scale across emerging markets.
        </h2>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-16 space-y-0"
      >
        {stages.map((stage, i) => (
          <motion.div
            key={stage.phase}
            variants={revealVariants}
            className="relative flex gap-6 pb-12 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-surface-2">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {i < stages.length - 1 && (
                <div className="mt-2 w-px flex-1 bg-gradient-to-b from-accent/30 to-transparent" />
              )}
            </div>
            <div className="pb-4 pt-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                {stage.phase}
              </p>
              <h3 className="mt-1 font-serif text-2xl text-text">
                {stage.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-muted">
                {stage.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <SectionReveal className="mt-16">
        <div className="rounded-xl border border-wealth/20 bg-surface p-8 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wealth">
            Market Opportunity
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-serif text-2xl text-text">$223B</p>
              <p className="mt-1 text-xs text-text-muted">
                Global healthcare AI market
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-text">$40.7B</p>
              <p className="mt-1 text-xs text-text-muted">
                Remote patient monitoring by 2030
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-text">$38.3B</p>
              <p className="mt-1 text-xs text-text-muted">
                Wearables market by 2030
              </p>
            </div>
          </div>
          <p className="mt-8 font-serif text-lg italic text-text-muted">
            The East African dataset becomes a regulatory and pricing premium as
            JIVA expands to larger markets — filling the global data void that
            Western models ignore.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
