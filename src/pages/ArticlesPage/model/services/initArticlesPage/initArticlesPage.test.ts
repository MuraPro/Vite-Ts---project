import { ArticleSortField, ArticleType } from "@/entities/Article";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { initArticlesPage } from "./initArticlesPage";

jest.mock("../../selectors/articlesPageSelectors");
jest.mock("../fetchArticlesList/fetchArticlesList");

describe("initArticlesPage", () => {
  test("Успешная инициализация, если страница не была инициализирована", async () => {
    const searchParams = new URLSearchParams();
    searchParams.set("order", "asc");
    searchParams.set("sort", "createdAt");
    searchParams.set("type", "ALL");

    const thunk = new TestAsyncThunk(initArticlesPage);
    (getArticlesPageInited as jest.Mock).mockReturnValue(false);

    (fetchArticlesList as unknown as jest.Mock).mockResolvedValue({});

    const result = await thunk.callThunk(searchParams);

    expect(getArticlesPageInited).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setOrder("asc"),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setSort(ArticleSortField.CREATED),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setType(ArticleType.ALL),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.initState(),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(fetchArticlesList({}));

    expect(result.meta.requestStatus).toBe("fulfilled");
  });

  test("Не выполняется инициализация, если страница уже инициализирована", async () => {
    const searchParams = new URLSearchParams();
    const thunk = new TestAsyncThunk(initArticlesPage);

    (getArticlesPageInited as jest.Mock).mockReturnValue(true);

    const result = await thunk.callThunk(searchParams);

    expect(getArticlesPageInited).toHaveBeenCalled();
    expect(thunk.dispatch).not.toHaveBeenCalledWith(
      articlesPageActions.setOrder("asc"),
    );
    expect(thunk.dispatch).not.toHaveBeenCalledWith(
      articlesPageActions.setSort(ArticleSortField.CREATED),
    );
    expect(thunk.dispatch).not.toHaveBeenCalledWith(
      articlesPageActions.setSearch("test"),
    );
    expect(thunk.dispatch).not.toHaveBeenCalledWith(
      articlesPageActions.setType(ArticleType.LANGUAGE),
    );
    expect(thunk.dispatch).not.toHaveBeenCalledWith(
      articlesPageActions.initState(),
    );
    expect(thunk.dispatch).not.toHaveBeenCalledWith(fetchArticlesList({}));

    expect(result.meta.requestStatus).toBe("fulfilled");
  });
});
