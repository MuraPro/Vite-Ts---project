import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Avatar } from './Avatar';
import AvatarImg from './storybook.jpg';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,
    parameters: {
        docs: {
            description: {
                component: 'Компонент Avatar.',
            },
        },
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [
        (Story) => (
            <div
                style={{
                    padding: '20px',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Light: Story = {
    args: {
        size: 50,
        src: AvatarImg,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
    args: {
        size: 50,
        src: AvatarImg,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
