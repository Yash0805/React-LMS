import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import pluginChecker from 'vite-plugin-checker';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),tsConfigPaths(),
    pluginChecker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
      overlay: true,
    }),],
});
