import { useTranslation } from "react-i18next";
import classes from "./MainPage.module.scss";

const MainPage = () => {
  const { t } = useTranslation("main");
  return (
    <div>
      <p className={classes.text}>{t("Главная страница")}</p>
    </div>
  );
};

export default MainPage;
