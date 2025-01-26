import withMock from "storybook-addon-mock";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { NotificationList } from "./NotificationList";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NotificationList> = {
  title: "entities/NotificationList",
  component: NotificationList,
  parameters: {
    docs: {},
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [withMock],
};

export default meta;
type Story = StoryObj<typeof NotificationList>;

const mockData = [
  {
    id: "1",
    title: "Уведомление",
    description: "Поставь лайк и оставь комментарий!",
  },
  {
    id: "2",
    title: "Уведомление 2",
    description: "Поставь лайк и оставь комментарий!",
  },
  {
    id: "3",
    title: "Уведомление 3",
    description: "Поставь лайк и оставь комментарий!",
  },
];

export const Light: Story = {
  args: {
    mockdata: mockData,
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Dark: Story = {
  args: {
    mockdata: mockData,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
