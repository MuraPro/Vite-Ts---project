import { action } from "@storybook/addon-actions";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { Tabs } from "./Tabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tabs> = {
  title: "shared/Tabs",
  component: Tabs,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Light: Story = {
  args: {
    tabs: [
      {
        value: "tab 1",
        content: "tab 1",
      },
      {
        value: "tab 2",
        content: "tab 2",
      },
      {
        value: "tab 3",
        content: "tab 3",
      },
    ],
    value: "tab 2",
    onTabClick: action("onTabClick"),
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
  args: {
    tabs: [
      {
        value: "tab 1",
        content: "tab 1",
      },
      {
        value: "tab 2",
        content: "tab 2",
      },
      {
        value: "tab 3",
        content: "tab 3",
      },
    ],
    value: "tab 2",
    onTabClick: action("onTabClick"),
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
