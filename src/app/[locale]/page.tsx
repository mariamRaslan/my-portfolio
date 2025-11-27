
import { getTranslations } from "next-intl/server";

import SplashCursor from "@/components/SplashCursor";
import Hero from "@/components/pages/landing/Hero";
import { SKILLS } from "@/lib/constants";
import SkillsSlider from "@/components/pages/landing/SkillsSlider";
import ProjectsSection from "@/components/pages/landing/ProjectsSection";
import ExperienceTimeline from "@/components/pages/landing/ExperienceTimeline";
import ContactSection from "@/components/pages/landing/ContactSection";
import React from "react";

export default async function Home() {



  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-20 text-white">
      
      <Hero  />
      <ProjectsSection />
      <ExperienceTimeline />
      <SkillsSlider skills={SKILLS} />
      <ContactSection />
    </section> 
  );
}
