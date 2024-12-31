import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
  profileActions,
  ProfileCard,
  profileReducer,
} from "entities/Profile";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Country, Currency } from "shared/const/common";
import { classNames } from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Page } from "widgets/Page";
import cls from "./ProfilePage.module.scss";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { id } = useParams<{ id: string }>();

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const validateFields = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData?.first || formData.first.trim().length < 2) {
      newErrors.first = t("Имя должно содержать не менее двух символов");
    }

    if (!formData?.lastname || formData.lastname.trim().length < 2) {
      newErrors.lastname = t("Фамилия должна содержать не менее двух символов");
    }

    if (
      !formData?.email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = t("Введите корректный email адрес");
    }

    if (!formData?.age || !/^\d+$/.test(formData.age)) {
      newErrors.age = t("Возраст должен быть положительным числом");
    }

    if (!formData?.city || formData.city.trim().length < 3) {
      newErrors.city = t("Город должен содержать не менее трех символов");
    }

    if (!formData?.username || formData.username.trim().length < 3) {
      newErrors.username = t("Имя должно содержать не менее трех символов");
    }

    if (
      !formData?.avatar ||
      !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(formData.avatar)
    ) {
      newErrors.avatar = t("Ссылка должна быть корректным URL-адресом");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  useEffect(() => {
    if (formData) {
      validateFields();
    }
  }, [formData, validateFields]);

  const isValid = Object.keys(errors).length === 0;

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || "" }));
    },
    [dispatch],
  );

  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || "" }));
    },
    [dispatch],
  );
  const onChangeEmail = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ email: value || "" }));
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || "" }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: value || "" }));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || "" }));
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.profile__section, {}, [className])}>
        <div className="_container">
          <ProfilePageHeader isLoading={isLoading} isValid={isValid} />
          <ProfileCard
            data={formData}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
            validData={errors}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeUsername={onChangeUsername}
            onChangeAvatar={onChangeAvatar}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
            onChangeEmail={onChangeEmail}
          />
        </div>
      </Page>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
