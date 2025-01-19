import { StateSchema } from "@/app/providers/StoreProvider";
import {
  getAddCommentFormText,
  getAddCommentFormError,
} from "./addCommentFormSelectors";

describe("Тесты селекторов", () => {
  describe("getAddCommentFormText", () => {
    test("должен вернуть текст из состояния", () => {
      const state: DeepPartial<StateSchema> = {
        addCommentForm: {
          text: "Test comment",
        },
      };
      expect(getAddCommentFormText(state as StateSchema)).toBe("Test comment");
    });

    test("должен вернуть пустую строку, если текст не определён", () => {
      const state: DeepPartial<StateSchema> = {
        addCommentForm: {},
      };
      expect(getAddCommentFormText(state as StateSchema)).toBe("");
    });

    test("должен вернуть пустую строку, если addCommentForm не определён", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getAddCommentFormText(state as StateSchema)).toBe("");
    });
  });

  describe("getAddCommentFormError", () => {
    test("должен вернуть ошибку из состояния", () => {
      const state: DeepPartial<StateSchema> = {
        addCommentForm: {
          error: "Error message",
        },
      };
      expect(getAddCommentFormError(state as StateSchema)).toBe(
        "Error message",
      );
    });

    test("должен вернуть undefined, если ошибка не определена", () => {
      const state: DeepPartial<StateSchema> = {
        addCommentForm: {},
      };
      expect(getAddCommentFormError(state as StateSchema)).toBeUndefined();
    });

    test("должен вернуть undefined, если addCommentForm не определён", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getAddCommentFormError(state as StateSchema)).toBeUndefined();
    });
  });
});
