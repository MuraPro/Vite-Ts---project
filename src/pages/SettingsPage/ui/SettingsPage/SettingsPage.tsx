import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import cls from './SettingsPage.module.scss';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Page className={className}>
                    <div className="_container">
                        <VStack gap="16">
                            <Text
                                title={t('Настройки пользователя')}
                                className={cls.title}
                            />
                            <UiDesignSwitcher />
                        </VStack>
                    </div>
                </Page>
            }
            off={
                <Page className={className}>
                    <div className="_container">
                        <VStack gap="16">
                            <TextDeprecated
                                title={t('Настройки пользователя')}
                                className={cls.title}
                            />
                            <UiDesignSwitcher />
                        </VStack>
                    </div>
                </Page>
            }
        />
    );
});

export default SettingsPage;
