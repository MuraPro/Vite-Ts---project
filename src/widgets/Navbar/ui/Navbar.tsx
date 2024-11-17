import { BugButton } from "app/providers/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
  backgroundColor?: string;
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
          <BugButton />
        </li>
        <li className={cls.navbar__li}>
          <LangSwitcher />
        </li>
        <li className={cls.navbar__li}>
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
};
