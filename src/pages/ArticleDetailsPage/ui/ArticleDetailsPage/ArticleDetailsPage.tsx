import { ArticleDetails } from "entities/Article";
import { getArticleDetailsIsLoading } from "entities/Article/model/selectors/articleDetails";
import { CommentList } from "entities/Comment";
import { AddCommentForm } from "features/addCommentForm";
import { addCommentForArticle } from "pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IoMdSkipBackward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text, TextAlign } from "shared/ui/Text/Text";
import { Page } from "widgets/Page";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice";
import cls from "./ArticleDetailsPage.module.scss";

export interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const navigate = useNavigate();

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id));
    }
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

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
          <Button
            theme={ButtonTheme.PRIMARY}
            onClick={onBackToList}
            className={cls.ArticleDetailsPage__btn}
          >
            <IoMdSkipBackward />
          </Button>
          <ArticleDetails id={id} />
          {!isLoading && (
            <Text
              className={cls.commentTitle}
              title={t("Комментарии")}
              align={TextAlign.CENTER}
            />
          )}
          {!isLoading && <AddCommentForm onSendComment={onSendComment} />}
          <CommentList isLoading={commentsIsLoading} comments={comments} />
        </div>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
