import { useCollapse } from "app/providers/CollapseProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { BurgerButton } from "shared/ui/BurgerButton/BurgerButton";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
  backgroundColor?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { collapsed } = useCollapse();

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className || "",
      ])}
    >
      <div className={cls.sidebar__container}>
        <BurgerButton
          className={cls.sidebar__burger}
          toggle={"sidebar-toggle"}
        />
      </div>
      <div className={cls.sidebar__switchers}>
        <LangSwitcher className={cls["sidebar__switchers-lang"]} />
      </div>
    </div>
  );
};
