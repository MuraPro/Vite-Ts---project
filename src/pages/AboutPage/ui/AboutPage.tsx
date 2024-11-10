import { useTranslation } from "react-i18next";
import classes from "./AboutPage.module.scss";

const AboutPage = () => {
  const { t } = useTranslation("about");
  return (
    <div>
      <p className={classes.text}>{t("Информационная страница")}</p>
    </div>
  );
};

export default AboutPage;
