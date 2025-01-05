import { StateSchema } from "app/providers/StoreProvider";
import { Article, ArticleType } from "entities/Article";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";
import {
  articleDetailsPageRecommendationsReducer,
  getArticleRecommendations,
} from "./articleDetailsPageRecommendationsSlice";

describe("articleDetailsPageRecommendationsSlice", () => {
  const initialState = {
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  };

  const recommendationsData: Article[] = [
    {
      id: "1",
      user: { id: "1", username: "user1" },
      title: "Article 1",
      subtitle: "Subtitle 1",
      img: "article1.jpg",
      views: 100,
      createdAt: "2024-12-24",
      type: [ArticleType.LANGUAGE],
      blocks: [],
    },
    {
      id: "2",
      user: { id: "2", username: "user2" },
      title: "Article 2",
      subtitle: "Subtitle 2",
      img: "article2.jpg",
      views: 200,
      createdAt: "2024-12-25",
      type: [ArticleType.LANGUAGE],
      blocks: [],
    },
  ];

  test("должен вернуть начальное состояние", () => {
    const state = articleDetailsPageRecommendationsReducer(undefined, {
      type: "unknown",
    });
    expect(state).toEqual(initialState);
  });

  test("должен устанавливать isLoading в true при ожидании рекомендаций", () => {
    const action = fetchArticleRecommendations.pending.type;
    const state = articleDetailsPageRecommendationsReducer(initialState, {
      type: action,
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  test("должен загрузить рекомендации при успешном ответе", () => {
    const action = fetchArticleRecommendations.fulfilled(
      recommendationsData,
      "",
      undefined,
    );
    const state = articleDetailsPageRecommendationsReducer(
      initialState,
      action,
    );

    expect(state.isLoading).toBe(false);
    expect(state.ids).toEqual(["1", "2"]);
    expect(state.entities).toEqual({
      "1": recommendationsData[0],
      "2": recommendationsData[1],
    });
  });

  test("должен обработать ошибку при неудачном запросе", () => {
    const error = new Error("Network Error"); // Строка ошибки, как это ожидается в вашем слайсе
    const action = fetchArticleRecommendations.rejected(error, "");

    const state = articleDetailsPageRecommendationsReducer(
      initialState,
      action,
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeUndefined();
  });

  test("должен вернуть пустой список, если рекомендаций нет", () => {
    const emptyRecommendations: Article[] = [];
    const action = fetchArticleRecommendations.fulfilled(
      emptyRecommendations,
      "",
      undefined,
    );
    const state = articleDetailsPageRecommendationsReducer(
      initialState,
      action,
    );

    expect(state.isLoading).toBe(false);
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
  });

  describe("getArticleRecommendations", () => {
    test("должен вернуть массив рекомендаций из состояния", () => {
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
            error: undefined,
            ids: ["1", "2"],
            entities: {
              "1": recommendationsData[0],
              "2": recommendationsData[1],
            },
          },
        },
      };

      const recommendations = getArticleRecommendations(state as StateSchema);
      expect(recommendations).toEqual(recommendationsData);
    });

    test("должен вернуть пустой массив, если данных нет", () => {
      const state: DeepPartial<StateSchema> = {};
      const recommendations = getArticleRecommendations(state as StateSchema);
      expect(recommendations).toEqual([]);
    });
  });
});
