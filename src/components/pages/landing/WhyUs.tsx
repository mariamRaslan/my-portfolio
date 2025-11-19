import Image from "next/image";
import verifyImg from "../../../../public/icons/verify-green.svg";
import SectionTitle from "@/components/SectionTitle";
import BackgroundMesh from "@/components/ui/BackgroundMesh";
import { useTranslations } from "next-intl";

export default function WhyUs() {
  const t = useTranslations("whyUs");

  return (
    <section className="relative py-10">
      <BackgroundMesh />

      <SectionTitle className="mx-auto w-fit container">
        <h2 className="text-[20px] sm:text-32 font-semibold">
          {t.rich("title", {
            brand: (chunks) => <span className="gradient-text">{chunks}</span>,
          })}
        </h2>
      </SectionTitle>

      <div className="container mt-10">
        <div className="flex flex-col-reverse sm:grid  sm:grid-cols-2 gap-6 ">
          <div className="flex flex-col gap-20 items-center">
            <SectionTitle className="mx-auto w-fit">
              <h2 className="text-lg sm:text-[24px] xl:text-2xl font-semibold">
                {t.rich("subtitle", {
                  brand: (chunks) => <span className="gradient-text">{chunks}</span>,
                })}
              </h2>
            </SectionTitle>

            <div className="relative mr-16">
              <Image
                src="/images/logos/logo.png"
                width={217}
                height={240}
                alt=""
                className="absolute -top-16 -right-16 sm:w-54.5 sm:h-60 w-42 h-48"
              />
              <Image src="/images/photo.png" width={360} height={240} alt="" />
            </div>
          </div>

          <div className="lg:flex lg:flex-col grid grid-cols-1 xl:grid-cols-2 gap-6 lg:max-w-[466px] mx-auto">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-neutral-0 p-4 rounded-lg border border-neutral-100 group relative transition-all overflow-hidden "
              >
                <div className="opacity-0 group-hover:opacity-100 bg-gradient-brand absolute inset-0 transition-all z-10" />
                <Image
                  src={verifyImg}
                  width={28}
                  height={28}
                  alt=""
                  className="group-hover:brightness-0 group-hover:invert transition-all relative z-20"
                />
                <p className="text-base sm:text-lg relative z-20 font-medium text-font-black group-hover:text-font-white transition-all">
                  {t("feature1")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
