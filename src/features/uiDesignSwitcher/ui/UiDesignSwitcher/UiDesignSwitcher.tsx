import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import {
    getFeatureFlag,
    ToggleFeatures,
    updateFeatureFlag,
} from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './UiDesignSwitcher.module.scss';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);
    const forceUpdate = useForceUpdate();

    const items = [
        {
            content: t('Новый'),
            value: 'new',
        },
        {
            content: t('Старый'),
            value: 'old',
        },
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlag({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            ).unwrap();
            setIsLoading(false);
            forceUpdate();
        }
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <HStack>
                    <Text text={t('Вариант интерфейса')} />
                    {isLoading ? (
                        <Skeleton
                            width={100}
                            height={30}
                            border="34%"
                            customStyles={{ marginLeft: '10px' }}
                        />
                    ) : (
                        <ListBox
                            onChange={onChange}
                            items={items}
                            value={isAppRedesigned ? 'new' : 'old'}
                            className={className}
                        />
                    )}
                </HStack>
            }
            off={
                <HStack>
                    <TextDeprecated
                        text={t('Вариант интерфейса')}
                        theme={TextTheme.PRIMARY}
                    />
                    {isLoading ? (
                        <SkeletonDeprecated
                            width={100}
                            height={30}
                            border="34%"
                            customStyles={{ marginLeft: '10px' }}
                        />
                    ) : (
                        <ListBoxDeprecated
                            onChange={onChange}
                            items={items}
                            value={isAppRedesigned ? 'new' : 'old'}
                            titlePersonalClassname={cls.themeSwitcherTitle}
                        />
                    )}
                </HStack>
            }
        />
    );
});
