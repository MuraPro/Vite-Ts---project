import { userActions } from "@/entities/User";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { loginByUsername } from "./loginByUsername";

describe("loginByUsername tests", () => {
  // Тест для успешной аутентификации
  test("should login successfully", async () => {
    const mockUser = { username: "admin", id: "1" };

    // Создаем экземпляр тестовой обертки
    const thunk = new TestAsyncThunk(loginByUsername);

    // Мокаем запрос API для возвращения mockUser
    thunk.api.post.mockReturnValue(Promise.resolve({ data: mockUser }));

    // Вызываем callThunk с данными для аутентификации
    const result = await thunk.callThunk({
      username: "admin",
      password: "123",
    });

    // Проверяем, что экшн был выполнен и результат успешный
    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(mockUser),
    );
    expect(thunk.dispatch).toHaveBeenCalledTimes(3); // Проверка количества вызовов dispatch
    expect(thunk.api.post).toHaveBeenCalledWith("/login", {
      username: "admin",
      password: "123",
    });
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(mockUser);
  });

  // Тест для неудачной аутентификации (например, сервер вернул 403)
  test("should handle login failure", async () => {
    const thunk = new TestAsyncThunk(loginByUsername);

    // Мокаем ошибку от API
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    // Вызываем callThunk с данными для аутентификации
    const result = await thunk.callThunk({
      username: "john_doe",
      password: "wrong_password",
    });

    // Проверяем, что был вызван rejectWithValue
    expect(thunk.dispatch).toHaveBeenCalledTimes(2); // Ожидаем 2 вызова dispatch
    expect(thunk.api.post).toHaveBeenCalledWith("/login", {
      username: "john_doe",
      password: "wrong_password",
    });
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });

  // Тест для неудачной аутентификации с отсутствующим API
  test("should handle error if API is unavailable", async () => {
    const thunk = new TestAsyncThunk(loginByUsername);

    // Мокаем API, чтобы он был недоступен
    thunk.api.post.mockImplementation(() => {
      throw new Error("API is not available");
    });

    // Вызываем callThunk
    const result = await thunk.callThunk({
      username: "john_doe",
      password: "password",
    });

    // Проверяем, что был вызван rejectWithValue
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
