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
    args: {
        theme: ButtonTheme.CLEAR,
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: { children: 'Text', theme: ButtonTheme.PRIMARY },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryLight: Story = {
    args: { children: 'Text', theme: ButtonTheme.PRIMARY },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Secondary: Story = {
    args: { children: 'Text', theme: ButtonTheme.SECONDARY },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const SecondaryLight: Story = {
    args: { children: 'Text', theme: ButtonTheme.SECONDARY },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Clear: Story = {
    args: { children: 'Text' },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ClearLight: Story = {
    args: { children: 'Text' },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Outline: Story = {
    args: { children: 'Text', theme: ButtonTheme.OUTLINE },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const OutlineLight: Story = {
    args: { children: 'Text', theme: ButtonTheme.OUTLINE },
    decorators: [ThemeDecorator(Theme.DARK)],
};
