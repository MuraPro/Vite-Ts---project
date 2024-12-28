import {
  Article,
  ArticleBlockType,
  ArticleType,
} from "entities/Article/model/types/article";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors";
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
    // Мокируем селектор
    (getArticlesPageLimit as jest.Mock).mockReturnValue(10);

    // Мокируем успешный ответ API
    thunk.api.get.mockResolvedValue({ data: articleData });

    const result = await thunk.callThunk({
      page: 1,
    });

    // Проверяем, что запрос был выполнен с правильными параметрами
    expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
      params: {
        _expand: "user",
        _page: 1,
        _limit: 10,
      },
    });

    // Проверяем результат
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(articleData);
  });

  test("Ошибка при запросе данных", async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList);
    // Мокируем селектор
    (getArticlesPageLimit as jest.Mock).mockReturnValue(10);

    // Мокируем неудачный ответ API
    thunk.api.get.mockRejectedValue(new Error("Network Error"));

    const result = await thunk.callThunk({
      page: 1,
    });

    // Проверяем, что запрос был выполнен
    expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
      params: {
        _expand: "user",
        _page: 1,
        _limit: 10,
      },
    });

    // Проверяем результат
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });

  test("Ошибка при отсутствии данных в ответе", async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList);
    // Мокируем селектор
    (getArticlesPageLimit as jest.Mock).mockReturnValue(10);

    // Мокируем ответ API с пустыми данными
    thunk.api.get.mockResolvedValue({ data: null });

    const result = await thunk.callThunk({
      page: 1,
    });

    // Проверяем, что запрос был выполнен
    expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
      params: {
        _expand: "user",
        _page: 1,
        _limit: 10,
      },
    });

    // Проверяем результат
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
