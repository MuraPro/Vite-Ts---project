import { Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { DropdownDirection } from "shared/types/ui";
import { AppLink } from "../../../AppLink/AppLink";
import popupCls from "../../styles/popup.module.scss";
import cls from "./Dropdown.module.scss";

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  "bottom left": cls.optionsBottomLeft,
  "bottom right": cls.optionsBottomRight,
  "top right": cls.optionsTopRight,
  "top left": cls.optionsTopLeft,
};

export function Dropdown(props: DropdownProps) {
  const {
    className,
    trigger,
    items,
    direction = "bottom right",
    titlePersonalClassname,
    menuPersonalClassname,
  } = props;

  const menuClasses = [mapDirectionClass[direction], menuPersonalClassname];

  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <MenuButton className={`${cls.btn} ${titlePersonalClassname}`}>
        {trigger}
      </MenuButton>
      <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(cls.item, { [popupCls.active]: active })}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <MenuItem
                key={item.href}
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
              key={item.content?.toString() || Math.random()}
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
