import Header from "@/components/layout/Header";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Readex_Pro } from "next/font/google";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import SplashCursor from "@/components/SplashCursor";
import SplitCurtainLoader from "@/components/SplitCurtainLoader";
import { Analytics } from "@vercel/analytics/next"

const readexPro = Readex_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-readex-pro",
});

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export const generateMetadata = async ({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  const { locale } = params;

  const isRTL = locale === "ar";

  const description = isRTL
    ? "الموقع الشخصي لمريم رسلان، مطورة واجهات أمامية ومتخصصة في Next.js. استكشف الأعمال، المهارات وطرق التواصل."
    : "Personal portfolio of Mariam Raslan, a Frontend Developer and Next.js specialist. Explore projects, skills, and ways to get in touch.";

  return {
    title: {
      template: `%s | Mariam Raslan`,
      default: "Mariam Raslan",
    },
    description,
    openGraph: {
      type: "website",
      title: "Mariam Raslan Portfolio",
      description,
      url: `https://mariamraslan.vercel.app/${locale}`,
      siteName: "Mariam Raslan Portfolio",
      images: [
        {
          url: "https://mariamraslan.vercel.app/images/gradient-logo.png",
        },
      ],
      locale: isRTL ? "ar_AR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mariam Raslan Portfolio",
      description,
      images: [
        "https://mariamraslan.vercel.app/images/gradient-logo.png",
      ],
    },
    metadataBase: new URL("https://mariamraslan.vercel.app"),
  };
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = params;

  const description =
    locale === "ar"
      ? "الموقع الشخصي لمريم رسلان، مطورة واجهات أمامية ومتخصصة في Next.js."
      : "Personal portfolio of Mariam Raslan, Frontend Developer and Next.js specialist.";

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="scroll-smooth"
    >
      <head>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />

        <link
          rel="canonical"
          href={`https://mariamraslan.vercel.app/${locale}`}
        />

        <link
          rel="icon"
          href="https://mariamraslan.vercel.app/images/gradient-logo.png"
        />
        <meta name="theme-color" content="#FFFFFF" />
      </head>

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
          <Analytics/>
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
