import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";
import { ArticleDetailsRecommendationsSchema } from "../types/ArticleDetailsRecommendationsSchema";

const recommendationsAdapter = createEntityAdapter<Article, string>({
  selectId: (article) => article.id,
});

const initialState =
  recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  });

export const getArticleRecommendations = createSelector(
  (state: StateSchema) =>
    state.articleDetailsPage?.recommendations || initialState,
  (articleRecommendations) =>
    recommendationsAdapter.getSelectors().selectAll(articleRecommendations),
);

const articleDetailsPageRecommendationsSlice = createSlice({
  name: "articleDetailsPageRecommendationsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice;
