import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AppLogo } from './AppLogo';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AppLogo> = {
    title: 'shared/AppLogo',
    component: AppLogo,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'number' },
            description: 'Размер логотипа',
            defaultValue: '100px',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: '100px',
    },
};

export const SmallDark: Story = {
    args: {
        size: '50px',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const SmallLight: Story = {
    args: {
        size: '50px',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const LargeDark: Story = {
    args: {
        size: '150px',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LargeLight: Story = {
    args: {
        size: '150px',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
