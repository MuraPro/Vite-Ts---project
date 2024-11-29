import { useModal } from "app/providers/ModalProvider";
import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/AuthByUsername";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
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
  const dispatch = useDispatch();

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
      {t("Выйти")}
    </Button>
  ) : (
    <Button
      className={cls["header__navbar-btn"]}
      onClick={toggleModal}
      theme={ButtonTheme.CLEAR_INVERTED}
      size={ButtonSize.S}
    >
      {t("Войти")}
    </Button>
  );

  return (
    <nav
      className={classNames(cls.header__navbar, {}, [
        className || "",
        "navbar",
      ])}
    >
      <ul className={cls["header__navbar-list"]}>
        <li className={cls["header__navbar-li"]}>
          {authButtons}
          {isModalOpen && (
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
          )}
        </li>
        <li className={cls["header__navbar-li"]}>
          <LangSwitcher />
        </li>
        <li className={cls["header__navbar-li"]}>
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
};
