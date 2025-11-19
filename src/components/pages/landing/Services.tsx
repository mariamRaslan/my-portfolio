import MotionWrapper from "@/components/MotionWrapper";
import SectionTitle from "@/components/SectionTitle";
import { CustomButtonTwo } from "@/components/ui/CustomButtons";
import Image from "next/image";
import { IHomeServices } from "@/types/home.type";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Services({ data }: { data: IHomeServices[] }) {
  const t = useTranslations("");
  return (
    <section className="relative z-10">
      <div className="container py-24">
        <SectionTitle text={t("specialization_fields_and_services")} />

        <div className="mt-8 grid w-full justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <MotionWrapper
              key={item.id}
              viewport={{
                once: true,
              }}
              animateOnView
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="group relative flex aspect-square items-end justify-between w-full overflow-hidden rounded-lg px-4 py-6"
            >
              <Link href={`/services#service${item.id}`} className="w-full">
              {/* gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,18,18,0.3),rgba(18,18,18,0.3)),linear-gradient(180deg,rgba(18,18,18,0)_-15.62%,rgba(18,18,18,0.45)_54.16%,rgba(18,18,18,0.54)_76.51%,rgba(18,18,18,0.6)_100%)] transition-opacity duration-500 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(40,175,75,0.3),rgba(40,175,75,0.3)),linear-gradient(0deg,rgba(18,18,18,0.3),rgba(18,18,18,0.3)),linear-gradient(180deg,rgba(18,18,18,0)_-15.62%,rgba(18,18,18,0.45)_54.16%,rgba(18,18,18,0.54)_76.51%,rgba(18,18,18,0.6)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <Image
                src={item.image || ""}
                fill
                alt=""
                className="-z-10 object-cover transition-all duration-500 group-hover:scale-105"
              />

              <div className="relative z-10 flex w-full items-end justify-between gap-4 w-full">
                <h3 className="text-font-white text-[20px] sm:text-2xl font-medium">
                  {item.name}
                </h3>

                <CustomButtonTwo
                  outerClassName="size-11 p-0 shrink-0 "
                  className="flex items-center justify-center p-0"
                >
                  <Image
                    className="brightness-0 invert ltr:rotate-90"
                    src="/icons/left-up.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                </CustomButtonTwo>
              </div>
              </Link>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
