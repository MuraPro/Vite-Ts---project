import { Meta, StoryObj } from "@storybook/react/*";
import { Theme } from "@/app/providers/ThemeProvider";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { ArticleSortSelector } from "./ArticleSortSelector";

const meta: Meta<typeof ArticleSortSelector> = {
  title: "entities/Article/ArticleSortSelector",
  component: ArticleSortSelector,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleSortSelector>;

export const Big: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Small: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
