import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { initArticlesPage } from "./initArticlesPage";

jest.mock("../../selectors/articlesPageSelectors");
jest.mock("../fetchArticlesList/fetchArticlesList");

describe("initArticlesPage", () => {
  test("Успешная инициализация, если страница не была инициализирована", async () => {
    const thunk = new TestAsyncThunk(initArticlesPage);
    (getArticlesPageInited as jest.Mock).mockReturnValue(false);

    (fetchArticlesList as unknown as jest.Mock).mockResolvedValue({});

    const result = await thunk.callThunk();

    expect(getArticlesPageInited).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.initState(),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(fetchArticlesList({ page: 1 }));

    expect(result.meta.requestStatus).toBe("fulfilled");
  });

  test("Не выполняется инициализация, если страница уже инициализирована", async () => {
    const thunk = new TestAsyncThunk(initArticlesPage);

    (getArticlesPageInited as jest.Mock).mockReturnValue(true);

    const result = await thunk.callThunk();

    expect(getArticlesPageInited).toHaveBeenCalled();
    expect(thunk.dispatch).not.toHaveBeenCalledWith(
      articlesPageActions.initState(),
    );
    expect(thunk.dispatch).not.toHaveBeenCalledWith(fetchArticlesList);

    expect(result.meta.requestStatus).toBe("fulfilled");
  });
});
