import { useModal } from "app/providers/ModalProvider";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "entities/User";
import { LoginModal } from "features/AuthByUsername";
import { LangSwitcher } from "features/LangSwitcher";
import { ThemeSwitcher } from "features/ThemeSwitcher";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
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
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
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

  const isAdminPanelAvailable = isAdmin || isManager;

  const authButtons = authData ? (
    <Dropdown
      direction="bottom left"
      className={cls.dropdown}
      menuPersonalClassname={cls.dropdown__title}
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t("Админка"),
                href: RoutePath.admin_panel,
              },
            ]
          : []),
        {
          content: t("Профиль"),
          href: RoutePath.profile + authData.id,
        },
        {
          content: t("Выйти"),
          onClick: onLogout,
        },
      ]}
      trigger={
        <Avatar
          size={30}
          src={authData.avatar}
          className={cls.dropdown__avatar}
        />
      }
    />
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
