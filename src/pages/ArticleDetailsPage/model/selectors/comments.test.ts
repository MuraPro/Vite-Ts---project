import { StateSchema } from "app/providers/StoreProvider";
import {
  getArticleCommentsIsLoading,
  getArticleCommentsError,
} from "./comments";

describe("Селекторы комментариев статей", () => {
  test("getArticleCommentsIsLoading возвращает isLoading из состояния", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsComments: {
        isLoading: true,
        error: undefined,
        ids: [],
        entities: {},
      },
    };

    expect(getArticleCommentsIsLoading(state as StateSchema)).toBe(true);
  });

  test("getArticleCommentsIsLoading возвращает undefined, если isLoading отсутствует", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getArticleCommentsIsLoading(state as StateSchema)).toBeUndefined();
  });

  test("getArticleCommentsError возвращает error из состояния", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsComments: {
        isLoading: false,
        error: "Ошибка загрузки",
        ids: [],
        entities: {},
      },
    };

    expect(getArticleCommentsError(state as StateSchema)).toBe(
      "Ошибка загрузки",
    );
  });

  test("getArticleCommentsError возвращает undefined, если error отсутствует", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getArticleCommentsError(state as StateSchema)).toBeUndefined();
  });
});
