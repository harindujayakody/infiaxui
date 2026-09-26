/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        border: "var(--border-subtle)",
        input: "var(--border-subtle)",
        ring: "var(--ring)",
        background: "var(--bg-page)",
        foreground: "var(--text-main)",
        primary: {
          DEFAULT: "var(--text-main)",
          foreground: "var(--bg-page)",
        },
        secondary: {
          DEFAULT: "var(--bg-subtle)",
          foreground: "var(--text-main)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--bg-subtle)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--bg-subtle)",
          foreground: "var(--text-main)",
        },
        popover: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-main)",
        },
        card: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-main)",
        },
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
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        scan: {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(100%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "meteor": "meteor 5s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "scan": "scan 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
