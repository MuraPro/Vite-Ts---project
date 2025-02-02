import { Meta, StoryObj } from '@storybook/react/*';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { ArticleImageBlock } from '../../model/types/article';
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';

const meta: Meta<typeof ArticleImageBlockComponent> = {
    title: 'entities/Article/ArticleImageBlockComponent',
    component: ArticleImageBlockComponent,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof ArticleImageBlockComponent>;

const block: ArticleImageBlock = {
    id: '1',
    type: ArticleBlockType.IMAGE,
    src: '../../../../../src/shared/assets/kr/1A.webp',
    title: 'Заголовок',
    text1: 'описание 1',
    text2: 'описание 2',
};

export const DarkTheme: Story = {
    args: {
        block: { ...block },
        style: { width: '1000px', marginTop: '20px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightTheme: Story = {
    args: {
        block: { ...block },
        style: { width: '1000px', marginTop: '20px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
