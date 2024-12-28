import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "shared/ui/Page/Page";
import classes from "./AboutPage.module.scss";

const AboutPage = memo(() => {
  const { t } = useTranslation("about");
  return (
    <Page className="_container">
      <p className={classes.text}>{t("Информационная страница")}</p>
    </Page>
  );
});

export default AboutPage;
