"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#problem", label: "Problem" },
  { href: "#why-now", label: "Why Now" },
  { href: "#umbrella", label: "Umbrella" },
  { href: "#model", label: "Model" },
  { href: "#architecture", label: "Architecture" },
  { href: "#markets", label: "Markets" },
  { href: "#team", label: "Team" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-border/40 bg-bg/80 py-3 backdrop-blur-xl"
            : "bg-transparent py-8"
        }`}
      >
        <nav className="mx-auto flex max-w-content items-center justify-between px-6 md:px-10">
          <a
            href="#"
            className={`font-sans text-sm font-semibold transition-opacity duration-500 ${
              scrolled ? "text-text" : "text-text/80"
            }`}
          >
            <span className="tracking-[0.2em]">JIVA</span>
            <span className="font-normal tracking-[0.08em] text-text-muted">
              {" "}
              Technologies
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                    scrolled ? "text-text-muted" : "text-text-dim"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Brylo-style condensed links visible on md when not scrolled */}
          <div className={`hidden items-center gap-8 md:flex lg:hidden ${scrolled ? "opacity-0" : "opacity-100"}`}>
            {["Problem", "Team", "Contact"].map((label, i) => (
              <a
                key={label}
                href={i === 2 ? "mailto:hello@jiva360.info" : i === 0 ? "#problem" : "#team"}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim transition-colors hover:text-text-muted"
              >
                {label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-text-muted md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-sans text-sm font-semibold">
                <span className="tracking-[0.2em]">JIVA</span>
                <span className="font-normal tracking-[0.08em] text-text-muted">
                  {" "}
                  Technologies
                </span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-text-muted"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-col gap-6 px-6 pt-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-mono text-sm uppercase tracking-[0.15em] text-text-muted"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
