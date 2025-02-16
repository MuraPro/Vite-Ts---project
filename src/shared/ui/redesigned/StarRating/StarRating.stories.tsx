import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StarRating } from './StarRating';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StarRating> = {
    title: 'shared/StarRating',
    component: StarRating,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Light: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
