import { memo, useEffect, useState } from "react";
import DarkIcon from "@/shared/assets/icons/theme-dark.svg";
import LightIcon from "@/shared/assets/icons/theme-light.svg";
import { Theme } from "@/shared/const/theme";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import cls from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
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
      theme={ButtonTheme.CLEAR}
      className={classNames(
        `${cls.themeswitcher} ${isChecked ? cls.dark : ""}`,
        {},
        [className],
      )}
      onClick={handleToggle}
    >
      <div
        className={`${cls.themeswitcher__circle} ${isChecked ? cls.dark : ""}`}
      >
        {isChecked ? (
          <LightIcon className={cls.themeswitcher__icon} />
        ) : (
          <DarkIcon className={cls.themeswitcher__icon} />
        )}
      </div>
    </Button>
  );
});
