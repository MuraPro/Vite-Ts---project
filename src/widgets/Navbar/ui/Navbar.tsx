import { useModal } from "app/providers/ModalProvider";
import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/AuthByUsername";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
  backgroundColor?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const authData = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const authButtons = authData ? (
    <Button
      className={cls["header__navbar-btn"]}
      theme={ButtonTheme.CLEAR_INVERTED}
      size={ButtonSize.S}
      onClick={onLogout}
    >
      <FaSignInAlt size={20} className={cls["header__navbar-icon"]} />
      {t("Выйти")}
    </Button>
  ) : (
    <Button
      className={cls["header__navbar-btn"]}
      onClick={toggleModal}
      theme={ButtonTheme.CLEAR_INVERTED}
      size={ButtonSize.S}
    >
      <FaSignOutAlt size={20} className={cls["header__navbar-icon"]} />
      {t("Войти")}
    </Button>
  );

  return (
    <nav className={classNames(cls.header__navbar, {}, [className, "navbar"])}>
      <ul className={cls["header__navbar-list"]}>
        <li className={cls["header__navbar-li"]}>
          <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={RoutePath.main}
            className={cls["header__navbar-link"]}
          >
            {t("Главная")}
          </AppLink>
        </li>
        <li className={cls["header__navbar-li"]}>
          <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={RoutePath.about}
            className={cls["header__navbar-link"]}
          >
            {t("О нас")}
          </AppLink>
        </li>
        <li className={cls["header__navbar-li"]}>
          <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={RoutePath.profile}
            className={cls["header__navbar-link"]}
          >
            {t("Профиль")}
          </AppLink>
        </li>
        <li className={cls["header__navbar-li"]}>
          <LangSwitcher />
        </li>
        <li className={cls["header__navbar-li"]}>
          {authButtons}
          {isModalOpen && (
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
          )}
        </li>
        <li className={cls["header__navbar-li"]}>
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
};
