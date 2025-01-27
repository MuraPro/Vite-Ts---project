import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Counter } from "@/entities/Counter";
import { Text, TextSize } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";
import classes from "./AboutPage.module.scss";

const AboutPage = memo(() => {
  const { t } = useTranslation("about");
  return (
    <Page className="_container">
      <Text
        title={t("Информационная страница")}
        size={TextSize.M}
        className={classes.text}
      />
      <Counter />
    </Page>
  );
});

export default AboutPage;
