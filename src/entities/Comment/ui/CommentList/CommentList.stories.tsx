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
      id: "1",
      username: "User1",
      avatar: "../../../../../src/shared/assets/avatar.jpg",
    },
  },
  {
    id: "2",
    text: "Второй комментарий",
    user: {
      id: "2",
      username: "User2",
      avatar: "../../../../../src/shared/assets/avatar.jpg",
    },
  },
];

export const Normal: Story = {
  args: {
    comments: exampleComments,
    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
  args: {
    comments: exampleComments,
    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const NoComments: Story = {
  args: {
    comments: [],
    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
