// components/FrostPlate.tsx
"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type FrostPlateProps = {
  target: any;
  radius?: number;
  className?: string;
  blur?: number; // px
};

export default function FrostPlate({ target, radius = 16, blur = 18, className }: FrostPlateProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    setRoot(document.getElementById("frost-root"));
  }, []);

  useEffect(() => {
    if (!target.current) return;
    const update = () => {
      const r = target.current?.getBoundingClientRect();
      if (r) setRect(r);
    };
    update();

    const onScroll = () => requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const ro = new ResizeObserver(onScroll);
    ro.observe(target.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  }, [target]);

  if (!root || !rect) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: radius,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        background: "rgba(255,255,255,0.05)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
      }}
      className={className}
    />,
    root
  );
}
