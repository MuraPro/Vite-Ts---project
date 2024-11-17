import { useCollapse } from "app/providers/CollapseProvider";
import { useTranslation } from "react-i18next";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { BurgerButton } from "shared/ui/BurgerButton/BurgerButton";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
  backgroundColor?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { collapsed } = useCollapse();
  const { t } = useTranslation();

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className || "",
      ])}
    >
      <div className={cls.sidebar__container}>
        <BurgerButton
          className={cls.sidebar__burger}
          toggle={"sidebar-toggle"}
        />
      </div>
      <ul className={cls.sidebar__list}>
        <li className={cls.sidebar__li}>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={"/"}
            className={cls.sidebar__link}
          >
            <MainIcon className={cls.sidebar__icon} />
            <span className={cls.sidebar__text}>{t("Главная")}</span>
          </AppLink>
        </li>
        <li className={cls.sidebar__li}>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={"/about"}
            className={cls.sidebar__link}
          >
            <AboutIcon className={cls.sidebar__icon} />
            <span className={cls.sidebar__text}>{t("О нас")}</span>
          </AppLink>
        </li>
      </ul>
    </div>
  );
};
