import { StoryFn, StoryContext } from "@storybook/react";
import { ThemeProvider, Theme } from "app/providers/ThemeProvider";

export const ThemeDecorator =
  (theme: Theme) => (StoryComponent: StoryFn, context: StoryContext) => {
    document.body.className = theme;
    return (
      <ThemeProvider initialTheme={theme}>
        <div
          className={`app ${theme}`}
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
