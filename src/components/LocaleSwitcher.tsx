"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

function LocaleSwitcher({ className }: { className?: string }) {
  const pathName = usePathname();
  const locale = useLocale();

  return (
    <Link
      className={cn("flex items-center gap-2", className)}
      href={`/${pathName}`}
      locale={locale === "ar" ? "en" : "ar"}
    >
        <Globe className="size-5" />
      <span>{locale === "ar" ? "EN" : "AR"}</span>
    
    </Link>
  );
}

export default LocaleSwitcher;
