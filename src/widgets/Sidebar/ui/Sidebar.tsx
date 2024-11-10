import { useCollapse } from "app/providers/CollapseProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { BurgerButton } from "shared/ui/BurgerButton/BurgerButton";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { Logo } from "shared/ui/Logo/Logo";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { collapsed } = useCollapse();

  return (
    <div
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className || "",
      ])}
    >
      <div className={cls.sidebar__container}>
        <BurgerButton className={cls.sidebar__burger} />
        <Logo className={cls.sidebar__logo} />
      </div>
      <div className={cls.sidebar__switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls["sidebar__switchers-lang"]} />
      </div>
    </div>
  );
};
