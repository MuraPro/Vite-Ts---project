import React from "react";

export default function storyTemplate(layer, componentName) {
  return `import { ${componentName} } from './${componentName}';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ${componentName}> = {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Light: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)],
};

`;
}
