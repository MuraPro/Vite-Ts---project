import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Article, ArticleType } from "../../types/article";
import { fetchArticleById } from "./fetchArticleById";

jest.mock("axios"); // Мокируем axios или аналогичный API

describe("fetchArticleById", () => {
  test("должен успешно загрузить статью", async () => {
    const articleData: Article = {
      id: "1",
      user: { id: "1", username: "user1" },
      title: "Sample Article",
      subtitle: "Sample Subtitle",
      img: "article.jpg",
      views: 100,
      createdAt: "2024-12-25",
      type: [ArticleType.LANGUAGE],
      blocks: [],
    };

    const thunk = new TestAsyncThunk(fetchArticleById);

    // Мокируем успешный ответ от API
    thunk.api.get.mockResolvedValue({ data: articleData });

    const result = await thunk.callThunk("1"); // Параметр - articleId

    // Проверяем вызов API с правильными параметрами
    expect(thunk.api.get).toHaveBeenCalledWith("/articles/1", {
      params: { _expand: "user" },
    });

    // Проверяем успешный статус запроса
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(articleData);
  });

  test("должен вернуть ошибку при неудачном запросе", async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    // Мокируем ошибку API
    thunk.api.get.mockRejectedValue(new Error("Network Error"));

    const result = await thunk.callThunk("1");

    // Проверяем вызов API с правильными параметрами
    expect(thunk.api.get).toHaveBeenCalledWith("/articles/1", {
      params: { _expand: "user" },
    });

    // Проверяем, что запрос отклонен
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });

  test("должен вернуть ошибку, если данные от API отсутствуют", async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    // Мокируем ответ от API без данных
    thunk.api.get.mockResolvedValue({ data: null });

    const result = await thunk.callThunk("1");

    // Проверяем, что запрос отклонен
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
