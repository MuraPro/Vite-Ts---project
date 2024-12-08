// export const configEnv = {
//   apiUrl: process.env.VITE_API_URL || "http://localhost:8000/",
//   isDev: process.env.VITE_IS_DEV,
//   mode: process.env.VITE_MODE || "development",
//   isDevMode: process.env.NODE_ENV === "development",
// };
export const configEnv = {
  // Используйте import.meta.env для получения значений из переменных окружения Vite
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/", // Если переменная не задана, использовать localhost
  isDev: import.meta.env.VITE_IS_DEV || false, // Определение, если это dev-режим
  mode: import.meta.env.VITE_MODE || "development", // Определение текущего режима
  isDevMode: import.meta.env.MODE === "development", // Это будет равно true для dev-режима
};
