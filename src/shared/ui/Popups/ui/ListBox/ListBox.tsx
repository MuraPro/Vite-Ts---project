import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
} from "@headlessui/react";
import { ComponentType, Fragment, ReactNode } from "react";
import { MdDone } from "react-icons/md";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import { Button } from "../../../Button/Button";
import { VStack } from "../../../Stack";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";
import cls from "./ListBox.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

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
    direction = "bottom right",
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
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <ListboxButton
          as="div"
          disabled={readonly}
          className={popupCls.trigger}
        >
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
