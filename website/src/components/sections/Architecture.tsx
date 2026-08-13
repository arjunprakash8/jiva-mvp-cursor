"use client";

import { motion } from "framer-motion";
import { Activity, Shield, Cpu, Smartphone } from "lucide-react";
import { SectionReveal } from "@/components/ui/CountUp";
import { ECGPulse } from "@/components/ui/ECGPulse";
import { HealthScoreGauge } from "@/components/ui/HealthScoreGauge";
import { staggerContainer, revealVariants } from "@/lib/motion";

const bandSpecs = [
  { label: "Model", value: "CSS W10 (PPG + ECG)" },
  { label: "Form", value: "10mm ultra-thin aviation-grade aluminium" },
  { label: "Durability", value: "IP68 · 10–15 day battery" },
  { label: "Connectivity", value: "BLE 5.1 · AES-256 hardware encryption" },
];

const sensors = [
  "256Hz medical-grade ECG (arrhythmia detection)",
  "25Hz dual-wave PPG (SpO₂, HR, HRV)",
  "3D motion (activity, gait, fall risk)",
  "Wrist + ambient temperature",
  "Algorithmic blood pressure",
  "Sleep architecture · HRV + stress",
];

const comparisons = [
  { feature: "ECG Sampling", jiva: "256 Hz", other: "125 Hz" },
  { feature: "PPG", jiva: "Dual-wave", other: "Single-LED" },
  { feature: "Encryption", jiva: "AES-256 hardware", other: "Software-only" },
  { feature: "Regulatory", jiva: "FDA/CE-ready", other: "Wellness-only" },
];

const certifications = ["FCC granted", "CE/RED certified", "RoHS passed", "SRRC certified"];

const pipeline = [
  { step: "Data Touchpoints", items: ["24/7 wearable stream", "Labs & imaging uploads", "Mobile health units"] },
  { step: "Ingest & Features", items: ["HRV · activity · sleep", "OCR + NLP mapping", "Identity verification"] },
  { step: "AI Engine", items: ["Time-series models", "Cohort analysis", "Interpretation layer"] },
  { step: "Surfaces", items: ["Patient app", "Clinician dashboards", "Insurer risk metadata"] },
];

const surfaces = [
  { icon: Smartphone, role: "Patients", desc: "App with alerts and plain-language insights" },
  { icon: Activity, role: "Clinicians", desc: "Dashboards, alerts, one-click visit records" },
  { icon: Shield, role: "Admins / IT", desc: "Provisioning, audit, RBAC" },
  { icon: Cpu, role: "Insurers", desc: "View-only risk metadata — never raw vitals" },
];

export function Architecture() {
  return (
    <section id="architecture" className="section-padding relative">
      <ECGPulse className="mb-12 opacity-30" height={28} />

      <SectionReveal>
        <p className="eyebrow">05 — HARDWARE & DATA</p>
        <h2 className="section-title mt-4 max-w-3xl">
          Medical instrument. Not a wellness toy.
        </h2>
      </SectionReveal>

      {/* JIVA Band */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <SectionReveal>
          <div className="card-surface p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
              The JIVA Band
            </p>
            <h3 className="mt-3 font-serif text-2xl text-text">
              CSS W10 — PPG + ECG
            </h3>
            <div className="mt-6 space-y-3">
              {bandSpecs.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-border/30 pb-2 text-sm">
                  <span className="text-text-dim">{s.label}</span>
                  <span className="text-text-muted">{s.value}</span>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-2">
              {sensors.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="card-surface p-8">
              <p className="font-serif text-lg italic text-text-muted">
                Others = wellness toys.{" "}
                <span className="text-text">JIVA = medical instrument.</span>
              </p>
              <div className="mt-6 space-y-3">
                {comparisons.map((c) => (
                  <div key={c.feature} className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-text-dim">{c.feature}</span>
                    <span className="text-accent">{c.jiva}</span>
                    <span className="text-text-dim/60">{c.other}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-full border border-border/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-dim"
                >
                  {cert}
                </span>
              ))}
              <span className="rounded-full border border-primary/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-primary/70">
                FDA clearance on roadmap
              </span>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Data Architecture Pipeline */}
      <SectionReveal className="mt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
          Data Architecture
        </p>
        <h3 className="mt-3 font-serif text-3xl text-text">
          Privacy-first. Role-separated. Governed.
        </h3>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 grid gap-4 md:grid-cols-4"
      >
        {pipeline.map((stage, i) => (
          <motion.div
            key={stage.step}
            variants={revealVariants}
            className="relative card-surface p-6"
          >
            {i < pipeline.length - 1 && (
              <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-accent/30 md:block" />
            )}
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-2 text-sm font-medium text-text">{stage.step}</h4>
            <ul className="mt-3 space-y-1">
              {stage.items.map((item) => (
                <li key={item} className="text-xs text-text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <SectionReveal>
          <HealthScoreGauge score={84} />
          <p className="mt-4 text-center text-sm text-text-muted">
            0–100 composite: cardiovascular + metabolic + respiratory + lifestyle
          </p>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {surfaces.map((s) => (
            <motion.div
              key={s.role}
              variants={revealVariants}
              className="card-surface card-hover p-5"
            >
              <s.icon size={18} strokeWidth={1.5} className="text-primary" />
              <p className="mt-3 text-sm font-medium text-text">{s.role}</p>
              <p className="mt-1 text-xs text-text-muted">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionReveal className="mt-12">
        <div className="rounded-xl border border-border/40 bg-surface-2/30 p-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
            Data Flywheel
          </p>
          <p className="mt-2 font-serif text-lg italic text-text-muted">
            Enroll → continuous data → ground-truth assessment → recalibrated AI
            score → risk flags → diagnostic AI at scale
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
