import { Article, ArticleType } from "@/entities/Article";
import { ArticleBlockType } from "@/entities/Article";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from "../../selectors/articlesPageSelectors";
import { fetchArticlesList } from "./fetchArticlesList";

jest.mock("../../selectors/articlesPageSelectors");

const articleData: Article[] = [
  {
    id: "1",
    title: "Test title",
    subtitle: "Test subtitle",
    img: "",
    views: 1,
    createdAt: "00.00.0000",
    user: {
      id: "1",
      username: "Name",
    },
    type: [ArticleType.LANGUAGE],
    blocks: [
      {
        id: "1",
        type: ArticleBlockType.TEXT,
        title: "Test title",
        paragraphs: ["some text"],
      },
    ],
  },
];

describe("fetchArticlesList", () => {
  test("Успешное получение списка статей", async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList);

    // Мокируем селекторы
    (getArticlesPageLimit as jest.Mock).mockReturnValue(10);
    (getArticlesPageSort as jest.Mock).mockReturnValue("createdAt");
    (getArticlesPageOrder as jest.Mock).mockReturnValue("asc");
    (getArticlesPageSearch as jest.Mock).mockReturnValue("test");
    (getArticlesPageNum as jest.Mock).mockReturnValue(1);
    (getArticlesPageType as jest.Mock).mockReturnValue(ArticleType.LANGUAGE);

    // Мокируем успешный ответ API
    thunk.api.get.mockResolvedValue({ data: articleData });

    const result = await thunk.callThunk({ page: 1 });

    // Проверяем, что запрос был выполнен с правильными параметрами
    expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
      params: {
        _expand: "user",
        _limit: 10,
        _page: 1,
        _sort: "createdAt",
        _order: "asc",
        q: "test",
        type: ArticleType.LANGUAGE,
      },
    });

    // Проверяем результат
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(articleData);
  });

  test("Ошибка при запросе данных", async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList);

    // Мокируем селекторы
    (getArticlesPageLimit as jest.Mock).mockReturnValue(10);
    (getArticlesPageSort as jest.Mock).mockReturnValue("createdAt");
    (getArticlesPageOrder as jest.Mock).mockReturnValue("asc");
    (getArticlesPageSearch as jest.Mock).mockReturnValue("test");
    (getArticlesPageNum as jest.Mock).mockReturnValue(1);
    (getArticlesPageType as jest.Mock).mockReturnValue(ArticleType.LANGUAGE);

    // Мокируем неудачный ответ API
    thunk.api.get.mockRejectedValue(new Error("Network Error"));

    const result = await thunk.callThunk({ page: 1 });

    // Проверяем, что запрос был выполнен
    expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
      params: {
        _expand: "user",
        _limit: 10,
        _page: 1,
        _sort: "createdAt",
        _order: "asc",
        q: "test",
        type: ArticleType.LANGUAGE,
      },
    });

    // Проверяем результат
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });

  test("Ошибка при отсутствии данных в ответе", async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList);

    // Мокируем селекторы
    (getArticlesPageLimit as jest.Mock).mockReturnValue(10);
    (getArticlesPageSort as jest.Mock).mockReturnValue("createdAt");
    (getArticlesPageOrder as jest.Mock).mockReturnValue("asc");
    (getArticlesPageSearch as jest.Mock).mockReturnValue("test");
    (getArticlesPageNum as jest.Mock).mockReturnValue(1);
    (getArticlesPageType as jest.Mock).mockReturnValue(ArticleType.LANGUAGE);

    // Мокируем ответ API с пустыми данными
    thunk.api.get.mockResolvedValue({ data: null });

    const result = await thunk.callThunk({ page: 1 });

    // Проверяем, что запрос был выполнен
    expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
      params: {
        _expand: "user",
        _limit: 10,
        _page: 1,
        _sort: "createdAt",
        _order: "asc",
        q: "test",
        type: ArticleType.LANGUAGE,
      },
    });

    // Проверяем результат
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
