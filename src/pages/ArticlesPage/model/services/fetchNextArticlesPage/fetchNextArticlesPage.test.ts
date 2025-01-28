import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage);
        thunk.getState = () => ({
            [rtkApi.reducerPath]: rtkApi.reducer(undefined, { type: '' }),
            articlesPage: {
                hasMore: false,
                error: undefined,
                page: 1,
                isLoading: false,
                view: ArticleView.SMALL,
                ids: [],
                entities: {},
                _inited: false,
                type: ArticleType.ALL,
                order: 'asc',
                sort: ArticleSortField.CREATED,
                limit: 9,
                search: '',
            },
            counter: { value: 0 },
            user: {
                authData: { id: '1', username: 'test_user' },
                _inited: true,
            },
            ui: { scroll: { test: 1 } },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });
    test('fetchAritcleList not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage);
        thunk.getState = () => ({
            [rtkApi.reducerPath]: rtkApi.reducer(undefined, { type: '' }),
            articlesPage: {
                hasMore: false,
                error: undefined,
                page: 1,
                isLoading: false,
                view: ArticleView.SMALL,
                ids: [],
                entities: {},
                _inited: false,
                type: ArticleType.ALL,
                order: 'asc',
                sort: ArticleSortField.CREATED,
                limit: 9,
                search: '',
            },
            counter: { value: 0 },
            user: {
                authData: { id: '1', username: 'test_user' },
                _inited: true,
            },
            ui: { scroll: { test: 1 } },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
