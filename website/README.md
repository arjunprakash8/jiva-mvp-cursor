# JIVA Technologies — Marketing Website

Investor-grade single-page marketing site for JIVA Technologies.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom design tokens)
- Framer Motion (scroll reveals, micro-interactions)
- Canvas2D biometric waveform hero (lazy-loaded)
- Lucide React icons
- Google Fonts via `next/font` (Fraunces, Inter, JetBrains Mono)

## Development

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

```
src/
  app/           # Layout, globals, page
  components/
    sections/    # Hero, Problem, WhyNow, Umbrella, Model, Architecture, Markets, Team, Nav, Footer
    ui/          # ECGPulse, BiometricWaveform, CountUp, HealthScoreGauge
  hooks/         # useReducedMotion
  lib/           # Motion constants
```
