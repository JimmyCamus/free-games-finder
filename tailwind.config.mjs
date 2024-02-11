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
          "0 0px 20px rgba(200,200, 200, 0.25) ",
          "0 0px 80px rgba(200, 200,200, 0.1)",
        ],
      },
    },
  },
  plugins: [],
};
