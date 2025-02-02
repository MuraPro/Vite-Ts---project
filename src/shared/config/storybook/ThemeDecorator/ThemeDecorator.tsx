import { StoryFn, StoryContext } from '@storybook/react';
// eslint-disable-next-line mura-pro-plugin/layer-imports
import { StorybookThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

export const ThemeDecorator =
    (theme: Theme) => (StoryComponent: StoryFn, context: StoryContext) => {
        return (
            <StorybookThemeProvider initialTheme={theme}>
                <div className={`app ${theme}`}>
                    <StoryComponent {...context.args} />
                </div>
            </StorybookThemeProvider>
        );
    };
