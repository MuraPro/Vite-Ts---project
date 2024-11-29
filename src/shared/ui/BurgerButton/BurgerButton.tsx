import { useCollapse } from "app/providers/CollapseProvider";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./BurgerButton.module.scss";
interface BurgerButtonProps {
  className?: string;
  toggle?: string;
  backgroundColor?: string;
}
export const BurgerButton = ({ className, toggle }: BurgerButtonProps) => {
  const { collapsed, toggleCollapse } = useCollapse();

  const classes = collapsed ? `${cls.burger} ${cls._active}` : `${cls.burger}`;
  return (
    <div
      className={classNames(classes, {}, [className || ""])}
      onClick={toggleCollapse}
      data-testid={toggle}
    >
      <span></span>
    </div>
  );
};
