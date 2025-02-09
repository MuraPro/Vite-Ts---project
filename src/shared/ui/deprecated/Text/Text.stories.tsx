import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text, TextSize, TextTheme } from '../Text/Text';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof Text>;

export const PrimaryLight: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        theme: TextTheme.PRIMARY,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryDark: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        theme: TextTheme.PRIMARY,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const PrimaryInvertedLight: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        theme: TextTheme.INVERTED,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryInvertedDark: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        theme: TextTheme.INVERTED,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const ErrorLight: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        theme: TextTheme.ERROR,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ErrorDark: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        theme: TextTheme.ERROR,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const onlyTitle: Story = {
    args: {
        title: 'Title lorem ipsun',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const onlyText: Story = {
    args: {
        text: 'Description Description Description Description',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const H1: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        size: TextSize.L,
        as: 'h1',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const H2: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        size: TextSize.L,
        as: 'h2',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const H3: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        size: TextSize.L,
        as: 'h3',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Span: Story = {
    args: {
        title: 'Title lorem ipsun',
        text: 'Description Description Description Description',
        size: TextSize.M,
        as: 'span',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
