import {
  Action,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { ReducerManager, StateSchema, StateSchemaKey } from "./StateSchema";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: Array<StateSchemaKey> = [];

  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema, action: Action) => {
      if (keysToRemove.length > 0) {
        // Создаем глубокую копию состояния, чтобы избежать мутаций
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key]; // Удаляем ключи
        });
        keysToRemove = []; // Очищаем список удалённых ключей
      }
      const filteredState = state
        ? Object.fromEntries(
            Object.entries(state).filter(([_, value]) => value !== undefined),
          )
        : {}; //
      // Отправляем отфильтрованное состояние в combinedReducer
      return combinedReducer(filteredState, action);
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
