import axios from "axios";
import { userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { loginByUsername } from "./loginByUsername";

// Мокируем axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("loginByUsername async thunk", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const authData = { username: "admin", password: "123" };
  const userResponse = { id: "1", username: "testUser" };

  beforeEach(() => {
    jest.clearAllMocks();

    // Мокируем методы localStorage
    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(Storage.prototype, "getItem");
    jest.spyOn(Storage.prototype, "clear");
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Восстанавливаем оригинальные реализации
  });

  it("должен выполнить успешный запрос и сохранить данные пользователя", async () => {
    // Мокируем успешный ответ от сервера
    mockedAxios.post.mockResolvedValueOnce({ data: userResponse });

    const thunk = loginByUsername(authData);
    const result = await thunk(dispatch, getState, undefined);

    // Проверяем, что axios.post был вызван с нужными параметрами
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:8000/login",
      authData,
    );

    // Проверяем, что локальное хранилище было обновлено
    expect(localStorage.setItem).toHaveBeenCalledWith(
      USER_LOCALSTORAGE_KEY,
      JSON.stringify(userResponse),
    );

    // Проверяем, что вызвано действие setAuthData с правильными данными
    expect(dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userResponse),
    );

    // Проверяем, что результат thunka успешный
    expect(result.payload).toEqual(userResponse);
    expect(result.meta.requestStatus).toBe("fulfilled");
  });

  it("должен выполнить запрос и вернуть reject при ошибке", async () => {
    // Мокируем ошибку сети
    mockedAxios.post.mockRejectedValueOnce("error");

    const thunk = loginByUsername(authData);
    const result = await thunk(dispatch, getState, undefined);

    // Проверяем, что axios.post был вызван с нужными параметрами
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:8000/login",
      authData,
    );

    // Проверяем, что rejectWithValue вернулось с ошибкой
    expect(result.payload).toBe("error");
    expect(result.meta.requestStatus).toBe("rejected");

    // Локальное хранилище не должно было быть обновлено
    expect(localStorage.setItem).not.toHaveBeenCalled();

    // Действие setAuthData не должно было быть вызвано
    expect(dispatch).not.toHaveBeenCalledWith(
      userActions.setAuthData(expect.anything()),
    );
  });
});

//TestAsyncThunk

// import axios from "axios";
// import { userActions } from "entities/User";
// import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
// import { loginByUsername } from "./loginByUsername";

// jest.mock("axios");

// const mockedAxios = jest.mocked(axios, { shallow: false });

// describe("loginByUsername.test", () => {
//   test("success login", async () => {
//     const userValue = { username: "123", id: "1" };
//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

//     const thunk = new TestAsyncThunk(loginByUsername);
//     const result = await thunk.callThunk({ username: "123", password: "123" });

//     expect(thunk.dispatch).toHaveBeenCalledWith(
//       userActions.setAuthData(userValue),
//     );
//     expect(thunk.dispatch).toHaveBeenCalledTimes(3);
//     expect(mockedAxios.post).toHaveBeenCalled();
//     expect(result.meta.requestStatus).toBe("fulfilled");
//     expect(result.payload).toEqual(userValue);
//   });

//   test("error login", async () => {
//     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
//     const thunk = new TestAsyncThunk(loginByUsername);
//     const result = await thunk.callThunk({ username: "123", password: "123" });

//     expect(thunk.dispatch).toHaveBeenCalledTimes(2);
//     expect(mockedAxios.post).toHaveBeenCalled();
//     expect(result.meta.requestStatus).toBe("rejected");
//     expect(result.payload).toBe("error");
//   });
// });
