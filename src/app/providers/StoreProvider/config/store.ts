import {
  configureStore,
  EnhancedStore,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { Reducer } from "redux";
import { counterReducer } from "@/entities/Counter";
import { userReducer } from "@/entities/User";
import { uiReducer } from "@/features/UI";
import { $api } from "@/shared/api/api";
import { rtkApi } from "@/shared/api/rtkApi";
import { configEnv } from "@/shared/config/config";
import { createReducerManager } from "./reducerManager";
import { StateSchema, ThunkExtraArg } from "./StateSchema";

export type StoreWithReducerManager = EnhancedStore<StateSchema> & {
  reducerManager: ReturnType<typeof createReducerManager>;
};

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<
      CombinedStateEquivalent<StateSchema>
    >,
    devTools: configEnv.isDevMode,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  });

  // Добавляем кастомное свойство reducerManager
  (store as StoreWithReducerManager).reducerManager = reducerManager;

  return store as StoreWithReducerManager;
}

export type RootState = ReturnType<typeof createReduxStore>["getState"];
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
