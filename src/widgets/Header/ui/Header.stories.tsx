import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Header } from "./Header";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  title: "widget/Header",
  component: Header,

  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Компонент Header предназначен для отображения заголовка страницы", // Описание компонента
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
  decorators: [
    (Story) => {
      return (
        <div style={{ pointerEvents: "none" }}>
          <Story />
        </div>
      );
    },
    ThemeDecorator(Theme.LIGHT),
  ],
};

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};
