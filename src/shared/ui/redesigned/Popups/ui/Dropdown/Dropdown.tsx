import { Menu, MenuItem, MenuButton, MenuItems } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    direction?: DropdownDirection;
    trigger: ReactNode;
    titlePersonalClassname?: string;
    menuPersonalClassname?: string;
}

export function Dropdown(props: DropdownProps) {
    const {
        className,
        trigger,
        items,
        direction = 'bottom right',
        titlePersonalClassname,
    } = props;

    const menuClasses = [mapDirectionClass[direction], popupCls.menu];

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <MenuButton
                className={`${popupCls.trigger} ${titlePersonalClassname}`}
            >
                {trigger}
            </MenuButton>
            <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <MenuItem
                                key={`dropdown-key-${index}`}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </MenuItem>
                        );
                    }

                    return (
                        <MenuItem
                            key={`dropdown-key-${index}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </MenuItem>
                    );
                })}
            </MenuItems>
        </Menu>
    );
}
