import { memo, ComponentType, ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    containerPersonalClass?: string;
    titlePersonalClass?: string;
    textPersonalClass?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    icon?: ComponentType<{ className?: string }>;
    as?: ElementType; // Позволяет передавать тег заголовка извне
    'data-testid'?: string;
}

const mapSizeToClass: Record<TextSize, string> = {
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        containerPersonalClass,
        titlePersonalClass,
        textPersonalClass,
        icon: Icon,
        'data-testid': dataTestId = 'Text',
        as: TitleTag = 'p', // По умолчанию заголовок будет `p`
    } = props;

    const { t } = useTranslation();

    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [className, cls[variant], cls[align], sizeClass];

    return (
        <div
            className={classNames(
                `${cls.Text} ${containerPersonalClass}`,
                {},
                additionalClasses,
            )}
        >
            {title && (
                <TitleTag
                    className={`${cls.title} ${titlePersonalClass}`}
                    data-testid={`${dataTestId}.Header`}
                >
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
