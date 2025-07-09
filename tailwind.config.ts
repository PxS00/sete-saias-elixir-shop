import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0e0e0e", // Fundo escuro
        foreground: "#f3e8d3", // Texto principal
        primary: {
          DEFAULT: "#b10000", // Botão vermelho
          foreground: "#f3e8d3",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#2a2a2a",
          foreground: "#a39588",
        },
        accent: {
          DEFAULT: "#e0a326", // Destaque dourado
          foreground: "#0e0e0e",
        },
        popover: {
          DEFAULT: "#1a1a1a",
          foreground: "#f3e8d3",
        },
        card: {
          DEFAULT: "#1a1a1a",
          foreground: "#f3e8d3",
        },
        // Cores customizadas da marca
        "sete-red": "#b10000",
        "sete-red-hover": "#900000",
        "sete-gold": "#e0a326",
        "sete-cream": "#f3e8d3",
        "sete-dark": "#0e0e0e",
      },
      fontFamily: {
        title: ["Cinzel", "serif"], // Fonte para títulos
        body: ["Merriweather", "serif"], // Fonte para texto
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
