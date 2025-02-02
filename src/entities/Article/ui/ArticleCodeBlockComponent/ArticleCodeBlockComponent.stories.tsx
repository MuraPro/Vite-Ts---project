import { Meta, StoryObj } from '@storybook/react/*';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

const meta: Meta<typeof ArticleCodeBlockComponent> = {
    title: 'entities/Article/ArticleCodeBlockComponent',
    component: ArticleCodeBlockComponent,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof ArticleCodeBlockComponent>;

const block = {
    id: '1',
    type: 'CODE',
    code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
};

export const DarkTheme: Story = {
    args: {
        block: { id: '1', type: ArticleBlockType.CODE, code: block.code },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightTheme: Story = {
    args: {
        block: { id: '1', type: ArticleBlockType.CODE, code: block.code },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
