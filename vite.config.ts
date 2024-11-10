import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import { viteStaticCopy } from "vite-plugin-static-copy";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
    viteStaticCopy({
      targets: [{ src: "./public/locales/**/*", dest: "locales" }],
    }),
    eslint(),
  ],

  define: {
    __IS_DEV__: Boolean,
  },
  optimizeDeps: {
    exclude: ["chunk-XPR23Y44"],
  },
  publicDir: "public",
});
