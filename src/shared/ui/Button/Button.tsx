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
  className?: string;
  theme?: ButtonTheme;
  backgroundColor?: string;
  size?: ButtonSize;
  square?: boolean;
}

export enum ButtonSize {
  D = "size_d",
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme = ButtonTheme.CLEAR,
    square,
    size = ButtonSize.D,
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
      {...otherProps}
    >
      {children}
    </button>
  );
};

// export enum ButtonTheme {
//     CLEAR = 'clear',
//     OUTLINE = 'outline',
//     BACKGROUND = 'background',
//     BACKGROUND_INVERTED = 'backgroundInverted',
// }
