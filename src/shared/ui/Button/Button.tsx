import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = "clear",
  OUTLINE = "outline",
  MEDIUM = "medium",
  LARGE = "large",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  backgroundColor?: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme = ThemeButton.CLEAR,
    ...otherProps
  } = props;

  return (
    <button
      className={classNames(cls.Button, {}, [className || "", cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
