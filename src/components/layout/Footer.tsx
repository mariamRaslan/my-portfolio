import { Link } from "@/i18n/navigation";
import { Mail } from "lucide-react";
import Image from "next/image";
import ArrowLink from "../ui/ArrowLink";
import BackgroundMesh from "../ui/BackgroundMesh";
import SocialLinks from "../ui/SocialLinks";
import { getTranslations } from "next-intl/server";
import { IContact } from "@/types/home.type";
import { getPublicData } from "@/config/client-fetch";

async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="relative pt-12 pb-6">
      <BackgroundMesh />

      <div className="container">
        <div className="grid grid-cols-12 gap-y-6">
          <div className="col-span-12 lg:col-span-4">
            <Link href={"/"}>
              <Image
                src="/images/logos/logo-with-name-horizontal.png"
                width={204}
                height={64}
                className="h-auto w-38 sm:w-51"
                alt=""
              />
            </Link>
            <p className="mt-6 text-sm sm:text-base">
              {t("footer.description")}
            </p>

            <SocialLinks className="mt-8" />
          </div>

          <div className="col-span-12 flex flex-col items-start sm:col-span-6 lg:col-span-3 lg:col-start-6">
            <h4 className="text-font-black text-xl font-medium">
              {t("footer.headers.links")}
            </h4>
            <div className="mt-4 flex flex-col items-start gap-4 sm:mt-8 sm:gap-6">
              <ArrowLink
                href="/"
                text={t("header.home.title")}
                textClassName="text-lg"
              />
              <ArrowLink
                href="/about-us"
                text={t("header.about.title")}
                textClassName="text-lg"
              />
              <ArrowLink
                href="/services"
                text={t("header.services.title")}
                textClassName="text-lg"
              />
            </div>
          </div>

          <div className="col-span-12 flex flex-col items-start sm:col-span-6 lg:col-span-3 lg:col-start-10">
            <h4 className="text-font-black text-xl font-medium">
              {t("footer.headers.contact")}
            </h4>
            <div className="mt-4 flex flex-col items-start gap-4 sm:mt-8 sm:gap-6">
              <ArrowLink
                href="/contact-us"
                text={t("header.contact.title")}
                textClassName="text-lg"
              />
              <ArrowLink
                href="/council"
                text={t("header.council.title")}
                textClassName="text-lg"
              />

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:`}
                  className="group/link flex items-center gap-2"
                >
                  <Mail />
                  <span className="text-font-black group-hover/link:text-success-700 text-lg transition-all">
                  email
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center  justify-between gap-4 lg:flex-row">
          <div>
            <p className="text-center">
              <span>
                {t("footer.copyright.part1")}{" "}
                <span className="text-success-600">
                  {t("footer.copyright.part2")}
                </span>
              </span>

              {/* separator visible only on md+ */}
              <span className="hidden md:inline">{" | "}</span>

              {/* second line on mobile, inline on md+ */}
              <span className="block md:inline">
                {" "}
                {t("footer.copyright.part3")}{" "}
                <a
                  href="https://pixbyte.co/"
                  className="text-font-black font-medium transition-all hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="pixbyte.co"
                >
                  pixbyte.co
                </a>
              </span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-success-600 w-1/2 sm:w-auto transition-all hover:underline"
            >
              {t("footer.privacy-policy")}
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-success-600 w-1/2 sm:w-auto transition-all hover:underline"
            >
              {t("footer.terms-and-conditions")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
