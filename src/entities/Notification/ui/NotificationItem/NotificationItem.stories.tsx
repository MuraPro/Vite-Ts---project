import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { NotificationItem } from "./NotificationItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NotificationItem> = {
  title: "entities/NotificationItem",
  component: NotificationItem,
  parameters: {
    docs: {},
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Light: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};
