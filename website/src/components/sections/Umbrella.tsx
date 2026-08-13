"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/CountUp";
import { ECGPulse } from "@/components/ui/ECGPulse";
import { staggerContainer, revealVariants } from "@/lib/motion";

const subsidiaries = [
  {
    name: "JIVA360",
    tagline: "Insurance & Underwriting",
    description:
      "Integrates JIVA Band hardware with bi-annual clinical validation and real-time monitoring for insurers and payers.",
    bullets: [
      "PMPM subscription per enrolled member",
      "CMS RPM billing share from partners",
      "Population Health SaaS — HEDIS dashboards",
    ],
    accent: "border-primary/30",
    glow: "hover:shadow-[0_8px_40px_rgba(59,130,246,0.08)]",
    dot: "bg-primary",
  },
  {
    name: "JivaCare",
    tagline: "Clinical Healthcare",
    description:
      "A 24/7 biometric monitoring service built for developing economies, distributed by clinics to manage chronic care and acute interventions.",
    bullets: [
      "Retail revenue expansion for clinic networks",
      "Deepened patient retention via continuous telemetry",
      "Clinics pay $8/user/month wholesale",
    ],
    accent: "border-accent/30",
    glow: "hover:shadow-[0_8px_40px_rgba(34,211,238,0.08)]",
    dot: "bg-accent",
  },
  {
    name: "JIVA AI",
    tagline: "Proprietary Diagnostic Model",
    description:
      "AI diagnostic layer constructed over globally representative data — building the primary biometric layer for Sub-Saharan populations.",
    bullets: [
      "AI diagnostic licensing as Software-as-a-Medical-Device",
      "Data asset licensing for pharma research",
      "Planned path to CE & SAMD FDA-clearance",
    ],
    accent: "border-signal/30",
    glow: "hover:shadow-[0_8px_40px_rgba(52,211,153,0.08)]",
    dot: "bg-signal",
  },
];

function UmbrellaDiagram() {
  return (
    <div className="relative mx-auto mb-16 flex max-w-lg flex-col items-center">
      <div className="rounded-full border border-border/60 bg-surface-2 px-8 py-4">
        <span className="font-sans text-sm font-semibold tracking-[0.2em]">
          JIVA
        </span>
      </div>
      <div className="flex h-12 w-px bg-gradient-to-b from-border to-accent/40" />
      <div className="flex w-full justify-between gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-1 flex-col items-center">
            <div className="h-8 w-px bg-border/60" />
            <motion.div
              className="h-2 w-2 rounded-full bg-accent/60"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Umbrella() {
  return (
    <section id="umbrella" className="section-padding relative">
      <ECGPulse className="mb-12 opacity-30" height={28} />

      <SectionReveal>
        <p className="eyebrow">03 — THE UMBRELLA</p>
        <h2 className="section-title mt-4 max-w-3xl">
          One umbrella. Three companies. One aligned mission.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-text-muted">
          JIVA Technologies operates three subsidiaries — each addressing a
          distinct layer of the biometric health stack, unified by proprietary
          data and clinical-grade hardware.
        </p>
      </SectionReveal>

      <SectionReveal className="mt-16">
        <UmbrellaDiagram />
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {subsidiaries.map((sub) => (
          <motion.div
            key={sub.name}
            variants={revealVariants}
            className={`card-surface card-hover border ${sub.accent} ${sub.glow} p-8`}
          >
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${sub.dot}`} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                {sub.tagline}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-3xl text-text">{sub.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {sub.description}
            </p>
            <ul className="mt-6 space-y-2">
              {sub.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-text-muted"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-dim" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
