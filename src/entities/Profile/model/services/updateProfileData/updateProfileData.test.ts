import { Country, Currency } from "shared/const/common";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { Profile } from "../../types/profile";
import { updateProfileData } from "./updateProfileData";

jest.mock("../../selectors/getProfileForm/getProfileForm", () => ({
  getProfileForm: jest.fn(),
}));

describe("updateProfileData", () => {
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

  it("должен успешно обновить профиль", async () => {
    (getProfileForm as jest.Mock).mockReturnValue(mockProfile);

    const thunk = new TestAsyncThunk(updateProfileData);

    thunk.api.put.mockResolvedValue({ data: mockProfile });

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalledWith("/profile", mockProfile);
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(mockProfile);
  });

  it("должен вернуть ошибку при неудачном запросе", async () => {
    (getProfileForm as jest.Mock).mockReturnValue(mockProfile);

    const thunk = new TestAsyncThunk(updateProfileData);

    thunk.api.put.mockRejectedValue(new Error("Network Error"));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalledWith("/profile", mockProfile);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toStrictEqual(["SERVER_ERROR"]); // Используйте toStrictEqual
  });

  it("не должен отправлять запрос, если форма пустая", async () => {
    (getProfileForm as jest.Mock).mockReturnValue(undefined);

    const thunk = new TestAsyncThunk(updateProfileData);

    const result = await thunk.callThunk();

    expect(thunk.api.put).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toStrictEqual(["NO_DATA"]); // Используйте toStrictEqual
  });
});
