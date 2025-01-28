import { ArticleBlockType, ArticleType } from '../consts/articleConsts';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { articleDetailsReducer } from './articleDetailsSlice';

const article: Article = {
    id: '1',
    title: 'Test title',
    subtitle: 'Test subtitle',
    img: '',
    views: 1,
    createdAt: '00.00.0000',
    user: {
        id: '1',
        username: 'Name',
    },
    type: [ArticleType.LANGUAGE],
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Test title',
            paragraphs: ['some text'],
        },
    ],
};

describe('articleDetailsSlice', () => {
    const initialState = {
        isLoading: false,
        error: undefined,
        data: undefined,
    };

    it('должен обрабатывать fetchArticleById.pending', () => {
        const action = { type: fetchArticleById.pending.type };
        const state = articleDetailsReducer(initialState, action);

        expect(state).toEqual({
            isLoading: true,
            error: undefined,
            data: undefined,
        });
    });

    it('должен обрабатывать fetchArticleById.fulfilled', () => {
        const action = {
            type: fetchArticleById.fulfilled.type,
            payload: article,
        };
        const state = articleDetailsReducer(initialState, action);

        expect(state).toEqual({
            isLoading: false,
            error: undefined,
            data: article,
        });
    });

    it('должен обрабатывать fetchArticleById.rejected', () => {
        const action = {
            type: fetchArticleById.rejected.type,
            payload: 'Ошибка при получении статьи',
        };
        const state = articleDetailsReducer(initialState, action);

        expect(state).toEqual({
            isLoading: false,
            error: 'Ошибка при получении статьи',
            data: undefined,
        });
    });
});
