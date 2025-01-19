import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { AppLink } from "./AppLink";
import { AppLinkTheme } from "./AppLink";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AppLink> = {
  title: "shared/AppLink",
  component: AppLink,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    to: "/",
  },
};

export default meta;

type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
  args: {
    children: "Text",
    theme: AppLinkTheme.PRIMARY,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Secondary: Story = {
  args: { children: "Text", theme: AppLinkTheme.SECONDARY },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Red: Story = {
  args: { children: "Text", theme: AppLinkTheme.RED },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryDark: Story = {
  args: { children: "Text", theme: AppLinkTheme.PRIMARY },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const SecondaryDark: Story = {
  args: { children: "Text", theme: AppLinkTheme.SECONDARY },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const RedDark: Story = {
  args: { children: "Text", theme: AppLinkTheme.RED },
  decorators: [ThemeDecorator(Theme.DARK)],
};
