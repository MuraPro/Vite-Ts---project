import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import classes from './MainPage.module.scss';

const MainPage = memo(() => {
    const { t } = useTranslation();
    return (
        <Page className="_container" data-testid="MainPage">
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <TextDeprecated
                        title={t('Главная страница')}
                        size={TextSize.M}
                        className={classes.text}
                    />
                }
                on={
                    <Text
                        title={t('Главная страница')}
                        size="l"
                        as="h1"
                        className={classes.text}
                    />
                }
            />
        </Page>
    );
});

export default MainPage;
