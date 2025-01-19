import "@testing-library/jest-dom";
import { StateSchema } from "@/app/providers/StoreProvider";
import { getUserAuthData } from "./getUserAuthData";

// Описание тестов
describe("getUserAuthData", () => {
  it("должен вернуть данные аутентификации, если они есть в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          id: "123",
          username: "test_user",
        },
      },
    };

    // Ожидаем, что функция вернет правильные данные
    expect(getUserAuthData(state as StateSchema)).toEqual({
      id: "123",
      username: "test_user",
    });
  });

  it("должен вернуть undefined, если authData отсутствует", () => {
    const state: DeepPartial<StateSchema> = {
      user: undefined,
    };

    // Ожидаем, что функция вернет undefined
    expect(getUserAuthData(state as StateSchema)).toBeUndefined();
  });

  it("должен вернуть undefined, если user отсутствует в состоянии", () => {
    const state: DeepPartial<StateSchema> = {};

    // Ожидаем, что функция вернет undefined
    expect(getUserAuthData(state as StateSchema)).toBeUndefined();
  });
});
