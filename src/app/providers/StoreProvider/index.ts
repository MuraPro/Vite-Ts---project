import { createReduxStore } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";
import type {
  StateSchema,
  ThunkExtraArg,
  ThunkConfig,
} from "./config/StateSchema";
import type { AppDispatch } from "./config/store";

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  AppDispatch,
  ThunkExtraArg,
  ThunkConfig,
};
