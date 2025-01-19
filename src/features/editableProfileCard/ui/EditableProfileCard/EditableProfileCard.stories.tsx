import { Meta, StoryObj } from "@storybook/react";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { EditableProfileCard } from "./EditableProfileCard";

const meta: Meta<typeof EditableProfileCard> = {
  title: "features/editableProfileCard/EditableProfileCard",
  component: EditableProfileCard,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof EditableProfileCard>;

export const Light: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};
