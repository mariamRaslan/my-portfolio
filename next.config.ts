import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [{ protocol: "https", hostname: "guard.talentkid.sa", pathname: "/storage/**" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // webpack: (config) => {
  //   // Add rule for SVG files
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack", "url-loader"],
  //   });
  //   return config;
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
