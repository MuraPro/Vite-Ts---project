import { memo, useCallback, HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Card, CardTheme } from "shared/ui/Card/Card";
import { Icon } from "shared/ui/Icon/Icon";
import { Text } from "shared/ui/Text/Text";
import AvatarImg from "../../../../shared/assets/avatar.jpg";
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import cls from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    if (article?.id) {
      navigate(RoutePath.article_details + article.id);
    }
  }, [article?.id, navigate]);

  if (!article) {
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  }

  const types = (
    <Text
      text={Array.isArray(article.type) ? article.type.join(", ") : ""}
      className={cls.article__types}
    />
  );

  const views = (
    <>
      <Text text={String(article.views || 0)} className={cls.article__views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks?.find(
      (block: any) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock | undefined;

    return (
      <div className={classNames(cls.article, {}, [className, cls[view]])}>
        <Card className={cls.article__card} theme={CardTheme.OUTLINED}>
          <div className={cls.article__header}>
            {article.user?.avatar ? (
              <div className={cls.card__avatar}>
                <Avatar size={30} src={article.user.avatar} alt={"avatar"} />
              </div>
            ) : (
              <div className={cls.article__avatar}>
                <Avatar src={AvatarImg} size={30} alt={"avatar"} />
              </div>
            )}

            <Text
              text={article.user?.username || t("Аноним")}
              className={cls.article__username}
            />
            <Text text={article.createdAt} className={cls.article__date} />
          </div>
          <Text
            title={article.title || t("Без названия")}
            className={cls.article__title}
          />
          {types}
          {article.img && (
            <img
              src={article.img}
              className={cls.article__img}
              alt={article.title}
            />
          )}
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.article__textBlock}
            />
          )}
          <div className={cls.article__footer}>
            <AppLink
              target={target}
              to={RoutePath.article_details + article.id}
            >
              <Button
                onClick={onOpenArticle}
                theme={ButtonTheme.PRIMARY}
                className={cls.article__btn}
              >
                {t("Читать далее...")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={RoutePath.article_details + article.id}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card
        className={cls.article__card}
        onClick={onOpenArticle}
        theme={CardTheme.OUTLINED}
      >
        <div className={cls.article__imageWrapper}>
          {article.img && (
            <img
              alt={article.title || t("Без названия")}
              src={article.img}
              className={cls.article__img}
            />
          )}
          <Text text={article.createdAt} className={cls.article__date} />
        </div>
        <div className={cls.article__infoWrapper}>
          {types}
          {views}
        </div>
        <Text
          text={article.title || t("Без названия")}
          className={cls.article__title}
        />
      </Card>
    </AppLink>
  );
});
