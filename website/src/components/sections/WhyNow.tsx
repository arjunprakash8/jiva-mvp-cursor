"use client";

import { motion } from "framer-motion";
import { Globe, Database, Building2, Shield } from "lucide-react";
import { SectionReveal } from "@/components/ui/CountUp";
import { ECGPulse } from "@/components/ui/ECGPulse";
import { staggerContainer, revealVariants } from "@/lib/motion";

const tailwinds = [
  "Global shift from fee-for-service to value-based and capitated care",
  "Wearables-for-insurance market expanding rapidly",
  "AI in healthcare compounding diagnostic capability",
  "Insurers under historic margin pressure, actively seeking cost-avoidance tools",
];

const kenyaReasons = [
  {
    icon: Building2,
    title: "Chronic Disease Burden",
    description:
      "High CVD, diabetes, and hypertension prevalence in the insured population — NCDs drive over 50% of hospital admissions in Kenya.",
  },
  {
    icon: Shield,
    title: "Active Private Insurance Sector",
    description:
      "Kenya's private health insurance market (KES 73.5B) is ready for prevention tools — first partner STAR General Insurance, live in Nairobi.",
  },
  {
    icon: Globe,
    title: "SHA National Health Scheme",
    description:
      "Social Health Authority enrolls 57M lives with 1.59 payout ratios — a large mass-market addressable layer above private insurers.",
  },
  {
    icon: Database,
    title: "Defensible Data Moat",
    description:
      "Sub-Saharan demographic health data is underrepresented in global clinical AI. Building here first makes the dataset a premium asset as JIVA scales.",
  },
];

export function WhyNow() {
  return (
    <section
      id="why-now"
      className="section-padding relative border-t border-border/30 bg-surface/40"
    >
      <ECGPulse className="mb-12 opacity-30" height={28} color="#3B82F6" />

      <SectionReveal>
        <p className="eyebrow">02 — WHY NOW</p>
        <h2 className="section-title mt-4 max-w-3xl">
          The incentives have finally aligned with prevention.
        </h2>
      </SectionReveal>

      <SectionReveal className="mt-10" delay={0.1}>
        <p className="max-w-2xl text-lg text-text-muted">
          Four structural tailwinds are converging: capitation and value-based
          care dominance, slashed wearable economics, insurer margin pressure,
          and regulatory mandates for demographic diversity in clinical AI
          datasets.
        </p>
      </SectionReveal>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 space-y-4"
      >
        {tailwinds.map((item) => (
          <motion.li
            key={item}
            variants={revealVariants}
            className="flex items-start gap-4 border-l border-accent/20 pl-6"
          >
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-text-muted">{item}</span>
          </motion.li>
        ))}
      </motion.ul>

      <SectionReveal className="mt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-wealth">
          Why Kenya
        </p>
        <h3 className="mt-3 font-serif text-3xl text-text md:text-4xl">
          A deliberate strategic choice, not a constraint.
        </h3>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 grid gap-6 md:grid-cols-2"
      >
        {kenyaReasons.map((reason) => (
          <motion.div
            key={reason.title}
            variants={revealVariants}
            className="card-surface card-hover p-8"
          >
            <reason.icon
              size={20}
              strokeWidth={1.5}
              className="text-primary"
            />
            <h4 className="mt-4 font-sans text-lg font-medium text-text">
              {reason.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {reason.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Minimal East Africa map motif */}
      <SectionReveal className="mt-16">
        <div className="relative overflow-hidden rounded-xl border border-border/40 bg-surface p-8 md:p-12">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
                Data Flywheel
              </p>
              <p className="mt-2 max-w-md font-serif text-xl italic text-text-muted">
                Enroll → Continuous telemetry → Ground-truth validation →
                Recalibrated AI → Regulatory premium
              </p>
            </div>
            <svg
              viewBox="0 0 200 160"
              className="h-32 w-40 opacity-60"
              aria-hidden="true"
            >
              <ellipse
                cx="100"
                cy="80"
                rx="90"
                ry="70"
                fill="none"
                stroke="rgba(30,51,84,0.6)"
                strokeWidth="1"
              />
              <path
                d="M110,40 L130,55 L125,80 L115,100 L100,110 L85,95 L80,70 L95,50 Z"
                fill="rgba(34,211,238,0.15)"
                stroke="rgba(34,211,238,0.5)"
                strokeWidth="1"
              />
              <circle cx="108" cy="72" r="3" fill="#22D3EE" />
              <text
                x="108"
                y="130"
                textAnchor="middle"
                fill="#5C6F8C"
                fontSize="8"
                fontFamily="monospace"
              >
                EAST AFRICA
              </text>
            </svg>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
