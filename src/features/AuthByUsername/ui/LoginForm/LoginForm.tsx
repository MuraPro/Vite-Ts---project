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
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
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
    const forceUpdate = useForceUpdate();

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
            forceUpdate();
        }
    }, [onSuccess, dispatch, password, username, forceUpdate]);

    const mods = {
        [cls['fade-in']]: errorVisible,
        [cls['fade-out']]: !errorVisible,
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack
                        gap="16"
                        className={classNames(cls.loginFormRedisigned, {}, [
                            className,
                        ])}
                    >
                        <Text
                            title={t('Форма авторизации')}
                            className={cls.loginFormRedisigned__title}
                        />
                        {error && (
                            <Text
                                text={t('Неверные данные')}
                                variant="error"
                                className={classNames(
                                    cls.loginFormRedisigned__error,
                                    mods,
                                )}
                            />
                        )}
                        <Input
                            autofocus
                            type="text"
                            className={cls.loginFormRedisigned__input}
                            placeholder={t('Введите username')}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <Input
                            type="text"
                            className={cls.loginFormRedisigned__input}
                            placeholder={t('Введите пароль')}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <Button
                            className={cls.loginFormRedisigned__loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </Button>
                    </VStack>
                }
                off={
                    <form
                        data-testid="auth-form"
                        className={classNames(cls.loginForm, {}, [className])}
                        onSubmit={onLoginClick}
                    >
                        <TextDeprecated
                            title={t('Форма авторизации')}
                            className={cls.loginForm__title}
                        />

                        {error && (
                            <TextDeprecated
                                data-testid="error"
                                text={t('Некорректный логин или пароль')}
                                theme={TextTheme.ERROR}
                                className={classNames(
                                    cls.loginForm__error,
                                    mods,
                                )}
                            />
                        )}

                        <div className={cls.loginForm__group}>
                            <InputDeprecated
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
                            <div className={cls.loginForm__passwordWrapper}>
                                <InputDeprecated
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={cls.loginForm__input}
                                    personalClassNames={cls.loginForm__label}
                                    onChange={onChangePassword}
                                    value={password}
                                    placeholder={t('Введите пароль')}
                                />
                                <ButtonDeprecated
                                    onClick={togglePasswordVisibility}
                                    className={cls.loginForm__togglePasswordBtn}
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
                                </ButtonDeprecated>
                            </div>
                        </div>
                        <ButtonDeprecated
                            className={cls.loginForm__btn}
                            theme={ButtonTheme.CLEAR}
                            size={ButtonSize.S}
                            disabled={isLoading}
                            onClick={onLoginClick}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>
                    </form>
                }
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
