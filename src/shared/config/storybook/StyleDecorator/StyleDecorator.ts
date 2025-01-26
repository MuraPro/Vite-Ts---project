import { StoryFn, StoryContext } from "@storybook/react";
// eslint-disable-next-line mura-pro-plugin/layer-imports
import "@/app/styles/index.scss";

export const StyleDecorator = (story: StoryFn, context: StoryContext) => {
  return story({}, context);
};
