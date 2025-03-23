import { memo, MutableRefObject, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
    triggerRef: MutableRefObject<HTMLDivElement>;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        console.log('onLoadNextPart');
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div className={cls.ArticlesPage__section}>
                    <ViewSelectorContainer
                        className={cls.ArticlesPage__selector}
                    />
                    <Page
                        data-testid="ArticlesPage"
                        onScrollEnd={onLoadNextPart}
                        className={classNames(cls.ArticlesPageRedesigned, {}, [
                            className,
                        ])}
                    >
                        <ArticleInfiniteList
                            className={`${cls.list} _container`}
                        />
                        <ArticlePageGreeting />
                    </Page>
                    <FiltersContainer className={cls.ArticlesPage__filters} />
                </div>
            }
            off={
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(
                        `_container ${cls.ArticlesPage}`,
                        {},
                        [className],
                    )}
                >
                    <ArticlesPageFilters />
                    <ArticleInfiniteList className={cls.ArticleList} />
                    <ArticlePageGreeting />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
