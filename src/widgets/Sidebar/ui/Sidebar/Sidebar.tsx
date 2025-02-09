import { CSSProperties, HTMLAttributes, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useCollapse } from '@/shared/lib/hooks/useCollapse/useCollapse';
import { BurgerButton } from '@/shared/ui/deprecated/BurgerButton';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    backgroundColor?: string;
    style?: CSSProperties;
}

export const Sidebar = ({ className, style }: SidebarProps) => {
    const { collapsed, setCollapsed } = useCollapse();
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = useCallback(() => {
        setCollapsed((prev) => !prev);
    }, [setCollapsed]);

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item, index) => (
                <li key={index}>
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        key={item.path}
                    />
                </li>
            )),
        [collapsed, sidebarItemsList],
    );

    const DeprecatedComponent = (
        <aside
            data-testid="sidebar"
            className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
            style={style}
        >
            <div className={cls.sidebar__container}>
                <BurgerButton
                    className={cls.sidebar__burger}
                    toggle={'sidebar-toggle'}
                    onClick={onToggle}
                />
            </div>
            <AppLogo className={cls.appLogo} />
            <VStack gap="8" className={cls.sidebar__list} list>
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </aside>
    );

    const NewComponent = (
        <aside
            data-testid="sidebar"
            className={classNames(
                cls.SidebarRedesigned,
                { [cls.collapsed]: collapsed },
                [className],
            )}
            style={style}
        >
            <div className={cls.SidebarRedesigned__container}>
                <BurgerButton
                    className={cls.SidebarRedesigned__burger}
                    toggle={'sidebar-toggle'}
                    onClick={onToggle}
                />
            </div>
            <AppLogo className={cls.appLogo} />
            <VStack gap="8" className={cls.SidebarRedesigned__list} list>
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </aside>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={DeprecatedComponent}
            on={NewComponent}
        />
    );
};
