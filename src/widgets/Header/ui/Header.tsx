import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { BurgerButton } from '@/shared/ui/deprecated/BurgerButton';
import { Navbar } from '../../Navbar/ui/Navbar';
import { Sidebar } from '../../Sidebar/ui/Sidebar/Sidebar';
import cls from './Header.module.scss';
interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <>
                    <header className={classNames(cls.header, {}, [className])}>
                        <div className={cls.header__container}>
                            <BurgerButton className={cls.header__burger} />
                            <Navbar />
                        </div>
                    </header>
                    <Sidebar />
                </>
            }
            on={
                <>
                    <header
                        className={classNames(cls.headerRedesigned, {}, [
                            className,
                        ])}
                    >
                        <div className={cls.headerRedesigned__container}>
                            <BurgerButton
                                className={cls.headerRedesigned__burger}
                            />
                            <Navbar />
                        </div>
                    </header>
                    <Sidebar />
                </>
            }
        />
    );
};
