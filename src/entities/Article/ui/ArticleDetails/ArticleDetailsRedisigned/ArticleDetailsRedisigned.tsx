import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../../model/selectors/articleDetails';
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../../testing';
import { renderArticleBlock } from '../ArticleRenderBlock/renderBlock';
import cls from './ArticleDetailsRedisigned.module.scss';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetailsRedisigned = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const article = useSelector(getArticleDetailsData);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <VStack gap="16" align="center" max>
                <Skeleton className={cls.title} width={250} height={28} />
                <Skeleton className={cls.skeleton} width="90%" height={20} />
                <Skeleton
                    className={cls.image}
                    width="100%"
                    height={380}
                    border="16px"
                />
                <VStack gap="8" align="start" max>
                    <Skeleton
                        className={cls.skeleton}
                        width="100%"
                        height={18}
                    />
                    <Skeleton
                        className={cls.skeleton}
                        width="95%"
                        height={18}
                    />
                    <Skeleton
                        className={cls.skeleton}
                        width="80%"
                        height={18}
                    />
                </VStack>
            </VStack>
        );
    } else if (error) {
        content = (
            <Text
                title={t('Произошла ошибка при загрузке статьи.')}
                variant={'error'}
            />
        );
    } else {
        content = (
            <>
                <Text title={article?.title} size="l" bold />
                <Text title={article?.subtitle} />
                <AppImage
                    fallback={
                        <Skeleton width="100%" height={420} border="16px" />
                    }
                    src={article?.img}
                    className={cls.img}
                />
                {article?.blocks.map(renderArticleBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap="16"
                align={'center'}
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
