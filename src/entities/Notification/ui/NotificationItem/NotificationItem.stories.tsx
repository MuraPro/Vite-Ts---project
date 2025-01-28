import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { NotificationItem } from './NotificationItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NotificationItem> = {
    title: 'entities/NotificationItem',
    component: NotificationItem,
    parameters: {
        docs: {},
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Light: Story = {
    args: {
        item: {
            id: '3',
            title: 'Уведомление 3',
            description: 'Поставь лайк и оставь комментарий!',
        },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
    args: {
        item: {
            id: '3',
            title: 'Уведомление 3',
            description: 'Поставь лайк и оставь комментарий!',
        },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const WithLinkDark: Story = {
    args: {
        item: {
            id: '3',
            title: 'Уведомление 3',
            description: 'Ссылка на сторонний ресурс',
            href: 'http://localhost:3000/admin',
        },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
