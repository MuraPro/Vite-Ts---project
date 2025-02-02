import { FC, useEffect, useState, ReactNode } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Theme;
}

const StorybookThemeProvider: FC<ThemeProviderProps> = ({
    children,
    initialTheme,
}) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || Theme.LIGHT);

    useEffect(() => {
        setTheme(initialTheme || Theme.LIGHT);
        localStorage.setItem(
            LOCAL_STORAGE_THEME_KEY,
            initialTheme || Theme.LIGHT,
        );
    }, [initialTheme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default StorybookThemeProvider;
