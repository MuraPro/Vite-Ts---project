import { CSSProperties, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { DropdownDirection } from '@/shared/types/ui';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
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
    ({ style, className, value, onChange, readonly }: CountrySelectProps) => {
        const { t } = useTranslation();
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        const props = {
            className,
            value,
            defaultValue: t('Укажите страну'),
            label: t('Укажите страну'),
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
                            titlePersonalClassname={cls.country__title}
                            menuPersonalClassname={cls.country__menu}
                            itemPersonalClassname={cls.country__item}
                            {...props}
                        />
                    }
                />
            </div>
        );
    },
);
