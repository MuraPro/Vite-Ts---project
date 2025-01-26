import { Meta, StoryObj } from "@storybook/react";
import { StateSchema } from "@/app/providers/StoreProvider";
import {
  ArticleBlockType,
  ArticleSortField,
  ArticleType,
  ArticleView,
} from "@/entities/Article";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { ArticleInfiniteList } from "./ArticleInfiniteList";

const mockState: DeepPartial<StateSchema> = {
  articlesPage: {
    isLoading: false,
    error: undefined,
    ids: ["1", "2"],
    entities: {
      "1": {
        id: "1",
        title: "Article 1",
        subtitle: "Subtitle 1",
        img: "../../../../../src/shared/assets/kr/1A.webp",
        views: 100,
        createdAt: "2022-01-01",
        user: { id: "1", username: "User 1" },
        type: [ArticleType.LANGUAGE],
        blocks: [
          {
            id: "1",
            type: ArticleBlockType.TEXT,
            title: "Уровни знания корейского языка",
            paragraphs: [
              "Если вы осваиваете корейский язык, то компасом на вашем образовательном маршруте станет TOPIK (Test of Proficiency in Korean) – специальный тест на знание корейского языка. Он предназначен для неносителей языка.Данная аттестационная система была разработана еще в 1997 году правительством Южной Кореи. По сей день она является основной. Чаще всего тест проходят те, кто планирует обучение в ВУЗах Южной Кореи, трудоустройство в компании этой страны или иностранцы, претендующие на постоянное место жительства здесь.",
            ],
          },
        ],
      },
      "2": {
        id: "2",
        title: "Article 2",
        subtitle: "Subtitle 2",
        img: "../../../../../src/shared/assets/kr/1B.jpg",
        views: 200,
        createdAt: "2022-01-02",
        user: { id: "2", username: "User 2" },
        type: [ArticleType.LANGUAGE],
        blocks: [
          {
            id: "1",
            type: ArticleBlockType.TEXT,
            title: "Уровни знания корейского языка",
            paragraphs: [
              "Если вы осваиваете корейский язык, то компасом на вашем образовательном маршруте станет TOPIK (Test of Proficiency in Korean) – специальный тест на знание корейского языка. Он предназначен для неносителей языка.Данная аттестационная система была разработана еще в 1997 году правительством Южной Кореи. По сей день она является основной. Чаще всего тест проходят те, кто планирует обучение в ВУЗах Южной Кореи, трудоустройство в компании этой страны или иностранцы, претендующие на постоянное место жительства здесь.",
            ],
          },
        ],
      },
    },
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
    limit: 10,
    sort: ArticleSortField.CREATED,
    order: "asc",
    search: "",
    type: ArticleType.ALL,
    _inited: false,
  },
};

const mockStateLoading: DeepPartial<StateSchema> = {
  articlesPage: {
    isLoading: true,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
    limit: 1,
    sort: ArticleSortField.CREATED,
    order: "asc",
    search: "",
    type: ArticleType.ALL,
    _inited: false,
  },
};

const meta: Meta<typeof ArticleInfiniteList> = {
  title: "pages/ArticleInfiniteList",
  component: ArticleInfiniteList,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ArticleInfiniteList>;

export const Light: Story = {
  decorators: [StoreDecorator(mockState), ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
  decorators: [StoreDecorator(mockState), ThemeDecorator(Theme.DARK)],
};
export const LightLoading: Story = {
  decorators: [StoreDecorator(mockStateLoading), ThemeDecorator(Theme.LIGHT)],
};
export const DarkLoading: Story = {
  decorators: [StoreDecorator(mockStateLoading), ThemeDecorator(Theme.DARK)],
};
