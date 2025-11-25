"use client";

import * as React from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import Image from "next/image";

type Props = {
  logoSrc?: string;
  /** gradient string e.g. "linear-gradient(180deg,#6e17b4 0%,#5c149d 50%,#2b0a4b 100%)" */
  bgGradient?: string;
  fg?: string; // ring/divider color
  durationMs?: number; // hold BEFORE split (whole logo visible)
  splitDurationMs?: number; // curtains + halves travel time
  ringDurationMs?: number; // ring draw time
  size?: number; // logo square size (px)
  onlyOnce?: boolean;
};

const SEEN_KEY = "split-curtain-loader-seen-v8";

export default function SplitCurtainLoader({
  logoSrc = "/logo.svg",
  bgGradient = "linear-gradient(180deg,#6e17b4 0%,#5c149d 50%,#2b0a4b 100%)",
  fg = "#ffffff",
  durationMs = 1100,
  splitDurationMs = 1400,
  ringDurationMs = 600,
  size = 120,
  onlyOnce = false, // show every reload
}: Props) {
  const [visible, setVisible] = React.useState(false);
  const [splitting, setSplitting] = React.useState(false); // 🔑 phase switch
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // curtains easing
  const curtainTrans: Transition = reduced
    ? { duration: 0, ease: "linear" }
    : { duration: splitDurationMs / 1000, ease: [0.22, 1, 0.36, 1] };

  const easeQuick: Transition["ease"] = reduced ? "linear" : [0.22, 1, 0.36, 1];

  // ring geometry
  const stroke = 2.5;
  const ringBox = size + 20;
  const r = ringBox / 2 - stroke;
  const C = Math.PI * 2 * r;

  React.useEffect(() => {
    if (onlyOnce && sessionStorage.getItem(SEEN_KEY) === "1") return;

    setVisible(true);
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // Phase 1: HOLD (whole logo visible)
    const t1 = window.setTimeout(() => setSplitting(true), durationMs);

    // Phase 2: SPLIT (curtains move w/ logo halves)
    const t2 = window.setTimeout(
      () => {
        setVisible(false);
        if (onlyOnce) sessionStorage.setItem(SEEN_KEY, "1");
        html.style.overflow = "";
        body.style.overflow = "";
      },
      durationMs + splitDurationMs + 16,
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSplitting(true);
        window.clearTimeout(t2);
        const t3 = window.setTimeout(() => {
          setVisible(false);
          html.style.overflow = "";
          body.style.overflow = "";
        }, splitDurationMs);
        return () => window.clearTimeout(t3);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [durationMs, splitDurationMs, onlyOnce]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="split-loader"
        className="fixed inset-0"
        style={{ zIndex: 2147483647, isolation: "isolate", color: fg }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }} // curtains reveal; no global fade
        aria-hidden
      >
        {/* ========= Center cluster: short side dividers + ring + WHOLE logo ========= */}
        <div className="pointer-events-none absolute inset-0 z-[6] grid place-items-center">
          {/* side dividers + ring */}
          <motion.div
            className="flex items-center"
            style={{ gap: 14 }}
            animate={{ opacity: splitting ? 0 : 1, y: splitting ? -4 : 0 }}
            transition={{ duration: 0.2, ease: easeQuick }}
          >
            {/* left divider (cap 200px) */}
            <motion.div
              className="h-px"
              style={{
                width: "min(200px, 26vw)",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,.35), rgba(255,255,255,.15), transparent)",
                transformOrigin: "right",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: splitting ? 0 : 1 }}
              transition={{ duration: 0.45, ease: easeQuick }}
            />
            {/* ring */}
            <div
              className="relative grid place-items-center"
              style={{ width: ringBox, height: ringBox }}
            >
              <svg
                width={ringBox}
                height={ringBox}
                className="absolute inset-0"
              >
                <motion.circle
                  cx={ringBox / 2}
                  cy={ringBox / 2}
                  r={r}
                  fill="none"
                  stroke={fg}
                  strokeOpacity={0.7}
                  strokeWidth={stroke}
                  strokeDasharray={C}
                  initial={{ strokeDashoffset: C }}
                  animate={{
                    strokeDashoffset: splitting ? C : 0, // retract on split
                  }}
                  transition={{
                    duration: splitting
                      ? 0.18
                      : reduced
                        ? 0
                        : ringDurationMs / 1000,
                    ease: easeQuick,
                    delay: splitting ? 0 : 0.05,
                  }}
                  style={{ filter: `drop-shadow(0 0 8px ${fg}48)` }}
                />
              </svg>
              {/* the WHOLE logo (only during HOLD) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: splitting ? 0 : 1, scale: 1 }}
                transition={{ duration: 0.22, ease: easeQuick }}
              >
                <Image
                  src={logoSrc}
                  alt="Logo"
                  height={520}
                  width={520}
                  priority
                  className="h-[120px] w-[120px] object-contain"
                />
              </motion.div>
            </div>
            {/* right divider (cap 200px) */}
            <motion.div
              className="h-px"
              style={{
                width: "min(200px, 26vw)",
                background:
                  "linear-gradient(270deg, rgba(255,255,255,.35), rgba(255,255,255,.15), transparent)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: splitting ? 0 : 1 }}
              transition={{ duration: 0.45, ease: easeQuick }}
            />
          </motion.div>
        </div>

        {/* ========= Curtains (gradient) that CARRY the split halves ========= */}
        {/* TOP curtain + TOP half (visible only when splitting) */}
        <motion.div
          className="fixed inset-x-0 top-0 z-[5] h-1/2"
          style={{
            backgroundImage: bgGradient,
            borderColor: "rgba(255,255,255,.25)",
          }}
          animate={{ y: splitting ? "-100%" : "0%" }}
          transition={curtainTrans}
        >
          <motion.div
            className="pointer-events-none absolute bottom-[-60px] left-1/2 -translate-x-1/2"
            style={{ width: size, height: size }}
            initial={false}
            animate={{ opacity: splitting ? 1 : 0 }} // 🔒 halves hidden until split starts
            transition={{ duration: 0, ease: "linear" }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "inset(0 0 50% 0)" }} // top half
            >
              <Image
                src={logoSrc}
                alt="Logo"
                fill
                priority
                sizes={`${size}px`}
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM curtain + BOTTOM half */}
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[5] h-1/2"
          style={{
            backgroundImage: bgGradient,
            borderColor: "rgba(255,255,255,.25)",
          }}
          animate={{ y: splitting ? "100%" : "0%" }}
          transition={curtainTrans}
        >
          <motion.div
            className="pointer-events-none absolute top-[-60px] left-1/2 -translate-x-1/2"
            style={{ width: size, height: size }}
            initial={false}
            animate={{ opacity: splitting ? 1 : 0 }}
            transition={{ duration: 0, ease: "linear" }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "inset(50% 0 0 0)" }} // bottom half
            >
              <Image
                src={logoSrc}
                alt="Logo"
                fill
                priority
                sizes={`${size}px`}
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
