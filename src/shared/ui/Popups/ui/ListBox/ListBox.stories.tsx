import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ListBox, ListBoxItem } from './ListBox';

const meta: Meta<typeof ListBox> = {
    title: 'shared/ListBox',
    component: ListBox,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ListBox>;

// Пример данных для списка
const items: ListBoxItem[] = [
    { value: 'option1', content: 'Option 1' },
    { value: 'option2', content: 'Option 2' },
    { value: 'option3', content: 'Option 3', disabled: true },
];

export const ListBoxLight: Story = {
    args: {
        label: 'Select',
        items,
        defaultValue: 'options',
        direction: 'bottom right',
        style: { marginLeft: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const ListBoxDark: Story = {
    args: {
        label: 'Select',
        items,
        defaultValue: 'options',
        direction: 'bottom right',
        style: { marginLeft: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
