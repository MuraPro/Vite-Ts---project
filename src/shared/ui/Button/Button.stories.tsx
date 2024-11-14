import { action } from "@storybook/addon-actions";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Button, ThemeButton } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    theme: {
      control: {
        type: "inline-radio",
      },
      options: [
        ThemeButton.CLEAR,
        ThemeButton.OUTLINE,
        ThemeButton.LARGE,
        ThemeButton.MEDIUM,
      ],
    },
  },
  args: {
    onClick: action("onClick"),
    theme: ThemeButton.CLEAR,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Text" },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Clear: Story = {
  args: { children: "Text" },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Outline: Story = {
  args: { children: "Text" },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const OutlineDark: Story = {
  args: { children: "Text", theme: ThemeButton.OUTLINE },
  decorators: [ThemeDecorator(Theme.DARK)],
};
