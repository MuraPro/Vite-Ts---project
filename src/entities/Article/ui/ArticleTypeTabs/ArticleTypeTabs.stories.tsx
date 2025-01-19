import { Meta, StoryObj } from "@storybook/react/*";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { ArticleTypeTabs } from "./ArticleTypeTabs";

const meta: Meta<typeof ArticleTypeTabs> = {
  title: "entities/Article/ArticleTypeTabs",
  component: ArticleTypeTabs,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleTypeTabs>;

export const Big: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Small: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
