import { memo } from 'react';
import AppSvg from '@/shared/assets/icons/app-logo.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../deprecated/Stack';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
    size?: string;
}

export const AppLogo = memo(({ className, size = '100px' }: AppLogoProps) => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg
                width={size}
                height={size}
                className={cls.appLogo}
                color="black"
            />
        </HStack>
    );
});
