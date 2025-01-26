import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import LoginForm from "./LoginForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LoginForm> = {
  title: "features/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Primary: Story = {
  decorators: [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
      loginForm: {
        username: "123",
        password: "asd",
        error: undefined,
        isLoading: false,
      },
    }),
  ],
};

export const withError: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      loginForm: {
        username: "123",
        password: "asd",
        error: "error",
        isLoading: false,
      },
    }),
  ],
};

export const Loading: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      loginForm: {
        username: "123",
        password: "asd",
        error: undefined,
        isLoading: true,
      },
    }),
  ],
};
