import { memo, useCallback, useState } from 'react';
import { saveJsonSettings } from '@/entities/User';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = useState(theme === Theme.DARK);

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
            setIsChecked(!isChecked);
        });
    }, [dispatch, toggleTheme, isChecked]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
            off={
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={classNames(
                        `${cls.themeswitcher} ${isChecked ? cls.dark : ''}`,
                        {},
                        [className],
                    )}
                    onClick={onToggleHandler}
                >
                    <div
                        className={`${cls.themeswitcher__circle} ${isChecked ? cls.dark : ''}`}
                    >
                        {isChecked ? (
                            <DarkIcon className={cls.themeswitcher__icon} />
                        ) : (
                            <LightIcon className={cls.themeswitcher__icon} />
                        )}
                    </div>
                </Button>
            }
        />
    );
});
