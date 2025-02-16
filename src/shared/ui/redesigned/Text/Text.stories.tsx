import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text, TextVariant, TextAlign, TextSize } from './Text';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
    args: {
        title: 'Title Example',
        text: 'Text Example',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'error', 'accent'] as TextVariant[],
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'] as TextAlign[],
        },
        size: {
            control: 'select',
            options: ['s', 'm', 'l'] as TextSize[],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
    args: {
        variant: 'primary',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Error: Story = {
    args: {
        variant: 'error',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Accent: Story = {
    args: {
        variant: 'accent',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Centered: Story = {
    args: {
        align: 'center',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Large: Story = {
    args: {
        size: 'l',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const DarkTheme: Story = {
    args: {
        variant: 'primary',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
