import { useModal } from "app/providers/ModalProvider";
import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/AuthByUsername";
import { LangSwitcher } from "features/LangSwitcher";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // импортируем хук useNavigate
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { getSidebarItems } from "widgets/Sidebar/model/selectors/getSidebarItems";
import { SidebarItem } from "widgets/Sidebar/ui/SidebarItem/SidebarItem";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
  backgroundColor?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sidebarItemsList = useSelector(getSidebarItems);

  const { isModalOpen, toggleModal, closeModal } = useModal();
  const authData = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
    navigate("/");
  }, [dispatch, navigate]);

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item, index) => (
        <li className={cls["header__navbar-li"]} key={index}>
          <SidebarItem
            item={item}
            key={item.path}
            prsonalClassName={cls["header__navbar-link"]}
          />
        </li>
      )),
    [sidebarItemsList],
  );

  const authButtons = authData ? (
    <Button
      className={cls["header__navbar-btn"]}
      theme={ButtonTheme.CLEAR_INVERTED}
      size={ButtonSize.S}
      onClick={onLogout}
    >
      <FaSignInAlt size={15} className={cls["header__navbar-icon"]} />
      {t("Выйти")}
    </Button>
  ) : (
    <Button
      className={cls["header__navbar-btn"]}
      onClick={toggleModal}
      theme={ButtonTheme.CLEAR_INVERTED}
      size={ButtonSize.S}
    >
      <FaSignOutAlt size={18} className={cls["header__navbar-icon"]} />
      {t("Войти")}
    </Button>
  );

  return (
    <nav className={classNames(cls.header__navbar, {}, [className, "navbar"])}>
      <ul className={cls["header__navbar-list"]}>
        {itemsList}
        <li className={cls["header__navbar-li"]}>
          <LangSwitcher personalClassName={cls["header__navbar-lang"]} />
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
