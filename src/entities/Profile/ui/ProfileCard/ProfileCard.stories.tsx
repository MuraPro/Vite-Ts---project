import { Theme } from "@/app/providers/ThemeProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Country, Currency } from "@/shared/const/common";
import { ProfileCard } from "./ProfileCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProfileCard> = {
  title: "entities/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [],
};

export default meta;

type Story = StoryObj<typeof ProfileCard>;

export const Light: Story = {
  args: {
    data: {
      first: "Иван",
      lastname: "Иванов",
      email: "ivan@example.com",
      age: "30",
      city: "Москва",
      username: "ivanivanov",
      currency: Currency.KRW,
      country: Country.Korea,
    },
    isLoading: false,
    error: "",
    readonly: false,
  },
  decorators: [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {
    data: {
      first: "Иван",
      lastname: "Иванов",
      email: "ivan@example.com",
      age: "30",
      city: "Москва",
      username: "ivanivanov",
      currency: Currency.KRW,
      country: Country.Korea,
    },
    isLoading: false,
    error: "",
    readonly: false,
  },
  decorators: [StoreDecorator({}), ThemeDecorator(Theme.DARK)],
};

export const WithError: Story = {
  args: {
    data: {
      first: "Иван",
      lastname: "Иванов",
      email: "ivan@example.com",
      age: "30",
      city: "Москва",
      username: "ivanivanov",
      currency: Currency.KRW,
      country: Country.Korea,
    },
    isLoading: false,
    error: "error",
    readonly: false,
  },
  decorators: [StoreDecorator({}), ThemeDecorator(Theme.DARK)],
};
