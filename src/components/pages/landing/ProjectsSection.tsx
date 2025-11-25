"use client";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cards } from "@/lib/constants";
import { useStackHeight } from "@/lib/useStackHeight";

export default function StackingCardsDemo() {
  const total = cards.length;

  // Shorter segment on small screens, longer on md+
  const [segmentVh, setSegmentVh] = React.useState(65);



const stackHeightPx = useStackHeight(total);

  return (
    <section className="py-12 text-white" id="projects">
      <div className="container px-4 sm:px-6">
        <SectionHeader
          align="center"
          highlight
          eyebrow="Showcase"
          title="Projects that ship"
          description="Real-world builds where performance, accessibility, and motion all work together."
        />
      </div>

      {/* This wrapper creates the scroll distance (window scroll only) */}
      <div style={{ height: stackHeightPx ? `${stackHeightPx}px` : "120vh" }}>
        <StackingCards totalCards={total} scaleMultiplier={0.08}>
          {cards.map(
            ({ bgColor, description, image, title, link, tools }, index) => (
              <StackingCardItem
                key={index}
                index={index}
                // Responsive card height
                className="z-[50] h-[540px] sm:h-[560px] md:h-[620px] lg:h-[680px]"
              >
                <div
                  className={cn(
                    "relative isolate mx-auto flex h-full w-[94%] max-w-6xl flex-col rounded-3xl bg-black/50 backdrop-blur-xl sm:bg-black/20",
                    "gap-6 px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 md:flex-row md:px-10 md:py-12",
                    "border border-white/10 shadow-[0_0_80px_24px_rgba(151,128,255,0.12)]",
                  )}
                >
                  {/* Soft color glow (smaller on mobile) */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-0 z-[1] h-[46%] w-[70%] -translate-y-1/2 rounded-[1000px] opacity-50 md:h-[70%] md:w-[60%]"
                    style={{ backgroundColor: bgColor, filter: "blur(90px)" }}
                  />

                  {/* Left: text */}
                  <div className="relative z-10 z-[3] flex flex-1 flex-col justify-center">
                    <h3 className="mb-3 text-xl font-bold sm:text-2xl md:text-3xl">
                      {title}
                    </h3>

                    <p className="overflow-y-hidden text-sm whitespace-pre-line text-white/80 sm:text-base">
                      {description}
                    </p>

                    {/* Tools */}
                    {tools?.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tools.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/80 sm:text-xs"
                          >
                            {t}
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
                          Visit project <ArrowUpRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right: image */}
                  <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-xl md:w-1/2">
                    {link ? (
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${title}`}
                        className="group block w-full"
                      >
                        <Image
                          src={image}
                          alt={title}
                          height={900}
                          width={900}
                          className="h-auto w-full transition-transform duration-300 md:group-hover:scale-[1.02]"
                          priority={index === 0}
                        />
                      </Link>
                    ) : (
                      <Image
                        src={image}
                        alt={title}
                        height={900}
                        width={900}
                        className="h-auto w-full"
                        priority={index === 0}
                      />
                    )}
                  </div>
                </div>
              </StackingCardItem>
            ),
          )}
          {/* optional tail space */}
          <div className="h-[16vh] sm:h-[18vh] md:h-[20vh]" />
        </StackingCards>
      </div>
    </section>
  );
}
