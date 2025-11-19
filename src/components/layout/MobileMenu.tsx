"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { navlinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import logoImg from "../../../public/images/logos/logo-with-name-horizontal.png";
import LocaleSwitcher from "../LocaleSwitcher";
import SheetSubMenu from "./SheetSubMenu";

function MobileMenu() {
  const t = useTranslations("header");
  const tServices = useTranslations("header.services");
  const translate = useTranslations();
  const pathname = usePathname();

  const [openSheet, setOpenSheet] = useState(false);

  // 1) Close the sheet whenever the route changes
  useEffect(() => {
    if (openSheet) setOpenSheet(false);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>

      <SheetContent className="flex max-h-screen flex-col gap-6 overflow-y-auto px-4 lg:hidden">
        <SheetHeader className="flex-row justify-btween">
          <SheetTitle />
          <SheetDescription />
          <Link href="/" onClick={() => setOpenSheet(false)}>
            <div>
              <Image src={logoImg} height={48} alt="" />
            </div>
          </Link>
        </SheetHeader>

        <nav className="flex flex-col items-start gap-4">
          {navlinks.map((link) => {
            const isActive = pathname === link.href;

            return  (
              <Link
                key={link.title}
                className={cn("px-2", { "gradient-text": isActive })}
                href={link.href}
                // 2) Close immediately when tapping a simple link
                onClick={() => setOpenSheet(false)}
              >
                {link.title }
              </Link>
            );
          })}

          <Link
            className={cn("px-2", { "gradient-text": pathname === "/contact-us" })}
            href="/contact-us"
            onClick={() => setOpenSheet(false)}
          >
            {t("contact.title")}
          </Link>
        </nav>

        <div className="mt-auto flex flex-col items-center justify-center gap-4 py-4 text-center">
          <LocaleSwitcher />
          <p className="text-sm">
            {translate("footer.copyright.part1")}
            <span className="text-success-600"> {translate("footer.copyright.part2")}</span>{" "}
            {"  |  "}
            {translate("footer.copyright.part3")}{" "}
            <a
              href="https://pixbyte.co/"
              className="text-font-black font-medium transition-all hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              title="pixbyte.co"
            >
              pixbyte.co
            </a>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
