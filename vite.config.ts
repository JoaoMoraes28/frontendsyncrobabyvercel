import { defineConfig } from "vite";
import tailwind from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwind(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    svgr(),
  ],
  server: {
    proxy: {
      "/syncrobaby": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
