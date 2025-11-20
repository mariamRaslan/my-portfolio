import { getTranslations } from "next-intl/server";

import SplashCursor from "@/components/SplashCursor";
import Hero from "@/components/pages/landing/Hero";
import { SKILLS } from "@/lib/constants";
import SkillsSlider from "@/components/pages/landing/SkillsSlider";
import ProjectsSection from "@/components/pages/landing/ProjectsSection";
import ExperienceTimeline from "@/components/pages/landing/ExperienceTimeline";
import ContactSection from "@/components/pages/landing/ContactSection";

export default async function Home() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-20 text-white">
      {/* <SplashCursor /> */}
      <Hero />
      <ProjectsSection />
      <section className="relative isolate overflow-hidden bg-neutral-950 py-30">
        <ExperienceTimeline />
      </section>
      <SkillsSlider skills={SKILLS} />
      <ContactSection />
    </section>
  );
}
