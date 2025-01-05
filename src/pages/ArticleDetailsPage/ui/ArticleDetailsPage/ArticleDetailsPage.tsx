import { ArticleDetails, ArticleList } from "entities/Article";
import { getArticleDetailsIsLoading } from "entities/Article/model/selectors/articleDetails";
import { CommentList } from "entities/Comment/ui/CommentList/CommentList";
import { AddCommentForm } from "features/addCommentForm";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { Page } from "widgets/Page";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { articleDetailsPageReducer } from "../../model/slices";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { getArticleRecommendations } from "../../model/slices/articleDetailsPageRecommendationsSlice";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import cls from "./ArticleDetailsPage.module.scss";

export interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article-details");
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments);
  const recommendations = useSelector(getArticleRecommendations);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsIsLoading,
  );
  const isLoading = useSelector(getArticleDetailsIsLoading);

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <div className="_container">
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          {!isLoading && (
            <>
              <Text
                size={TextSize.L}
                className={cls.commentTitle}
                title={t("Рекомендуем")}
              />
              <ArticleList
                articles={recommendations}
                isLoading={recommendationsIsLoading}
                className={cls.recommendations}
                target="_blank"
              />
              <Text
                className={cls.commentTitle}
                title={t("Комментарии")}
                align={TextAlign.CENTER}
              />
              <AddCommentForm onSendComment={onSendComment} />
              <CommentList isLoading={commentsIsLoading} comments={comments} />
            </>
          )}
        </div>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
