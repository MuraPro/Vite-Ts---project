import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig } from "vite";

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
  viteFinal: (config) => {
    return defineConfig({
      ...config,
      define: {
        ...config.define,
        __PROJECT__: JSON.stringify("storybook"),
      },
    });
  },
};
export default config;
