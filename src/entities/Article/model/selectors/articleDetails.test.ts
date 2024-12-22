import { StateSchema } from "app/providers/StoreProvider";
import { Article, ArticleBlockType, ArticleType } from "../types/article";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "./articleDetails";

describe("articleDetails.test", () => {
  test("should return data", () => {
    const data: Article = {
      id: "1",
      title: "Test Title",
      subtitle: "Test Subtitle",
      img: "test.jpg",
      views: 100,
      createdAt: "2024-01-01",
      type: [ArticleType.LANGUAGE],
      blocks: [
        {
          id: "1",
          type: ArticleBlockType.TEXT,
          title: "Уровни знания корейского языка",
          paragraphs: [
            "Если вы осваиваете корейский язык, то компасом на вашем образовательном маршруте станет TOPIK (Test of Proficiency in Korean) – специальный тест на знание корейского языка. Он предназначен для неносителей языка.Данная аттестационная система была разработана еще в 1997 году правительством Южной Кореи. По сей день она является основной. Чаще всего тест проходят те, кто планирует обучение в ВУЗах Южной Кореи, трудоустройство в компании этой страны или иностранцы, претендующие на постоянное место жительства здесь.",
          ],
        },
      ],
    };

    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data,
        isLoading: false,
        error: undefined,
      },
    };

    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test("should work with empty state data", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
  });

  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: false,
        error: "Test error",
      },
    };
    expect(getArticleDetailsError(state as StateSchema)).toEqual("Test error");
  });

  test("should work with empty state error", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
  });

  test("should return isLoading", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });

  test("should work with empty state isLoading", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
  });
});
