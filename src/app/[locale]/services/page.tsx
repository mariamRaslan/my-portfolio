// app/[locale]/services/page.tsx
import SectionTitle from "@/components/SectionTitle";
import BackgroundMesh from "@/components/ui/BackgroundMesh";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import Image from "next/image";
import { getPublicData } from "@/config/client-fetch";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Services",
};

/** ---------- Types ---------- */
type Subservice = {
  id?: number | string;
  name: string;
  image?: string | null;
  description?: string | null;
};

type Service = {
  id: number | string;
  name: string;
  image?: string | null;
  description?: string | null;
  subservices?: Subservice[] | null;
};


function unwrapApi<T>(res: unknown): T | null {
  if (!res) return null;
  if (typeof res === "object" && res !== null && "data" in (res as any)) {
    return (res as any).data as T;
  }
  return res as T;
}

export default async function Page() {
  const t = await getTranslations("Services");

  // Fetch
  const raw = await getPublicData<unknown>({ queryKey: ["api/services"] });
  const unwrapped = unwrapApi<Service[] | null>(raw);
  const services: Service[] = Array.isArray(unwrapped) ? unwrapped : [];

  return (
    <div className="space-y-24 pb-24">
      <PageBreadcrumb
        header={t("breadcrumbHeader", {
      
          defaultValue: "شركة درع الوطن للاستشارات الأمنية و حلول الأمن السيبراني",
        })}
        routes={[{ title: t("breadcrumbTitle", { defaultValue: "الخدمات" }) }]}
      />

      <section className="container flex flex-col gap-12">
        {services.length === 0 ? (
          <p className="text-center text-neutral-500">{t("empty", { defaultValue: "لا توجد خدمات متاحة حالياً." })}</p>
        ) : (
          services.map((item, index) => {
            const key = String(item.id ?? index);
            const imgSrc = item.image || "/images/placeholder.png";
            const title = item.name ?? t("untitled", { defaultValue: "خدمة بدون عنوان" });
            const description =
              item.description ?? t("noDescription", { defaultValue: "لا يوجد وصف متاح لهذه الخدمة." });

            return (
              <div key={key} className="relative scroll-m-20" id={`service${item.id}`}>
                <BackgroundMesh />

                <div className="flex items-center justify-between gap-6 rounded-lg p-6 max-sm:flex-col">
                  <div className="space-y-4 sm:space-y-10 lg:max-w-3/5">
                    <SectionTitle text={title} textClassName="text-[20px] lg:text-[28px]" />
                    <p className="text-font-black text-base sm:text-lg">{description}</p>
                  </div>

                  <div className="relative aspect-square w-full max-w-67.5 shrink-0">
                    <Image
                      src={imgSrc}
                      alt={"service image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 540px"
                      className="rounded-lg object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {Array.isArray(item.subservices) && item.subservices.length > 0 && (
                  <div className="mt-2 grid grid-cols-1 gap-6 px-6 md:grid-cols-2">
                    {item.subservices.map((sub, subIdx) => {
                      const subKey = String(sub.id ?? `${key}-${subIdx}`);
                      const subImg = sub.image || "/images/placeholder.png";
                      const subName = sub.name ?? t("untitled", { defaultValue: "خدمة بدون عنوان" });
                      const subDesc =
                        sub.description ?? t("noDescription", { defaultValue: "لا يوجد وصف متاح لهذه الخدمة." });

                      return (
                        <div
                          key={subKey}
                          className="bg-neutral-0 group flex flex-col gap-6 rounded-lg border border-neutral-100 p-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative z-10 flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                              <div className="bg-gradient-brand absolute inset-0 -z-10 transition-all" />
                              <Image
                                src={subImg}
                                alt={subName}
                                width={24}
                                height={24}
                                className="rounded-lg object-cover  "
                              />
                            </div>
                            <h5 className="text-font-black group-hover:gradient-text text-lg sm:text-xl font-semibold">{subName}</h5>
                          </div>
                          <p className="text-font-black text-sm sm:text-lg">{subDesc}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
