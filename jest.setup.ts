// Подключение полифила для fetch
import "whatwg-fetch";

Object.defineProperty(global, "import.meta", {
  value: {
    env: {
      VITE_API_URL: "http://localhost:8000/",
      VITE_IS_DEV: false,
      VITE_MODE: "development",
    },
  },
});
