"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/CountUp";
import { ECGPulse } from "@/components/ui/ECGPulse";
import { staggerContainer, revealVariants } from "@/lib/motion";

const founders = [
  {
    name: "Shlok Saini",
    role: "Co-Founder & CEO",
    focus: "Vision & Innovation",
    bio: "Combining healthcare, technology, and economics to drive the shift from reactive care to prevention and early intervention. Management Science & Engineering + Economics.",
  },
  {
    name: "Arjun Prakash",
    role: "Co-Founder & COO",
    focus: "Execution & Scale",
    bio: "Operations and partnerships, turning strategy into scalable systems that grow JIVA across emerging markets. Economics + Human Biology.",
  },
];

const leadership = [
  {
    name: "Agastya Bhartia",
    role: "Co-Founder",
    focus: "AI & Life Sciences",
    bio: "Biomedical computation + Bio Engineering. Coordinating global life sciences architecture and AI strategy.",
  },
  {
    name: "Ramdev Krishnan",
    role: "CTO",
    focus: "Technology",
    bio: "Ex-Tata Communications senior leader. Directed 10,000+ mobile health units across regional markets.",
  },
  {
    name: "Dr. Deepak Kumar",
    role: "Chief Health Officer",
    focus: "Clinical",
    bio: "Two decades as an intensive care resident across Indian and Kenyan capital cities, guiding JIVA's clinical decision-making.",
  },
  {
    name: "Asif Ali Ansari",
    role: "Director",
    focus: "Institutional Network",
    bio: "Developed SHA software in partnership with Sirius IHC. Strategic institutional network lead for mass-market interoperability.",
  },
];

const advisors = [
  "Prof. Suzanne Tamang · Stanford Medicine",
  "Prof. Michael Snyder · Chair of Genetics, Stanford Medicine",
  "Prof. Thomas MaCurdy · Stanford Economics",
  "David Rhew · Global CMO, Microsoft",
  "Julie Yoo · General Partner, a16z",
  "Sitoyo Lopokoiyit · CEO, Absa & Former CEO, M-PESA Africa",
];

export function Team() {
  return (
    <section id="team" className="section-padding relative">
      <ECGPulse className="mb-12 opacity-30" height={28} />

      <SectionReveal>
        <p className="eyebrow">07 — THE TEAM</p>
        <h2 className="section-title mt-4 max-w-3xl">
          Built by actuaries, doctors, and engineers.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-text-muted">
          We aren&apos;t building a gadget — we&apos;re rewriting the actuarial
          math of life and death.
        </p>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-16 grid gap-6 md:grid-cols-2"
      >
        {founders.map((person) => (
          <motion.div
            key={person.name}
            variants={revealVariants}
            className="card-surface card-hover p-8 md:p-10"
          >
            <div className="mb-6 h-24 w-24 rounded-full border border-border/60 bg-surface-2" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
              {person.focus}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-text">{person.name}</h3>
            <p className="text-sm text-text-dim">{person.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {person.bio}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <SectionReveal className="mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
          Leadership
        </p>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {leadership.map((person) => (
          <motion.div
            key={person.name}
            variants={revealVariants}
            className="card-surface card-hover p-6"
          >
            <div className="mb-4 h-14 w-14 rounded-full border border-border/40 bg-surface-2" />
            <h4 className="font-sans text-sm font-medium text-text">
              {person.name}
            </h4>
            <p className="text-xs text-text-dim">{person.role}</p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              {person.bio}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <SectionReveal className="mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
          Advisors & Validation
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {advisors.map((advisor) => (
            <span
              key={advisor}
              className="rounded-full border border-border/40 px-4 py-2 text-xs text-text-muted"
            >
              {advisor}
            </span>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
