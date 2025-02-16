import { Meta, StoryObj } from '@storybook/react/*';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'shared/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Circle: Story = {
    args: { border: '50%', width: 100, height: 100 },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const CircleDark: Story = {
    args: { border: '50%', width: 100, height: 100 },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const NormalLight: Story = {
    args: { width: '100%', height: 200 },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const NormalDark: Story = {
    args: { width: '100%', height: 200 },
    decorators: [ThemeDecorator(Theme.DARK)],
};
