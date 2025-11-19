"use client";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"; // shadcn/ui
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionTitle from "../SectionTitle";
import ArrowLink from "../ui/ArrowLink";
import { CustomButtonOne } from "../ui/CustomButtons";
import { IHomeServices } from "@/types/home.type";
import Link from "next/link";

type ServicesMenu = {
  title: string;
  href: string;
  sublinks?: any;
};

export default function HeaderServices({
  services,
}: {
  services: ServicesMenu;
}) {
  const t = useTranslations("header.services");
  const pathname = usePathname();
  const isActive = pathname === services.href;

  return (
    <div className="relative">
      {/* Desktop: hover-driven menu */}
      <div className="hidden lg:block">
        <HoverCard openDelay={80} closeDelay={120}>
          <HoverCardTrigger asChild>
            {/* Clicking this navigates immediately; hover opens the panel */}
            <Link
              href={services.href}
              className={cn(
                "group flex cursor-pointer items-center gap-2 px-2",
              )}
            >
              <div className="flex cursor-pointer items-center gap-2 px-2">
                <span className={cn(isActive && "gradient-text")}>
                  {t("title")}
                </span>
                <ChevronDown
                  className={cn(
                    "transition-transform duration-200",
                    "group-data-[state=open]:rotate-180",
                    isActive ? "text-[#00B9AD]" : "text-font-2",
                  )}
                />
              </div>
            </Link>
          </HoverCardTrigger>

          <HoverCardContent
            align="center"
            sideOffset={14}
            className="mt-0 w-full max-w-screen rounded-[4px]"
          >
            <div className="flex justify-between gap-6">
              <SectionTitle>
                <h2 className="text-xl font-semibold">{t("popover-header")}</h2>
              </SectionTitle>

              <Link href={services.href}>
                <CustomButtonOne text={t("popover-btn")} />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {services.sublinks?.map((item:any) => (
                <div
                  key={item.id ?? item.name}
                  className="hover:border-success-600 rounded-lg border border-neutral-100 p-4 text-start transition-all"
                >
                  <ArrowLink
                    href={`${services.href}#service${item.id}`}                  
                    text={item.name}
                  />
                </div> 
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Mobile/Tablet: no hover — just a plain link (your MobileMenu handles the expandable list) */}
      <div className="lg:hidden">
        <Link
          href={services.href}
          className={cn("px-2", { "gradient-text": isActive })}
        >
          <div className="flex items-center gap-2 px-2">
            <span>{t("title")}</span>
            <ChevronDown />
          </div>
        </Link>
      </div>
    </div>
  );
}
