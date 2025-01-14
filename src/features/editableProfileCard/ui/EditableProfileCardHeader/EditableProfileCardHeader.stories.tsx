import { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { EditableProfileCardHeader } from "./EditableProfileCardHeader";

const meta: Meta<typeof EditableProfileCardHeader> = {
  title: "features/EditableProfileCardHeader/EditableProfileCardHeader",
  component: EditableProfileCardHeader,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof EditableProfileCardHeader>;

export const Light: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};
