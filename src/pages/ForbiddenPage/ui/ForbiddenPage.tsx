import { useTranslation } from "react-i18next";
import { Text, TextSize } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";
import cls from "./ForbiddenPage.module.scss";

const ForbiddenPage = () => {
  const { t } = useTranslation("");

  return (
    <Page className="_container">
      <Text
        title={t("У вас нет доступа к этой странице")}
        size={TextSize.M}
        className={cls.ForbiddenPage__title}
      />
    </Page>
  );
};

export default ForbiddenPage;
