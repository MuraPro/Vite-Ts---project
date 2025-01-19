import { Meta, StoryObj } from "@storybook/react/*";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { ArticleRecommendationsList } from "./ArticleRecommendationsList";

const meta: Meta<typeof ArticleRecommendationsList> = {
  title: "features/ArticleRecommendationsList",
  component: ArticleRecommendationsList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleRecommendationsList>;

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Light: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
