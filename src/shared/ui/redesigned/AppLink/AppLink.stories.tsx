import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AppLink, AppLinkSize } from './AppLink';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    component: AppLink,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        to: '/',
    },
};

export default meta;

type Story = StoryObj<typeof AppLink>;

export const PrimaryDark: Story = {
    args: {
        children: 'Link',
        variant: 'primary',
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const PrimaryLight: Story = {
    args: {
        children: 'Link',
        variant: 'primary',
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const RedLight: Story = {
    args: {
        children: 'Link',
        variant: 'red',
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const RedDark: Story = {
    args: {
        children: 'Link',
        variant: 'red',
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Small: Story = {
    args: {
        size: AppLinkSize.S,
        children: 'Link',
        style: { position: 'relative', top: '50px', left: '50px' },
    },
};

export const Medium: Story = {
    args: {
        size: AppLinkSize.M,
        children: 'Link',
        style: { position: 'relative', top: '50px', left: '50px' },
    },
};

export const Large: Story = {
    args: {
        size: AppLinkSize.L,
        children: 'Link',
        style: { position: 'relative', top: '50px', left: '50px' },
    },
};

export const ExtraLarge: Story = {
    args: {
        size: AppLinkSize.Xl,
        children: 'Link',
        style: { position: 'relative', top: '50px', left: '50px' },
    },
};
