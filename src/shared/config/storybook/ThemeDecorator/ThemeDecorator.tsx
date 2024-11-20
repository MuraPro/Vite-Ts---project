import { StoryFn, StoryContext } from "@storybook/react";
import { ThemeProvider, Theme } from "app/providers/ThemeProvider";

export const ThemeDecorator =
  (theme: Theme) => (StoryComponent: StoryFn, context: StoryContext) => {
    return (
      <ThemeProvider initialTheme={theme}>
        <div
          className={`theme ${theme}`}
          style={{
            width: "1400px",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StoryComponent {...context.args} />
        </div>
      </ThemeProvider>
    );
  };
