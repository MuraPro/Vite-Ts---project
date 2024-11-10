import LogoIcon from "shared/assets/icons/vite-icon.svg";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink } from "../AppLink/AppLink";
import cls from "./Logo.module.scss";
interface LogoProps {
  className?: string;
}
export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={classNames(cls.logo, {}, [className || ""])}>
      <AppLink to={"/"}>
        <LogoIcon className={cls.logo__icon} />
      </AppLink>
    </div>
  );
};
