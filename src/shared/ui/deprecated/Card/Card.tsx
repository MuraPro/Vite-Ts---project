import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
    BG = 'bg',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.OUTLINED,
        max,
        ...otherProps
    } = props;

    return (
        <article
            className={classNames(cls.Card, { [cls.max]: max }, [
                className,
                cls[theme],
            ])}
            {...otherProps}
        >
            {children}
        </article>
    );
});
