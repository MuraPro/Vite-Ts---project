export const configEnv = {
  //   apiUrl: process.env.VITE_API_URL || "http://localhost:8000/",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/",
  isDev: process.env.VITE_IS_DEV,
  mode: process.env.VITE_MODE || "development",
  isDevMode: process.env.NODE_ENV === "development",
};
