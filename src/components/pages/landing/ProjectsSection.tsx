// components/StackingCardsDemo.tsx
"use client";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import StackingCards, { StackingCardItem } from "@/components/fancy/blocks/stacking-cards";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cards } from "@/lib/constants";
import { useStackHeight } from "@/lib/useStackHeight";
import { useTranslations } from "next-intl";

export default function StackingCardsDemo() {
  const t = useTranslations(); // will use "projects" + "tech" namespaces below
  const total = cards.length;
  const stackHeightPx = useStackHeight(total);

  return (
    <section className="py-12 text-white" id="projects">
      <div className="container px-4 sm:px-6">
        <SectionHeader
          align="center"
          highlight
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          description={t("projects.description")}
        />
      </div>

      <div style={{ height: stackHeightPx ? `${stackHeightPx}px` : "120vh" }}>
        <StackingCards totalCards={total} scaleMultiplier={0.08}>
          {cards.map(({ bgColor, descriptionKey, image, titleKey, link, toolKeys }, index) => (
            <StackingCardItem key={index} index={index} className="z-[50] h-[540px] sm:h-[560px] md:h-[620px] lg:h-[680px]">
              <div
                className={cn(
                  "relative isolate mx-auto flex h-full w-[94%] max-w-6xl flex-col rounded-3xl bg-black/50 backdrop-blur-xl sm:bg-black/20",
                  "gap-6 px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 md:flex-row md:px-10 md:py-12",
                  "border border-white/10 shadow-[0_0_80px_24px_rgba(151,128,255,0.12)]",
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-0 z-[1] h-[46%] w-[70%] -translate-y-1/2 rounded-[1000px] opacity-50 md:h-[70%] md:w-[60%]"
                  style={{ backgroundColor: bgColor, filter: "blur(90px)" }}
                />

                {/* Left: text */}
                <div className="relative z-[3] flex flex-1 flex-col justify-center">
                  <h3 className="mb-3 text-xl font-bold sm:text-2xl md:text-3xl">
                    {t(titleKey)}
                  </h3>

                  <p className="overflow-y-hidden text-sm whitespace-pre-line text-white/80 sm:text-base">
                    {t(descriptionKey)}
                  </p>

                  {/* Tools */}
                  {toolKeys?.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {toolKeys.map((key) => (
                        <span
                          key={key}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/80 sm:text-xs"
                        >
                          {t(key)}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Link */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {link && (
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      >
                        {t("projects.visitProject")} <ArrowUpRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right: image */}
                <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-xl md:w-1/2">
                  {link ? (
                    <Link href={link} target="_blank" rel="noopener noreferrer" aria-label={t(titleKey)} className="group block w-full">
                      <Image
                        src={image}
                        alt={t(titleKey)}
                        height={900}
                        width={900}
                        className="h-auto w-full transition-transform duration-300 md:group-hover:scale-[1.02]"
                        priority={index === 0}
                      />
                    </Link>
                  ) : (
                    <Image
                      src={image}
                      alt={t(titleKey)}
                      height={900}
                      width={900}
                      className="h-auto w-full"
                      priority={index === 0}
                    />
                  )}
                </div>
              </div>
            </StackingCardItem>
          ))}
          <div className="h-[16vh] sm:h-[18vh] md:h-[20vh]" />
        </StackingCards>
      </div>
    </section>
  );
}
