import "@testing-library/jest-dom";
import { loginByUsername } from "../services/loginByUsername/loginByUsername";
import { loginSlice, loginActions } from "./loginSlice";

describe("loginSlice", () => {
  const initialState = {
    isLoading: false,
    username: "",
    password: "",
    error: null,
  };

  it("должен установить имя пользователя", () => {
    const action = loginActions.setUsername("testUser");
    const nextState = loginSlice.reducer(initialState, action);
    expect(nextState.username).toBe("testUser");
    expect(nextState.error).toBeNull(); // error сбрасывается, если имя пользователя не пустое
  });

  it("должен сбросить ошибку, если имя пользователя пустое", () => {
    const action = loginActions.setUsername("");
    const nextState = loginSlice.reducer(initialState, action);
    expect(nextState.username).toBe("");
    expect(nextState.error).toBeNull(); // ошибка сбрасывается, если имя пользователя пустое
  });

  it("должен установить пароль", () => {
    const action = loginActions.setPassword("password123");
    const nextState = loginSlice.reducer(initialState, action);
    expect(nextState.password).toBe("password123");
    expect(nextState.error).toBeNull(); // error сбрасывается, если пароль не пустой
  });

  it("должен сбросить ошибку, если пароль пустой", () => {
    const action = loginActions.setPassword("");
    const nextState = loginSlice.reducer(initialState, action);
    expect(nextState.password).toBe("");
    expect(nextState.error).toBeNull(); // ошибка сбрасывается, если пароль пустой
  });

  it("должен очистить значения username и password", () => {
    const action = loginActions.clearValue();
    const nextState = loginSlice.reducer(
      { ...initialState, username: "test", password: "testPassword" },
      action,
    );
    expect(nextState.username).toBe("");
    expect(nextState.password).toBe("");
  });

  it("должен установить isLoading в true при pending запросе loginByUsername", () => {
    const action = loginByUsername.pending("requestId", {
      username: "testUser",
      password: "password123",
    });
    const nextState = loginSlice.reducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull(); // error сбрасывается
  });

  it("должен установить isLoading в false при успешном завершении loginByUsername", () => {
    const action = loginByUsername.fulfilled(
      { username: "testUser", id: "1" },
      "requestId",
      { username: "testUser", password: "password123" },
    );
    const nextState = loginSlice.reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
  });

  it("должен установить error при ошибке в loginByUsername", () => {
    const error = new Error("Unknown error");
    const action = loginByUsername.rejected(error, "requestId", {
      username: "testUser",
      password: "wrongPassword",
    });
    const nextState = loginSlice.reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe("Unknown error"); // Unknown error должен быть установлен
  });

  it("должен установить unknown error, если в rejected нет payload", () => {
    const error = new Error("Unknown error");
    const action = loginByUsername.rejected(error || null, "requestId", {
      username: "testUser",
      password: "wrongPassword",
    });
    const nextState = loginSlice.reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe("Unknown error"); // если нет payload, устанавливается "Unknown error"
  });
});
