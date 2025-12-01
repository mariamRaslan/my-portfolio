// components/Footer.tsx
"use client";

import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-white/10 py-6">
      <div className="container mx-auto text-sm text-white/60">
        <p className="text-center">
          {t("copy", { year, name: "Mariam Raslan" })}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
