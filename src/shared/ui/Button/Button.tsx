import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  OUTLINE_RED = "outline_red",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DEFAULT = "default",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "reset" | "submit";
  className?: string;
  theme?: ButtonTheme;
  backgroundColor?: string;
  size?: ButtonSize;
  square?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}

export enum ButtonSize {
  D = "size_d",
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

export const Button = memo((props: ButtonProps) => {
  const {
    type = "button",
    className,
    children,
    theme = ButtonTheme.CLEAR,
    square,
    size = ButtonSize.D,
    ariaLabel,
    onClick,
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls[theme]]: true!,
    [cls.square]: square!,
    [cls[size]]: true!,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button
      className={classNames(cls.Button, mods, [className])}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
