import { memo, forwardRef } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

export enum AppLinkSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
    Xl = 'size_xl',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    size?: AppLinkSize;
    onClick?: () => void;
    activeClassName?: string;
}

export const AppLink = memo(
    forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
        const {
            to,
            className,
            children,
            variant = 'primary',
            size = AppLinkSize.S,
            activeClassName = '',
            onClick,
            ...otherProps
        } = props;

        return (
            <NavLink
                ref={ref}
                onClick={onClick}
                to={to}
                className={({ isActive }) =>
                    classNames(cls.AppLink, { [activeClassName]: isActive }, [
                        className,
                        cls[variant],
                        cls[size],
                    ])
                }
                {...otherProps}
            >
                {children}
            </NavLink>
        );
    }),
);
