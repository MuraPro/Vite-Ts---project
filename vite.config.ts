import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
// import { analyzer } from "vite-bundle-analyzer";
import circleDependency from 'vite-plugin-circular-dependency';
import envCompatible from 'vite-plugin-env-compatible';
import EnvironmentPlugin from 'vite-plugin-environment';
import eslint from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    // Загружаем переменные окружения для текущего режима (development/production)
    const env = loadEnv(mode, process.cwd());

    return {
        build: {
            rollupOptions: {
                input: {
                    main: './index.html',
                },
            },
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
        plugins: [
            //   analyzer({
            //     openAnalyzer: false,
            //   }),
            react(),
            tsconfigPaths(),
            envCompatible(),
            svgr({
                svgrOptions: {
                    exportType: 'default',
                    ref: true,
                    svgo: false,
                    titleProp: true,
                },
                include: '**/*.svg',
            }),
            viteStaticCopy({
                targets: [{ src: './public/locales/**/*', dest: 'locales' }],
            }),
            eslint(),
            EnvironmentPlugin({
                NODE_ENV: 'development', // по умолчанию
            }),
            circleDependency({
                include: [/\.[jt]sx?$/, /\.vue\??/],
                exclude: [/node_modules/, /\.git/],
                circleImportThrowErr: false,
            }),
        ],

        define: {
            // Передаем переменные окружения
            __PROJECT__: JSON.stringify(process.env.PROJECT || 'frontend'),
            VITE_API_URL: JSON.stringify(env.VITE_API_URL),
            VITE_IS_DEV: JSON.stringify(env.VITE_IS_DEV),
            VITE_MODE: JSON.stringify(env.VITE_MODE),
        },

        optimizeDeps: {
            exclude: ['chunk-XPR23Y44'],
            include: ['react-router-dom'],
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'), // Указывает, что @ соответствует папке src
            },
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './jest.setup.ts',
        },
        publicDir: 'public',
    };
});

// import react from "@vitejs/plugin-react";
// import { defineConfig, loadEnv } from "vite";
// // import { analyzer } from "vite-bundle-analyzer";
// import EnvironmentPlugin from "vite-plugin-environment";
// import eslint from "vite-plugin-eslint";
// import { viteStaticCopy } from "vite-plugin-static-copy";
// import svgr from "vite-plugin-svgr";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         main: "./index.html",
//       },
//     },
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },
//   plugins: [
//     // analyzer({
//     //   openAnalyzer: false,
//     // }),
//     react(),
//     tsconfigPaths(),
//     svgr({
//       svgrOptions: {
//         exportType: "default",
//         ref: true,
//         svgo: false,
//         titleProp: true,
//       },
//       include: "**/*.svg",
//     }),
//     viteStaticCopy({
//       targets: [{ src: "./public/locales/**/*", dest: "locales" }],
//     }),
//     eslint(),
//     EnvironmentPlugin({
//       NODE_ENV: "development", // по умолчанию
//     }),
//   ],
//   define: {
// VITE_IS_DEV: JSON.stringify(process.env.VITE_MODE),
// VITE_IS_DEV: JSON.stringify(process.env.NODE_ENV === "development" ),
// "process.env.VITE_IS_DEV":
//   process.env.NODE_ENV === "development" ? "true" : "false",
// __PROJECT__: JSON.stringify(process.env.PROJECT || "frontend"),
//   },

//   optimizeDeps: {
//     exclude: ["chunk-XPR23Y44"],
//     include: ["react-router-dom"],
//   },
//   publicDir: "public",
// });
