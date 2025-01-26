import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY } from "../../../const/localstorage";
import { Theme } from "../../../const/theme";
import { ThemeContext } from "../../context/ThemeContext";
interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { theme = Theme.LIGHT, setTheme } = context;
  document.body.className = theme;

  const toggleTheme = () => {
    if (setTheme) {
      const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
      setTheme?.(newTheme);

      document.body.classList.remove(newTheme);
      document.body.classList.add(newTheme);

      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    } else {
      console.warn(
        "setTheme function is undefined. Theme will not be toggled.",
      );
    }
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
