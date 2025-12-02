// hooks/useStableStackHeight.ts
"use client";
import * as React from "react";

function getFactor(w: number) {
  if (w === 1024) return 0.46;           // exactly 1024
  if (w === 375)  return 0.86;
  if (w === 412)  return 0.58;
  if (w >= 1920)  return 0.73;
  if (w >= 1025)  return 1.15;           // desktops above 1024
  if (w >= 912)   return 0.50;           // 768–1023 bucket
  if (w >= 820)   return 0.49;           // 768–1023 variant
  if (w >= 768)   return 0.59;
  if (w >= 540)   return 0.79;
  if (w >= 414)   return 0.59;
  if (w >= 390)   return 0.72;
  if (w >= 360)   return 0.76;
  return 0.75;                            // mobiles
}

export function useStableStackHeight(totalCards: number) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const recalc = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const w = window.innerWidth; // width is safe to read
    const base = document.documentElement.clientHeight; // stable layout viewport height in px
    const factor = getFactor(w);

    const segPx = base * factor;                  // float px (keep fractional)
    const totalPx = base + Math.max(0, totalCards - 1) * segPx;

    // Set exact height in px (not min-height). No rounding.
    el.style.height = `${totalPx}px`;
    el.style.setProperty("--segpx", `${segPx}px`); // expose for tail space
  }, [totalCards]);

  React.useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(document.documentElement);
    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
    };
  }, [recalc]);

  return ref;
}
