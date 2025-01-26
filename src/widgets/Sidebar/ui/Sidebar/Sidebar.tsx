import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useCollapse } from "@/shared/lib/hooks/useCollapse/useCollapse";
import { BurgerButton } from "@/shared/ui/BurgerButton";
import { VStack } from "@/shared/ui/Stack";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
  backgroundColor?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { collapsed, setCollapsed } = useCollapse();
  const sidebarItemsList = useSelector(getSidebarItems);

  const handleLinkHandler = useCallback(() => {
    setCollapsed(false);
  }, [setCollapsed]);

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
      sidebarItemsList.map((item, index) => (
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
    [collapsed, handleLinkHandler, sidebarItemsList],
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
      <VStack gap="8" className={cls.sidebar__list} list>
        {itemsList}
      </VStack>
    </aside>
  );
};
