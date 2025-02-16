import {
    Listbox,
    ListboxOption,
    ListboxOptions,
    ListboxButton,
} from '@headlessui/react';
import { CSSProperties, Fragment, ReactNode, useMemo } from 'react';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../../redesigned/Button';
import { Icon } from '../../../Icon';
import { VStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';

// @ts-ignore
export interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    style?: CSSProperties;
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: ReactNode;
    titlePersonalClassname?: string;
    itemPersonalClassname?: string;
    menuPersonalClassname?: string;
    iconPersonalClassname?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        style,
        className,
        titlePersonalClassname,
        menuPersonalClassname,
        itemPersonalClassname,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        label,
    } = props;

    const optionsClasses = [
        mapDirectionClass[direction],
        menuPersonalClassname,
        popupCls.menu,
    ];

    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    return (
        <VStack gap="4" style={style}>
            <label style={style}>{label}</label>

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
                    className={cls.trigger}
                >
                    <Button
                        className={`${titlePersonalClassname} ${cls.trigger__btn}`}
                        disabled={readonly}
                        variant="filled"
                        addonRight={<Icon Svg={ArrowIcon} />}
                    >
                        {selectedItem?.content ?? defaultValue}
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
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        `${cls.item} ${itemPersonalClassname}`,
                                        {
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled,
                                            [popupCls.selected]: selected,
                                        },
                                    )}
                                >
                                    {/* <MdDone className={cls.option__icon} /> */}
                                    {selected}
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
