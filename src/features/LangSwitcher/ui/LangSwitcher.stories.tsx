import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { I18nextDecorator } from "@/shared/config/storybook/TranslationDecorator/TranslationDecorator";
import { LangSwitcher } from "./LangSwitcher";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LangSwitcher> = {
  title: "shared/LangSwitcher",
  component: LangSwitcher,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Компонент LangSwitcher предназначен для отображения переключятеля языка", // Описание компонента
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [
    I18nextDecorator,
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
