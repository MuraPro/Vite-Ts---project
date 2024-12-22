// import createMockStore from "redux-mock-store";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Article, ArticleBlockType, ArticleType } from "../../types/article";
import { fetchArticleById } from "./fetchArticleById";

const articleData: Article = {
  id: "1",
  title: "Test title",
  subtitle: "Test subtitle",
  img: "",
  views: 1,
  createdAt: "00.00.0000",
  type: [ArticleType.LANGUAGE],
  blocks: [
    {
      id: "1",
      type: ArticleBlockType.TEXT,
      title: "Test title",
      paragraphs: ["some text"],
    },
  ],
};

describe("fetchProfileData", () => {
  test("should fetch article successfully", async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    thunk.api.get.mockResolvedValue({ data: articleData });

    const result = await thunk.callThunk("1");

    expect(thunk.api.get).toHaveBeenCalledWith("/articles/1");
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(articleData);
  });

  test("должен вернуть ошибку при неудачном запросе", async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    thunk.api.get.mockRejectedValue(new Error("Network Error"));

    const result = await thunk.callThunk("1");

    expect(thunk.api.get).toHaveBeenCalledWith("/articles/1");
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
