import SectionTitle from "@/components/SectionTitle";
import ArrowLink from "@/components/ui/ArrowLink";
import BackgroundMesh from "@/components/ui/BackgroundMesh";
import { useLocale, useTranslations } from "next-intl";

function Solutions() {
  const t = useTranslations("");
  return (
    <section className="container">
      <SectionTitle className=" ">
        <h2 className="sm:text-32 text-[20px] font-semibold">
          {t.rich("solutions_section_title", {
            gradient: (chunks) => (
              <span className="gradient-text">{chunks}</span>
            ),
          })}
        </h2>
      </SectionTitle>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "القطاع المالي و المصرفي",
            description: "نقدم حلولًا متخصصة لحماية أنظمة الدفع الإلكتروني.",
            link: "",
          },
          {
            title: "قطاع السياحة العامة و الدينية",
            description:
              "نقدم حلولًا مبتكرة تشمل حماية البيانات الشخصية للحجاج و السياح و الزوار.",
            link: "",
          },
          {
            title: "قطاع النقل الخاص و العام",
            description:
              "تشمل خدماتنا أنظمة مراقبة الحافلات و متابعة عدد الركاب.",
            link: "",
          },
          {
            title: "نظام إدارة الحشود الرقمي",
            description:
              "يتيح النظام متابعة فعالة للمشاكل الأمنية و اللوجستية و ضمان إدارة الحشود.",
            link: "",
          },
          {
            title: "القطاع الصحي",
            description:
              "تضمن تقنياتنا أمن البيانات و الأجهزة الطبية، و نركز على حماية السجلات الطبية.",
            link: "",
          },
          {
            title: "الشركات الكبرى",
            description:
              "تشمل حلولنا حماية الشبكات المؤسسية من التهديدات السيبرانية المتقدمة.",
            link: "",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="group bg-neutral-0 hover:border-success-600 relative flex flex-col rounded-lg border border-neutral-100 p-4 transition-all"
          >
            <BackgroundMesh className="z-[1] opacity-0 transition-all group-hover:opacity-100" />

            {/* <Image
              src={meshImg}
              fill
              className="object-cover z-[1] opacity-0 group-hover:opacity-100 transition-all"
              alt=""
            />
            <div className="bg-linear-0 absolute inset-0 from-0% to-45% from-neutral-0 z-[2] opacity-0 group-hover:opacity-100 transition-all" /> */}

            <h3 className="text-font-black group-hover:gradient-text relative z-[3] text-lg sm:text-xl !leading-normal font-semibold">
              {item.title}
            </h3>

            <p className="text-font-black relative z-[3] mt-6 text-base sm:text-lg">
              {item.description}
            </p>

            <ArrowLink
              href={item.link}
              text={t("show_more")}
              className="ms-auto mt-6 text-[#666766]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Solutions;
