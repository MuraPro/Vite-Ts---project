import { Article } from '@/entities/Article';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleRecommendations } from './fetchArticleRecommendations';

describe('fetchArticleRecommendations', () => {
    test('должен успешно загрузить рекомендации', async () => {
        const recommendations: Article[] = [
            {
                id: '1',
                user: { id: '1', username: 'user1' },
                title: 'Article 1',
                subtitle: 'Subtitle 1',
                img: 'article1.jpg',
                views: 100,
                createdAt: '2024-12-24',
                type: [],
                blocks: [],
            },
            {
                id: '2',
                user: { id: '2', username: 'user2' },
                title: 'Article 2',
                subtitle: 'Subtitle 2',
                img: 'article2.jpg',
                views: 200,
                createdAt: '2024-12-25',
                type: [],
                blocks: [],
            },
        ];

        const thunk = new TestAsyncThunk(fetchArticleRecommendations);

        // Мокируем успешный ответ API
        thunk.api.get.mockResolvedValue({ data: recommendations });

        const result = await thunk.callThunk();

        // Проверяем, что запрос отправлен с правильными параметрами
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: { _limit: 4 },
        });

        // Проверяем успешный статус и правильный результат
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(recommendations);
    });

    test('должен вернуть ошибку, если данных нет', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);

        // Мокируем ответ API без данных
        thunk.api.get.mockResolvedValue({ data: null });

        const result = await thunk.callThunk();

        // Проверяем, что запрос отправлен с правильными параметрами
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: { _limit: 4 },
        });

        // Проверяем, что запрос отклонен с правильным результатом
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    test('должен вернуть ошибку при неудачном запросе', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);

        // Мокируем ошибку сети
        thunk.api.get.mockRejectedValue(new Error('Network Error'));

        const result = await thunk.callThunk();

        // Проверяем, что запрос отправлен с правильными параметрами
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: { _limit: 4 },
        });

        // Проверяем, что запрос отклонен с правильным результатом
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
