import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Loader } from '../Loader';
import { Loader as LoaderDeprecated } from '../Loader/Loader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = memo(({ className }: PageLoaderProps) => (
    <div className={classNames(cls.pageLoader, {}, [className])}>
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<LoaderDeprecated />}
            on={<Loader />}
        />
    </div>
));
