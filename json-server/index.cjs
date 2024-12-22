const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

// Инициализация сервера
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));
const upload = multer({ dest: "uploads/" }); // Директория для хранения файлов

const allowedOrigins = new Set([
  "https://vite-ts-project.vercel.app",
  "http://localhost:4173",
]);

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.has(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} is not allowed by CORS policy`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Разрешенные HTTP методы
  allowedHeaders: ["Content-Type", "Authorization"], // Разрешенные заголовки
};

// Настройка CORS с указанными опциями
server.use(cors(corsOptions));

// Использование дефолтных middleware от json-server
server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

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

// Эндпоинт для получения профиля по id (GET /profile/:id)

server.get("/profile/:id", (req, res) => {
  const profileId = req.params.id; // Получаем id профиля из параметров URL
  console.log("Received profileId:", profileId); // Логируем полученный id

  let db;
  try {
    // Пробуем прочитать файл db.json
    db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
  } catch (error) {
    console.error("Error reading db.json:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  console.log("Database content:", db); // Логируем содержимое базы данных

  const { profile } = db;

  if (!profile) {
    return res
      .status(500)
      .json({ message: "Profile data is missing in db.json" });
  }

  // Находим профиль в массиве по id
  const foundProfile = profile.find((p) => p.id === profileId);

  console.log("Found profile:", foundProfile); // Логируем найденный профиль

  if (foundProfile) {
    return res.json(foundProfile); // Возвращаем профиль
  }

  return res.status(404).json({ message: "Profile not found" }); // Профиль не найден
});

// Эндпоинт для обновления профиля по id (PUT /profile/:id)
server.put("/profile/:id", (req, res) => {
  const profileId = req.params.id; // Получаем id профиля из параметров URL
  const {
    first,
    lastname,
    age,
    currency,
    country,
    city,
    username,
    avatar,
    email,
  } = req.body;

  const db = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
  );
  const { profile } = db;

  // Находим индекс профиля по id
  const profileIndex = profile.findIndex((p) => p.id === profileId);

  if (profileIndex === -1) {
    return res.status(404).json({ message: "Profile not found" }); // Профиль не найден
  }

  // Обновляем профиль
  const updatedProfile = {
    ...profile[profileIndex],
    first,
    lastname,
    age,
    currency,
    country,
    city,
    username,
    avatar,
    email,
  };

  // Заменяем старый профиль на новый
  profile[profileIndex] = updatedProfile;

  // Сохраняем обновленный массив профилей в db.json
  fs.writeFileSync(
    path.resolve(__dirname, "db.json"),
    JSON.stringify(db, null, 2),
  );

  return res.json(updatedProfile); // Возвращаем обновленный профиль
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

//==============================================================================
// const fs = require("fs");
// const jsonServer = require("json-server");
// const path = require("path");

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

// // Эндпоинт для получения профиля по id (GET /profile/:id)
// server.get("/profile/:id", (req, res) => {
//   const profileId = req.params.id; // Получаем id профиля из параметров URL
//   console.log("Received profileId:", profileId); // Логируем полученный id

//   let db;
//   try {
//     // Пробуем прочитать файл db.json
//     db = JSON.parse(
//       fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
//     );
//   } catch (error) {
//     console.error("Error reading db.json:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }

//   console.log("Database content:", db); // Логируем содержимое базы данных

//   const { profile } = db;

//   if (!profile) {
//     return res
//       .status(500)
//       .json({ message: "Profile data is missing in db.json" });
//   }

//   // Находим профиль в массиве по id
//   const foundProfile = profile.find((p) => p.id === profileId);

//   console.log("Found profile:", foundProfile); // Логируем найденный профиль

//   if (foundProfile) {
//     return res.json(foundProfile); // Возвращаем профиль
//   }

//   return res.status(404).json({ message: "Profile not found" }); // Профиль не найден
// });

// // Эндпоинт для обновления профиля по id (PUT /profile/:id)
// server.put("/profile/:id", (req, res) => {
//   const profileId = req.params.id; // Получаем id профиля из параметров URL
//   const {
//     first,
//     lastname,
//     age,
//     currency,
//     country,
//     city,
//     username,
//     avatar,
//     email,
//   } = req.body;

//   const db = JSON.parse(
//     fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
//   );
//   const { profile } = db;

//   // Находим индекс профиля по id
//   const profileIndex = profile.findIndex((p) => p.id === profileId);

//   if (profileIndex === -1) {
//     return res.status(404).json({ message: "Profile not found" }); // Профиль не найден
//   }

//   // Обновляем профиль
//   const updatedProfile = {
//     ...profile[profileIndex],
//     first,
//     lastname,
//     age,
//     currency,
//     country,
//     city,
//     username,
//     avatar,
//     email,
//   };

//   // Заменяем старый профиль на новый
//   profile[profileIndex] = updatedProfile;

//   // Сохраняем обновленный массив профилей в db.json
//   fs.writeFileSync(
//     path.resolve(__dirname, "db.json"),
//     JSON.stringify(db, null, 2),
//   );

//   return res.json(updatedProfile); // Возвращаем обновленный профиль
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
