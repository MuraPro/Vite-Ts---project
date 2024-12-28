import { ArticleView } from "entities/Article";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { fetchNextArticlesPage } from "./fetchNextArticlesPage";

jest.mock("../fetchArticlesList/fetchArticlesList");

describe("fetchNextArticlesPage.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage);
    // Мокаем состояние, где hasMore = false, чтобы блокировать запрос
    thunk.getState = () => ({
      articlesPage: {
        hasMore: false, // Не загружаем больше страниц
        page: 1,
        isLoading: false, // Нет загрузки
        view: ArticleView.BIG,
        ids: [],
        entities: {},
      },
      counter: { value: 0 }, // Мокаем дополнительные части состояния
      user: { authData: { id: "1", username: "test_user" }, _inited: true },
    });

    await thunk.callThunk();

    // Проверяем, что dispatch был вызван дважды (один раз для установки страницы, второй раз для запроса)
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  });
  test("fetchAritcleList not called", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage);

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
