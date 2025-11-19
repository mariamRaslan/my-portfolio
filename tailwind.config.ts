import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const withOpacity = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      fontSize: {
        tiny: "0.625rem",
        micro: "0.5rem",
      },
      screens: {
        mobile: "375px",
        tablet: "768px",
        desktop: "1440px",
        "3xl": "1920px",
      },
      colors: {

        background: {
          DEFAULT: "hsl(var(--background))",
          "1": "var(--background-1)",
        },
          surface: {
          DEFAULT: withOpacity('--surface'),
          muted:   withOpacity('--surface-muted'),
        },
        primary: {
          "900": withOpacity("--primary-900"),
          "800": withOpacity("--primary-800"),
          "300": withOpacity("--primary-300"),
          "100": withOpacity("--primary-100"),
          "50": withOpacity("--primary-50"),
        },
        secondary: {
          "100": "var(--secondary-100)",
          "300": "var(--secondary-300)",
          "400": "var(--secondary-400)",
          "600": withOpacity("--secondary-600"),
        },
        success: {
          "25": "var(--success-25)",
          "50": "var(--success-50)",
          "100": "var(--success-100)",
          "600": "var(--success-600)",
          "700": "var(--success-700)",
          "900": "var(--success-900)",
        },
        blue: {
          "25": "var(--blue-25)",
          "100": "var(--blue-100)",
          "500": "var(--blue-500)",
          "600": "var(--blue-600)",
          "700": "var(--blue-700)",
          "900": "var(--blue-900)",
        },

        black: {
          "1": "var(--black-1)",
          DEFAULT: "hsl(var(--black-default))",
        },
        gray: {
          "25": "var(--gray-25)",
          "100": "var(--gray-100)",
          "200": "var(--gray-200)",
          "300": "var(--gray-300)",
          "500": "var(--gray-500)",
          "600": "var(--gray-600)",
          "700": "var(--gray-700)",
          "900": "var(--gray-900)",
          light: "var(--gray-light)",
          medium: "var(--gray-medium)",
        },
        yellow: {
          "1": "var(--yellow-1)",
          "50": "var(--yellow-50)",
        },
        orange: "var(--orange)",
        green: {
          1: "var(--green-1)",
          2: "var(--green-2)",
        },
      },
      backgroundImage: {
        gradient:
          " var(--UI-Linear-Gradient-1, linear-gradient(136deg, #E88A60 0%, #BFF0CE 87.39%))",
        "gradient-mesh": "url(/icons/gradient-mesh.svg)",
        "bank-green-gradient":
          "linear-gradient(90deg, #01797A 0%, #489399 100%)",
      },
      boxShadow: {
        form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        chart:
          "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        profile:
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        room: "0px 0px 6px 0px rgba(78, 78, 75, 0.16)",
        card: "0px 0px 6px 0px rgba(78, 78, 75, 0.16)",
        badge: "0px 0px 12px 0px rgba(232, 138, 96, 0.8)",
      },
      border: {
        gardient: "1px solid var(--UI-Linear-Gradient-2, #BFF0CE)",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        "ibm-plex-serif": "var(--font-ibm-plex-serif)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        appear: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "100",
          },
        },
        "slide-right": {
          from: {
            transform: "translateX(-10%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "100",
          },
        },
        "slide-left": {
          from: {
            transform: "translateX(10%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "100",
          },
        },
        "slide-up": {
          from: {
            transform: "translateY(10%)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "100",
          },
        },
        "slide-down": {
          from: {
            transform: "translateY(-10%)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "100",
          },
        },
        "pop-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "70%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pop-shake-glow": {
          "0%": {
            transform: "scale(0) rotate(0deg)",
            opacity: "0",
            filter: "drop-shadow(0 0 0 rgba(255, 215, 0, 0))",
          },
          "50%": {
            transform: "scale(1.2) rotate(0deg)",
            opacity: "1",
            filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.9))",
          },
          "60%": {
            transform: "scale(1) rotate(5deg)",
            filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 1))",
          },
          "70%": {
            transform: "scale(1) rotate(-5deg)",
            filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.9))",
          },
          "80%": {
            transform: "scale(1) rotate(3deg)",
            filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))",
          },
          "90%": {
            transform: "scale(1) rotate(-3deg)",
            filter: "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))",
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
            opacity: "1",
            filter: "",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        appear: "appear 1s ease-out both",
        "slide-right": "slide-right 0.3s ease-in-out both",
        "slide-left": "slide-left 0.3s ease-in-out both",
        "slide-up": "slide-up 0.3s ease-in-out both",
        "slide-down": "slide-down 0.3s ease-in-out both",
        "pop-in": "pop-in 0.5s ease-out both",
        "pop-shake-glow": "pop-shake-glow 0.8s ease-out both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
