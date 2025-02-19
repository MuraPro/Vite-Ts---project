import { Article, ArticleView } from '@/entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { articlesPageReducer, articlesPageActions } from './articlesPageSlice';

const article: Article = {
    id: '1',
    title: 'Test title',
    subtitle: 'Test subtitle',
    img: '',
    views: 1,
    createdAt: '00.00.0000',
    user: { id: '1', username: 'Test User' },
    type: [],
    blocks: [],
};

describe('articlesPageSlice', () => {
    test('должен установить вид статей', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            view: ArticleView.SMALL,
        };

        const action = articlesPageActions.setView(ArticleView.BIG);
        const result = articlesPageReducer(state as ArticlesPageSchema, action);

        expect(result.view).toBe(ArticleView.BIG);
        expect(localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY)).toBe(
            ArticleView.BIG,
        );
    });

    test('должен инициализировать состояние из localStorage', () => {
        localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.BIG);

        const state: DeepPartial<ArticlesPageSchema> = {
            view: ArticleView.SMALL,
        };
        const result = articlesPageReducer(
            state as ArticlesPageSchema,
            articlesPageActions.initState(),
        );

        expect(result.view).toBe(ArticleView.BIG);
        expect(result.limit).toBe(4); // Проверка изменения лимита в зависимости от view
        expect(result._inited).toBe(true); // Проверка флага инициализации
    });

    test('должен обработать fetchArticlesList.pending', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
            error: 'Some error',
        };

        const result = articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.pending('', { replace: false }),
        );

        expect(result.isLoading).toBe(true);
        expect(result.error).toBeUndefined();
        expect(result.ids).toBeUndefined();
        expect(result.entities).toBeUndefined();
    });

    test('должен обработать fetchArticlesList.fulfilled', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: true,
            ids: [],
            entities: {},
        };

        const result = articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.fulfilled([article], '', { replace: false }),
        );

        expect(result.isLoading).toBe(false);
        expect(result.ids).toEqual([article.id]);
        expect(result.entities[article.id]).toEqual(article);
    });

    test('должен обработать fetchArticlesList.rejected', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: true,
            error: undefined,
        };

        const result = articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.rejected(
                new Error(),
                '',
                { replace: false },
                'Ошибка загрузки',
            ),
        );

        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Ошибка загрузки');
    });
});
