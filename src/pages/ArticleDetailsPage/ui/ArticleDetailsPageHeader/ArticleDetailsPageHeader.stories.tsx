import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ArticleDetailsPageHeader> = {
  title: "pages/ArticleDetailsPageHeader",
  component: ArticleDetailsPageHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleDetailsPageHeader>;

export const Normal: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};
