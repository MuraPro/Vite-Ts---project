import { memo, ComponentType } from "react";
import { useTranslation } from "react-i18next";
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

export enum TextSize {
  M = "size_m",
  L = "size_l",
}

interface TextProps {
  className?: string;
  personalClassTitle?: string;
  personalClassText?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  icon?: ComponentType<{ className?: string }>; // Типизируем пропс для иконки
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    personalClassTitle,
    personalClassText,
    icon: Icon, // Деструктуризация иконки
  } = props;

  const { t } = useTranslation();

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true,
    [cls[size]]: true,
  };

  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && (
        <p className={`${cls.title} ${personalClassTitle}`}>
          {Icon && <Icon className={cls.icon} />}
          {t(`${title}`)}
        </p>
      )}
      {text && (
        <p className={`${cls.text} ${personalClassText}`} data-testid="error">
          {Icon && <Icon className={cls.icon} />}
          {t(`${text}`)}
        </p>
      )}
    </div>
  );
});
