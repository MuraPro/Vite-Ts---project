import { loginByUsername } from "../services/loginByUsername/loginByUsername";
import { LoginSchema } from "../types/loginSchema";
import { loginReducer, loginActions } from "./loginSlice";

describe("loginSlice", () => {
  const initialState: LoginSchema = {
    isLoading: false,
    username: "",
    password: "",
    error: undefined,
  };

  it("должен установить username", () => {
    const action = loginActions.setUsername("testUser");
    const nextState = loginReducer(initialState, action);

    expect(nextState.username).toBe("testUser");
    expect(nextState.error).toBeUndefined();
  });

  it("должен сбросить ошибку, если username пустой", () => {
    const stateWithError: LoginSchema = {
      ...initialState,
      error: "Some error",
    };
    const action = loginActions.setUsername("");
    const nextState = loginReducer(stateWithError, action);

    expect(nextState.username).toBe("");
    expect(nextState.error).toBeUndefined();
  });

  it("должен установить password", () => {
    const action = loginActions.setPassword("testPassword");
    const nextState = loginReducer(initialState, action);

    expect(nextState.password).toBe("testPassword");
    expect(nextState.error).toBeUndefined();
  });

  it("должен сбросить ошибку, если password пустой", () => {
    const stateWithError: LoginSchema = {
      ...initialState,
      error: "Some error",
    };
    const action = loginActions.setPassword("");
    const nextState = loginReducer(stateWithError, action);

    expect(nextState.password).toBe("");
    expect(nextState.error).toBeUndefined();
  });

  it("должен очистить username и password при вызове clearValue", () => {
    const stateWithValues: LoginSchema = {
      ...initialState,
      username: "testUser",
      password: "testPassword",
    };
    const action = loginActions.clearValue();
    const nextState = loginReducer(stateWithValues, action);

    expect(nextState.username).toBe("");
    expect(nextState.password).toBe("");
  });

  it("должен установить isLoading в true при pending запросе loginByUsername", () => {
    const action = { type: loginByUsername.pending.type };
    const nextState = loginReducer(initialState, action);

    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeUndefined();
  });

  it("должен установить isLoading в false при успешном завершении loginByUsername", () => {
    const action = { type: loginByUsername.fulfilled.type };
    const nextState = loginReducer(
      { ...initialState, isLoading: true },
      action,
    );

    expect(nextState.isLoading).toBe(false);
  });

  it("должен установить error при ошибке в loginByUsername", () => {
    const action = {
      type: loginByUsername.rejected.type,
      payload: "Login failed",
    };
    const nextState = loginReducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe("Login failed");
  });

  it("должен установить 'Unknown error', если в rejected нет payload", () => {
    const action = { type: loginByUsername.rejected.type };
    const nextState = loginReducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe("Unknown error");
  });
});
