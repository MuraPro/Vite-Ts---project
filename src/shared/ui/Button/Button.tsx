import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
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
}

export enum ButtonSize {
  D = "size_d",
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    type = "button",
    className,
    children,
    theme = ButtonTheme.CLEAR,
    square,
    size = ButtonSize.D,
    ariaLabel,
    onClick,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cls[theme]]: true!,
    [cls.square]: square!,
    [cls[size]]: true!,
  };

  return (
    <button
      className={classNames(cls.Button, mods, [className || ""])}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};
