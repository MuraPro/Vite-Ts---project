import { StateSchema } from "@/app/providers/StoreProvider/testing";
import { getProfileReadonly } from "./getProfileReadonly";

describe("getProfileReadonly", () => {
  it("должен вернуть readonly, если оно есть в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true,
      },
    };

    expect(getProfileReadonly(state as StateSchema)).toBe(true);
  });

  it("должен вернуть undefined, если readonly отсутствует в состоянии профиля", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: undefined,
      },
    };

    expect(getProfileReadonly(state as StateSchema)).toBeUndefined();
  });

  it("должен вернуть undefined, если профиль отсутствует в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      // profile вообще отсутствует
    };

    expect(getProfileReadonly(state as StateSchema)).toBeUndefined();
  });
});
