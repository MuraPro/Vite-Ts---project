import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Dropdown } from './Dropdown';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
    title: 'shared/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Light: Story = {
    args: {
        /* eslint-disable i18next/no-literal-string */
        trigger: <div>Open</div>,
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
    args: {
        /* eslint-disable i18next/no-literal-string */
        trigger: <div>Open</div>,
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
