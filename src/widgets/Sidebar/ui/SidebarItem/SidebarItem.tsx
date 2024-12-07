import { getUserAuthData } from "entities/User";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SidebarItemType } from "../../model/items";
import cls from "./SidebarItem.module.scss";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed?: boolean;
  prsonalClassName?: string;
}

export const SidebarItem = memo(
  ({ item, collapsed, prsonalClassName }: SidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
      return null;
    }

    return (
      <>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
          className={classNames(`${cls.sidebar__litem} ${prsonalClassName}`, {
            [cls.collapsed]: collapsed,
          })}
        >
          <item.Icon className={cls.sidebar__icon} />
          <span className={cls.sidebar__text}>{t(item.text)}</span>
        </AppLink>
      </>
    );
  },
);