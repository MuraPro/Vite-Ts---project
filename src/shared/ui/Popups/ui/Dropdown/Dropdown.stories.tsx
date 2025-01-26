import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { Button } from "../../../Button/Button";
import { Dropdown } from "./Dropdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dropdown> = {
  title: "shared/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "50px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Light: Story = {
  args: {
    /* eslint-disable i18next/no-literal-string */
    trigger: <Button>Open</Button>,
    items: [
      {
        content: "first",
      },
      {
        content: "second",
      },
      {
        content: "third",
      },
    ],
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Dark: Story = {
  args: {
    /* eslint-disable i18next/no-literal-string */
    trigger: <Button>Open</Button>,
    items: [
      {
        content: "first",
      },
      {
        content: "second",
      },
      {
        content: "third",
      },
    ],
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
