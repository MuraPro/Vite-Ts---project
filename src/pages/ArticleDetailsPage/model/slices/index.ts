import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { ArticleDetailsRecommendationsSchema } from "../types/ArticleDetailsRecommendationsSchema";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";
import { articleDetailsPageRecommendationsReducer } from "./articleDetailsPageRecommendationsSlice";

// Комбинированный редьюсер для страницы деталей статьи
export const articleDetailsPageReducer = combineReducers({
  recommendations:
    articleDetailsPageRecommendationsReducer as Reducer<ArticleDetailsRecommendationsSchema>,
  comments: articleDetailsCommentsReducer,
});
