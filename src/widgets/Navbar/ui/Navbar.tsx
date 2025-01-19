import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { LoginModal } from "@/features/AuthByUsername";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { LangSwitcher } from "@/features/LangSwitcher";
import { NotificationButton } from "@/features/notificationButton";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { HStack } from "@/shared/ui/Stack";
// import { getSidebarItems } from "widgets/Sidebar/model/selectors/getSidebarItems";
// import { SidebarItem } from "widgets/Sidebar/ui/SidebarItem/SidebarItem";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
  backgroundColor?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  //   const sidebarItemsList = useSelector(getSidebarItems);

  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  //   const itemsList = useMemo(
  //     () =>
  //       sidebarItemsList.map((item, index) => (
  //         <li className={cls["header__navbar-li"]} key={index}>
  //           <SidebarItem
  //             item={item}
  //             key={item.path}
  //             prsonalClassName={cls["header__navbar-link"]}
  //           />
  //         </li>
  //       )),
  //     [sidebarItemsList],
  //   );

  const authButtons = authData ? (
    <HStack gap="16" className={cls.actions}>
      <NotificationButton />
      <AvatarDropdown />
    </HStack>
  ) : (
    <Button
      className={cls["header__navbar-btn"]}
      onClick={onShowModal}
      theme={ButtonTheme.CLEAR}
      size={ButtonSize.S}
    >
      <FaSignOutAlt size={18} className={cls["header__navbar-icon"]} />
      {t("Войти")}
    </Button>
  );

  return (
    <nav className={classNames(cls.header__navbar, {}, [className, "navbar"])}>
      <ul className={cls["header__navbar-list"]}>
        <li className={cls["header__navbar-li"]}>
          <LangSwitcher personalClassName={cls["header__navbar-lang"]} />
        </li>
        <li className={cls["header__navbar-li"]}>
          {authButtons}
          {isAuthModal && (
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
          )}
        </li>
        <li className={cls["header__navbar-li"]}>
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
};
