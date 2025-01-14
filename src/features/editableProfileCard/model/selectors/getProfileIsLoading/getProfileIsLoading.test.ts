import { StateSchema } from "app/providers/StoreProvider";
import { getProfileIsLoading } from "./getProfileIsLoading";

describe("getProfileIsLoading", () => {
  it("должен вернуть isLoading, если оно есть в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true,
      },
    };

    expect(getProfileIsLoading(state as StateSchema)).toBe(true);
  });

  it("должен вернуть undefined, если isLoading отсутствует в состоянии профиля", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: undefined,
      },
    };

    expect(getProfileIsLoading(state as StateSchema)).toBeUndefined();
  });

  it("должен вернуть undefined, если профиль отсутствует в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      // profile вообще отсутствует
    };

    expect(getProfileIsLoading(state as StateSchema)).toBeUndefined();
  });
});
