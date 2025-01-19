import { ChangeEvent, useMemo } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Select.module.scss";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  name?: string;
  className?: string;
  personalClassNames?: string;
  labelClassName?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    name,
    className,
    personalClassNames,
    labelClassName,
    label,
    options,
    onChange,
    value,
    readonly,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value as T);
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
        <label htmlFor={name} className={`${cls.label} ${labelClassName}`}>
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
};
