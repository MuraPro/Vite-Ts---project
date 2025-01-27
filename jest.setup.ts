// Подключение полифила для fetch
import "whatwg-fetch";
import "@testing-library/jest-dom";
import ResizeObserver from "resize-observer-polyfill";

// Присваиваем глобально, чтобы использовать в тестах
global.ResizeObserver = ResizeObserver;

Object.defineProperty(global, "import.meta", {
  value: {
    env: {
      VITE_API_URL: "http://localhost:8000/",
      VITE_IS_DEV: false,
      VITE_MODE: "development",
      MODE: "test",
    },
  },
});
