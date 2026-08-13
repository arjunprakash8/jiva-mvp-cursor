import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { WhyNow } from "@/components/sections/WhyNow";
import { Umbrella } from "@/components/sections/Umbrella";
import { Model } from "@/components/sections/Model";
import { Architecture } from "@/components/sections/Architecture";
import { Markets } from "@/components/sections/Markets";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <WhyNow />
      <Umbrella />
      <Model />
      <Architecture />
      <Markets />
      <Team />
      <Footer />
    </main>
  );
}
