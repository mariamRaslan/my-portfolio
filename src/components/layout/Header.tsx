"use client";

import { usePathname } from "@/i18n/navigation";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { navlinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Body scroll lock when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <>
      {/* scroll progress */}
      <motion.div
        aria-hidden
        className="from-primary-800 fixed top-0 right-0 left-0 z-[99999999999] h-[3px] origin-left bg-gradient-to-r via-fuchsia-500 to-amber-400"
        style={{ scaleX }}
      />

      {/* overlay */}
      {open && (
        <button
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <header className="sticky top-5 z-[9999999999]">
        <div className="container">
          {/* wrapper MUST be isolate to keep the negative z child visible */}
          <div className="relative isolate z-0 mx-auto w-fit">
            {/* glow behind the whole navbar */}

            {/* navbar capsule */}
            <div
              className={cn(
                "flex h-16 w-fit items-center gap-6 rounded-2xl px-3 shadow-sm md:h-20 lg:h-[62px]",
                " bg-white/5 backdrop-blur-[8px]",
                // ✨ outer halo (two layers)
                "shadow-[0_0_120px_40px_rgba(151,128,255,0.16),_0_0_80px_24px_rgba(70,34,233,0.12)]",
              )}
            >
              <nav className="hidden items-center gap-1 lg:flex">
                {navlinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href + "/"));

                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="relative inline-flex items-center rounded-[10px] px-3 py-2 text-white hover:bg-white/10"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-pill"
                          className="bg-primary-800 text-primary-900 absolute inset-0 rounded-[10px] "
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                            mass: 1,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.title}</span>
                    </Link>
                  );
                })}
                               <Link
                  href="#contact"
                  className="rounded-xl   px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  Contact me
                </Link>
              </nav>

              <div className="flex gap-4 lg:gap-6">
         
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
