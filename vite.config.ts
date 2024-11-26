import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import { viteStaticCopy } from "vite-plugin-static-copy";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
// import { analyzer } from "vite-bundle-analyzer";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  plugins: [
    // analyzer({
    //   openAnalyzer: false,
    // }),
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
    __IS_DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
  },
  optimizeDeps: {
    exclude: ["chunk-XPR23Y44"],
  },
  publicDir: "public",
});
