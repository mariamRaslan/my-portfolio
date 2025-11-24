"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import FrostPlate from "@/components/FrostPlate"; // 👈 add this

type Skill = { name: string; icon?: string };

type Props = {
  title?: string;
  skills: Skill[];
  speed?: number; // 1–5 is nice
  className?: string;
};

export default function SkillsSlider({
  title = "My Full Tech Stack",
  skills,
  speed = 1.2,
  className,
}: Props) {
  const isRTL =
    typeof document !== "undefined" &&
    (document.dir === "rtl" ||
      document.documentElement.getAttribute("dir") === "rtl");

  // Embla + AutoScroll (continuous)
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      direction: isRTL ? "rtl" : "ltr",
    },
    [
      AutoScroll({
        speed, // lower = slower
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  // Duplicate items so the loop is seamless
  const items = React.useMemo(() => {
    const base = skills.length ? skills : [];
    return [...base, ...base, ...base]; // triple for smoother looping
  }, [skills]);

  // 👇 this wraps ONLY the viewport area we want frosted
  const glassAreaRef = React.useRef<HTMLDivElement>(null);

  return (
    <section className={cn("py-20", className)} id="skills">
      <div className="container">
        {title && (
          <SectionHeader
            align="center"
            highlight
            title={title}
            description="Frontend architecture, component libraries, performance profiling, and smooth interactions — all wired to real-world delivery."
          />
        )}

        {/* ===== Frosted viewport wrapper ===== */}
        <div ref={glassAreaRef} className="relative mt-12">
          {/* Frosted plate aligned to this area (portal, super light) */}
          <FrostPlate target={glassAreaRef} radius={16} blur={18} />

          {/* edge fades (drawn above the plate) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-neutral-950 to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-neutral-950 to-transparent md:w-24" />

          {/* Embla viewport */}
          <div className="embla relative overflow-hidden " ref={emblaRef}>
            <div className="embla__container flex">
              {items.map((s, i) => (
                <div
                  key={`${s.name}-${i}`}
                  className="embla__slide shrink-0 basis-auto px-2 md:px-3"
                >
                  <SkillPill name={s.name} icon={s.icon} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ==================================== */}
      </div>
    </section>
  );
}

function SkillPill({ name, icon }: Skill) {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-2xl z-10",
        "border border-white/10 px-8 py-4 text-sm text-white/90",
        // no per-pill backdrop blur (the FrostPlate handles it)
        "bg-white/5",
        "transition-shadow duration-300",
        "hover:shadow-[0_0_40px_10px_rgba(151,128,255,0.18)]",
      )}
    >
      {icon ? (
        <Image
          src={icon}
          alt={name}
          width={24}
          height={24}
          className="rounded-[6px]"
        />
      ) : (
        <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-white/10 text-[10px] font-semibold">
          {name.slice(0, 1)}
        </span>
      )}
      <span className="font-medium">{name}</span>
    </div>
  );
}
