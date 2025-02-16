import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import { AppImage } from './AppImage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AppImage> = {
    title: 'shared/AppImage',
    component: AppImage,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AppImage>;

export const WithFallbackDark: Story = {
    args: {
        src: '',
        fallback: (
            <Skeleton
                width={100}
                height={100}
                border="50%"
                customStyles={{
                    position: 'relative',
                    top: '20px',
                    left: '20px',
                }}
            />
        ),
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const WithFallbacklight: Story = {
    args: {
        src: '',
        fallback: (
            <Skeleton
                width={100}
                height={100}
                border="50%"
                customStyles={{
                    position: 'relative',
                    top: '20px',
                    left: '20px',
                }}
            />
        ),
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const WithErrorFallbackDark: Story = {
    args: {
        src: 'invalid-url',
        errorFallback: <Icon width={100} height={100} Svg={UserIcon} />,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const WithErrorFallbackLight: Story = {
    args: {
        src: 'invalid-url',
        errorFallback: <Icon width={100} height={100} Svg={UserIcon} />,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const DarkTheme: Story = {
    args: {
        src: '../../../../../src/shared/assets/kr/1A.webp',
        style: {
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '20px',
        },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightTheme: Story = {
    args: {
        src: '../../../../../src/shared/assets/kr/1A.webp',
        style: {
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '20px',
        },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
