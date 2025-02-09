import { Meta, StoryObj } from '@storybook/react';
import SomeSvg from '@/shared/assets/icons/app-logo.svg';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
    title: 'shared/Icon',
    component: Icon,
    tags: ['autodocs'],
    args: {
        Svg: SomeSvg,
        width: 32,
        height: 32,
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
    args: {
        className: '',
        style: { margin: '50px', width: '100px', height: '100px' },
    },
};

export const Clickable: Story = {
    args: {
        clickable: true,
        onClick: () => alert('Icon clicked!'),
        style: { margin: '50px', width: '100px', height: '100px' },
    },
};
