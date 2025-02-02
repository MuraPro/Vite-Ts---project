import { memo, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    PRIMARY_INVERTED = 'primaryInverted',
    SECONDARY = 'secondary',
    SECONDARY_INVERTED = 'secondaryInverted',
    RED = 'red',
}

export enum AppLinkSize {
    SE = 'size_se',
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    size?: AppLinkSize;
    onClick?: () => void;
}
export const AppLink = memo(
    forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
        const {
            to,
            className,
            children,
            theme = AppLinkTheme.PRIMARY,
            size = AppLinkSize.S,
            onClick,
            ...otherProps
        } = props;

        const mods: Mods = {
            [cls[theme]]: true!,
            [cls[size]]: true!,
        };

        return (
            <Link
                ref={ref}
                onClick={onClick}
                to={to}
                className={classNames(cls.AppLink, mods, [className])}
                {...otherProps}
            >
                {children}
            </Link>
        );
    }),
);
