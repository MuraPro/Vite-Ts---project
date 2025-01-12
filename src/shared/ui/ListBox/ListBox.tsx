import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
} from "@headlessui/react";
import { ComponentType, Fragment, ReactNode } from "react";
import { MdDone } from "react-icons/md";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "../Button/Button";
import { VStack } from "../Stack";
import cls from "./ListBox.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropdownDirection = "top" | "bottom";

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: ReactNode;
  titlePersonalClassname?: string;
  menuPersonalClassname?: string;
  iconPersonalClassname?: string;
  icon?: ComponentType<{ className?: string }>;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  bottom: cls.optionsBottom,
  top: cls.optionsTop,
};

export function ListBox(props: ListBoxProps) {
  const {
    className,
    titlePersonalClassname,
    menuPersonalClassname,
    iconPersonalClassname,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = "bottom",
    label,
    icon: Icon, // Проп иконки
  } = props;

  const optionsClasses = [mapDirectionClass[direction], menuPersonalClassname];

  return (
    <VStack gap="4">
      {label && <label className={cls.label}>{label}</label>}
      <Listbox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <ListboxButton disabled={readonly} className={cls.trigger}>
          <Button className={titlePersonalClassname} disabled={readonly}>
            {Icon && <Icon className={iconPersonalClassname} />}
            {value ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <ListboxOption
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active }) => (
                <li
                  className={classNames(cls.item, {
                    [cls.active]: active,
                    [cls.disabled]: item.disabled,
                  })}
                >
                  <MdDone className={cls.option__icon} />
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </VStack>
  );
}
