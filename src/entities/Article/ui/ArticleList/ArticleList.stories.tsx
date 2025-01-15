import { Meta, StoryObj } from "@storybook/react/*";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import {
  ArticleBlockType,
  ArticleType,
  ArticleView,
} from "../../model/consts/articleConsts";
import { Article } from "../../model/types/article";
import { ArticleList } from "./ArticleList";

const meta: Meta<typeof ArticleList> = {
  title: "entities/Article/ArticleList",
  component: ArticleList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleList>;

const article: Article = {
  id: "1",
  title: "Уровни владения корейским языком",
  subtitle:
    "Всегда полезно определить точку, в которой находишься, чтобы построить дальнейший путь. При изучении иностранного языка это тоже важно.",
  img: "../../../../../src/shared/assets/kr/1A.webp",
  views: 1022,
  createdAt: "15.12.2024",
  user: {
    id: "1",
    username: "Ulbi tv",
    avatar:
      "https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg",
  },
  type: [ArticleType.LANGUAGE],
  blocks: [
    {
      id: "1",
      type: ArticleBlockType.TEXT,
      title: "Заголовок этого блока",
      paragraphs: [
        "Если вы осваиваете корейский язык, то компасом на вашем образовательном маршруте станет TOPIK (Test of Proficiency in Korean) – специальный тест на знание корейского языка. Он предназначен для неносителей языка.Данная аттестационная система была разработана еще в 1997 году правительством Южной Кореи. По сей день она является основной. Чаще всего тест проходят те, кто планирует обучение в ВУЗах Южной Кореи, трудоустройство в компании этой страны или иностранцы, претендующие на постоянное место жительства здесь.",
      ],
    },
    {
      id: "2",
      type: ArticleBlockType.IMAGE,
      src: "../../../../../src/shared/assets/kr/1A.webp",
      title:
        "На сегодняшний день существует два уровня теста: TOPIK I и TOPIK II.",
      text1:
        "В TOPIK I включены подуровни 1 и 2. Уровень по-корейски называется “гып” (급). Это начальный уровень знания корейского языка. При сдаче теста TOPIK I экзаменуемые тестируются по двум основным разделам: аудирование и чтение. С заданиями нужно справиться за 100 минут. Это будут вопросы с несколькими вариантами ответов для прослушивания и чтения.",
      text2:
        "TOPIK II состоит из четырех подуровней (с 3 по 6). Это средний и продвинутый уровни. На экзамене TOPIK II аттестуемым предстоит ответить на вопросы трех блоков: аудирование (50 вопросов), чтение (50 вопросов) и письмо (2 задания — с короткими ответами, 1 — описание графика, 1 — сочинение). На выполнение заданий дается 180 минут.",
    },
  ],
};

export const LoadingBig: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.BIG,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const LoadingSmall: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.SMALL,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ListSmall: Story = {
  args: {
    articles: new Array(9).fill(0).map((_, index) => ({
      ...article,
      id: String(index),
    })),
    isLoading: false,
    view: ArticleView.SMALL,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const ListBig: Story = {
  args: {
    articles: new Array(9).fill(0).map((_, index) => ({
      ...article,
      id: String(index),
    })),
    isLoading: false,
    view: ArticleView.BIG,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
