"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
const CV_URL = "/files/Mariam-Raslan-CV.pdf";



const TITLES = [
  "Frontend Developer",
  "Next.js Specialist",
  "UI/UX Crafter",
  "Performance Tuner",
] as const;

export default function HeroSection() {
  const [i, setI] = React.useState(0);
  const title = TITLES[i % TITLES.length];

  React.useEffect(() => {
    const id = setInterval(() => setI((s) => s + 1), 2600);
    return () => clearInterval(id);
  }, []);

  // mouse spotlight (updates CSS vars for the radial gradient)
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    (e.currentTarget as HTMLElement).style.setProperty("--x", `${x}px`);
    (e.currentTarget as HTMLElement).style.setProperty("--y", `${y}px`);
  };

  return (
    <div id="hero">
      <div className="mx-auto flex w-full flex-col gap-5 pt-0 sm:pt-30 lg:pt-10 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="z-[50] text-3xl font-extrabold tracking-tight text-balance text-white md:text-5xl"
        >
          Mariam Raslan
        </motion.h1>
        {/* Rotating title */}
        <div className="z-[50] mt-2 h-8 w-full text-lg font-medium text-white/70 md:mt-3 md:h-9">
          <AnimatePresence mode="wait">
            <motion.span
              key={title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="inline-block"
            >
              {title}
            </motion.span>
          </AnimatePresence>
        </div>
        <Button variant={"animated-gradient"} className="z-[50] mx-auto w-fit">
           <a href={CV_URL} target="_blank" rel="noreferrer">
          <div className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm">
            <Download className="size-4" /> <span>Download CV</span>
          </div>
          </a>
        </Button>
      </div>
      <section 
        onMouseMove={onMove}
        className="relative  bg-neutral-950 py-12  2xl:pt-30 "
      >
        {/* moving spotlight + subtle grid */}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px] [background-position:0_0] opacity-[0.15]"
        /> 

        <div className="relative z-[50] container">
          {/* CONTENT CARD with halo */}
          <div className="mx-auto w-fit rounded-3xl">
            <div className="rounded-3xl p-[1px] shadow-[0_0_120px_40px_rgba(151,128,255,0.16),_0_0_8px_4px_rgba(70,34,233,0.12)] sm:shadow-[0_0_120px_40px_rgba(151,128,255,0.16),_0_0_80px_24px_rgba(70,34,233,0.12)]">
              <div className="max-w-[1050px] rounded-3xl border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-xl md:px-12 md:py-14">
                {/* availability badge */}
                <div className="mb-6 flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs text-white/70 md:text-sm">
                    Available for freelance / FullTime
                  </span>
                </div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight  text-white "
                >
                  Crafting fast, elegant web apps with
                  <span className="text-gradient-secondary mx-2">Next.js</span>&
                  React.
                </motion.h1>

                {/* CTA */}
                <div className="mt-8 flex  items-center gap-3">
                  <Link
                    href="#contact"
                    className="rounded-xl border border-white/10 px-5 sm:px-8 py-2 sm:py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                  >
                    Contact me
                  </Link>
                  <div className="ml-auto flex items-center gap-3">
                    <a
                      href="https://github.com/mariamRaslan"
                      target="_blank"
                      className="rounded-lg border border-white/10 p-2 text-white/80 hover:bg-white/10"
                      aria-label="GitHub"
                    >
                      <Github className="size-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mariam-raslan-0a02b1192"
                      target="_blank"
                      className="rounded-lg border border-white/10 p-2 text-white/80 hover:bg-white/10"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                    <a
                      href="mailto:mariamraslan231@gmail.com"
                      className="rounded-lg border border-white/10 p-2 text-white/80 hover:bg-white/10"
                      aria-label="Email"
                    >
                      <Mail className="size-5" />
                    </a>
                  </div>
                </div>

                {/* Tech badges + stats */}
                <div className="mt-8 flex flex-wrap items-center gap-3 text-white/70">
                  <Badge>Next.js 15</Badge>
                  <Badge>App Router</Badge>
                  <Badge>Tailwind v4</Badge>
                  <Badge>React Query</Badge>
                  <div className="sm:mx-2 h-5 w-px bg-white/10" />
                  <Stat k="3+" v="Years" />
                  <Stat k="10+" v="Projects" />
                </div>
              </div>
            </div>
          </div>

          {/* scroll hint */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-sm">Scroll</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block h-2 w-2 rounded-full bg-white/60"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs">
      {children}
    </span>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <span className="inline-flex items-baseline gap-1 rounded-lg px-2 text-xs">
      <span className="font-semibold text-white">{k}</span>
      <span className="text-white/60">{v}</span>
    </span>
  );
}
