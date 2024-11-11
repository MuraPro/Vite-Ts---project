import { BugButton } from "app/providers/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  return (
    <nav
      className={classNames(cls.header__navbar, {}, [
        className || "",
        "navbar",
      ])}
    >
      <ul className={cls.navbar__list}>
        <li className={cls.navbar__li}>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={"/"}
            className={cls.navbar__link}
          >
            {t("Главная")}
          </AppLink>
        </li>
        <li className={cls.navbar__li}>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={"/about"}
            className={cls.navbar__link}
          >
            {t("О нас")}
          </AppLink>
        </li>
        <li className={cls.navbar__li}>
          <BugButton />
        </li>
        <li className={cls.navbar__li}>
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
};
