import { Meta, StoryObj } from "@storybook/react/*";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { Code } from "./Code";

const meta: Meta<typeof Code> = {
  title: "shared/Code",
  component: Code,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Normal: Story = {
  args: {
    text:
      "export default {\n" +
      "    title: 'shared/Code',\n" +
      "    component: Code,\n" +
      "    argTypes: {\n" +
      "        backgroundColor: { control: 'color' },\n" +
      "    },\n" +
      "} as ComponentMeta<typeof Code>;\n" +
      "\n" +
      "const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n" +
      "\n" +
      "export const Normal = Template.bind({});",
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const Light: Story = {
  args: {
    text:
      "export default {\n" +
      "    title: 'shared/Code',\n" +
      "    component: Code,\n" +
      "    argTypes: {\n" +
      "        backgroundColor: { control: 'color' },\n" +
      "    },\n" +
      "} as ComponentMeta<typeof Code>;\n" +
      "\n" +
      "const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n" +
      "\n" +
      "export const Normal = Template.bind({});",
  },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
