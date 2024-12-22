import { getArticleDetailsIsLoading } from "entities/Article/model/selectors/articleDetails";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextAlign } from "shared/ui/Text/Text";
import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";
import cls from "./CommentList.module.scss";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, isLoading, comments } = props;
  const articleIsLoading = useSelector(getArticleDetailsIsLoading);

  const { t } = useTranslation();

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
            <CommentCard
              isLoading={isLoading}
              className={cls.comment}
              comment={comment}
              key={comment.id}
            />
          ))
        : !articleIsLoading && (
            <Text
              text={t("Комментарии отсутствуют")}
              align={TextAlign.CENTER}
              className={cls.comments_errors}
            />
          )}
    </div>
  );
});
