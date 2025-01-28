import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ListBox, ListBoxItem } from './ListBox';

const meta: Meta<typeof ListBox> = {
    title: 'shared/ListBox',
    component: ListBox,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        direction: {
            control: {
                type: 'radio',
                options: ['top', 'bottom'],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ListBox>;

// Пример данных для списка
const items: ListBoxItem[] = [
    { value: 'option1', content: 'Option 1' },
    { value: 'option2', content: 'Option 2' },
    { value: 'option3', content: 'Option 3', disabled: true },
];

// Создание отдельного компонента для управления состоянием
const ListBoxWrapper = (args: any) => {
    const [selectedValue, setSelectedValue] = useState(args.defaultValue);

    return (
        <ListBox
            {...args}
            value={selectedValue}
            onChange={(value) => setSelectedValue(value)}
        />
    );
};

export const DynamicButtonLabel: Story = {
    render: (args) => <ListBoxWrapper {...args} />,
    args: {
        label: 'Select an option',
        items,
        defaultValue: 'Select',
        direction: 'bottom right',
    },
};

export const LightTheme: Story = {
    ...DynamicButtonLabel,
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const DarkTheme: Story = {
    ...DynamicButtonLabel,
    decorators: [ThemeDecorator(Theme.DARK)],
};
