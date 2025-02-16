import { Meta, StoryObj } from '@storybook/react/*';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text } from '../Text/Text';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
    title: 'shared/Card',
    component: Card,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Dark: Story = {
    args: { children: <Text title="test" text="text text" /> },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Light: Story = {
    args: { children: <Text title="test" text="text text" /> },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const BorderRoundDark: Story = {
    args: {
        children: <Text title="test" text="text text" />,
        border: 'round',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const BorderNormalDark: Story = {
    args: {
        children: <Text title="test" text="text text" />,
        border: 'normal',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
