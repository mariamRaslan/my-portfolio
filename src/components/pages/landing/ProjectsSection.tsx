"use client";
import { useRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";

const cards = [
  {
    bgColor: "#82c95e",
    title: "The Guiding Light",
    description:
      "Lighthouses have stood as beacons of hope for centuries, guiding sailors safely through treacherous waters. Their glowing light and towering presence serve as a reminder of humanity’s connection to the sea.",
    image: "/images/photo.png",
  },
  {
    bgColor: "#d48740",
    title: "Life Beneath the Waves",
    description:
      "From shimmering schools of fish to solitary hunters, the ocean is home to an incredible variety of marine life. Each species plays a vital role in maintaining the balance of underwater ecosystems.",
    image: "/images/photo.png",
  },
  {
    bgColor: "#ba8ad6",
    title: "Alone on the Open Sea",
    description:
      "Drifting across the endless horizon, traveling alone on the sea is a test of courage and resilience. With nothing but the waves and the sky, solitude becomes both a challenge and a source of deep reflection.",
    image: "/images/photo.png",
  },
  {
    bgColor: "#0f6499",
    title: "The Art of Sailing",
    description:
      "Harnessing the power of the wind, sailing is both a skill and an adventure. Whether racing across the waves or leisurely cruising, it’s a timeless way to explore the vast blue expanse.",
    image: "/images/photo.png",
  },
];

export default function StackingCardsDemo() {
  const total = cards.length;
  // Enough scroll so first shrinks, others pile on
  const stackHeight = `calc(100vh + ${(total - 1) * 60}vh)`; // tweak 60→40/80 to taste

  return (
    <section className="container text-white">
      {/* This wrapper creates the scroll distance (window scroll only) */}
      <div style={{ height: stackHeight }}>
        <StackingCards totalCards={total} scaleMultiplier={0.08}>
          {cards.map(({ bgColor, description, image, title }, index) => (
            // key part: sticky + full viewport height
            <StackingCardItem key={index} index={index} className="h-[620px]">
              <div
                className={cn(
                  "relative isolate mx-auto flex h-full w-11/12 flex-col rounded-3xl bg-[#141414] px-8 py-10 sm:flex-row",
                )}
              >
                {/* Right-half background light */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-0 h-[70%] w-[65%] -translate-y-1/2 rounded-[1000px] opacity-20"
                  style={{
                    backgroundColor: bgColor,
                    filter: "blur(100px)",
                  }}
                />

                <div className="relative z-10 flex flex-1 flex-col justify-center">
                  <h3 className="mb-5 text-2xl font-bold">{title}</h3>
                  <p>{description}</p>
                </div>

                <div className="relative z-10 aspect-video w-full overflow-hidden rounded-xl sm:w-1/2">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </StackingCardItem>
          ))}
          {/* optional tail space */}
          <div className="h-[20vh]" />
        </StackingCards>
      </div>
    </section>
  );
}
