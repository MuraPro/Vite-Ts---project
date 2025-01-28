import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Импорты иконок
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    disabled?: boolean;
    onSuccess?: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation('authform');
    const [showPassword, setShowPassword] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
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

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [onSuccess, dispatch, password, username]);

    const mods = {
        [cls['fade-in']]: errorVisible,
        [cls['fade-out']]: !errorVisible,
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <form
                data-testid="auth-form"
                className={classNames(cls.loginForm, {}, [className])}
                onSubmit={onLoginClick}
            >
                <Text
                    title={t('Форма авторизации')}
                    className={cls.loginForm__title}
                />

                {error && (
                    <Text
                        data-testid="error"
                        text={t('Некорректный логин или пароль')}
                        theme={TextTheme.ERROR}
                        className={classNames(cls.loginForm__error, mods)}
                    />
                )}

                <div className={cls.loginForm__group}>
                    <Input
                        id="username"
                        autofocus
                        type="text"
                        className={cls.loginForm__input}
                        personalClassNames={cls.loginForm__label}
                        onChange={onChangeUsername}
                        value={username}
                        placeholder={t('Введите имя пользователя')}
                    />
                </div>
                <div className={cls.loginForm__group}>
                    <div className={cls.passwordWrapper}>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className={cls.loginForm__input}
                            personalClassNames={cls.loginForm__label}
                            onChange={onChangePassword}
                            value={password}
                            placeholder={t('Введите пароль')}
                        />
                        <Button
                            onClick={togglePasswordVisibility}
                            className={cls.togglePasswordBtn}
                            ariaLabel={
                                showPassword
                                    ? t('Скрыть пароль')
                                    : t('Показать пароль')
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
                    className={cls.loginForm__btn}
                    theme={ButtonTheme.CLEAR}
                    size={ButtonSize.S}
                    disabled={isLoading}
                    onClick={onLoginClick}
                >
                    {t('Войти')}
                </Button>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
