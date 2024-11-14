import { StyleDecorator } from "../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { CollapseDecorator } from "../src/shared/config/storybook/CollapseProvider/CollapseProvider";
import { Theme } from "../src/app/providers/ThemeProvider";
import { RouterDecorator } from "../src/shared/config/storybook/RouterDecorator/RouterDecorator";

export const parameters = {
  actions: {
    // Пример, как задавать действия вручную вместо использования regex
    handles: ["onClick", "onChange"], // Например, события onClick, onChange
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [StyleDecorator, CollapseDecorator, RouterDecorator];
