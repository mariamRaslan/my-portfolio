import { getTranslations } from "next-intl/server";

import SplashCursor from "@/components/SplashCursor";
import Hero from "@/components/pages/landing/Hero";
import { SKILLS } from "@/lib/constants";
import SkillsSlider from "@/components/pages/landing/SkillsSlider";
import ProjectsSection from "@/components/pages/landing/ProjectsSection";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <section className="relative min-h-[calc(100vh-80px)]  text-white pt-20 ">
       {/* <SplashCursor /> */}
      <Hero />
       <SkillsSlider skills={SKILLS} />
       <ProjectsSection />
     
      {/* the interactive background */}
 
        {/* <h1 className="text-center text-3xl text-white">Hello, Starter kit</h1> */}
 
    </section>
  );
}
