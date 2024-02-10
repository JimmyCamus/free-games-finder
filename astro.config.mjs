import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  image: {
    domains: ["freetogame.com"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  output: "server",
  adapter: vercel(),
});
