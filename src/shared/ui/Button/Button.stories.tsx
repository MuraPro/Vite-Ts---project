import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Button, ButtonTheme } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.PRIMARY,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const PrimaryLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.PRIMARY,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const PrimaryInverted: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.PRIMARY_INVERTED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const PrimaryInvertedLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.PRIMARY_INVERTED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Secondary: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.SECONDARY,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const SecondaryLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.SECONDARY,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const SecondaryInverted: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.SECONDARY_INVERTED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const SecondaryInvertedLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.SECONDARY_INVERTED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ClearLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const ClearInverted: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR_INVERTED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ClearInvertedLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR_INVERTED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Outline: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const OutlineLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OutlineInverted: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE_INVERTED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const OutlineInvertedLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE_INVERTED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OutlineRed: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE_RED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OutlineRedLight: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE_RED,
        style: { margin: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
