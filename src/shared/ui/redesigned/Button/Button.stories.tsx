import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['clear', 'outline'],
        },
        size: {
            control: 'select',
            options: ['se', 's', 'm', 'l'],
        },
        square: { control: 'boolean' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
    },
    args: {
        children: 'Click me',
        square: false,
        disabled: false,
        fullWidth: false,
        style: { margin: '50px' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ClearDark: Story = {
    args: { variant: 'clear' },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Clearlight: Story = {
    args: { variant: 'clear' },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const OutlineDark: Story = {
    args: { variant: 'outline', style: { margin: '50px' } },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const OutlineLight: Story = {
    args: { variant: 'outline', style: { margin: '50px' } },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Small: Story = {
    args: { size: 's', style: { margin: '50px' } },
};

export const Large: Story = {
    args: { size: 'l', style: { margin: '50px' } },
};

export const Square: Story = {
    args: { square: true, size: 's', style: { margin: '50px' } },
};

export const Disabled: Story = {
    args: { disabled: true, style: { margin: '50px' } },
};

export const FullWidth: Story = {
    args: { fullWidth: true, style: { margin: '50px' } },
};
