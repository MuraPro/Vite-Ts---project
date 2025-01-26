import { StoryFn, StoryContext } from "@storybook/react";
// eslint-disable-next-line mura-pro-plugin/layer-imports
import { ModalProvider } from "@/app/providers/ModalProvider";

export const ModalDecorator = (StoryFn: StoryFn, context: StoryContext) => (
  <ModalProvider>
    <StoryFn {...context.args} />
  </ModalProvider>
);
