import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
// import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { PageLoader } from '@/shared/ui/PageLoader';
import { Header } from '@/widgets/Header';
import cls from './App.module.scss';
import { AppRouter } from './providers/router';
import './styles/index.scss';

interface mainProps {
    className?: string;
}

const App = ({ className }: mainProps) => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div className={classNames('app', {}, [className, theme])}>
                    <Suspense fallback={<PageLoader />}>
                        <Header />
                        <main className={cls.main}>
                            {inited && <AppRouter />}
                        </main>
                    </Suspense>
                </div>
            }
            on={
                <div
                    className={classNames('app_redesigned', {}, [
                        className,
                        theme,
                    ])}
                >
                    <Suspense fallback={<PageLoader />}>
                        <Header />
                        <main className={cls.main}>
                            {inited && <AppRouter />}
                        </main>
                    </Suspense>
                </div>
            }
        />
    );
};

export default App;
