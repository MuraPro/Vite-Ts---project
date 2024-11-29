import "@testing-library/jest-dom";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { StateSchema } from "app/providers/StoreProvider"; // предполагаем, что у вас есть StoreProvider
import { createReduxStore } from "app/providers/StoreProvider/config/store"; // импортируем создание стора
import { Provider } from "react-redux";
import { componentRender } from "shared/lib/tests/componentRender/componentRender";
import LoginForm from "./LoginForm";

const mockState: DeepPartial<StateSchema> = {
  loginForm: {
    username: "testUser",
    password: "testPassword",
    error: null,
    isLoading: false,
  },
};

describe("LoginForm", () => {
  test("рендерит форму и проверяет текст заголовка", async () => {
    await componentRender(<LoginForm />, { initialState: mockState });

    const title = screen.getByText("Форма авторизации"); // Проверка заголовка
    expect(title).toBeInTheDocument();
  });

  test("проверка ввода имени пользователя и пароля", async () => {
    await componentRender(<LoginForm />, { initialState: mockState });

    const usernameInput = screen.getByLabelText(/Введите имя пользователя/i);
    const passwordInput = screen.getByLabelText(/Введите пароль/i);

    fireEvent.change(usernameInput, { target: { value: "newUser" } });
    fireEvent.change(passwordInput, { target: { value: "newPassword" } });

    expect(usernameInput).toHaveValue("newUser");
    expect(passwordInput).toHaveValue("newPassword");
  });

  test("отображение/скрытие пароля", async () => {
    await componentRender(<LoginForm />, { initialState: mockState });

    const passwordInput = screen.getByLabelText(/Введите пароль/i);
    const toggleButton = screen.getByLabelText(/Показать пароль/i);

    // Проверка, что пароль скрыт
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton); // Кликаем, чтобы показать пароль
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton); // Кликаем снова, чтобы скрыть пароль
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("проверка отправки формы", async () => {
    const store = createReduxStore(mockState as StateSchema);

    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    await componentRender(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    const form = screen.getByTestId("auth-form");
    fireEvent.submit(form);

    // Проверка, что при отправке формы был вызван dispatch
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
