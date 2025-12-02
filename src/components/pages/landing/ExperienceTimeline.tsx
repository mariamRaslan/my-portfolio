// components/ExperienceTimeline.tsx
"use client";

import SectionHeader from "@/components/SectionHeader";
import * as React from "react";
import Tilt from "react-parallax-tilt";
import { useTranslations } from "next-intl";

type ItemKey = {
  dateKey: string;
  orgKey: string;
  titleKey: string;
  descKey: string;
};

const items: ItemKey[] = [
  {
    dateKey: "experience.items.px.date",
    orgKey: "experience.items.px.org",
    titleKey: "experience.items.px.title",
    descKey: "experience.items.px.desc",
  },
  {
    dateKey: "experience.items.ml.date",
    orgKey: "experience.items.ml.org",
    titleKey: "experience.items.ml.title",
    descKey: "experience.items.ml.desc",
  },
  {
    dateKey: "experience.items.iti.date",
    orgKey: "experience.items.iti.org",
    titleKey: "experience.items.iti.title",
    descKey: "experience.items.iti.desc",
  },
  {
    dateKey: "experience.items.bsc.date",
    orgKey: "experience.items.bsc.org",
    titleKey: "experience.items.bsc.title",
    descKey: "experience.items.bsc.desc",
  },
];

function TimelineCard({
  item,
  active,
}: {
  item: ItemKey;
  active: boolean;
}) {
  const t = useTranslations();
  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1200} transitionSpeed={900} glareEnable={false}>
      <article
        className={[
          "relative rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,.35)] backdrop-blur-xl",
          "duration-500",
          active ? "opacity-100 shadow-[0_16px_44px_rgba(151,128,255,.25)]" : "opacity-70",
        ].join(" ")}
      >
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="rounded-full bg-[#9780ff]/20 px-3 py-1 text-xs font-semibold text-[#9780ff] ring-1 ring-[#9780ff]/30">
            {t(item.dateKey)}
          </span>
        </div>
        <h3 className="text-xl leading-tight font-semibold">{t(item.orgKey)}</h3>
        <p className="mt-1 text-[#9780ff]">{t(item.titleKey)}</p>
        <p className="mt-3 whitespace-pre-line text-white/70">{t(item.descKey)}</p>
        <span className="absolute top-4 right-4 block size-2 rounded-full bg-[#9780ff]" />
      </article>
    </Tilt>
  );
}

export default function ExperienceTimeline() {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [activeIndex, setActive] = React.useState(0);
  const nodeRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations();

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
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pct = Math.max(0, Math.min(100, progress * 100));

  return (
    <div id="experience" className="pt-30 sm:pt-40 xl:pt-44">
      <section className="relative overflow-hidden ">
        <SectionHeader
          align="center"
          highlight
          eyebrow={t("experience.eyebrow")}
          title={t("experience.title")}
          description={t("experience.description")}
          className="z-[9]"
        />
      </section>

      <section
        ref={wrapRef}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 mt-5 sm:mt-0"
        style={{ "--mid": "280px", "--brand": "#9780ff" } as React.CSSProperties}
      >
        {/* spine */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-full w-px -translate-x-1/2">
          <div className="absolute inset-0 bg-white/10" />
          <div
            className="absolute top-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full"
            style={{
              height: `${pct}%`,
              background: "linear-gradient(to bottom, var(--brand), rgba(147, 126, 245, 0.2))",
              boxShadow: "0 0 18px rgba(151,128,255,.45)",
            }}
          />
        </div>

        {/* rows */}
        <div className="relative z-[9] grid gap-y-20 lg:grid-cols-[minmax(0,1fr)_var(--mid)_minmax(0,1fr)]">
          {items.map((item, i) => {
            const left = i % 2 === 0;
            const isActive = i === activeIndex;

            return (
              <div key={i} className="contents">
                {left ? (
                  <div ref={(el) => void (nodeRefs.current[i] = el)} data-index={i}>
                    <TimelineCard item={item} active={isActive} />
                  </div>
                ) : (
                  <div className="hidden lg:block" />
                )}

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

                {left ? (
                  <div className="hidden lg:block" />
                ) : (
                  <div ref={(el) => void (nodeRefs.current[i] = el)}  data-index={i}>
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
