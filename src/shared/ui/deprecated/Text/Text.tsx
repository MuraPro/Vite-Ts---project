import { memo, ComponentType, ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string;
    containerPersonalClass?: string;
    titlePersonalClass?: string;
    textPersonalClass?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    icon?: ComponentType<{ className?: string }>;
    as?: ElementType; // Позволяет передавать тег заголовка извне
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        containerPersonalClass,
        titlePersonalClass,
        textPersonalClass,
        icon: Icon,
        as: TitleTag = 'p', // По умолчанию заголовок будет `span`
    } = props;

    const { t } = useTranslation();

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    };

    return (
        <div
            className={classNames(
                `${cls.Text} ${containerPersonalClass}`,
                mods,
                [className],
            )}
        >
            {title && (
                <TitleTag className={`${cls.title} ${titlePersonalClass}`}>
                    {Icon && <Icon className={cls.icon} />}
                    {t(title)}
                </TitleTag>
            )}
            {text && (
                <p
                    className={`${cls.text} ${textPersonalClass}`}
                    data-testid="error"
                >
                    {Icon && <Icon className={cls.icon} />}
                    {t(text)}
                </p>
            )}
        </div>
    );
});
