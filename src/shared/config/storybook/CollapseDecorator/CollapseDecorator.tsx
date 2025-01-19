import { StoryFn, StoryContext } from "@storybook/react";
import { CollapseProvider } from "@/app/providers/CollapseProvider";

export const CollapseDecorator = (StoryFn: StoryFn, context: StoryContext) => (
  <CollapseProvider>
    <StoryFn {...context.args} />
  </CollapseProvider>
);
