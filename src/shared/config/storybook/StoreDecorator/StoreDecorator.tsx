import { StoryFn } from "@storybook/react";
import { StateSchema } from "app/providers/StoreProvider";
import { StoreProvider } from "app/providers/StoreProvider";
import { profileReducer } from "entities/Profile";
import { loginReducer } from "features/AuthByUsername";

import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

// const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
//   loginForm: loginReducer as Reducer<LoginSchema | undefined>,
//   profile: profileReducer as Reducer<ProfileSchema | undefined>,
// };
const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
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
