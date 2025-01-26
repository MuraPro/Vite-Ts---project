import { memo, useCallback } from "react";
// import { useTranslation } from "react-i18next";
import { IoMdSkipBackward } from "react-icons/io";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails";
import { getRouteArticles } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";
// import { getCanEditArticle } from "../../model/selectors/article";
import cls from "./ArticleDetailsPageHeader.module.scss";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    // const { t } = useTranslation();
    const navigate = useNavigate();
    // const canEdit = useSelector(getCanEditArticle);
    // const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    // const onEditArticle = useCallback(() => {
    //   navigate(getRouteArticleEdit(article.id));
    // }, [article?.id, navigate]);

    return (
      <HStack
        justify={"between"}
        max
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onBackToList}
          className={cls.ArticleDetailsPage__btn}
        >
          <IoMdSkipBackward />
        </Button>
        {/* {canEdit && (
          <Button
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onEditArticle}
          >
            {t("Редактировать")}
          </Button>
        )} */}
      </HStack>
    );
  },
);
