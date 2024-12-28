import { StateSchema } from "app/providers/StoreProvider";
import { ArticleView } from "entities/Article";
import {
  getArticlesPageIsLoading,
  getArticlesPageError,
  getArticlesPageView,
} from "./articlesPageSelectors"; // Импортируйте селекторы

describe("articlesPageSelectors", () => {
  describe("getArticlesPageIsLoading", () => {
    test("должен возвращать true, если isLoading равно true", () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          isLoading: true,
          error: undefined,
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
          page: 1,
          hasMore: true,
        },
      };
      expect(getArticlesPageIsLoading(state as StateSchema)).toBe(true);
    });

    test("должен возвращать false, если isLoading равно false", () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          isLoading: false,
          error: undefined,
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
          page: 1,
          hasMore: true,
        },
      };
      expect(getArticlesPageIsLoading(state as StateSchema)).toBe(false);
    });

    test("должен возвращать false, если articlesPage отсутствует", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getArticlesPageIsLoading(state as StateSchema)).toBe(false);
    });
  });

  describe("getArticlesPageError", () => {
    test("должен возвращать ошибку, если она существует", () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          isLoading: false,
          error: "Error message",
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
          page: 1,
          hasMore: true,
        },
      };
      expect(getArticlesPageError(state as StateSchema)).toBe("Error message");
    });

    test("должен возвращать undefined, если ошибки нет", () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          isLoading: false,
          error: undefined,
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
          page: 1,
          hasMore: true,
        },
      };
      expect(getArticlesPageError(state as StateSchema)).toBeUndefined();
    });

    test("должен возвращать undefined, если articlesPage отсутствует", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getArticlesPageError(state as StateSchema)).toBeUndefined();
    });
  });

  describe("getArticlesPageView", () => {
    test("должен возвращать значение view, если оно существует", () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          isLoading: false,
          error: undefined,
          ids: [],
          entities: {},
          view: ArticleView.BIG,
          page: 1,
          hasMore: true,
        },
      };
      expect(getArticlesPageView(state as StateSchema)).toBe(ArticleView.BIG);
    });

    test("должен возвращать SMALL по умолчанию, если view равно undefined", () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          isLoading: false,
          error: undefined,
          ids: [],
          entities: {},
          view: undefined,
          page: 1,
          hasMore: true,
        },
      };
      expect(getArticlesPageView(state as StateSchema)).toBe(ArticleView.SMALL);
    });

    test("должен возвращать SMALL по умолчанию, если articlesPage отсутствует", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getArticlesPageView(state as StateSchema)).toBe(ArticleView.SMALL);
    });
  });
});
