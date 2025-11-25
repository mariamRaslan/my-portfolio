"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Align = "left" | "center";

export type SectionHeaderProps = {
  id?: string; // optional anchor id for deep linking
  eyebrow?: React.ReactNode; // small pill over the title
  title: React.ReactNode; // main heading
  description?: React.ReactNode; // supporting text
  actions?: React.ReactNode; // buttons/links row
  align?: Align;
  size?: "sm" | "md" | "lg";
  highlight?: boolean; // gradient text for title
  className?: string;
  showDivider?: boolean; // thin divider under header
  withProgress?: boolean; // section scroll progress bar
};

/**
 * Reusable header for home sections.
 * - Uses brand #9780ff by default (can be driven by CSS vars)
 * - Alternates alignment via `align`
 * - Optional gradient-highlighted title via `highlight`
 * - Optional progress bar that fills as the *section* scrolls into view
 */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  size = "lg",
  highlight = false,
  className,
  showDivider = false,
  withProgress = false,
}: SectionHeaderProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0); // 0..1 for the nearest <section/>

  // Section progress (optional)
  React.useEffect(() => {
    if (!withProgress) return;
    const el = rootRef.current;
    const section = el?.closest("section") as HTMLElement | null;
    if (!section) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when section is below viewport, 1 when top is far above and bottom has passed
        const total = r.height + vh; // consider entering + leaving viewport
        const seen = Math.min(total, Math.max(0, vh - r.top));
        setProgress(seen / total);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [withProgress]);

  const alignWrap = align === "center" ? "items-center text-center" : "items-start text-left";
  const titleSize =
    size === "sm"
      ? "text-2xl sm:text-3xl"
      : size === "md"
      ? "text-3xl sm:text-5xl"
      : "text-4xl sm:text-6xl"; // lg

  return (
    <div ref={rootRef} id={id} className={cn("relative z-[50]", className)}>
      <header className={cn("flex flex-col gap-4", alignWrap)}>
        {eyebrow && (
          <div className="inline-flex items-center gap-2">
            <span
              className={cn(
                "rounded-[var(--radius)] px-3 py-1 text-xs font-semibold",
                "text-white/70 ring-1 ring-[#f59e0b]/30 bg-[#f59e0b]/10"
              )}
            >
              {eyebrow}
            </span>
          </div>
        )}

        <h2
          className={cn(
            "font-semibold leading-tight tracking-tight  text-3xl sm:text-4xl",
         
            highlight &&
              "text-gradient"
          )}
        >
          {title}       
        </h2>
        {description && (
          <p className={cn("max-w-prose text-pretty text-white/70", align === "center" && "mx-5 sm:mx-auto")}>{description}</p>
        )}

        {actions && (
          <div className={cn("mt-4 flex flex-wrap gap-3", align === "center" && "justify-center")}>{actions}</div>
        )}

        {showDivider && (
          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        )}

        {withProgress && (
          <div className={cn("mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10 max-w-[300px]", align === "center" && "mx-auto")}> 
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.max(0, Math.min(100, progress * 100)).toFixed(2)}%`,
                background:
                  progress >= 0.995
                    ? "#9780ff" // solid when complete
                    : "linear-gradient(to right, #9780ff, rgba(151,128,255,0.1))",
                boxShadow: "0 0 14px rgba(151,128,255,.45)",
                transition: "width 160ms linear",
              }}
            />
          </div>
        )}
      </header>
    </div>
  );
}
