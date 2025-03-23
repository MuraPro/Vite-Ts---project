import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import cls from './AdditionalInfoContainer.module.scss';

interface AdditionalInfoContainerProps {
    className?: string;
}

export const AdditionalInfoContainer = memo(
    (props: AdditionalInfoContainerProps) => {
        const { className } = props;
        const article = useSelector(getArticleDetailsData);

        const navigate = useNavigate();

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id));
            }
        }, [article, navigate]);

        if (!article) {
            return null;
        }

        return (
            <Card
                padding="24"
                border="round"
                className={`${cls.card} ${className}`}
            >
                <ArticleAdditionalInfo
                    onEdit={onEditArticle}
                    author={article.user}
                    createdAt={article.createdAt}
                    views={article.views}
                />
            </Card>
        );
    },
);
