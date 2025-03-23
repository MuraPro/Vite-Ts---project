import { CSSProperties, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { DropdownDirection } from '@/shared/types/ui';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
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
    ({ style, className, value, onChange, readonly }: CurrencySelectProps) => {
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        const { t } = useTranslation();

        const props = {
            className,
            value,
            defaultValue: t('Укажите валюту'),
            label: t('Укажите валюту'),
            items: options,
            onChange: onChangeHandler,
            readonly,
            direction: 'top right' as const,
        };

        return (
            <div style={style}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<ListBox {...props} />}
                    off={
                        <ListBoxDeprecated
                            titlePersonalClassname={cls.currency__title}
                            menuPersonalClassname={cls.currency__menu}
                            itemPersonalClassname={cls.currency__item}
                            {...props}
                        />
                    }
                />
            </div>
        );
    },
);
