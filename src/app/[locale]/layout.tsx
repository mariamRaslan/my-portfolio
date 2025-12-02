import Header from "@/components/layout/Header";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Readex_Pro } from "next/font/google";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import SplashCursor from "@/components/SplashCursor";
import SplitCurtainLoader from "@/components/SplitCurtainLoader";

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
      template: `%s | ${isRTL ? "Mariam Raslan" : "Mariam Raslan"}`,
      default: isRTL ? "Mariam Raslan" : "Mariam Raslan",
    },
  };
};

export default async function RootLayout({ children, params }: Props) {
  const locale = (await params).locale;

  return (
    <html dir={locale==="en"?"ltr":"rtl"} className="scroll-smooth">
      <body
        className={`${readexPro.className} ${readexPro.variable} bg-neutral-950`}
        suppressHydrationWarning={true}
      >
        <SplitCurtainLoader
          logoSrc="/images/white-logo.png"
          bgGradient="linear-gradient(90deg, #6e17b4 0.01%, #f59e0b 100%)"
          fg="#ffffff"
          durationMs={1600}
          splitDurationMs={3000}
          onlyOnce={false}
        />
        <NextIntlClientProvider>
          <Header />

          <main className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col bg-neutral-950">
            <div className="pointer-events-none fixed inset-0 z-[1]">
              <SplashCursor />
            </div>

            {children}
          </main>
          <Footer />
          <NextTopLoader color="#00B9AD" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
