import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entities/Article";

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;
  view: ArticleView | undefined;
  // pagination
  page: number;
  limit?: number;
  hasMore: boolean;
}
