import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Country } from '../../model/types/country';
import { CountrySelect } from './CountrySelect';

const meta: Meta<typeof CountrySelect> = {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'select', options: Object.values(Country) },
    },
};

export default meta;
type Story = StoryObj<typeof CountrySelect>;

const CountrySelectStory = (args: any) => {
    const [selectedValue, setSelectedValue] = useState(args.value);

    return (
        <CountrySelect
            {...args}
            value={selectedValue}
            onChange={(newValue) => setSelectedValue(newValue)}
        />
    );
};

export const Default: Story = {
    render: (args) => <CountrySelectStory {...args} />,
    args: {
        label: 'Укажите страну',
        value: Country.Russia,
        direction: 'bottom right',
        style: {
            position: 'relative',
            top: '50px',
            left: '50px',
            width: '500px',
        },
    },
};

export const CountrySelectLight: Story = {
    ...Default,
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const CountrySelectDark: Story = {
    ...Default,
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const CountrySelectReadOnlyLight: Story = {
    render: (args) => <CountrySelectStory {...args} />,
    args: {
        ...Default.args,
        label: 'Страна заблокирована',
        readonly: true,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const CountrySelectReadOnlyDark: Story = {
    render: (args) => <CountrySelectStory {...args} />,
    args: {
        ...Default.args,
        label: 'Страна заблокирована',
        readonly: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
