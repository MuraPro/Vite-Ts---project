import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline';

export type ButtonSize = 's' | 'm' | 'l';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'reset' | 'submit';
    className?: string;
    /**
     * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
     */
    variant?: ButtonVariant;
    /**
     * Задний фон кнопки в соответствии с дизайн системой
     */
    backgroundColor?: string;
    /**
     * Размер кнопки в соответствии с дизайн системой
     */
    size?: ButtonSize;
    /**
     * Флаг, делающий кнопку квадратной
     */
    square?: boolean;
    /**
     * Атрибут Accessibility
     */
    ariaLabel?: string;
    /**
     * функция клика по кнопке
     */
    onClick?: () => void;
    /**
     * Содержимое кнопки
     */
    children?: ReactNode;
    /**
     * Флаг, отвечающий за работу кнопки
     */
    disabled?: boolean;
    /**
     * Увеличивает кнопку на всю свободную ширину
     */
    fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        type = 'button',
        className,
        children,
        variant = 'clear',
        square,
        size = 's',
        ariaLabel,
        onClick,
        disabled,
        fullWidth,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square!,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
    };

    return (
        <button
            className={classNames(cls.Button, mods, [
                className,
                cls[variant],
                cls[size],
            ])}
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
