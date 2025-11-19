import CouncilForm from "@/components/forms/CouncilForm";
import SectionTitle from "@/components/SectionTitle";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { getPublicData } from "@/config/client-fetch";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Consultation", // fix typo
};

type Option = { value: string; label: string };

export default async function Page() {
  const t = await getTranslations("council");

  // Expecting API: { data: Option[] }
  const res = await getPublicData<{ data: Option[] }>({
    queryKey: ["enum/ServiceType"],
  });

  const serviceType = res?.data ?? [];

  return (
    <div className="space-y-24 pb-24">
      <PageBreadcrumb
        header={t("breadcrumbHeader")}
        routes={[{ title:t("consultation")}]}
      />

      <section className="container grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <div>
            <h1 className="text-[20px] sm:text-[24px] lg:text-32 text-font-black font-semibold">
              {t("title")}
            </h1>

            <SectionTitle>
              <h2 className="text-font-2 text-lg sm:text-xl font-semibold">
                {t("subtitle.part1")}{" "}
                <span className="gradient-text">{t("subtitle.part2")}</span>{" "}
                {t("subtitle.part3")}
              </h2>
            </SectionTitle>
          </div>

          <CouncilForm serviceType={serviceType} />
        </div>
      </section>
    </div>
  );
}
