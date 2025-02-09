import { CSSProperties, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownDirection } from '@/shared/types/ui';
import { ListBox } from '@/shared/ui/deprecated/Popups';
import { Country } from '../../model/types/country';
import cls from './CountrySelect.module.scss';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
    label?: string;
    style?: CSSProperties;
    direction?: DropdownDirection;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.USA, content: Country.USA },
    { value: Country.Korea, content: Country.Korea },
    { value: Country.Uzbekistan, content: Country.Uzbekistan },
    { value: Country.Thailand, content: Country.Thailand },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo(
    ({
        style,
        direction,
        className,
        value,
        onChange,
        readonly,
        label,
    }: CountrySelectProps) => {
        const { t } = useTranslation();
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        return (
            <div style={style}>
                <ListBox
                    className={className}
                    titlePersonalClassname={cls.country__title}
                    menuPersonalClassname={cls.country__menu}
                    itemPersonalClassname={cls.country__item}
                    value={value}
                    defaultValue={t('Укажите страну')}
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
