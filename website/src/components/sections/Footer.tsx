import { ECGPulse } from "@/components/ui/ECGPulse";

const links = [
  { href: "#problem", label: "Problem" },
  { href: "#why-now", label: "Why Now" },
  { href: "#umbrella", label: "Umbrella" },
  { href: "#model", label: "Model" },
  { href: "#architecture", label: "Architecture" },
  { href: "#markets", label: "Markets" },
  { href: "#team", label: "Team" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-bg px-6 py-16 md:px-10">
      <ECGPulse className="mb-10 opacity-25" height={24} />

      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-sans text-sm font-semibold tracking-[0.25em] text-text">
              JIVA
            </p>
            <p className="mt-3 font-serif text-lg italic text-wealth">
              Health is Wealth.
            </p>
            <a
              href="https://jiva360.info"
              className="mt-2 block text-sm text-text-muted transition-colors hover:text-accent"
            >
              jiva360.info
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-dim transition-colors hover:text-text-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/30 pt-8 text-xs text-text-dim md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jiva Technologies Limited</p>
          <p className="font-mono uppercase tracking-wider">
            Confidential — Investor Materials
          </p>
        </div>
      </div>
    </footer>
  );
}
