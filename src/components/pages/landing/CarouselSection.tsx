"use client";

import SectionTitle from "@/components/SectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { IHomeCertificate } from "@/types/home.type";


function CarouselSection({
  title,
  subTitle,
  data
}: {
  title: any;
  subTitle?: string;
  data:IHomeCertificate[]
}) {
  const locale = useLocale();
  const t = useTranslations("home");
  const isRtl = locale === "ar";
 // console.log(data)

  return (
    <section className="container py-24">
      <Carousel
        opts={{
          direction: isRtl ? "rtl" : "ltr",
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle className="w-fit">
            <h2 className="text-[20px] sm:text-32 font-semibold">
              {title} 
           
            </h2>
            {subTitle && (
              <p className="text-font-2 text-lg sm:text-2xl font-medium">{subTitle}</p>
            )}
          </SectionTitle>

          <div className="ms-auto flex gap-6">
            <CarouselNext removeStyle className="static ltr:rotate-180" />
            <CarouselPrevious removeStyle className="static ltr:rotate-180" />
          </div>
        </div>

        <CarouselContent className="mt-8">
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className="mobile:basis-1/3 flex size-[120px] basis-1/2 items-center justify-center sm:basis-1/3 md:basis-1/5"
            >
              <Image
                className="object-contain"
                src={item.image_url|| "/images/logos/logo.png"}
                width={80}
                height={80}
                alt=""
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default CarouselSection;
