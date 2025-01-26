import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { CommentList } from "./CommentList";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CommentList> = {
  title: "entities/CommentList",
  component: CommentList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof CommentList>;

// Пример данных для списка комментариев
const exampleComments = [
  {
    id: "1",
    text: "Первый комментарий",
    user: {
      id: "u1",
      username: "User1",
      avatar:
        "https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg",
    },
  },
  {
    id: "2",
    text: "Второй комментарий",
    user: {
      id: "u2",
      username: "User2",
      avatar:
        "https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg",
    },
  },
];

// Список комментариев в светлой теме
export const Normal: Story = {
  args: {
    comments: exampleComments, // Передаем список комментариев
    isLoading: false, // Отключаем состояние загрузки
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

// Список комментариев в темной теме
export const Dark: Story = {
  args: {
    comments: exampleComments,
    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

// Состояние без комментариев
export const NoComments: Story = {
  args: {
    comments: [], // Пустой список
    isLoading: false, // Не загружается
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
