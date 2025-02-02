import { CollapseDecorator } from '@/shared/config/storybook/CollapseDecorator/CollapseDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Sidebar } from './Sidebar';
import type { Meta, StoryObj } from '@storybook/react';
import './Sidebar.module.scss';

const meta: Meta<typeof Sidebar> = {
    title: 'widget/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
    decorators: [CollapseDecorator, ThemeDecorator(Theme.LIGHT)],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: { className: 'cls.collapsed', style: { left: '0px' } },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
    args: { className: 'cls.collapsed', style: { left: '0px' } },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const WithAuthDark: Story = {
    args: { className: 'cls.collapsed', style: { left: '0px' } },
    decorators: [
        StoreDecorator({
            user: { authData: { id: '1', username: 'admin' } },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const WithAuthLight: Story = {
    args: { className: 'cls.collapsed', style: { left: '0px' } },
    decorators: [
        StoreDecorator({
            user: { authData: { id: '1', username: 'admin' } },
        }),
        ThemeDecorator(Theme.LIGHT),
    ],
};
export const NoAuthDark: Story = {
    args: { className: 'cls.collapsed', style: { left: '0px' } },
    decorators: [
        StoreDecorator({
            user: {},
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const NoAuthLight: Story = {
    args: { className: 'cls.collapsed', style: { left: '0px' } },
    decorators: [
        StoreDecorator({
            user: {},
        }),
        ThemeDecorator(Theme.LIGHT),
    ],
};
