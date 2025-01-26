import { Meta, StoryObj } from "@storybook/react/*";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { Flex } from "./Flex";

const meta: Meta<typeof Flex> = {
  title: "shared/Flex",
  component: Flex,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Flex>;
/* eslint-disable i18next/no-literal-string */
export const Row: Story = {
  args: {
    children: (
      <>
        <div>first</div>
        <div>first</div>
        <div>first</div>
        <div>first</div>
      </>
    ),
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const RowGap4: Story = {
  args: {
    gap: "4",
    children: (
      <>
        <div>first</div>
        <div>first</div>
        <div>first</div>
        <div>first</div>
      </>
    ),
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const RowGap8: Story = {
  args: {
    gap: "8",
    children: (
      <>
        <div>first</div>
        <div>first</div>
        <div>first</div>
        <div>first</div>
      </>
    ),
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const RowGap16: Story = {
  args: {
    gap: "16",
    children: (
      <>
        <div>first</div>
        <div>first</div>
        <div>first</div>
        <div>first</div>
      </>
    ),
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Column: Story = {
  args: {
    direction: "column",
    children: (
      <>
        <div>first</div>
        <div>first</div>
        <div>first</div>
        <div>first</div>
      </>
    ),
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ColumnGap16: Story = {
  args: {
    gap: "16",
    direction: "column",
    children: (
      <>
        <div>first</div>
        <div>first</div>
        <div>first</div>
        <div>first</div>
      </>
    ),
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ColumnAlignEnd: Story = {
  args: {
    direction: "column",
    align: "end",
    children: (
      <>
        <div>first</div>
        <div>first</div>
        <div>first</div>
        <div>first</div>
      </>
    ),
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
