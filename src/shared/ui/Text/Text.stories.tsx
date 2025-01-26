import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { Text, TextSize, TextTheme } from "../Text/Text";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Text> = {
  title: "shared/Text",
  component: Text,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Error: Story = {
  args: {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
    theme: TextTheme.ERROR,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const onlyTitle: Story = {
  args: {
    title: "Title lorem ipsun",
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const onlyText: Story = {
  args: {
    text: "Description Description Description Description",
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const PrimaryLight: Story = {
  args: {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const onlyTitleLight: Story = {
  args: {
    title: "Title lorem ipsun",
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const onlyTextLight: Story = {
  args: {
    text: "Description Description Description Description",
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const SizeL: Story = {
  args: {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
    size: TextSize.L,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const SizeM: Story = {
  args: {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
    size: TextSize.M,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const SizeS: Story = {
  args: {
    title: "Title lorem ipsun",
    text: "Description Description Description Description",
    size: TextSize.S,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
