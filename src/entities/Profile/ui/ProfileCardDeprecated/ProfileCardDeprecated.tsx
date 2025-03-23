import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import AvatarImg from '../../../../shared/assets/avatar.jpg';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import cls from './ProfileCardDeprecated.module.scss';

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();

    return (
        <HStack
            justify={'center'}
            max
            className={classNames(cls.card, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack justify={'center'} max className={classNames(cls.card, {}, [])}>
            <Loader />
        </HStack>
    );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const {
        data,
        className,
        readonly,
        validData,
        onChangeFirstname,
        onChangeLastname,
        onChangeEmail,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            gap={'8'}
            align={'center'}
            max
            className={classNames(cls.card, mods, [className])}
        >
            {data?.avatar ? (
                <HStack justify={'center'} className={cls.card__avatar}>
                    <AvatarDeprecated src={data?.avatar} alt={'avatar'} />
                </HStack>
            ) : (
                <HStack justify={'center'} className={cls.card__avatar}>
                    <AvatarDeprecated src={AvatarImg} />
                </HStack>
            )}
            <form className={cls.card__form}>
                <div className={cls.card__data}>
                    <InputDeprecated
                        value={data?.first}
                        placeholder={t('Ваше имя')}
                        className={cls.card__input}
                        personalClassNames={cls.card__label}
                        onChange={onChangeFirstname}
                        readonly={readonly}
                        errors={validData?.first}
                        name={'name'}
                    />
                    <InputDeprecated
                        value={data?.lastname}
                        placeholder={t('Ваша фамилия')}
                        className={cls.card__input}
                        personalClassNames={cls.card__label}
                        onChange={onChangeLastname}
                        readonly={readonly}
                        errors={validData?.lastname}
                        name={'lastname'}
                    />
                    <InputDeprecated
                        value={data?.email}
                        placeholder={t('Ваша почта')}
                        className={cls.card__input}
                        personalClassNames={cls.card__label}
                        onChange={onChangeEmail}
                        readonly={readonly}
                        errors={validData?.email}
                        type={'email'}
                        name={'email'}
                    />
                    <InputDeprecated
                        value={data?.age}
                        placeholder={t('Ваш возраст')}
                        className={cls.card__input}
                        personalClassNames={cls.card__label}
                        onChange={onChangeAge}
                        readonly={readonly}
                        errors={validData?.age}
                        name={'age'}
                    />
                    <InputDeprecated
                        value={data?.city}
                        placeholder={t('Город')}
                        className={cls.card__input}
                        personalClassNames={cls.card__label}
                        onChange={onChangeCity}
                        readonly={readonly}
                        errors={validData?.city}
                        name={'city'}
                    />
                    <InputDeprecated
                        value={data?.username}
                        placeholder={t('Введите имя пользователя')}
                        className={cls.card__input}
                        personalClassNames={cls.card__label}
                        onChange={onChangeUsername}
                        readonly={readonly}
                        errors={validData?.username}
                        name={'username'}
                    />
                    <InputDeprecated
                        value={data?.avatar}
                        placeholder={t('Введите ссылку на аватар')}
                        className={cls.card__input}
                        personalClassNames={cls.card__label}
                        onChange={onChangeAvatar}
                        readonly={readonly}
                        errors={validData?.avatar}
                        type={'url'}
                        name={'avatar'}
                    />
                    <CurrencySelect
                        className={cls.card__select}
                        value={data?.currency}
                        onChange={onChangeCurrency}
                        readonly={readonly}
                    />
                    <CountrySelect
                        className={cls.card__select}
                        value={data?.country}
                        onChange={onChangeCountry}
                        readonly={readonly}
                    />
                </div>
            </form>
        </VStack>
    );
});
