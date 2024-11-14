import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { NotFoundPage } from "./NotFoundPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NotFoundPage> = {
  title: "page/NotFoundPage",
  component: NotFoundPage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof NotFoundPage>;

export const Normal: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};