import { StateSchema } from "@/app/providers/StoreProvider";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { getProfileData } from "./getProfileData";

describe("getProfileData", () => {
  it("должен вернуть данные профиля, если они есть в состоянии", () => {
    // Создаем mock-состояние с данными профиля
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: {
          first: "John",
          lastname: "Doe",
          age: "30",
          country: Country.Korea,
          currency: Currency.KRW,
          city: "Seoul",
          email: "john.doe@example.com",
          username: "johndoe",
          avatar: "https://example.com/avatar.jpg",
        },
      },
    };

    // Проверяем, что функция вернет правильные данные
    const result = getProfileData(state as StateSchema);
    expect(result).toEqual({
      first: "John",
      lastname: "Doe",
      age: "30",
      country: Country.Korea,
      currency: Currency.KRW,
      city: "Seoul",
      email: "john.doe@example.com",
      username: "johndoe",
      avatar: "https://example.com/avatar.jpg",
    });
  });

  it("должен вернуть undefined, если данных профиля нет", () => {
    // Создаем mock-состояние без данных профиля
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: undefined,
      },
    };

    // Проверяем, что функция вернет undefined
    const result = getProfileData(state as StateSchema);
    expect(result).toBeUndefined();
  });

  it("должен вернуть undefined, если профиль отсутствует в состоянии", () => {
    // Создаем mock-состояние, в котором нет среза profile
    const state: DeepPartial<StateSchema> = {};

    // Проверяем, что функция вернет undefined
    const result = getProfileData(state as StateSchema);
    expect(result).toBeUndefined();
  });
});
