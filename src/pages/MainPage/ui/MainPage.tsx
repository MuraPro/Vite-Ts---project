import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextSize } from "shared/ui/Text/Text";
import { Page } from "widgets/Page";
import classes from "./MainPage.module.scss";

const MainPage = memo(() => {
  const { t } = useTranslation("main");
  return (
    <Page className="_container">
      <Text
        title={t("Главная страница")}
        size={TextSize.M}
        className={classes.text}
      />
    </Page>
  );
});

export default MainPage;
