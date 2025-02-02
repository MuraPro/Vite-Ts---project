import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkSize, AppLinkTheme } from '@/shared/ui/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
    onClick?: () => void;
    className?: string;
}

export const SidebarItem = memo(
    ({ item, collapsed, onClick, className }: SidebarItemProps) => {
        const { t } = useTranslation();
        const isAuth = useSelector(getUserAuthData);

        if (item.authOnly && !isAuth) {
            return null;
        }

        const mods: Mods = {
            [cls.collapsed]: collapsed,
        };
        return (
            <>
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    size={AppLinkSize.S}
                    to={item.path}
                    className={classNames('', mods, [className])}
                    onClick={onClick}
                >
                    <item.Icon className={cls.sidebar__icon} />
                    <span className={cls.sidebar__text}>{t(item.text)}</span>
                </AppLink>
            </>
        );
    },
);
