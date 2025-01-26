import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
// eslint-disable-next-line mura-pro-plugin/layer-imports
import { CollapseProvider } from "@/app/providers/CollapseProvider";
import i18nForTests from "../../../config/i18n/i18nForTests";

export function renderWithTranslation(component: ReactNode) {
  return render(
    <BrowserRouter>
      <CollapseProvider>
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>,
      </CollapseProvider>
    </BrowserRouter>,
  );
}
