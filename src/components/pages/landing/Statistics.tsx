import Image from "next/image";
import MotionWrapper from "@/components/MotionWrapper";
import CountUpNumber from "@/components/ui/CountUp";
import { IHomeCarousel } from "@/types/home.type";
import { useTranslations } from "next-intl";

type StatisticsProps = {
  data: IHomeCarousel;
  locale?: string; // optional, for future number formatting
};

function toNumber(v: string | number | undefined, fallback = 0) {
  if (v === undefined || v === null) return fallback;
  const n = typeof v === "string" ? Number(v.replace(/[, ]+/g, "")) : v;
  return Number.isFinite(n) ? (n as number) : fallback;
}

export default function Statistics({ data, locale = "ar" }: StatisticsProps) {
  const t = useTranslations("stats");
  const stats = [
    {
      icon: "/icons/reports-colored.svg",
      text: t("reports"),
      value: toNumber(data?.reports_count, 0),
      alt: t("reportsAlt"),
    },
    {
      icon: "/icons/certificate-colored.svg",
      text: t("certificates"),
      value: toNumber(data?.certificates_count, 0),
      alt: t("certificatesAlt"),
    },
    {
      icon: "/icons/partners-colored.svg",
      text: t("partners"),
      value: toNumber(data?.partners_count, 0),
      alt: t("partnersAlt"),
    },
    {
      icon: "/icons/clients-colored.svg",
      text: t("clients"),
      value: toNumber(data?.clients_count, 0),
      alt: t("clientsAlt"),
    },
  ];

  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container -mt-16 md:w-fit md:max-w-[screen] lg:mx-auto"
    >
      <div className="container">
        <div className="bg-neutral-0 mobile:grid-cols-1 grid items-center justify-start sm:justify-center gap-[32px] sm:gap-6 rounded-lg border border-neutral-200 p-6 sm:p-8 md:grid-cols-4 md:p-10 lg:divide-x lg:divide-neutral-200">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 sm:space-y-6 items-start sm:items-center md:pe-6 lg:min-w-[183px]"
            >
              <div className="flex items-center gap-2">
                <MotionWrapper
                  className="shrink-0"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={item.icon}
                    width={32}
                    height={32}
                    alt={item.text}
                  />
                </MotionWrapper>
                <span className="text-font-black text-lg sm:text-2xl font-medium">
                  {item.text}
                </span>
              </div>

              <CountUpNumber
                end={item.value}
                className="text-font-black block text-[24px] sm:text-[32px] font-bold mx-11"
              />
            </div>
          ))}
        </div>
      </div>
    </MotionWrapper>
  );
}
