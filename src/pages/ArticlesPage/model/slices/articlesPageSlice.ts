import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article, ArticleView } from "entities/Article";
import { ArticlesPageSchema } from "pages/ArticlesPage";
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";

const articlesAdapter = createEntityAdapter<Article, string>({
  selectId: (article) => article.id,
});

const initialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
  view: ArticleView.SMALL,
});

export const getArticles = createSelector(
  (state: StateSchema) => state.articlesPage || initialState,
  (articlesPage) => articlesAdapter.getSelectors().selectAll(articlesPage),
);

const articlesPageSlice = createSlice({
  name: "articlesPageSlice",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          articlesAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
  articlesPageSlice;
