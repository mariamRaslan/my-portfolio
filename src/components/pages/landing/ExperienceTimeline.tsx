"use client";

import SectionHeader from "@/components/SectionHeader";
import SplashCursor from "@/components/SplashCursor";
import * as React from "react";
import Tilt from "react-parallax-tilt";

type Item = {
  date: string;
  title: string;
  org: string;
  desc: string;
};

const items: Item[] = [
  {
    date: "Jan 2025 - present",
    org: "Pixbyte",
    title: "Frontend Developer",
    desc:
      "• Owning the web frontend in Next.js 15 (App Router, RSC) with TypeScript & Tailwind.\n" +
      "• Built a reusable UI kit (Radix + shadcn) and SSR/ISR + React Query data layer.\n",
  },
  {
    date: "Jul 2023 - Jan 2025",
    org: "Mobileaders",
    title: "Frontend Developer",
    desc:
      "• Shipped accessible, RTL-ready UIs and form flows (React Hook Form + Zod).\n" +
      "• Built dashboards, role/permission-based admin, and i18n with full RTL support.\n",
  },
  {
    date: "Oct 2022 - Jun 2023",
    org: "Information Technology Institute (ITI)",
    title: "9 month trainee",
    desc: "9 Month professional Diploma, open source aplication development track.",
  },
  {
    date: "2017 - 2021",
    org: "Faculty of Computer and Information Science",
    title: "BSc — Information Technology",
    desc:
      "• Core CS foundations: algorithms, data structures, OOP, databases, networks.\n" +
      "• Graduated with a very Good grade.",
  },
];

function TimelineCard({ item, active }: { item: Item; active: boolean }) {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1200}
      transitionSpeed={900}
      glareEnable={false}
    >
      <article
        className={[
          "relative rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,.35)] backdrop-blur-xl",
          "duration-500",
          active
            ? "opacity-100 shadow-[0_16px_44px_rgba(151,128,255,.25)]"
            : "opacity-70",
        ].join(" ")}
      >
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="rounded-full bg-[#9780ff]/20 px-3 py-1 text-xs font-semibold text-[#9780ff] ring-1 ring-[#9780ff]/30">
            {item.date}
          </span>
        </div>
        <h3 className="text-xl leading-tight font-semibold">{item.org}</h3>
        <p className="mt-1 text-[#9780ff]">{item.title} </p>
        <p className="mt-3 whitespace-pre-line text-white/70">{item.desc}</p>
        <span className="absolute top-4 right-4 block size-2 rounded-full bg-[#9780ff]" />
      </article>
    </Tilt>
  );
}

export default function ExperienceTimeline() {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0); // 0..1
  const [activeIndex, setActive] = React.useState(0);
  const nodeRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // scroll progress for spine fill
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.5;
      const passed = Math.min(total, Math.max(0, vh * 0.5 - r.top));
      setProgress(passed / total);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // pick the card whose center is closest to the viewport center
  React.useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      ticking = false;
      const vh = window.innerHeight;
      let bestIdx = 0;
      let bestScore = Number.POSITIVE_INFINITY;

      nodeRefs.current.forEach((el, idx) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        // consider only items that are at least partially on screen
        if (r.bottom < 0 || r.top > vh) return;
        const center = r.top + r.height / 2;
        const score = Math.abs(center - vh / 2);
        if (score < bestScore) {
          bestScore = score;
          bestIdx = idx;
        }
      });

      setActive(bestIdx);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    // run once and then on scroll/resize
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pct = Math.max(0, Math.min(100, progress * 100));
  const done = pct >= 99.5; // tweak threshold if needed
  return (
    <div id="experience">
      <section className="relative overflow-hidden py-20">
        <SectionHeader
          align="center"
          highlight
          eyebrow="Journey"
          title="Experience that scales"
          description="A concise timeline of roles and shipped outcomes—collaboration, iteration, and delivery."
          className="z-[50]"
        />
      </section>
      <section
        ref={wrapRef} // <-- attach the ref so progress can be computed
        className="relative mx-auto max-w-7xl px-4 sm:px-6"
        style={
          { "--mid": "280px", "--brand": "#9780ff" } as React.CSSProperties
        } // bigger center gap
      >
        {/* spine */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-full w-px -translate-x-1/2">
          <div className="absolute inset-0 bg-white/10" />
          {/* fill based on scroll progress */}
          <div
            className="absolute top-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full"
            style={{
              height: `${Math.max(0, Math.min(100, progress * 100))}%`,
              background:
                "linear-gradient(to bottom, var(--brand), rgba(147, 126, 245, 0.2))",
              boxShadow: "0 0 18px rgba(151,128,255,.45)",
            }}
          />
        </div>

        {/* rows */}
        <div className="relative z-[99999999999999] grid gap-y-20 lg:grid-cols-[minmax(0,1fr)_var(--mid)_minmax(0,1fr)]">
          {items.map((item, i) => {
            const left = i % 2 === 0;
            const isActive = i === activeIndex;

            return (
              <div key={i} className="contents">
                {/* LEFT column */}
                {left ? (
                  <div
                    ref={(el: any) => (nodeRefs.current[i] = el)}
                    data-index={i} // <-- needed for IntersectionObserver
                  >
                    <TimelineCard item={item} active={isActive} />
                  </div>
                ) : (
                  <div className="hidden lg:block" />
                )}

                {/* MIDDLE column (dot with soft ping when active) */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={[
                      "relative block size-3 rounded-full border border-white/20",
                      isActive ? "bg-[var(--brand)]" : "bg-white/10",
                    ].join(" ")}
                    style={{
                      boxShadow: isActive
                        ? "0 0 0 8px rgba(151,128,255,.18), 0 0 16px rgba(151,128,255,.6)"
                        : "none",
                    }}
                  />
                  <span
                    className={
                      isActive
                        ? "absolute size-6 animate-[ping-soft_1.6s_ease-out_infinite] rounded-full"
                        : "absolute size-6 rounded-full"
                    }
                    style={{ boxShadow: "0 0 0 0 rgba(151,128,255,.35)" }}
                  />
                </div>

                {/* RIGHT column */}
                {left ? (
                  <div className="hidden lg:block" />
                ) : (
                  <div
                    ref={(el: any) => (nodeRefs.current[i] = el)}
                    data-index={i} // <-- needed for IntersectionObserver
                  >
                    <TimelineCard item={item} active={isActive} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
