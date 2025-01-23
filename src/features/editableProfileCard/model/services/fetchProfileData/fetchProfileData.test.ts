import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { Profile } from "@/entities/Profile";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchProfileData } from "./fetchProfileData";

const mockProfile: Profile = {
  first: "John",
  lastname: "Doe",
  age: "30",
  country: Country.Korea,
  currency: Currency.KRW,
  city: "Seoul",
  email: "john.doe@example.com",
  username: "johndoe",
  avatar: "https://example.com/avatar.jpg",
};

describe("fetchProfileData", () => {
  test("должен успешно загрузить данные профиля", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockResolvedValue({ data: mockProfile });

    const result = await thunk.callThunk("1");

    expect(thunk.api.get).toHaveBeenCalledWith("/profile/1");
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(mockProfile);
  });

  test("должен вернуть ошибку при неудачном запросе", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockRejectedValue("error");

    const result = await thunk.callThunk("1");

    expect(thunk.api.get).toHaveBeenCalledWith("/profile/1");
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
