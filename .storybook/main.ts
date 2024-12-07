import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, loadEnv } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: (config, { configType }) => {
    const mode = configType === "PRODUCTION" ? "production" : "development";
    const env = loadEnv(mode, process.cwd());

    return defineConfig({
      ...config,
      define: {
        ...config.define,
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
        VITE_IS_DEV: JSON.stringify(env.VITE_IS_DEV),
        VITE_MODE: JSON.stringify(env.VITE_MODE),
        __PROJECT__: JSON.stringify("storybook"),
      },
    });
  },
};
export default config;
