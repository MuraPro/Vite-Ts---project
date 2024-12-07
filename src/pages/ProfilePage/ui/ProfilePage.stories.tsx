import { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Country, Currency } from "shared/const/common";
import ProfilePage from "./ProfilePage";

const meta: Meta<typeof ProfilePage> = {
  title: "page/ProfilePage",
  component: ProfilePage,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ProfilePage>;

export const Light: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      profile: {
        form: {
          first: "Иван",
          lastname: "Иванов",
          age: "30",
          email: "ivan.ivanov@example.com",
          city: "Москва",
          username: "ivan_ivanov",
          avatar:
            "https://avatars.mds.yandex.net/i?id=b155d366f61dc21400882f1c260c19283d5cabe6-9211751-images-thumbs&n=13",
          currency: Currency.RUB,
          country: Country.Russia,
        },
        isLoading: false,
        readonly: true,
        error: "",
      },
    }),
    ThemeDecorator(Theme.LIGHT),
  ],
};
export const Dark: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      profile: {
        form: {
          first: "Иван",
          lastname: "Иванов",
          age: "30",
          email: "ivan.ivanov@example.com",
          city: "Москва",
          username: "ivan_ivanov",
          avatar:
            "https://avatars.mds.yandex.net/i?id=b155d366f61dc21400882f1c260c19283d5cabe6-9211751-images-thumbs&n=13",
          currency: Currency.RUB,
          country: Country.Russia,
        },
        isLoading: false,
        readonly: true,
        error: "",
      },
    }),
    ThemeDecorator(Theme.DARK),
  ],
};
