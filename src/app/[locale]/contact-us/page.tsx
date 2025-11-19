import ContactUsForm from "@/components/forms/ContactUsForm";
import SectionTitle from "@/components/SectionTitle";
import BackgroundMesh from "@/components/ui/BackgroundMesh";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SocialLinks from "@/components/ui/SocialLinks";
import { getPublicData } from "@/config/client-fetch";
import { ArrowUpLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { IContact } from "@/types/home.type";

export const metadata = {
  title: "Contact us",
};

async function page() {
  const t = await getTranslations("contact");
  const res = await getPublicData<{
    data: { contact: IContact };
  }>({
    queryKey: ["api/settings/contact"],
  });

  //console.log(res?.data?.contact);
  return (
    <div className="space-y-24 pb-24">
      <PageBreadcrumb
        header={t("breadcrumbHeader")}
        routes={[{ title: t("contact-us") }]}
      />

      <section className="container flex flex-col flex-col-reverse gap-6 md:flex-row">
        <div className="relative flex w-full flex-col items-center justify-center gap-6 rounded-lg border border-neutral-100 px-4 py-6 max-w-68 lg:max-w-92">
          <BackgroundMesh />
          <div className="bg-gradient-brand flex size-10 items-center justify-center rounded-lg">
            <Image
              src="/icons/mail.svg"
              width={24}
              height={24}
              alt=""
              className="brightness-0 invert"
            />
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-font-black text-xl lg:text-2xl font-medium">{t("email")}</p>

            <a
              href={`mailto:${res?.data?.contact.email}`}
              className="group/link flex items-center gap-2"
            >
              <span className="text-font-black group-hover/link:text-success-700 text-lg transition-all">
                {res?.data?.contact.email}
              </span>
              <ArrowUpLeft
                size={24}
                className="group-hover/link:text-success-700 transition-all"
              />
            </a>
          </div>
        </div>

        <div className="bg-gradient-brand flex grow flex-col justify-center gap-8 rounded-lg px-4 sm:px-6 py-4">
          <SectionTitle
            text={t("reach-us")}
            textClassName="text-lg sm:text-xl lg:text-2xl text-font-white"
            imgClassName="brightness-0 invert"
          />

          <SocialLinks
            linkClassName="size-10 sm:size-12"
            imgClassName="size-6 sm:size-7"
            data={res?.data?.contact}
          />
        </div>
      </section>

      <section className="container grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <div>
            <h1 className="text-[20px] sm:text-[24px] lg:text-32 text-font-black font-semibold">
              {t("title")}
            </h1>

            <SectionTitle
              text={t("subtitle")}
              textClassName="text-lg sm:text-xl lg:text-2xl font-medium text-font-2"
            />
          </div>

          <ContactUsForm />
        </div>
      </section>
    </div>
  );
}

export default page;
