import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import cls from "./Header.module.scss";
interface HeaderProps {
  className?: string;
}
export const Header = ({ className }: HeaderProps) => {
  return (
    <>
      <header className={classNames(cls.header, {}, [className || ""])}>
        <div className={cls.header__container}>
          <Navbar />
        </div>
      </header>
      <Sidebar />
    </>
  );
};
