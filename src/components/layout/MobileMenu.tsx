"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "@/i18n/navigation";
import Link from "next/link";
import { navlinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
   const year = new Date().getFullYear();

  // Close on route change
  React.useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Extra body lock
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Fixed button at the RIGHT on mobile, hidden when open */}
      {!open && (
        <div className="fixed top-[22px] right-4 z-[1000] lg:hidden">
          <SheetTrigger
            aria-label="Open menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/90",
              "bg-white/5 ring-1 ring-white/10 backdrop-blur-md hover:bg-white/10",
            )}
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
        </div>
      )}

      <SheetContent
        side="right"
        className={cn(
          "z-[1001] w-[88vw] max-w-[420px] border-white/10 p-0",
          "bg-white/[0.06] backdrop-blur-xl",
          "shadow-[0_0_120px_40px_rgba(151,128,255,0.16),_0_0_80px_24px_rgba(70,34,233,0.12)]",
        )}
      >
        {/* Header row */}
        <SheetHeader className="flex w-full flex-row items-center justify-between gap-3 px-4 py-4">
          <SheetTitle className="sr-only">Navigation</SheetTitle>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2"
          >
            <Image
              src="/images/gradient-logo.png"
              alt="Logo"
              width={56}
              height={56}            
            />
          </Link>

          {/* <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 text-white/80 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button> */}
        </SheetHeader>

        {/* Nav list */}
        <nav className="relative mt-2 flex flex-col gap-2 px-2 pb-4">
          {navlinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "relative inline-flex items-center rounded-[12px] px-3 py-3 text-base text-white/90 hover:bg-white/10",
              )}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="active-pill-mobile"
                  className="bg-primary-800/20 absolute inset-0 rounded-[12px]"
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
          ))}

          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="relative inline-flex items-center rounded-[12px] px-3 py-3 text-base text-white/90 hover:bg-white/10"
          >
            <span className="relative z-10">Contact me</span>
          </Link>
        </nav>

        {/* Footer note (optional) */}
        <div className="mt-auto border-t border-white/10 px-4 py-4">
          <p className="text-xs text-white/50">
            © {year} Mariam Raslan. All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
