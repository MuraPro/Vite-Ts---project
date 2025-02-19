import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticlesPageFilters } from './ArticlesPageFilters';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticlesPageFilters> = {
    title: 'pages/ArticlesPageFilters',
    component: ArticlesPageFilters,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof ArticlesPageFilters>;

export const Normal: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
