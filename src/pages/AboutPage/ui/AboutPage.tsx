import { memo } from "react";
import { useTranslation } from "react-i18next";
import classes from "./AboutPage.module.scss";

const AboutPage = memo(() => {
  const { t } = useTranslation("about");
  return (
    <section className="_container">
      <p className={classes.text}>{t("Информационная страница")}</p>
    </section>
  );
});

export default AboutPage;
