import { memo, ComponentType } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

export enum TextAlign {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

interface TextProps {
  className?: string;
  personalClassName?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  icon?: ComponentType<{ className?: string }>; // Типизируем пропс для иконки
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    personalClassName,
    icon: Icon, // Деструктуризация иконки
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true,
  };

  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && (
        <p className={`${cls.title} ${personalClassName}`}>
          {Icon && <Icon className={cls.icon} />}
          {title}
        </p>
      )}
      {text && (
        <p className={cls.text} data-testid="error">
          {Icon && <Icon className={cls.icon} />}
          {text}
        </p>
      )}
    </div>
  );
});
