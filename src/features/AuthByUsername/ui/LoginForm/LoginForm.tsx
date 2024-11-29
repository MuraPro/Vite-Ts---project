import { AppDispatch } from "app/providers/StoreProvider/config/store";
import { getUserAuthData } from "entities/User";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Импорты иконок
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import cls from "./LoginForm.module.scss";

export interface LoginFormProps {
  className?: string;
  disabled?: boolean;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  useEffect(() => {
    if (error) {
      setErrorVisible(true);
    } else {
      setErrorVisible(false);
    }
  }, [error]);

  useEffect(() => {
    if (authData) {
      dispatch(loginActions.clearValue());
    }
  }, [authData, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(loginByUsername({ username, password }));
    },
    [dispatch, password, username],
  );

  const mods = {
    [cls["fade-in"]]: errorVisible,
    [cls["fade-out"]]: !errorVisible,
  };

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <form
        data-testid="auth-form"
        className={classNames(cls.loginForm, {}, [className || ""])}
        onSubmit={onLoginClick}
      >
        <Text title={t("Форма авторизации")} className={cls.loginForm__title} />

        {error && (
          <Text
            data-testid="error"
            text={t("Некорректный логин или пароль")}
            theme={TextTheme.ERROR}
            className={classNames(cls.loginForm__error, mods)}
          />
        )}

        <div className={cls.loginForm__group}>
          <label htmlFor="username" className={cls.loginForm__label}>
            {t("Введите имя пользователя")}
          </label>
          <Input
            id="username"
            autofocus
            type="text"
            className={cls.loginForm__input}
            onChange={onChangeUsername}
            value={username}
          />
        </div>
        <div className={cls.loginForm__group}>
          <label htmlFor="password" className={cls.loginForm__label}>
            {t("Введите пароль")}
          </label>
          <div className={cls.passwordWrapper}>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className={cls.loginForm__input}
              onChange={onChangePassword}
              value={password}
            />
            <Button
              onClick={togglePasswordVisibility}
              className={cls.togglePasswordBtn}
              ariaLabel={
                showPassword ? t("Скрыть пароль") : t("Показать пароль")
              }
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.S}
            >
              {showPassword ? (
                <AiFillEye size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className={cls.loginForm__btn}
          theme={ButtonTheme.CLEAR}
          size={ButtonSize.S}
          disabled={isLoading}
        >
          {t("Войти")}
        </Button>
      </form>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
