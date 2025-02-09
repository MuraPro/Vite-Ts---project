import { ButtonHTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useCollapse } from '../../../lib/hooks/useCollapse/useCollapse';
import cls from './BurgerButton.module.scss';
interface BurgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    toggle?: string;
    style?: Object;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const BurgerButton = memo(
    ({ className, toggle, style }: BurgerButtonProps) => {
        const { collapsed, toggleCollapse } = useCollapse();

        const classes = collapsed
            ? `${cls.burger} ${cls._active}`
            : `${cls.burger}`;
        return (
            <button
                type="button"
                className={classNames(classes, {}, [className])}
                onClick={toggleCollapse}
                data-testid={toggle}
                style={style}
            >
                <span></span>
            </button>
        );
    },
);
