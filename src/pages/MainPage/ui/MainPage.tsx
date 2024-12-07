import { memo } from "react";
import { useTranslation } from "react-i18next";
import classes from "./MainPage.module.scss";

const MainPage = memo(() => {
  const { t } = useTranslation("main");
  return (
    <div>
      <p className={classes.text}>{t("Главная страница")}</p>
    </div>
  );
});

export default MainPage;
