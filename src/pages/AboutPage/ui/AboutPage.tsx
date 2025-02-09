import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { Page } from '@/widgets/Page';
import classes from './AboutPage.module.scss';

const AboutPage = memo(() => {
    const { t } = useTranslation('about');
    return (
        <Page className="_container" data-testid="AboutPage">
            <Text
                title={t('Информационная страница')}
                size={TextSize.M}
                className={classes.text}
            />
        </Page>
    );
});

export default AboutPage;
