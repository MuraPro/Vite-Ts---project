import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import cls from "./LangSwitcher.module.scss";

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    const nextLanguage =
      i18n.language === "en" ? "ru" : i18n.language === "ru" ? "kr" : "en";
    await i18n.changeLanguage(nextLanguage);
  };

  return (
    <Button
      className={classNames(cls.LangSwitcher, {}, [className || ""])}
      theme={ButtonTheme.CLEAR}
      onClick={toggle}
    >
      {t("Язык")}
    </Button>
  );
};
