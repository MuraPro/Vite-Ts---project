import { AppDispatch, createReduxStore } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";
import type {
  StateSchema,
  ThunkConfig,
  ThunkExtraArg,
} from "./config/StateSchema";

export { StoreProvider, createReduxStore };

export type { StateSchema, AppDispatch, ThunkConfig, ThunkExtraArg };
