import { useState } from 'react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Input } from './Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

const Template = (args: any) => {
    const [value, setValue] = useState<string>(args.value || '');

    return (
        <Input
            {...args}
            value={value}
            onChange={(newValue) => setValue(newValue)} // Здесь newValue — это просто строка
        />
    );
};

export const Light: Story = {
    render: Template,
    args: {
        placeholder: 'Введите текст',
        value: '',
        style: {
            width: '500px',
            marginLeft: '10px',
            padding: '5px',
            border: '2px solid #0232c2',
        },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
    render: Template,
    args: {
        placeholder: 'Введите текст',
        value: '',
        style: {
            width: '500px',
            marginLeft: '10px',
            padding: '5px',
            border: '1px solid #04ff04',
        },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
