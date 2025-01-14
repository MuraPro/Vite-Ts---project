import { EditableProfileCard } from "features/editableProfileCard";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text/Text";
import { Page } from "widgets/Page";
import cls from "./ProfilePage.module.scss";

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  if (!id) {
    return (
      <Page className={classNames(cls.profile__section, {}, [className])}>
        <Text text={t("Профиль не найден")} />;
      </Page>
    );
  }

  return (
    <Page className={classNames(cls.profile__section, {}, [className])}>
      <div className="_container">
        <VStack gap={"16"} max>
          <EditableProfileCard id={id} />
        </VStack>
      </div>
    </Page>
  );
});

export default ProfilePage;
