import { Meta, StoryObj } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { AvatarDropdown } from "./AvatarDropdown";

// Мокаем данные для пользователя
const mockState = {
  user: {
    authData: {
      id: "1",
      username: "Test User",
      avatar: "../../../../../src/shared/assets/avatar.jpg", // Ссылка на аватар
    },
    isAdmin: true,
    isManager: false,
  },
};

// Описание метаданных компонента
const meta: Meta<typeof AvatarDropdown> = {
  title: "features/AvatarDropdown",
  component: AvatarDropdown,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarDropdown>;

// История с темой Light
export const Light: Story = {
  args: {
    className: "",
  },
  decorators: [StoreDecorator(mockState), ThemeDecorator(Theme.LIGHT)],
};

// История с темой Dark
export const Dark: Story = {
  args: {
    className: "",
  },
  decorators: [StoreDecorator(mockState), ThemeDecorator(Theme.DARK)],
};
