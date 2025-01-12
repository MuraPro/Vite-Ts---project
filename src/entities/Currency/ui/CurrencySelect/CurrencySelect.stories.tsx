import { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { useState } from "react";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Currency } from "../../model/types/currency";
import { CurrencySelect } from "./CurrencySelect";

const meta: Meta<typeof CurrencySelect> = {
  title: "entities/CurrencySelect",
  component: CurrencySelect,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: {
        type: "radio",
        options: [Currency.RUB, Currency.EUR, Currency.USD, Currency.KRW],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Компонент для управления состоянием выбора валюты
const CurrencySelectStory = (args: any) => {
  const [selectedValue, setSelectedValue] = useState(args.value);

  return (
    <CurrencySelect
      {...args}
      value={selectedValue}
      onChange={(newValue) => setSelectedValue(newValue)}
    />
  );
};

export const Default: Story = {
  render: (args) => <CurrencySelectStory {...args} />,
  args: {
    label: "Укажите валюту",
    value: Currency.USD,
  },
};

export const LightTheme: Story = {
  ...Default,
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const DarkTheme: Story = {
  ...Default,
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const ReadOnly: Story = {
  render: (args) => <CurrencySelectStory {...args} />,
  args: {
    ...Default.args,
    readonly: true,
  },
};
