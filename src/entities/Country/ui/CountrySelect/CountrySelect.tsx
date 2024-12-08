import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";
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
    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    return (
      <Select
        className={classNames(cls.select, {}, [className])}
        label={label}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
        name={"country"}
      />
    );
  },
);
