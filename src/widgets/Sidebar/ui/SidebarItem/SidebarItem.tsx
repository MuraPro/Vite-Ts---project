import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink, AppLinkSize } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarStyles.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
    onClick?: () => void;
    className?: string;
}

export const SidebarItem = memo(
    ({ item, onClick, className }: SidebarItemProps) => {
        const { t } = useTranslation();
        const isAuth = useSelector(getUserAuthData);

        if (item.authOnly && !isAuth) {
            return null;
        }

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <AppLink
                        variant="primary"
                        size={AppLinkSize.M}
                        to={item.path}
                        className={classNames(cls.itemRedesigned, {}, [
                            className,
                        ])}
                        onClick={onClick}
                        activeClassName={cls.active}
                    >
                        <Icon Svg={item.Icon} />
                        <span className={cls.link}>{t(item.text)}</span>
                    </AppLink>
                }
                off={
                    <AppLinkDeprecated
                        to={item.path}
                        className={classNames(cls.item, {}, [])}
                    >
                        <item.Icon className={cls.icon} />
                        <span className={cls.link}>{t(item.text)}</span>
                    </AppLinkDeprecated>
                }
            />
        );
    },
);
