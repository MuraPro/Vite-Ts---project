import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "shared/ui/Page/Page";
import classes from "./MainPage.module.scss";

const MainPage = memo(() => {
  const { t } = useTranslation("main");
  return (
    <Page className="_container">
      <p className={classes.text}>{t("Главная страница")}</p>
    </Page>
  );
});

export default MainPage;
