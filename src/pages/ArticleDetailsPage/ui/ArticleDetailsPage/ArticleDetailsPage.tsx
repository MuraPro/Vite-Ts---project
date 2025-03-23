import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';
import { getRouteArticles } from '@/shared/const/router';
// import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';
import { useAppToolbar } from '../../lib/useAppToolbar';
import { articleDetailsPageReducer } from '../../model/slices';
// import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toolbar = useAppToolbar();

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    // <StickyContentLayout
                    //     left={
                    //         <Icon
                    //             Svg={CircleIcon}
                    //             clickable
                    //             onClick={onBackToList}
                    //             className={cls.iconBack}
                    //         />
                    //     }
                    //     content={
                    //         <Page
                    //             className={classNames(
                    //                 cls.ArticleDetailsPage,
                    //                 {},
                    //                 [className],
                    //             )}
                    //         >
                    //             <VStack gap="16" max>
                    //                 <DetailsContainer />
                    //                 <ArticleRating articleId={id} />
                    //                 <ArticleRecommendationsList />
                    //                 <ArticleDetailsComments id={id} />
                    //             </VStack>
                    //         </Page>
                    //     }
                    //     right={<AdditionalInfoContainer />}
                    //     toolbar={toolbar}
                    // />
                    <div className={cls.ArticleDetailsPage}>
                        <Icon
                            Svg={CircleIcon}
                            clickable
                            onClick={onBackToList}
                            buttonClassName={cls.iconBack}
                        />
                        <Page className={classNames('', {}, [className])}>
                            <VStack gap="16" max>
                                <DetailsContainer />
                                <ArticleRating articleId={id} />
                                <ArticleRecommendationsList />
                                <ArticleDetailsComments id={id} />
                            </VStack>
                        </Page>
                        {/* <AdditionalInfoContainer
                            className={cls.AdditionalInfoContainer}
                        /> */}
                        <div className={cls.toolbar}>{toolbar}</div>
                    </div>
                }
                off={
                    <Page
                        className={classNames(cls.ArticleDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <VStack gap="16" max>
                            <ArticleDetailsPageHeader />
                            <ArticleDetails id={id} />
                            <ToggleFeatures
                                feature="isArticleRatingEnabled"
                                on={<ArticleRating articleId={id} />}
                                off={
                                    <Card>
                                        {t('Оценка статей скоро появится!')}
                                    </Card>
                                }
                            />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
