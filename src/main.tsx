import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CollapseProvider } from '@/app/providers/CollapseProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ModalProvider } from '@/app/providers/ModalProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import App from './app/App';
import './shared/config/i18n/i18n';
import './app/styles/index.scss';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
    );
}
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ModalProvider>
                    <ThemeProvider>
                        <CollapseProvider>
                            <App />
                        </CollapseProvider>
                    </ThemeProvider>
                </ModalProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
