import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { CommentCard } from './CommentCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CommentCard> = {
    title: 'entities/CommentCard',
    component: CommentCard,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof CommentCard>;

const exampleComment = {
    id: '1',
    text: 'Это пример комментария.',
    user: {
        id: '1',
        username: 'John Doe',
        avatar: 'https://img.freepik.com/free-photo/funny-monkey-with-glasses-studio_23-2150844104.jpg',
    },
};

export const Light: Story = {
    args: {
        comment: exampleComment,
        isLoading: false,
    },
    decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})],
};

export const Dark: Story = {
    args: {
        comment: exampleComment,
        isLoading: false,
    },
    decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};

export const Loading: Story = {
    args: {
        comment: exampleComment,
        isLoading: true,
    },
    decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})],
};
export const LoadingDark: Story = {
    args: {
        comment: exampleComment,
        isLoading: true,
    },
    decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};
