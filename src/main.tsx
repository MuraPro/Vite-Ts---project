import { CollapseProvider } from "app/providers/CollapseProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import "./shared/config/i18n/i18n";
import "./app/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <CollapseProvider>
          <App />
        </CollapseProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
