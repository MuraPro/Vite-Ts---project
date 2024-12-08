import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";
import { Currency } from "../../model/types/currency";

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

    return (
      <Select
        className={classNames("", {}, [className])}
        label={label}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
        name={"currency"}
      />
    );
  },
);
