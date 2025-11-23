import Header from "@/components/layout/Header";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Readex_Pro } from "next/font/google";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import { getPublicData } from "@/config/client-fetch";
import { IHomeServices } from "@/types/home.type";
import NextTopLoader from "nextjs-toploader";
import SplashCursor from "@/components/SplashCursor";

const readexPro = Readex_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-readex-pro",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const locale = (await params).locale;

  const isRTL = locale === "ar";

  return {
    title: {
      template: `%s | ${isRTL ? "starter-kit" : "starter-kit"}`,
      default: isRTL ? "starter-kit" : "starter-kit",
    },
  };
};

export default async function RootLayout({ children, params }: Props) {
  const locale = (await params).locale;

  return (
    <html dir={"ltr"} className="scroll-smooth">
      <body
        className={`${readexPro.className} ${readexPro.variable}  bg-neutral-950`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider>
          <Header />

          <main className="z-10 flex min-h-[calc(100vh-80px)] flex-col bg-neutral-950 relative">
            <div className="pointer-events-none fixed inset-0 z-1">
              {/* <SplashCursor /> */}
            </div>
            {children}
          </main>
          {/* <Footer /> */}
          <NextTopLoader color="#00B9AD" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
