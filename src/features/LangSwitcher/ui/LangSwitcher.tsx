import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        const nextLanguage =
            i18n.language === 'en'
                ? 'ru'
                : i18n.language === 'ru'
                  ? 'kr'
                  : 'en';
        await i18n.changeLanguage(nextLanguage);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<Button onClick={toggle}>{t('Язык')}</Button>}
            off={
                <ButtonDeprecated
                    className={classNames(cls.langSwitcher, {}, [className])}
                    theme={ButtonTheme.CLEAR}
                    onClick={toggle}
                >
                    {t('Язык')}
                    <MdLanguage size={20} className={cls.langSwitcher__icon} />
                </ButtonDeprecated>
            }
        />
    );
});
