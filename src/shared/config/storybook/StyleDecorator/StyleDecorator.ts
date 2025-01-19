import { StoryFn, StoryContext } from "@storybook/react";
import "@/app/styles/index.scss";

export const StyleDecorator = (story: StoryFn, context: StoryContext) => {
  return story({}, context);
};
