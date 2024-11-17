import { action } from "@storybook/addon-actions";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Button, ButtonTheme, ButtonSize } from "./Button";
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
    size: {
      control: {
        type: "inline-radio",
      },
      options: [ButtonSize.D, ButtonSize.S, ButtonSize.M, ButtonSize.L],
    },
  },
  args: {
    onClick: action("onClick"),
    theme: ButtonTheme.CLEAR,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Text", theme: ButtonTheme.PRIMARY },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryDark: Story = {
  args: { children: "Text", theme: ButtonTheme.PRIMARY },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const Secondary: Story = {
  args: { children: "Text", theme: ButtonTheme.SECONDARY },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const SecondaryDark: Story = {
  args: { children: "Text", theme: ButtonTheme.SECONDARY },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Clear: Story = {
  args: { children: "Text" },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ClearDark: Story = {
  args: { children: "Text" },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Outline: Story = {
  args: { children: "Text", theme: ButtonTheme.OUTLINE },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const OutlineDark: Story = {
  args: { children: "Text", theme: ButtonTheme.OUTLINE },
  decorators: [ThemeDecorator(Theme.DARK)],
};
