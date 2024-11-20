import { StoryFn, StoryContext } from "@storybook/react";
import { ModalProvider } from "app/providers/ModalProvider";

export const ModalDecorator = (StoryFn: StoryFn, context: StoryContext) => (
  <ModalProvider>
    <StoryFn {...context.args} />
  </ModalProvider>
);
