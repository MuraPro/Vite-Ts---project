import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    maxWidth?: string | number;
    border?: string;
    customStyles?: CSSProperties;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, height, width, maxWidth, border, customStyles } = props;

    const styles: CSSProperties = {
        width,
        height,
        maxWidth,
        borderRadius: border,
        ...customStyles,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        />
    );
});
