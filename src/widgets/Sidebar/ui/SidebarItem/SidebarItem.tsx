import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SidebarItemType } from "../../model/items";
import cls from "./SidebarItem.module.scss";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();

  return (
    <li className={cls.sidebar__li}>
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={item.path}
        className={classNames(`${cls.sidebar__litem} ${cls.sidebar__link}`, {
          [cls.collapsed]: collapsed,
        })}
      >
        <item.Icon className={cls.sidebar__icon} />
        <span className={cls.sidebar__text}>{t(item.text)}</span>
      </AppLink>
    </li>
  );
});
