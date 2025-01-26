import { StateSchema } from "@/app/providers/StoreProvider/testing";
import {
  getArticleRecommendationsIsLoading,
  getArticleRecommendationsError,
} from "./recommendations";

describe("Селекторы рекомендаций статей", () => {
  test("getArticleRecommendationsIsLoading возвращает isLoading из состояния", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: {
          isLoading: true,
          error: undefined,
          ids: [],
          entities: {},
        },
        recommendations: {
          isLoading: true,
          error: undefined,
          ids: [],
          entities: {},
        },
      },
    };

    expect(getArticleRecommendationsIsLoading(state as StateSchema)).toBe(true);
  });

  test("getArticleRecommendationsIsLoading возвращает undefined, если isLoading отсутствует", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(
      getArticleRecommendationsIsLoading(state as StateSchema),
    ).toBeUndefined();
  });

  test("getArticleRecommendationsError возвращает error из состояния", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: {
          isLoading: true,
          error: undefined,
          ids: [],
          entities: {},
        },
        recommendations: {
          isLoading: false,
          error: "Ошибка загрузки",
          ids: [],
          entities: {},
        },
      },
    };

    expect(getArticleRecommendationsError(state as StateSchema)).toBe(
      "Ошибка загрузки",
    );
  });

  test("getArticleRecommendationsError возвращает undefined, если error отсутствует", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(
      getArticleRecommendationsError(state as StateSchema),
    ).toBeUndefined();
  });
});
