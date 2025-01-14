import path from "path"; // Добавлен импорт модуля path
import { fileURLToPath } from "url";
import { dirname } from "path";

// Получаем путь к текущему файлу и директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (...segments) =>
  path.resolve(__dirname, "..", "..", ...segments);
