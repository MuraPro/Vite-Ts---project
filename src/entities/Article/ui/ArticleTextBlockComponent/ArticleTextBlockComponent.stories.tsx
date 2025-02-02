import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticleTextBlockComponent> = {
    title: 'entities/Article/ArticleTextBlockComponent',
    component: ArticleTextBlockComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {},
};

const block = {
    id: '1',
    type: 'TEXT',
    title: 'Заголовок статьи',
    paragraphs: [
        'Первый абзац текста статьи.',
        'Второй абзац текста статьи.',
        'Третий абзац текста статьи.',
    ],
};

export default meta;
type Story = StoryObj<typeof ArticleTextBlockComponent>;

export const Light: Story = {
    args: {
        block: {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: block.title,
            paragraphs: block.paragraphs,
        },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
    args: {
        block: {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: block.title,
            paragraphs: block.paragraphs,
        },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
