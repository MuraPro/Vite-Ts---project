import React, { InputHTMLAttributes, memo, useEffect, useRef } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss";

// исключаем то что хотим передавать сами
type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  personalClassNames?: string;
  readonly?: boolean;
  errors?: string;
  name?: string;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    personalClassNames,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    autofocus,
    readonly,
    errors,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  const content = errors ? (
    <p className={cls.input__error}>{errors}</p>
  ) : (
    placeholder
  );

  return (
    <>
      <label
        htmlFor={name}
        className={`${personalClassNames} ${cls.default__label}`}
      >
        {content}
      </label>
      <input
        id={name}
        name={name}
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        readOnly={readonly}
        className={classNames(cls.input, mods, [className])}
        {...otherProps}
      />
    </>
  );
});
