import { StoryFn } from "@storybook/react";
import { StateSchema } from "@/app/providers/StoreProvider";
import { StoreProvider } from "@/app/providers/StoreProvider";
import { articleDetailsReducer } from "@/entities/Article/testing";
// eslint-disable-next-line mura-pro-plugin/layer-imports
import { userReducer } from "@/entities/User";
import { addCommentFormReducer } from "@/features/addCommentForm/testing";
import { loginReducer } from "@/features/AuthByUsername/testing";

import { profileReducer } from "@/features/editableProfileCard/testing";
// eslint-disable-next-line mura-pro-plugin/layer-imports
import { uiReducer } from "@/features/UI";
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/testing";
import { articlesPageReducer } from "@/pages/ArticlesPage/testing";
import { ReducersList } from "../../../lib/components/DynamicModuleLoader/DynamicModuleLoader";

// const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
//   counter: counterReducer as Reducer<CounterSchema | undefined>,
//   user: userReducer as Reducer<UserSchema | undefined>,
//   ui: uiReducer as Reducer<UISchema | undefined>,
//   loginForm: loginReducer as Reducer<LoginSchema | undefined>,
// };

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articlesPage: articlesPageReducer,
  ui: uiReducer,
  user: userReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
  (Story: StoryFn) => {
    return (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <Story />
      </StoreProvider>
    );
  };
