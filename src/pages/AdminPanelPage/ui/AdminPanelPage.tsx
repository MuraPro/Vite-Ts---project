import { useTranslation } from "react-i18next";
import { Text, TextSize } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";
import cls from "./AdminPanelPage.module.scss";

const AdminPanelPage = () => {
  const { t } = useTranslation();

  return (
    <Page className="_container" data-testid="AdminPanelPage">
      <Text
        title={t("Админ панель")}
        size={TextSize.M}
        className={cls.AdminPanel__title}
      />
    </Page>
  );
};

export default AdminPanelPage;
