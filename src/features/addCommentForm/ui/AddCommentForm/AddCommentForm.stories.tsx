import { action } from '@storybook/addon-actions';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import AddCommentForm from './AddCommentForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AddCommentForm> = {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof AddCommentForm>;

export const AddCommentFormDark: Story = {
    args: {
        onSendComment: action('onSendComment'),
    },
    decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};
export const AddCommentFormLight: Story = {
    args: {
        onSendComment: action('onSendComment'),
    },
    decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})],
};
