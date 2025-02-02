import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Currency } from '../../model/types/currency';
import { CurrencySelect } from './CurrencySelect';

const meta: Meta<typeof CurrencySelect> = {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'select', options: Object.values(Currency) },
    },
};

export default meta;
type Story = StoryObj<typeof CurrencySelect>;

const CurrencySelectStory = (args: any) => {
    const [selectedValue, setSelectedValue] = useState(args.value);

    return (
        <CurrencySelect
            {...args}
            value={selectedValue}
            onChange={(newValue) => setSelectedValue(newValue)}
        />
    );
};

export const Default: Story = {
    render: (args) => <CurrencySelectStory {...args} />,
    args: {
        label: 'Укажите валюту',
        value: Currency.RUB,
        direction: 'bottom right',
        style: {
            position: 'relative',
            top: '50px',
            left: '50px',
            width: '500px',
        },
    },
};

export const CurrencySelectLight: Story = {
    ...Default,
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const CurrencySelectDark: Story = {
    ...Default,
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const CurrencySelectReadOnlyLight: Story = {
    render: (args) => <CurrencySelectStory {...args} />,
    args: {
        ...Default.args,
        label: 'Валюта заблокирована',
        readonly: true,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const CurrencySelectReadOnlyDark: Story = {
    render: (args) => <CurrencySelectStory {...args} />,
    args: {
        ...Default.args,
        label: 'Валюта заблокирована',
        readonly: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
