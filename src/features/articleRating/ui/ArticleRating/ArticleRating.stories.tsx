import { Meta, StoryObj } from "@storybook/react";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import ArticleRating from "./ArticleRating";

const meta: Meta<typeof ArticleRating> = {
  title: "features/ArticleRating",
  component: ArticleRating,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ArticleRating>;

const mockData = {
  articleId: "1",
  ratingData: [
    {
      rate: 4, // Рейтинг статьи
    },
    {
      rate: 0, // Рейтинг статьи
    },
  ],
};

export const Light: Story = {
  args: {
    articleId: mockData.articleId,
    mockrating: mockData.ratingData[0].rate,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
  args: {
    articleId: mockData.articleId,
    mockrating: mockData.ratingData[0].rate,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const WithoutRateLight: Story = {
  args: {
    articleId: mockData.articleId,
    mockrating: mockData.ratingData[1].rate,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const WithoutRateDark: Story = {
  args: {
    articleId: mockData.articleId,
    mockrating: mockData.ratingData[1].rate,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
