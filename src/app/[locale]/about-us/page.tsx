import SectionTitle from "@/components/SectionTitle";
import BackgroundMesh from "@/components/ui/BackgroundMesh";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import Image from "next/image";
import { getPublicData } from "@/config/client-fetch";
import { getLocale, getTranslations } from "next-intl/server";

export const metadata = {
  title: "About Us / حول درع الوطن",
};

type AboutPayload = {
  title?: string;
  section_title?: string;
  section_description?: string;
  vision?: string;
  mission?: string;
  values?: string[];
};

export default async function Page() {
  const t = await getTranslations("About");
  const locale = await getLocale();
  const isRTL = locale?.toLowerCase().startsWith("ar");
  const res = await getPublicData<AboutPayload>({ queryKey: ["api/about"] });
  const values = Array.isArray(res?.values) ? res!.values! : [];

  return (
    <div className="space-y-24 pb-24">
      <PageBreadcrumb
        header={t("breadcrumbHeader")}
        routes={[{ title: t("breadcrumbTitle") }]}
      />

      {/* --- Section 1: About --- */}
      <section className="container flex justify-between gap-x-12 gap-y-8 max-md:flex-col">
        <div className="flex flex-col gap-6 lg:max-w-3/5">
          <SectionTitle text={res?.title || t("aboutTitle")} />
          <p className="text-font-black text-lg lg:text-xl ">
            {res?.section_description || t("aboutDescription")}
          </p>
        </div>

        <div className="relative h-69 w-full md:max-w-67.5">
          <Image
            src="/images/about-photo.svg"
            alt={t("aboutAlt")}
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* --- Section 2: Countries --- */}
      <section className="container flex flex-col gap-y-8">
        <SectionTitle
          className="lg:max-w-3/5"
          text={res?.section_title || t("countriesTitle")}
        />

        <div className="grid grid-cols-1 gap-4  sm:gap-6 sm:grid-cols-3">
          {[
            { title: t("usa"), img: "/images/maps/usa.svg" },
            { title: t("india"), img: "/images/maps/india.svg" },
            { title: t("china"), img: "/images/maps/china.svg" },
          ].map((item, index) => (
            <div
              key={index}
              className="group hover:border-success-600 flex flex-col overflow-hidden border border-[#F0F0F0] rounded-[4px] transition-all sm:aspect-square  "
            >
              <h4 className="text-font-black group-hover:text-success-600 px-4 pt-4 text-[20px] xl:text-[28px] font-semibold transition-all sm:px-6 sm:pt-6">
                {item.title}
              </h4>
              <div className="relative aspect-square w-full max-sm:mx-auto max-sm:max-w-4/5">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="-mt-8 object-contain opacity-30 transition-all group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 3: Vision / Mission --- */}
      <section className="container grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
        {/* Vision */}
        <div className="group relative flex flex-col gap-6 rounded-lg p-4 border border-[#F0F0F0] rounded-[4px]">
          <div className="bg-gradient-brand absolute inset-0 opacity-0 transition-all group-hover:opacity-100" />
          <SectionTitle
            className="relative z-10"
            textClassName="text-[20px] xl:text-2xl group-hover:text-font-white transition-all"
            imgClassName="group-hover:brightness-0 group-hover:invert transition-all"
            text={t("vision")}
          />
          <p className="group-hover:text-font-white text-font-black relative z-10 text-base sm:text-lg xl:text-xl  transition-all">
            {res?.vision || t("visionText")}
          </p>
        </div>

        {/* Mission */}
        <div className="group relative flex flex-col gap-6 rounded-lg p-4 border border-[#F0F0F0] rounded-[4px]">
          <div className="bg-gradient-brand absolute inset-0 opacity-0 transition-all group-hover:opacity-100" />
          <SectionTitle
            className="relative z-10"
            textClassName="text-[20px] xl:text-2xl group-hover:text-font-white transition-all"
            imgClassName="group-hover:brightness-0 group-hover:invert transition-all"
            text={t("mission")}
          />
          <p className="group-hover:text-font-white text-font-black relative z-10 text-base sm:text-lg xl:text-xl transition-all">
            {res?.mission || t("missionText")}
          </p>
        </div>
      </section>

      {/* --- Section 4: Values --- */}
      <section className="relative py-10">
        <BackgroundMesh />

        <div className="container space-y-10">
          <SectionTitle className="sm:mx-auto w-fit">
            <h2 className="text-[20px] sm:text-[24px] xl:text-32 font-semibold">
              {t("valuesTitle")}{" "}
              <span className="gradient-text">{t("companyName")}</span>{isRTL?"؟":"?"}</h2>
          </SectionTitle>

          {values.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 justify-center gap-6">
              {values.map((text, index) => (
                <div
                  key={index}
                  className="bg-neutral-0 group relative flex min-h-[114px]  items-center justify-start rounded-lg border border-neutral-100 px-3 py-4 text-start"
                >
                  <div className="bg-gradient-brand absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="text-font-black group-hover:text-font-white relative z-10 text-xl font-medium transition-colors break-words hyphens-auto">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-500">
              {t("noValues")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
