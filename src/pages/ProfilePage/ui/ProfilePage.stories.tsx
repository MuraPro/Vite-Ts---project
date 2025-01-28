import { Meta, StoryObj } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import ProfilePage from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof ProfilePage>;

export const Light: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                data: {
                    first: 'Иван',
                    lastname: 'Иванов',
                    age: '30',
                    email: 'ivan.ivanov@example.com',
                    city: 'Москва',
                    username: 'ivan_ivanov',
                    currency: Currency.RUB,
                    country: Country.Russia,
                },
                isLoading: false,
                readonly: true,
                error: undefined,
            },
        }),
        ThemeDecorator(Theme.LIGHT),
    ],
};
export const Dark: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                data: {
                    first: 'Иван',
                    lastname: 'Иванов',
                    age: '30',
                    email: 'ivan.ivanov@example.com',
                    city: 'Москва',
                    username: 'ivan_ivanov',
                    currency: Currency.RUB,
                    country: Country.Russia,
                },
                isLoading: false,
                readonly: true,
                error: undefined,
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const WithError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                data: {
                    first: 'Иван',
                    lastname: 'Иванов',
                    age: '30',
                    email: 'ivan.ivanov@example.com',
                    city: 'Москва',
                    username: 'ivan_ivanov',
                    currency: Currency.RUB,
                    country: Country.Russia,
                },
                isLoading: false,
                readonly: true,
                error: 'error',
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};
