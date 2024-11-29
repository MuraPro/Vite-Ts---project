import "@testing-library/jest-dom";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { UserSchema, User } from "../types/user";
import { userActions, userReducer } from "./userSlice";

describe("userSlice", () => {
  const initialState: UserSchema = {};

  describe("setAuthData", () => {
    it("должен установить authData в состояние", () => {
      const user: User = { id: "1", username: "test_user" };
      const newState = userReducer(initialState, userActions.setAuthData(user));

      expect(newState.authData).toEqual(user);
    });
  });

  describe("initAuthData", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("должен инициализировать authData из localStorage", () => {
      const user: User = { id: "1", username: "test_user" };
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));

      const newState = userReducer(initialState, userActions.initAuthData());
      expect(newState.authData).toEqual(user);
    });

    it("не должен изменять authData, если localStorage пуст", () => {
      const newState = userReducer(initialState, userActions.initAuthData());
      expect(newState.authData).toBeUndefined();
    });
  });

  describe("logout", () => {
    it("должен удалить authData из состояния", () => {
      const initialStateWithUser: UserSchema = {
        authData: { id: "1", username: "test_user" },
      };
      const newState = userReducer(initialStateWithUser, userActions.logout());

      expect(newState.authData).toBeUndefined();
    });

    it("должен удалить authData из localStorage", () => {
      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        JSON.stringify({ id: "1", username: "test_user" }),
      );

      userReducer(initialState, userActions.logout());
      expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBeNull();
    });
  });
});
