/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      tablet: "640px",
      "desktop-low": "1024px",
      "desktop-mid": "1366px",
      "desktop-high": "1500px",
    },
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 80px rgba(255, 255,255, 0.2)",
        ],
      },
    },
  },
  plugins: [],
};
