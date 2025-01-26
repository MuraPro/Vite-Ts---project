## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

- `npm run sb`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { Button, ButtonTheme } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    theme: ButtonTheme.CLEAR,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Text", theme: ButtonTheme.PRIMARY },
  decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryLight: Story = {
  args: { children: "Text", theme: ButtonTheme.PRIMARY },
  decorators: [ThemeDecorator(Theme.DARK)],
};
```
