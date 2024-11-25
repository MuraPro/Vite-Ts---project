import { useModal } from "app/providers/ModalProvider";
import { LoginModal } from "features/AuthByUsername";
import { useTranslation } from "react-i18next";
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

  return (
    <nav
      className={classNames(cls.header__navbar, {}, [
        className || "",
        "navbar",
      ])}
    >
      <ul className={cls["header__navbar-list"]}>
        <li className={cls["header__navbar-li"]}>
          <Button
            className={cls["header__navbar-btn"]}
            onClick={toggleModal}
            theme={ButtonTheme.CLEAR_INVERTED}
            size={ButtonSize.S}
          >
            {t("Войти")}
          </Button>
          <LoginModal isOpen={isModalOpen} onClose={closeModal} />
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
