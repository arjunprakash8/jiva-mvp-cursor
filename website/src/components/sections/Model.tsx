"use client";

import { motion } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { SectionReveal } from "@/components/ui/CountUp";
import { CountUp } from "@/components/ui/CountUp";
import { ECGPulse } from "@/components/ui/ECGPulse";
import { staggerContainer, revealVariants } from "@/lib/motion";

const insurerBenefits = [
  "Shared-savings pool from reduced chronic claims",
  "Loss ratios pushed from 112%+ toward under 100%",
  "Fraud reduction via continuous biometric data",
  "Prevention of late-stage high-cost interventions",
];

const revenueEngines = [
  {
    title: "Core Commercial",
    description:
      "Insurer per-member subscription — scales linearly with enrolled lives.",
    tag: "Active",
  },
  {
    title: "Structural Billing Layer",
    description:
      "Remote-patient-monitoring reimbursement share — the US/CMS structural opportunity ($1,200–$1,800 PPY).",
    tag: "Scaling",
  },
  {
    title: "Data & AI Asset",
    description:
      "Proprietary diagnostic model. Data stays inside JIVA; charges for health scores, risk flags, and diagnostic assessments as SaMD.",
    tag: "Compounding",
  },
  {
    title: "Pharma Data Licensing",
    description:
      "Globally representative longitudinal datasets for biopharma research — the demographic defensibility moat.",
    tag: "Future",
  },
];

export function Model() {
  return (
    <section
      id="model"
      className="section-padding relative border-t border-border/30 bg-surface/40"
    >
      <ECGPulse className="mb-12 opacity-30" height={28} />

      <SectionReveal>
        <p className="eyebrow">04 — THE MODEL</p>
        <h2 className="section-title mt-4 max-w-3xl">
          B2B2C: aligned so everyone wins when you stay healthy.
        </h2>
      </SectionReveal>

      {/* 3-node flow diagram */}
      <SectionReveal className="mt-16">
        <div className="relative mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            {["JIVA", "Insurer", "Member"].map((node, i) => (
              <div key={node} className="flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border/60 bg-surface-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    {node}
                  </span>
                </div>
                {i < 2 && (
                  <ArrowRight
                    size={16}
                    className="my-2 rotate-90 text-accent/50 md:my-0 md:rotate-0"
                    strokeWidth={1.5}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-text-dim">
            <RefreshCw size={14} strokeWidth={1.5} className="text-signal" />
            <span>
              Healthier members → fewer claims → shared savings
            </span>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mt-16">
        <p className="max-w-2xl text-text-muted">
          Insurers pay JIVA a per-member subscription. JIVA equips members with
          the band and app; clinicians get a real-time dashboard; insurers get a
          population-health risk dashboard — view-only metadata, never raw vitals.
        </p>
      </SectionReveal>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-8 grid gap-3 sm:grid-cols-2"
      >
        {insurerBenefits.map((b) => (
          <motion.li
            key={b}
            variants={revealVariants}
            className="flex items-start gap-3 text-sm text-text-muted"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            {b}
          </motion.li>
        ))}
      </motion.ul>

      {/* Unit economics */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-16 grid gap-4 sm:grid-cols-3"
      >
        {[
          {
            value: 8,
            prefix: "$",
            suffix: "/mo",
            label: "PMPM subscription (Kenya, insurer-paid)",
          },
          {
            value: 5,
            suffix: " mo",
            label: "Device payback — pure margin thereafter",
          },
          {
            value: 96,
            prefix: "$",
            suffix: "/yr",
            label: "Annual cost — one prevented hospitalization nets positive",
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={revealVariants}
            className="card-surface p-6 text-center"
          >
            <div className="font-serif text-3xl text-accent">
              <CountUp
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <p className="mt-2 text-xs text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Revenue engines */}
      <SectionReveal className="mt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
          Revenue Engines
        </p>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-8 space-y-4"
      >
        {revenueEngines.map((engine, i) => (
          <motion.div
            key={engine.title}
            variants={revealVariants}
            className="card-surface card-hover flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-sans font-medium text-text">
                  {engine.title}
                </h4>
                <p className="mt-1 text-sm text-text-muted">
                  {engine.description}
                </p>
              </div>
            </div>
            <span className="shrink-0 self-start rounded-full border border-border/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-dim md:self-center">
              {engine.tag}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
