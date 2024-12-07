import { ThemeDecorator } from "./../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "./../src/shared/config/storybook/StoreDecorator/StoreDecorator";
import { StyleDecorator } from "../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { ModalDecorator } from "../src/shared/config/storybook/ModalDecorator/ModalDecorator";
import { CollapseDecorator } from "../src/shared/config/storybook/CollapseDecorator/CollapseDecorator";
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

export const decorators = [
  StoreDecorator({}),
  RouterDecorator,
  CollapseDecorator,
  ThemeDecorator({}),
  StyleDecorator,
  ModalDecorator,
];
