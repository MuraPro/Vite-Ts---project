import { Theme } from "app/providers/ThemeProvider";
import { CollapseDecorator } from "shared/config/storybook/CollapseDecorator/CollapseDecorator";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Sidebar } from "./Sidebar";
import type { Meta, StoryObj } from "@storybook/react";
import "./Sidebar.module.scss";

const meta: Meta<typeof Sidebar> = {
  title: "widget/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {},
  decorators: [CollapseDecorator, ThemeDecorator(Theme.LIGHT)],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: { className: "cls.collapsed" },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
  args: { className: "cls.collapsed" },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const WithAuth: Story = {
  args: { className: "cls.collapsed" },
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      user: { authData: { id: "1", username: "admin" } },
    }),
  ],
};
export const NoAuth: Story = {
  args: { className: "cls.collapsed" },
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      user: {},
    }),
  ],
};
