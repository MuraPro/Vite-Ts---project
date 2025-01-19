import { memo, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  RED = "red",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  personalClassNames?: string;
  theme?: AppLinkTheme;
  onClick?: () => void;
}

// Используем forwardRef для передачи ref в компонент
export const AppLink = memo(
  forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
    const {
      to,
      className,
      personalClassNames,
      children,
      theme = AppLinkTheme.PRIMARY,
      onClick,
      ...otherProps
    } = props;

    return (
      <Link
        ref={ref} // Передаем ref
        onClick={onClick}
        to={to}
        className={classNames(cls.AppLink, {}, [
          className,
          cls[theme],
          personalClassNames,
        ])}
        {...otherProps}
      >
        {children}
      </Link>
    );
  }),
);
