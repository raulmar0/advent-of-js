import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://raulmar0.github.io',
  base: '/advent-of-js/',
  integrations: [react()]
});