import { CountrySelect } from "entities/Country";
import { CurrencySelect } from "entities/Currency";
import { Profile } from "entities/Profile/model/types/profile";
import { useTranslation } from "react-i18next";
import { Country, Currency } from "shared/const/common";
import { classNames } from "shared/lib/classNames/classNames";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Input } from "shared/ui/Input/Input";
import { Loader } from "shared/ui/Loader/Loader";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import AvatarImg from "../../../../shared/assets/avatar.jpg";
import cls from "./ProfileCard.module.scss";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  readonly?: boolean;
  isLoading?: boolean;
  onChangeLastname?: (value?: string) => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeEmail?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
  validData?: Profile;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    data,
    isLoading,
    error,
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
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div
        className={classNames(cls.card, { [cls.loading]: true }, [className])}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.card, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.card, {}, [className])}>
      {data?.avatar ? (
        <div className={cls.card__avatar}>
          <Avatar src={data?.avatar} alt={"avatar"} />
        </div>
      ) : (
        <div className={cls.card__avatar}>
          <Avatar src={AvatarImg} />
        </div>
      )}
      <form className={cls.card__form}>
        <div className={cls.card__data}>
          <Input
            value={data?.first}
            placeholder={t("Ваше имя")}
            className={cls.card__input}
            personalClassNames={cls.card__label}
            onChange={onChangeFirstname}
            readonly={readonly}
            errors={validData?.first}
            name={"name"}
          />
          <Input
            value={data?.lastname}
            placeholder={t("Ваша фамилия")}
            className={cls.card__input}
            personalClassNames={cls.card__label}
            onChange={onChangeLastname}
            readonly={readonly}
            errors={validData?.lastname}
            name={"lastname"}
          />
          <Input
            value={data?.email}
            placeholder={t("Ваша почта")}
            className={cls.card__input}
            personalClassNames={cls.card__label}
            onChange={onChangeEmail}
            readonly={readonly}
            errors={validData?.email}
            type={"email"}
            name={"email"}
          />
          <Input
            value={data?.age}
            placeholder={t("Ваш возраст")}
            className={cls.card__input}
            personalClassNames={cls.card__label}
            onChange={onChangeAge}
            readonly={readonly}
            errors={validData?.age}
            name={"age"}
          />
          <Input
            value={data?.city}
            placeholder={t("Город")}
            className={cls.card__input}
            personalClassNames={cls.card__label}
            onChange={onChangeCity}
            readonly={readonly}
            errors={validData?.city}
            name={"city"}
          />
          <Input
            value={data?.username}
            placeholder={t("Введите имя пользователя")}
            className={cls.card__input}
            personalClassNames={cls.card__label}
            onChange={onChangeUsername}
            readonly={readonly}
            errors={validData?.username}
            name={"username"}
          />
          <Input
            value={data?.avatar}
            placeholder={t("Введите ссылку на аватар")}
            className={cls.card__input}
            personalClassNames={cls.card__label}
            onChange={onChangeAvatar}
            readonly={readonly}
            errors={validData?.avatar}
            type={"url"}
            name={"avatar"}
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
    </div>
  );
};
