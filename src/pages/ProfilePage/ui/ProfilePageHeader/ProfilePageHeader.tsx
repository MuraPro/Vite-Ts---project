import {
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from "entities/Profile";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CgProfile } from "react-icons/cg";
import { GrEdit } from "react-icons/gr";
import { TbPencilCancel } from "react-icons/tb";
import { VscSaveAs } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import cls from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
  className?: string;
  isLoading?: boolean;
  isValid?: boolean;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className, isLoading, isValid } = props;

  const { t } = useTranslation();

  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <div className={classNames(cls.profile__header, {}, [className])}>
      <Text
        title={t("Профиль")}
        className={cls["profile__header-title"]}
        icon={CgProfile}
      />
      {readonly ? (
        <div className={cls["profile__header-panel"]}>
          <Button
            className={cls["profile__header-btn"]}
            theme={ButtonTheme.PRIMARY}
            onClick={onEdit}
          >
            <GrEdit className={cls.edit__icon} size={20} />
            {t("Редактировать")}
          </Button>
        </div>
      ) : (
        <div className={cls["profile__header-panel"]}>
          <Button
            className={cls["profile__header-btn"]}
            theme={ButtonTheme.PRIMARY}
            onClick={onCancelEdit}
          >
            <TbPencilCancel className={cls.edit__icon} size={25} />
            {t("Отменить")}
          </Button>
          <Button
            className={cls["profile__header-btn"]}
            theme={ButtonTheme.PRIMARY}
            onClick={onSave}
            disabled={!isValid}
          >
            <VscSaveAs className={cls.edit__icon} size={25} />
            {t("Сохранить")}
          </Button>
        </div>
      )}
    </div>
  );
};
