import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "@/entities/User";
import { RoutePath } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar } from "@/shared/ui/Avatar";
import { Dropdown } from "@/shared/ui/Popups";
import cls from "./AvatarDropdown.module.scss";

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
    navigate("/");
  }, [dispatch, navigate]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      direction="bottom left"
      className={classNames(cls.dropdown, {}, [className])}
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
  );
});
