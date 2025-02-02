import { CollapseDecorator } from '@/shared/config/storybook/CollapseDecorator/CollapseDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { BurgerButton } from './BurgerButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BurgerButton> = {
    title: 'shared/BurgerButton',
    component: BurgerButton,
    parameters: {
        docs: {
            description: {
                component:
                    'Компонент BurgerButton предназначен для открытия/закрытия Sidebar.',
            },
        },
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [CollapseDecorator],
};

export default meta;
type Story = StoryObj<typeof BurgerButton>;

export const Light: Story = {
    args: {
        style: { top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
    args: {
        style: { top: '50px', left: '50px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
