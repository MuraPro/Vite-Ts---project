import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
    backgroundColor?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const authButtons = authData ? (
        <HStack gap="16" className={cls.actions}>
            <NotificationButton className={cls['header__navbar-alert']} />
            <AvatarDropdown />
        </HStack>
    ) : (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button
                    className={cls['redisignedHeader__navbar-btn']}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                    <FaSignOutAlt
                        size={18}
                        className={cls['header__navbar-icon']}
                    />
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={cls['header__navbar-btn']}
                    onClick={onShowModal}
                    theme={ButtonTheme.CLEAR_INVERTED}
                    size={ButtonSize.S}
                >
                    {t('Войти')}
                    <FaSignOutAlt
                        size={18}
                        className={cls['header__navbar-icon']}
                    />
                </ButtonDeprecated>
            }
        />
    );

    return (
        <nav
            className={classNames(cls.header__navbar, {}, [
                className,
                'navbar',
            ])}
        >
            <ul className={cls['header__navbar-list']}>
                <li className={cls['header__navbar-li']}>
                    {authButtons}
                    {isAuthModal && (
                        <LoginModal
                            isOpen={isAuthModal}
                            onClose={onCloseModal}
                        />
                    )}
                </li>
                <li className={cls['header__navbar-li']}>
                    <ThemeSwitcher />
                </li>
            </ul>
        </nav>
    );
};
