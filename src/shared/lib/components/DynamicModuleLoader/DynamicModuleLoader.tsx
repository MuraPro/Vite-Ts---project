import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxStoreWithManager,
  StateSchemaKey,
} from "app/providers/StoreProvider/config/StateSchema";
import React, { FC, useEffect } from "react";
import { useStore } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer; // Указываем тип для редьюсеров
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: React.ReactNode;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
  children,
  reducers,
  removeAfterUnmount,
}) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      // Добавляем новый редюсер только если его нет
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, _]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, [reducers, removeAfterUnmount, dispatch, store]);

  //   useEffect(() => {
  //     const mountedReducers = store.reducerManager.getMountedReducers();
  //     // Добавляем редьюсеры при монтировании компонента
  //     Object.entries(reducers).forEach(
  //       ([name, reducer]: [string, Reducer<StateSchema>]) => {
  //         store.reducerManager.add(name as StateSchemaKey, reducer); // Приводим 'name' к типу StateSchemaKey
  //         dispatch({ type: `@INIT ${name} reducer` });
  //       },
  //     );

  //     return () => {
  //       // Удаляем редьюсеры, если removeAfterUnmount = true
  //       if (removeAfterUnmount) {
  //         Object.entries(reducers).forEach(
  //           ([name, _]: [string, Reducer<StateSchema>]) => {
  //             store.reducerManager.remove(name as StateSchemaKey); // Приводим 'name' к типу StateSchemaKey
  //             dispatch({ type: `@DESTROY ${name} reducer` });
  //           },
  //         );
  //       }
  //     };
  //   }, [reducers, removeAfterUnmount, dispatch, store]);

  return <>{children}</>;
};
