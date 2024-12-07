import { StoryFn, StoryContext } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

export const RouterDecorator = (StoryFn: StoryFn, context: StoryContext) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <StoryFn {...context.args} />
    </MemoryRouter>
  );
};
