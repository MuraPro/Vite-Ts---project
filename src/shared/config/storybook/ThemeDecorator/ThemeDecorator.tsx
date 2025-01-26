import { StoryFn, StoryContext } from "@storybook/react";
// eslint-disable-next-line mura-pro-plugin/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";

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
