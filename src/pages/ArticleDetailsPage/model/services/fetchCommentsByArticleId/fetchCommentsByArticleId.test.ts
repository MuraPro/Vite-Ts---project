import { Comment } from "entities/Comment";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"; // Тестовая утилита для асинхронных действий
import { fetchCommentsByArticleId } from "./fetchCommentsByArticleId";

jest.mock("axios"); // Мокируем axios или аналогичный API

describe("fetchCommentsByArticleId", () => {
  test("должен успешно загрузить комментарии", async () => {
    const commentsData: Comment[] = [
      {
        id: "1",
        user: { id: "1", username: "user1" },
        text: "This is a comment 1",
      },
      {
        id: "2",
        user: { id: "2", username: "user2" },
        text: "This is a comment 2",
      },
    ];

    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    // Мокируем успешный ответ от API
    thunk.api.get.mockResolvedValue({ data: commentsData });

    const result = await thunk.callThunk("1"); // Параметр - articleId

    // Проверяем вызов API с правильными параметрами
    expect(thunk.api.get).toHaveBeenCalledWith("/comments", {
      params: { articleId: "1", _expand: "user" },
    });

    // Проверяем успешный статус запроса
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(commentsData);
  });

  test("должен вернуть ошибку, если articleId не передан", async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    // Мокируем состояние с отсутствующим articleId
    const result = await thunk.callThunk(undefined);

    // Проверяем, что запрос отклонен
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });

  test("должен вернуть ошибку при неудачном запросе", async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    // Мокируем ошибку API
    thunk.api.get.mockRejectedValue(new Error("Network Error"));

    const result = await thunk.callThunk("1");

    // Проверяем вызов API с правильными параметрами
    expect(thunk.api.get).toHaveBeenCalledWith("/comments", {
      params: { articleId: "1", _expand: "user" },
    });

    // Проверяем, что запрос отклонен
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });

  test("должен вернуть ошибку, если данные от API отсутствуют", async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    // Мокируем ответ от API без данных
    thunk.api.get.mockResolvedValue({ data: null });

    const result = await thunk.callThunk("1");

    // Проверяем, что запрос отклонен
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
