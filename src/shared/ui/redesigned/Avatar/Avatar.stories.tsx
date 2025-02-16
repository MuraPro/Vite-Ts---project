import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'number',
            defaultValue: 100,
        },
        src: {
            control: 'text',
            defaultValue: '',
        },
        alt: {
            control: 'text',
            defaultValue: 'Avatar Image',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithFallbackDark: Story = {
    args: {
        src: '',
        size: 100,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithFallbackLight: Story = {
    args: {
        src: '',
        size: 100,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const WithErrorFallbackDark: Story = {
    args: {
        src: 'invalid-url',
        size: 100,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithErrorFallbackLight: Story = {
    args: {
        src: 'invalid-url',
        size: 100,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const WithImageDark: Story = {
    args: {
        src: '../../../../../src/shared/assets/kr/1A.webp',
        size: 100,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithImageLight: Story = {
    args: {
        src: '../../../../../src/shared/assets/kr/1A.webp',
        size: 100,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const CustomSize: Story = {
    args: {
        src: '../../../../../src/shared/assets/kr/1A.webp',
        size: 150,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
