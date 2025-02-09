import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string;
    personalClassNames?: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Loader = memo(({ className, personalClassNames }: LoaderProps) => (
    <div
        className={classNames('lds-ellipsis', {}, [
            className,
            personalClassNames,
        ])}
    >
        <div />
        <div />
        <div />
        <div />
    </div>
));
