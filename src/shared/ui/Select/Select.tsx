import { ChangeEvent, memo, useMemo } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  name?: string;
  className?: string;
  personalClassNames?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    name,
    className,
    personalClassNames,
    label,
    options,
    onChange,
    value,
    readonly,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const optionsList = useMemo(
    () =>
      options?.map((opt) => (
        <option className={cls.option} value={opt.value} key={opt.value}>
          {opt.content}
        </option>
      )),
    [options],
  );

  const mods: Mods = {};

  return (
    <div
      className={classNames(cls.Wrapper, mods, [className, personalClassNames])}
    >
      {/* {label && <span className={cls.label}>{label}</span>} */}
      {label && (
        <label htmlFor={name} className={cls.label}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});
