import { CollapseProvider } from "app/providers/CollapseProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import { ModalProvider } from "app/providers/ModalProvider";
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./shared/config/i18n/i18n";
import "./app/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <ModalProvider>
          <ThemeProvider>
            <CollapseProvider>
              <App />
            </CollapseProvider>
          </ThemeProvider>
        </ModalProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProvider>,
);
