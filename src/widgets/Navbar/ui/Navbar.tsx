import { BugButton } from "app/providers/ErrorBoundary";
import { useModal } from "app/providers/ModalProvider";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { Modal } from "shared/ui/Modal/Modal";
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
      <ul className={cls.navbar__list}>
        <li className={cls.navbar__li}>
          <Button
            theme={ButtonTheme.CLEAR_INVERTED}
            className={cls.links}
            onClick={toggleModal}
          >
            {t("Войти")}
          </Button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {t(
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.",
            )}
          </Modal>
        </li>
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
