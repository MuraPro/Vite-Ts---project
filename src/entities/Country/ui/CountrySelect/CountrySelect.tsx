import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { Country } from "../../model/types/country";
import cls from "./CountrySelect.module.scss";

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
  label?: string;
}

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.USA, content: Country.USA },
  { value: Country.Korea, content: Country.Korea },
  { value: Country.Uzbekistan, content: Country.Uzbekistan },
  { value: Country.Thailand, content: Country.Thailand },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo(
  ({ className, value, onChange, readonly, label }: CountrySelectProps) => {
    const { t } = useTranslation();
    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    return (
      <ListBox
        className={className}
        menuPersonalClassname={cls.country__menu}
        value={value}
        defaultValue={t("Укажите страну")}
        label={label}
        items={options}
        onChange={onChangeHandler}
        readonly={readonly}
        direction="top"
      />
    );
  },
);
