import { Comment } from "entities/Comment";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";

describe("articleDetailsCommentsSlice", () => {
  const initialState = {
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  };

  const commentsData: Comment[] = [
    {
      id: "1",
      user: { id: "1", username: "user1" },
      text: "This is a comment 1",
    },
    {
      id: "2",
      user: { id: "2", username: "user2" },
      text: "This is a comment 2",
    },
  ];

  test("должен вернуть начальное состояние", () => {
    const state = articleDetailsCommentsReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  test("должен устанавливать isLoading в true при ожидании комментариев", () => {
    const action = fetchCommentsByArticleId.pending.type;
    const state = articleDetailsCommentsReducer(initialState, { type: action });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  test("должен загрузить комментарии при успешном ответе", () => {
    const action = fetchCommentsByArticleId.fulfilled(commentsData, "", "1");
    const state = articleDetailsCommentsReducer(initialState, action);

    // Проверяем, что isLoading стал false, и комментарии были добавлены
    expect(state.isLoading).toBe(false);
    expect(state.entities).toEqual({
      "1": commentsData[0],
      "2": commentsData[1],
    });
    expect(state.ids).toEqual(["1", "2"]);
  });

  test("должен обработать ошибку при неудачном запросе", () => {
    const error = new Error("Network Error"); // Строка ошибки, как это ожидается в вашем слайсе
    const action = fetchCommentsByArticleId.rejected(error, "", "1");
    const state = articleDetailsCommentsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeUndefined();
  });

  test("должен вернуть пустой список, если комментариев нет", () => {
    const emptyCommentsData: Comment[] = [];
    const action = fetchCommentsByArticleId.fulfilled(
      emptyCommentsData,
      "",
      "1",
    );
    const state = articleDetailsCommentsReducer(initialState, action);

    // Проверяем, что после получения пустых данных комментариев,
    // состояние осталось пустым
    expect(state.isLoading).toBe(false);
    expect(state.entities).toEqual({});
    expect(state.ids).toEqual([]);
  });
});
