import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AppLink, AppLinkSize } from './AppLink';
import { AppLinkTheme } from './AppLink';
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
        theme: AppLinkTheme.PRIMARY,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const PrimaryLight: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.PRIMARY,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryInvertedDark: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.PRIMARY_INVERTED,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const PrimaryInvertedLight: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.PRIMARY_INVERTED,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const SecondaryDark: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.SECONDARY,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const SecondaryLight: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.SECONDARY,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const SecondaryInvertedDark: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.SECONDARY_INVERTED,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const SecondaryInvertedLight: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.SECONDARY_INVERTED,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const RedLight: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.RED,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const RedDark: Story = {
    args: {
        children: 'Link',
        theme: AppLinkTheme.RED,
        size: AppLinkSize.M,
        style: { position: 'relative', top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
