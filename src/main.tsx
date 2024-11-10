import { CollapseProvider } from "app/providers/CollapseProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./shared/config/i18n/i18n";
import "./app/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <CollapseProvider>
        <App />
      </CollapseProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
