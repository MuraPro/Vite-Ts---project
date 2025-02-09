import { memo } from 'react';
import LogoIcon from '@/shared/assets/icons/vite-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '../AppLink/AppLink';
import cls from './Logo.module.scss';
interface LogoProps {
    className?: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Logo = memo(({ className }: LogoProps) => {
    return (
        <div className={classNames(cls.logo, {}, [className])}>
            <AppLink to={'/'}>
                <LogoIcon className={cls.logo__icon} />
            </AppLink>
        </div>
    );
});
