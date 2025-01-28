import { StoryFn, StoryContext } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18nForTests';

export const I18nextDecorator = (StoryFn: StoryFn, context: StoryContext) => (
    <I18nextProvider i18n={i18n}>
        <StoryFn {...context.args} />
    </I18nextProvider>
);
