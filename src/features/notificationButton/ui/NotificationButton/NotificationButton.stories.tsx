import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { NotificationButton } from './NotificationButton';

const meta: Meta<typeof NotificationButton> = {
    title: 'features/NotificationButton',
    component: NotificationButton,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
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
        ThemeDecorator(Theme.LIGHT),
    ],
};

export default meta;

type Story = StoryObj<typeof NotificationButton>;

export const Light: Story = {
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
