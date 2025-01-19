import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getArticleDetailsIsLoading } from "@/entities/Article/model/selectors/articleDetails";
import { CommentList } from "@/entities/Comment";
import { AddCommentForm } from "@/features/addCommentForm";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { VStack } from "@/shared/ui/Stack";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import cls from "./ArticleDetailsComments.module.scss";

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch],
    );

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
    });

    if (isLoading) {
      return null;
    }

    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.ArticleDetailsComments, {}, [className])}
      >
        <Text
          size={TextSize.L}
          title={t("Комментарии")}
          className={cls.ArticleDetailsComments__title}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
    );
  },
);
