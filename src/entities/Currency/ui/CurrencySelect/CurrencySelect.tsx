import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "@/shared/ui/Popups";
import { Currency } from "../../model/types/currency";
import cls from "./CurrencySelect.module.scss";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
  label?: string;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.KRW, content: Currency.KRW },
];

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly, label }: CurrencySelectProps) => {
    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange],
    );

    const { t } = useTranslation();

    return (
      <ListBox
        className={className}
        menuPersonalClassname={cls.currencyu__menu}
        value={value}
        defaultValue={t("Укажите валюту")}
        label={label}
        items={options}
        onChange={onChangeHandler}
        readonly={readonly}
        direction="top left"
      />
    );
  },
);
