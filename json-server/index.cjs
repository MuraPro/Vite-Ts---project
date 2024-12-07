const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

// Инициализация сервера
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));
const upload = multer({ dest: "uploads/" }); // Директория для хранения файлов

// Настройка CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Поддержка варианта с косой чертой или без нее
    const allowedOrigins = [
      "https://vite-ts-project.vercel.app",
      "https://vite-ts-project.vercel.app/", // вариант с косой чертой
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
};

// Настройка CORS с указанными опциями
server.use(cors(corsOptions));

// Использование дефолтных middleware от json-server
server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Задержка в ответах для имитации реального API
server.use(async (req, res, next) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 800); // Задержка 800 мс
  });
  next();
});

// Эндпоинт для логина
server.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { users = [] } = db;

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: "User not found" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// Проверка авторизации
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "AUTH ERROR" });
  }

  next();
});

// Подключаем маршруты
server.use(router);

// Запуск сервера
server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// const fs = require("fs");
// const jsonServer = require("json-server");
// const path = require("path");
// const cors = require("cors");
// app.use(
//   cors({
//     origin: "https://vite-ts-project.vercel.app/", // или используйте '*' для разрешения всех доменов
//   }),
// );

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // Директория для хранения файлов

// const server = jsonServer.create();
// const router = jsonServer.router(path.resolve(__dirname, "db.json"));
// server.use(jsonServer.defaults({}));
// server.use(jsonServer.bodyParser);

// // Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
// server.use(async (req, res, next) => {
//   await new Promise((res) => {
//     setTimeout(res, 800);
//   });
//   next();
// });

// // Эндпоинт для логина
// server.post("/login", (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const db = JSON.parse(
//       fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
//     );
//     const { users = [] } = db;

//     const userFromBd = users.find(
//       (user) => user.username === username && user.password === password,
//     );

//     if (userFromBd) {
//       return res.json(userFromBd);
//     }

//     return res.status(403).json({ message: "User not found" });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({ message: e.message });
//   }
// });

// // Проверка авторизации
// server.use((req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(403).json({ message: "AUTH ERROR" });
//   }

//   next();
// });

// server.use(router);

// // Запуск сервера
// server.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });
