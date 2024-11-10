import { Theme, useTheme } from "app/providers/ThemeProvider";
import { useEffect, useState } from "react";
import DarkIcon from "shared/assets/icons/theme-dark.svg";
import LightIcon from "shared/assets/icons/theme-light.svg";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import cls from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === Theme.DARK);

  useEffect(() => {
    setIsChecked(theme === Theme.DARK);
  }, [theme]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    toggleTheme();
  };

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames(cls.themeswitcher, {}, [className || ""])}
      onClick={handleToggle}
      type="button"
    >
      <div
        className={`${cls.themeswitcher__switcher} ${
          isChecked ? cls.dark : ""
        }`}
      >
        <div
          className={`${cls.themeswitcher__circle} ${
            isChecked ? cls.dark : ""
          }`}
        >
          {isChecked ? (
            <DarkIcon className={cls.themeswitcher__icon} />
          ) : (
            <LightIcon className={cls.themeswitcher__icon} />
          )}
        </div>
      </div>
    </Button>
  );
};
