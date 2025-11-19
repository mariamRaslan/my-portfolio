import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import MotionWrapper from "../MotionWrapper";
import { getTranslations, getLocale } from "next-intl/server";

async function PageBreadcrumb({
  header,
  routes,
}: {
  header: string;
  routes: Array<{ title: string; path?: string }>;
}) {
  const t = await getTranslations("header");
  const locale = await getLocale();
  const isRTL = locale?.toLowerCase().startsWith("ar");
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <MotionWrapper
      className="relative flex items-center justify-center min-h-96 "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src="/images/header-bg.png"
        fill
        alt="page-header"
        className="h-full w-screen object-cover"
        loading="eager"
      />

      <div className="relative container z-10 flex h-full flex-col justify-center gap-12">
        {/* breadcrumb */}
        <MotionWrapper
          className="flex flex-wrap items-center px-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span key="home" className="me-2 flex items-center gap-2 text-white">
            <Link href="/" className="text-lg text-font-white">
              {t("home.title")}
            </Link>
            <Chevron className="size-5" aria-hidden />
          </span>

          {routes.map((route, index) => (
            <span key={index} className="flex items-center gap-2">
              {index === routes.length - 1 ? (
                <span className="font-medium gradient-text text-lg">
                  {route.title}
                </span>
              ) : route.path ? (
                <Link href={route.path} className="text-lg">
                  {route.title}
                </Link>
              ) : (
                <span className="font-medium text-coral-300 text-lg">
                  {route.title}
                </span>
              )}
              {index < routes.length - 1 && <Chevron className="size-5" aria-hidden />}
            </span>
          ))}
        </MotionWrapper>

        <MotionWrapper
          className="lg:text-[32px] sm:text-[28px] text-lg font-bold text-font-white lg:max-w-3/5"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          as="p"
        >
          {header}
        </MotionWrapper>
      </div>
    </MotionWrapper>
  );
}

export default PageBreadcrumb;
