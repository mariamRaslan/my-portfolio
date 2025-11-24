"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    bgColor: "#82c95e",
    title: "Dorra Printing",
    description:
      "Print-on-demand & editor: product templates, mockups, payments, shipping, and admin dashboards.",
    tools: [
      "Next.js 15",
      "TypeScript",
      "Tailwind",
      "Radix/shadcn",
      "Fabric.js",
      "Fawry",
      "Paymob",
      "React Hook Form",
      "Yup",
    ],
    link: "https://dorraprint.com",
    image: "/images/photo.png",
  },
  {
    bgColor: "#d48740",
    title: "Midligner — Dashboards ",
    description:
      "Midligner is a digital orthodontic solution that offers clear aligners designed to straighten teeth discreetly and efficiently.\n" +
      "It connects dentists with orthodontists for case collaboration and tracking.",
    tools: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Radix/shadcn",
      "Matrial UI",
      "React Hook Form",
      "Zod",
    ],
    link: "https://midligner.com",
    image: "/images/photo.png",
  },
  {
    bgColor: "#ba8ad6",
    title: "Pixbyte",
    description:
      "Marketing site + feature work: RSC/ISR pages, motion polish, and a reusable UI system. Focused on performance, accessibility, and clean authoring.",
    tools: [
      "Next.js 15",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "shadcn/ui",
      "ISR",
      "RSC",
    ],
    link: "https://pixbyte.co/",
    image: "/images/photo.png",
  },
  {
    bgColor: "#0f6499",
    title: "Mawj",
    description:
      "Agency site focused on speed, accessibility, and smooth motion. Built responsive/RTL-first layouts, reusable components, and SEO-friendly pages.",
    tools: [
      "Next.js 15",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "shadcn/ui",
      "ISR",
    ],
    link: "https://mawj.agency/",
    image: "/images/photo.png",
  },
  {
    bgColor: "#0c7ea5",
    title: "Metrospeedy — Operations Dashboard",
    description:
      "• Built real-time courier/dispatch dashboard: live order feed, SLA alerts, and status timelines.\n" +
      "• Map views with clustering, courier location, route/ETA, and zone filtering.\n" +
      "• Analytics widgets and drill-downs (orders, on-time %, courier utilization).",
    tools: [
      "React js",
      "Tailwind",
      "React Query",
      "WebSockets (Pusher/Socket.io)",
      "Map SDK (Mapbox/Google)",
      "ApexCharts/Recharts",
      "AG Grid/DataGrid",
    ],
    link: "https://www.metrospeedy.com/",
    image: "/images/photo.png",
  },
  {
    bgColor: "#0f6e8f",
    title: "TalentKid",
    description:
      "• Built a fast, responsive homepage with clean sections and motion polish.\n" +
      "• Reusable UI primitives and RTL-ready styles; accessible components.\n" ,
    tools: ["Next.js 15", "TypeScript", "Tailwind", "Framer Motion"],
    link: "https://talentkid.sa/",
    image: "/images/photo.png",
  },
];

export default function StackingCardsDemo() {
  const total = cards.length;
  // Enough scroll so first shrinks, others pile on
  const stackHeight = `calc(100vh + ${(total - 1) * 65}vh)`; // tweak 60→40/80 to taste

  return (
    <section className="container py-12 text-white" id="projects">
      <SectionHeader
        align="center"
        highlight
        eyebrow="Showcase"
        title="Projects that ship"
        description="Real-world builds where performance, accessibility, and motion all work together."
      />
      {/* This wrapper creates the scroll distance (window scroll only) */}
      <div style={{ height: stackHeight }}>
        <StackingCards totalCards={total} scaleMultiplier={0.08}>
          {cards.map(
            ({ bgColor, description, image, title, link, tools }, index) => (
              // key part: sticky + full viewport height
              <StackingCardItem
                key={index}
                index={index}
                className="z-[50] h-[620px]"
              >
                <div
                  className={cn(
                    "relative isolate mx-auto flex h-full w-11/12 flex-col rounded-3xl bg-white/3 backdrop-blur-xl",
                    "gap-8 px-8 py-10 sm:flex-row",
                  )}
                >
                  {/* Right-half background light */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-0 h-[70%] w-[65%] -translate-y-1/2 rounded-[1000px] opacity-20"
                    style={{ backgroundColor: bgColor, filter: "blur(100px)" }}
                  />

                  {/* Left: text */}
                  <div className="relative z-10 flex flex-1 flex-col justify-center">
                    <h3 className="mb-3 text-2xl font-bold">{title}</h3>
                    <p className="whitespace-pre-line text-white/80">
                      {description}
                    </p>

                    {/* Tools */}
                    {tools?.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tools.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Links */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {link && (
                        <Link
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15"
                        >
                          Visit project <ArrowUpRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right: image (clickable if link provided) */}
                  <div className="relative z-10 aspect-video w-full overflow-hidden rounded-xl sm:w-1/2">
                    {link ? (
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${title}`}
                      >
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                        />
                      </Link>
                    ) : (
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              </StackingCardItem>
            ),
          )}
          {/* optional tail space */}
          <div className="h-[20vh]" />
        </StackingCards>
      </div>
    </section>
  );
}
