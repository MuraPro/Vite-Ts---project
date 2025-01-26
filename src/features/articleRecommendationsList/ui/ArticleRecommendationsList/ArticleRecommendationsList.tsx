import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleList } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { Text, TextSize } from "@/shared/ui/Text";
import { useArticleRecommendationsList } from "../../api/aritcleRecommendationsApi";
import cls from "./ArticleRecommendationsList.module.scss";

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
      isLoading,
      data: articles,
      error,
    } = useArticleRecommendationsList(3);

    if (isLoading || error) {
      return null;
    }

    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.ArticleRecommendationsList, {}, [className])}
      >
        <Text
          size={TextSize.L}
          title={t("Рекомендуем")}
          className={cls.ArticleRecommendationsList__title}
        />
        <ArticleList articles={articles ?? []} target="_blank" />
      </VStack>
    );
  },
);
