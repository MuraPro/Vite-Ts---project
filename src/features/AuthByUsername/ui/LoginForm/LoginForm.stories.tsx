import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { LoginForm } from "./LoginForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LoginForm> = {
  title: "features/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Normal: Story = {
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
};
