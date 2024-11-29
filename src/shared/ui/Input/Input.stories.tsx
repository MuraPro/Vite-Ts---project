import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Input } from "./Input";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "shared/Input",
  component: Input,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Light: Story = {
  args: {
    placeholder: "Type text",
    value: "123123",
    style: { borderBottom: "2px solid #04ff04" },
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {
    placeholder: "Type text",
    value: "123123",
    style: { borderBottom: "1px solid #0232c2" },
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
