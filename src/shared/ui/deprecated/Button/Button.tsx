import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_INVERTED = 'outlineInverted',
    OUTLINE_RED = 'outline_red',
    PRIMARY = 'primary',
    PRIMARY_INVERTED = 'primaryInverted',
    SECONDARY = 'secondary',
    SECONDARY_INVERTED = 'secondaryInverted',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'reset' | 'submit';
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
    SE = 'size_se',
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Button = memo((props: ButtonProps) => {
    const {
        type = 'button',
        className,
        children,
        theme = ButtonTheme.CLEAR,
        square,
        size = ButtonSize.S,
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
