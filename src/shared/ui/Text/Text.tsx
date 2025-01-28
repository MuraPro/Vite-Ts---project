import { memo, ComponentType } from 'react';
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
    personalClassTitle?: string;
    personalClassText?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    icon?: ComponentType<{ className?: string }>; // Типизируем пропс для иконки
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        personalClassTitle,
        personalClassText,
        icon: Icon, // Деструктуризация иконки
    } = props;

    const { t } = useTranslation();
    const HeaderTag = mapSizeToHeaderTag[size];

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    };

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && (
                <HeaderTag className={`${cls.title} ${personalClassTitle}`}>
                    {Icon && <Icon className={cls.icon} />}
                    {t(`${title}`)}
                </HeaderTag>
            )}
            {text && (
                <p
                    className={`${cls.text} ${personalClassText}`}
                    data-testid="error"
                >
                    {Icon && <Icon className={cls.icon} />}
                    {t(`${text}`)}
                </p>
            )}
        </div>
    );
});
