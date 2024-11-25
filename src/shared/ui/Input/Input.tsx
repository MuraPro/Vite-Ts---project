import React, { InputHTMLAttributes, memo, useRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss";

// исключаем то что хотим передавать сами
type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autofocus,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChangeHandler}
      className={classNames(cls.input, {}, [className || ""])}
      {...otherProps}
    />
  );
});
