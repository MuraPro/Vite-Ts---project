import { useCollapse } from "app/providers/CollapseProvider";
import { useEffect, useMemo, useRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { BurgerButton } from "shared/ui/BurgerButton/BurgerButton";
import { SidebarItemsList } from "../../model/items";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
  backgroundColor?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { collapsed, setCollapsed } = useCollapse();

  const handleLinkHandler = () => {
    setCollapsed(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setCollapsed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCollapsed]);

  const itemsList = useMemo(
    () =>
      SidebarItemsList.map((item, index) => (
        <li className={cls.sidebar__li} key={index}>
          <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
            prsonalClassName={cls.sidebar__link}
            onClick={handleLinkHandler}
          />
        </li>
      )),
    [collapsed, handleLinkHandler],
  );

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
      ref={containerRef}
    >
      <div className={cls.sidebar__container}>
        <BurgerButton
          className={cls.sidebar__burger}
          toggle={"sidebar-toggle"}
        />
      </div>
      <ul className={cls.sidebar__list}>{itemsList}</ul>
    </aside>
  );
};
