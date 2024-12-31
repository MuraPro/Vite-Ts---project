import { Article } from "entities/Article"; // Подключаем типы для состояния и комментариев
import { ArticleType } from "entities/Article/model/types/article";
import { Comment } from "entities/Comment";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"; // Допустим, у вас есть этот тестовый утилитный класс для асинхронных функций.
import { fetchCommentsByArticleId } from "../../services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { addCommentForArticle } from "./addCommentForArticle";

jest.mock("../../services/fetchCommentsByArticleId/fetchCommentsByArticleId"); // Мокируем fetchCommentsByArticleId

describe("addCommentForArticle", () => {
  test("должен успешно добавить комментарий", async () => {
    const commentData: Comment = {
      id: "1",
      user: { id: "1", username: "user" }, // Мокируем пользователя
      text: "This is a comment",
    };

    const articleData: Article = {
      id: "1",
      user: { id: "1", username: "user" }, // Мокируем автора статьи
      title: "Article Title",
      subtitle: "Article Subtitle",
      img: "article.jpg",
      views: 100,
      createdAt: "2024-12-24",
      type: [ArticleType.LANGUAGE],
      blocks: [],
    };

    const thunk = new TestAsyncThunk(addCommentForArticle);

    // Мокируем успешный ответ от API
    thunk.api.post.mockResolvedValue({ data: commentData });

    // Мокируем состояние
    thunk.getState = () => ({
      articleDetails: { data: articleData, isLoading: false }, // Статья существует
      user: { authData: { id: "1", username: "user" }, _inited: true }, // Пользователь авторизован
      counter: { value: 1 }, // Счетчик
      ui: { scroll: { test: 1 } },
    });

    const result = await thunk.callThunk("This is a comment");

    // Проверяем вызов API с правильными параметрами
    expect(thunk.api.post).toHaveBeenCalledWith("/comments", {
      articleId: "1",
      userId: "1",
      text: "This is a comment",
    });

    // Проверяем успешный статус запроса
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(commentData);

    // Проверяем, что был вызван диспатч для обновления комментариев
    expect(thunk.dispatch).toHaveBeenCalledWith(fetchCommentsByArticleId("1"));
  });

  test("должен вернуть ошибку при отсутствии данных", async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle);

    // Мокируем состояние без данных
    thunk.getState = () => ({
      articleDetails: { data: undefined, isLoading: false }, // Нет данных о статье
      user: { authData: { id: "", username: "" }, _inited: true }, // Нет данных о пользователе
      counter: { value: 1 }, // Счетчик
      ui: { scroll: { test: 1 } },
    });

    const result = await thunk.callThunk("This is a comment");

    // Проверяем, что запрос отклонен
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("no data");
  });

  test("должен вернуть ошибку при неудачном запросе", async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle);

    // Мокируем состояние с данными
    const articleData: Article = {
      id: "1",
      user: { id: "1", username: "user" },
      title: "Article Title",
      subtitle: "Article Subtitle",
      img: "article.jpg",
      views: 100,
      createdAt: "2024-12-24",
      type: [ArticleType.LANGUAGE],
      blocks: [],
    };

    thunk.getState = () => ({
      articleDetails: { data: articleData, isLoading: false },
      user: { authData: { id: "1", username: "user" }, _inited: true }, // Пользователь авторизован
      counter: { value: 1 }, // Счетчик
      ui: { scroll: { test: 1 } },
    });

    // Мокируем неудачный ответ от API
    thunk.api.post.mockRejectedValue(new Error("Network Error"));

    const result = await thunk.callThunk("This is a comment");

    // Проверяем вызов API с правильными параметрами
    expect(thunk.api.post).toHaveBeenCalledWith("/comments", {
      articleId: "1",
      userId: "1",
      text: "This is a comment",
    });

    // Проверяем, что запрос отклонен
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
