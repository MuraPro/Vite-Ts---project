import { CSSProperties, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownDirection } from '@/shared/types/ui';
import { ListBox } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../model/types/currency';
import cls from './CurrencySelect.module.scss';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
    label?: string;
    style?: CSSProperties;
    direction?: DropdownDirection;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.KRW, content: Currency.KRW },
];

export const CurrencySelect = memo(
    ({
        style,
        direction,
        className,
        value,
        onChange,
        readonly,
        label,
    }: CurrencySelectProps) => {
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        const { t } = useTranslation();

        return (
            <div style={style}>
                <ListBox
                    className={className}
                    titlePersonalClassname={cls.currency__title}
                    menuPersonalClassname={cls.currency__menu}
                    itemPersonalClassname={cls.currency__item}
                    value={value}
                    defaultValue={t('Укажите валюту')}
                    label={label}
                    items={options}
                    onChange={onChangeHandler}
                    readonly={readonly}
                    direction={direction || 'top left'}
                />
            </div>
        );
    },
);
