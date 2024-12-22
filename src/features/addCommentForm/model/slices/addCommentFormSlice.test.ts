import { AddCommentFormSchema } from "../types/addCommentForm";
import {
  addCommentFormReducer,
  addCommentFormActions,
} from "./addCommentFormSlice";

describe("addCommentFormSlice", () => {
  const initialState: AddCommentFormSchema = {
    text: "",
  };

  test("должен вернуть первоначальное состояние по умолчанию", () => {
    const action = { type: "unknown" };
    expect(addCommentFormReducer(undefined, action)).toEqual(initialState);
  });

  test("должен обновлять текст через действие setText", () => {
    const newState = addCommentFormReducer(
      initialState,
      addCommentFormActions.setText("Новый комментарий"),
    );
    expect(newState).toEqual({
      text: "Новый комментарий",
    });
  });

  test("должен обновить текст с пустой строки на новую", () => {
    const state: AddCommentFormSchema = { text: "" };
    const action = addCommentFormActions.setText("Комментарий");
    const result = addCommentFormReducer(state, action);
    expect(result.text).toBe("Комментарий");
  });

  test("не должен изменять другие свойства состояния при вызове setText", () => {
    const state = { ...initialState, error: "Ошибка" } as AddCommentFormSchema;
    const newState = addCommentFormReducer(
      state,
      addCommentFormActions.setText("Тестовый текст"),
    );
    expect(newState).toEqual({
      text: "Тестовый текст",
      error: "Ошибка",
    });
  });
});
