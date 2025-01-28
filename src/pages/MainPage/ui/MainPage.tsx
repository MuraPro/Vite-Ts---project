import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';
import classes from './MainPage.module.scss';

const MainPage = memo(() => {
    const { t } = useTranslation();
    return (
        <Page className="_container" data-testid="MainPage">
            <Text
                title={t('Главная страница')}
                size={TextSize.M}
                className={classes.text}
            />
        </Page>
    );
});

export default MainPage;
