import { useContext } from 'react';
import { Theme } from '../../../const/theme';
import { ThemeContext } from '../../context/ThemeContext';
interface UseThemeResult {
    toggleTheme: (saveAction?: (theme: Theme) => void) => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    const { theme = Theme.LIGHT, setTheme } = context;
    document.body.className = theme;

    const toggleTheme = (saveAction?: (theme: Theme) => void) => {
        if (setTheme) {
            const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
            setTheme?.(newTheme);

            document.body.classList.remove(newTheme);
            document.body.classList.add(newTheme);

            setTheme?.(newTheme);

            saveAction?.(newTheme);
        } else {
            console.warn(
                'setTheme function is undefined. Theme will not be toggled.',
            );
        }
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
