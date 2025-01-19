import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Country } from "../../model/types/country";
import { CountrySelect } from "./CountrySelect";

const meta: Meta<typeof CountrySelect> = {
  title: "entities/CountrySelect",
  component: CountrySelect,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: {
        type: "radio",
        options: [
          Country.Russia,
          Country.USA,
          Country.Korea,
          Country.Uzbekistan,
          Country.Thailand,
          Country.Kazakhstan,
        ],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Component for managing selected country state
const CountrySelectStory = (args: any) => {
  const [selectedValue, setSelectedValue] = useState(args.value);

  return (
    <CountrySelect
      {...args}
      value={selectedValue}
      onChange={(newValue) => setSelectedValue(newValue)}
    />
  );
};

export const Default: Story = {
  render: (args) => <CountrySelectStory {...args} />,
  args: {
    label: "Укажите страну",
    value: Country.Russia,
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
  render: (args) => <CountrySelectStory {...args} />,
  args: {
    ...Default.args,
    readonly: true,
  },
};
