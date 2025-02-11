import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar?: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, content, toolbar, header } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.header}>{header}</div>
            <main className={cls.content}>{content}</main>
            <div className={cls.rightbar}>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
        </div>
    );
});
