import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import ThemeProvider from './theme/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
