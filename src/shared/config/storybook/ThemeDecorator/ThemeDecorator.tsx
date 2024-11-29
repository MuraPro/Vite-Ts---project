import { StoryFn, StoryContext } from "@storybook/react";
import { ThemeProvider, Theme } from "app/providers/ThemeProvider";

export const ThemeDecorator =
  (theme: Theme) => (StoryComponent: StoryFn, context: StoryContext) => {
    document.body.className = theme;
    return (
      <ThemeProvider initialTheme={theme}>
        <div
          className="app"
          style={{
            paddingTop: "30px",
          }}
        >
          <StoryComponent {...context.args} />
        </div>
      </ThemeProvider>
    );
  };
