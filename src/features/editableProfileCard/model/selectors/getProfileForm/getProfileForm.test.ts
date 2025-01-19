import { StateSchema } from "@/app/providers/StoreProvider";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { getProfileForm } from "./getProfileForm";

describe("getProfileForm", () => {
  it("должен вернуть форму профиля, если она есть в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: {
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
      // другие поля состояния можно оставить пустыми или задать по необходимости
    };

    expect(getProfileForm(state as StateSchema)).toEqual({
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

  it("должен вернуть undefined, если форма профиля отсутствует в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: undefined,
      },
      // другие поля состояния
    };

    expect(getProfileForm(state as StateSchema)).toBeUndefined();
  });

  it("должен вернуть undefined, если профиль отсутствует в состоянии", () => {
    const state: DeepPartial<StateSchema> = {
      // profile вообще отсутствует
    };

    expect(getProfileForm(state as StateSchema)).toBeUndefined();
  });
});
