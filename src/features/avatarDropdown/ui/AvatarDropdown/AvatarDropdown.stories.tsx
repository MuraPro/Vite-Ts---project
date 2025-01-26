import { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { AvatarDropdown } from "./AvatarDropdown";

const meta: Meta<typeof AvatarDropdown> = {
  title: "features/AvatarDropdown",
  component: AvatarDropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AvatarDropdown>;

export const LightTheme: Story = {
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const DarkTheme: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
};
