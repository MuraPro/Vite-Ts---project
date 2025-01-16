import { Theme } from "app/providers/ThemeProvider";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Navbar } from "./Navbar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Navbar> = {
  title: "widget/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {},
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "40px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const WithAuth: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      user: {
        authData: {
          id: "1",
          username: "admin",
          avatar:
            "https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg",
        },
      },
    }),
    ThemeDecorator(Theme.DARK),
  ],
};
export const NoAuth: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      user: {},
    }),
    ThemeDecorator(Theme.DARK),
  ],
};
