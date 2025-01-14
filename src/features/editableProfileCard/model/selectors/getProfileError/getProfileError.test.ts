import { StateSchema } from "app/providers/StoreProvider";
import { getProfileError } from "./getProfileError";

describe("getProfileError", () => {
  it("должен вернуть ошибку, если она есть в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: "error",
      },
    };

    expect(getProfileError(state as StateSchema)).toBe("error");
  });

  it("должен вернуть undefined, если ошибки нет в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: undefined,
      },
    };

    expect(getProfileError(state as StateSchema)).toBeUndefined();
  });

  it("должен вернуть undefined, если профиль отсутствует в состоянии", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileError(state as StateSchema)).toBeUndefined();
  });
});
