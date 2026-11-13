import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 5173 },
  preview: { port: 4173 },
  build: {
    rolldownOptions: {
      onwarn(warning, warn) {
        // React Server Component boundaries have no meaning in this browser-only app.
        // Preserve all other dependency and application warnings.
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('"use client"') && warning.message.includes('node_modules/')) return;
        warn(warning);
      },
    },
  },
});
