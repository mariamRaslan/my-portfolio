"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function OverlayPortal({
  children,
  className = "fixed inset-0 z-[99999] pointer-events-none",
}: { children: React.ReactNode; className?: string }) {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const el = elRef.current!;
    el.className = className;
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, [className]);

  return createPortal(children, elRef.current);
}
