import { CollapseDecorator } from "@/shared/config/storybook/CollapseDecorator/CollapseDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { BurgerButton } from "./BurgerButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BurgerButton> = {
  title: "shared/BurgerButton",
  component: BurgerButton,
  parameters: {
    docs: {
      description: {
        component:
          "Компонент BurgerButton предназначен для открытия/закрытия Sidebar.",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [
    CollapseDecorator,
    ThemeDecorator(Theme.LIGHT),
    (Story) => (
      <div
        style={{
          padding: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BurgerButton>;

export const Light: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};
