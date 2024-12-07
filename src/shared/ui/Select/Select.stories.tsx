import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Select } from "./Select";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Select> = {
  title: "shared/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component: "Компонент Select.",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Light: Story = {
  args: {
    label: "Укажите значение",
    options: [
      { value: "123", content: "Первый пункт" },
      { value: "1234", content: "Второй пункт" },
    ],
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {
    label: "Укажите значение",
    options: [
      { value: "123", content: "Первый пункт" },
      { value: "1234", content: "Второй пункт" },
    ],
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
