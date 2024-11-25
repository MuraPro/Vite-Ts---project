import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Импорты иконок
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { t } = useTranslation();

  return (
    <form
      className={classNames(cls.loginForm, {}, [className || ""])}
      method="POST"
    >
      <div className={cls.loginForm__group}>
        <label htmlFor="username" className={cls.loginForm__label}>
          {t("Введите имя пользователя")}
        </label>
        <Input
          id="username"
          autofocus
          type="text"
          className={cls.loginForm__input}
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
          />
          <Button
            onClick={togglePasswordVisibility}
            className={cls.togglePasswordBtn}
            ariaLabel={showPassword ? t("Скрыть пароль") : t("Показать пароль")}
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
      >
        {t("Войти")}
      </Button>
    </form>
  );
};
