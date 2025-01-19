import { Theme } from "@/app/providers/ThemeProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { CommentCard } from "./CommentCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CommentCard> = {
  title: "entities/CommentCard",
  component: CommentCard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CommentCard>;

const exampleComment = {
  id: "1",
  text: "Это пример комментария.",
  user: {
    id: "1",
    username: "John Doe",
    avatar:
      "https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg",
  },
};

export const Light: Story = {
  args: {
    comment: exampleComment,
    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})],
};

export const Dark: Story = {
  args: {
    comment: exampleComment,
    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};

export const Loading: Story = {
  args: {
    comment: exampleComment,
    isLoading: true,
  },
  decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})],
};
export const LoadingDark: Story = {
  args: {
    comment: exampleComment,
    isLoading: true,
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};
