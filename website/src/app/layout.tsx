import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JIVA Technologies — The Global Standard for Biometric Intelligence",
  description:
    "Medical-grade wearable health platform connecting insurers, clinical networks, and patients. Proactive Health. Clinical Precision. Financial Freedom.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} bg-bg text-text antialiased`}
      >
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
