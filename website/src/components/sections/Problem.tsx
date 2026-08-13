"use client";

import { motion } from "framer-motion";
import { TrendingDown, Eye, DollarSign, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/CountUp";
import { CountUp } from "@/components/ui/CountUp";
import { ECGPulse } from "@/components/ui/ECGPulse";
import { staggerContainer, revealVariants } from "@/lib/motion";

const stats = [
  { value: 1, prefix: "#", label: "Medical debt is the leading cause of bankruptcy" },
  { value: 3, suffix: "×", label: "Health premiums inflating faster than wages" },
  { value: 70, suffix: "%", label: "Lack access to preventive care globally" },
  { value: 112, suffix: "%+", label: "Insurer loss ratios on chronic-patient claims" },
];

const stakeholders = [
  {
    icon: DollarSign,
    role: "Consumer",
    problem: "Rising premiums, reactive care, no reward for healthy habits",
    label: "Paying More, Getting Less",
    solution: "Empowered & Rewarded",
  },
  {
    icon: Eye,
    role: "Provider",
    problem: "Snapshot data only, late deterioration detection, reactive interventions",
    label: "Flying Blind",
    solution: "Continuous Visibility",
  },
  {
    icon: TrendingDown,
    role: "Insurer",
    problem: "112%+ loss ratios on chronic claims, fraud, no prevention incentive",
    label: "Bleeding Loss Ratios",
    solution: "Aligned Incentives",
  },
];

export function Problem() {
  return (
    <section id="problem" className="section-padding relative dot-grid">
      <ECGPulse className="mb-12 opacity-40" height={32} />

      <SectionReveal>
        <p className="eyebrow">01 — THE PROBLEM</p>
        <h2 className="section-title mt-4 max-w-3xl text-balance">
          In developing regions, the cost-of-living crisis is a cost-of-health
          crisis.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-text-muted">
          The current healthcare system is fragmented, reactive, and misaligned.
        </p>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={revealVariants}
            className="card-surface card-hover p-6"
          >
            <div className="font-serif text-4xl text-accent md:text-5xl">
              <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <SectionReveal className="mt-20">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
          Stakeholder Pain
        </h3>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-8 grid gap-6 md:grid-cols-3"
      >
        {stakeholders.map((s) => (
          <motion.div
            key={s.role}
            variants={revealVariants}
            className="card-surface card-hover p-8"
          >
            <s.icon size={20} strokeWidth={1.5} className="text-accent" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-text-dim">
              {s.role}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {s.problem}
            </p>
            <p className="mt-4 font-serif text-lg italic text-text/80">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <SectionReveal className="mt-16">
        <div className="rounded-xl border border-accent/10 bg-surface-2/50 p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            With JIVA
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {stakeholders.map((s) => (
              <div key={s.role} className="flex items-start gap-3">
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-signal"
                />
                <div>
                  <p className="text-sm font-medium text-text">{s.role}</p>
                  <p className="text-sm text-signal">{s.solution}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-serif text-xl italic text-text-muted">
            Connected. Aligned. Healthier — everyone wins when you stay healthy.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
