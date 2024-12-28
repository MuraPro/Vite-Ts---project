import { ArticleView } from "entities/Article";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { fetchNextArticlesPage } from "./fetchNextArticlesPage";

jest.mock("../fetchArticlesList/fetchArticlesList");

describe("fetchNextArticlesPage.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage);
    thunk.getState = () => ({
      articlesPage: {
        hasMore: true,
        page: 1,
        isLoading: false,
        view: ArticleView.BIG,
        ids: [],
        entities: {},
        _inited: false,
      },
      counter: { value: 0 },
      user: { authData: { id: "1", username: "test_user" }, _inited: true },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
  });
  test("fetchAritcleList not called", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage);
    thunk.getState = () => ({
      articlesPage: {
        hasMore: false,
        page: 1,
        isLoading: false,
        view: ArticleView.BIG,
        ids: [],
        entities: {},
        _inited: false,
      },
      counter: { value: 0 },
      user: { authData: { id: "1", username: "test_user" }, _inited: true },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
