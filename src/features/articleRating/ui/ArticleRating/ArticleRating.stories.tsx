import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import ArticleRating from './ArticleRating';

const meta: Meta<typeof ArticleRating> = {
    title: 'features/ArticleRating',
    component: ArticleRating,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof ArticleRating>;

const mockData = {
    articleId: '1',
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
