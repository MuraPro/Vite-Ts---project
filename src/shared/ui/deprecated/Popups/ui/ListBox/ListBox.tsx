import {
    Listbox,
    ListboxOption,
    ListboxOptions,
    ListboxButton,
} from '@headlessui/react';
import { ComponentType, CSSProperties, Fragment, ReactNode } from 'react';
import { MdDone } from 'react-icons/md';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button, ButtonTheme } from '../../../Button/Button';
import { VStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    style?: CSSProperties;
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: ReactNode;
    titlePersonalClassname?: string;
    itemPersonalClassname?: string;
    menuPersonalClassname?: string;
    iconPersonalClassname?: string;
    icon?: ComponentType<{ className?: string }>;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export function ListBox(props: ListBoxProps) {
    const {
        style,
        className,
        titlePersonalClassname,
        menuPersonalClassname,
        iconPersonalClassname,
        itemPersonalClassname,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        label,
        icon: Icon, // Проп иконки
    } = props;

    const optionsClasses = [
        mapDirectionClass[direction],
        menuPersonalClassname,
    ];

    return (
        <VStack gap="4" style={style}>
            {label && (
                <label className={cls.label} style={style}>
                    {label}
                </label>
            )}
            <Listbox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                onChange={onChange}
                style={style}
            >
                <ListboxButton
                    as="div"
                    disabled={readonly}
                    className={popupCls.trigger}
                >
                    <Button
                        className={titlePersonalClassname}
                        disabled={readonly}
                        theme={ButtonTheme.CLEAR}
                    >
                        {Icon && <Icon className={iconPersonalClassname} />}
                        {value ?? defaultValue}
                    </Button>
                </ListboxButton>
                <ListboxOptions
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <ListboxOption
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active }) => (
                                <li
                                    className={classNames(
                                        `${cls.item} ${itemPersonalClassname}`,
                                        {
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled,
                                        },
                                    )}
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
