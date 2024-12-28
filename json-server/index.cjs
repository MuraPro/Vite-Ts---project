const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

// Инициализация сервера
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));
const upload = multer({ dest: "uploads/" }); // Директория для хранения файлов

const express = require("express");

// Путь к папке с файлами
const staticFilesPath = path.resolve(__dirname, "../src/shared/assets/kr");

// Добавьте это перед подключением маршрутов
server.use("/static", express.static(staticFilesPath));

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

// Эндпоинт для получения всех статей (GET /articles)
server.get("/articles", (req, res) => {
  const { _expand, _limit, _page } = req.query;
  const page = Number(_page) || 1;
  const limit = Number(_limit) || 4;

  try {
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { articles, users } = db;

    if (!articles) {
      return res
        .status(500)
        .json({ message: "Articles data is missing in db.json" });
    }

    // Фильтрация и расширение статей
    const expandedArticles = articles.map((article) => {
      if (_expand === "user") {
        const user = users.find((u) => u.id === article.userId);
        return { ...article, user };
      }
      return article;
    });

    // Пагинация
    const startIndex = (page - 1) * limit;
    const paginatedArticles = expandedArticles.slice(
      startIndex,
      startIndex + limit,
    );

    return res.json(paginatedArticles);
  } catch (e) {
    console.error("Error fetching articles:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Эндпоинт для получения статьи по ID (GET /articles/:id)
server.get("/articles/:id", (req, res) => {
  const articleId = req.params.id;

  try {
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { articles } = db;

    if (!articles) {
      return res
        .status(500)
        .json({ message: "Articles data is missing in db.json" });
    }

    const article = articles.find((a) => a.id === articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.json(article); // Возвращаем найденную статью
  } catch (e) {
    console.error("Error fetching article by ID:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Эндпоинт для создания новой статьи (POST /articles)
server.post("/articles", (req, res) => {
  const newArticle = req.body;

  try {
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { articles } = db;

    if (!articles) {
      return res
        .status(500)
        .json({ message: "Articles data is missing in db.json" });
    }

    // Добавляем новую статью
    articles.push(newArticle);

    // Сохраняем изменения
    fs.writeFileSync(
      path.resolve(__dirname, "db.json"),
      JSON.stringify(db, null, 2),
    );

    return res.status(201).json(newArticle); // Возвращаем созданную статью
  } catch (e) {
    console.error("Error creating article:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Эндпоинт для обновления статьи по ID (PUT /articles/:id)
server.put("/articles/:id", (req, res) => {
  const articleId = req.params.id;
  const updatedArticle = req.body;

  try {
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { articles } = db;

    if (!articles) {
      return res
        .status(500)
        .json({ message: "Articles data is missing in db.json" });
    }

    const articleIndex = articles.findIndex((a) => a.id === articleId);

    if (articleIndex === -1) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Обновляем статью
    articles[articleIndex] = { ...articles[articleIndex], ...updatedArticle };

    // Сохраняем изменения
    fs.writeFileSync(
      path.resolve(__dirname, "db.json"),
      JSON.stringify(db, null, 2),
    );

    return res.json(articles[articleIndex]); // Возвращаем обновленную статью
  } catch (e) {
    console.error("Error updating article:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Эндпоинт для удаления статьи по ID (DELETE /articles/:id)
server.delete("/articles/:id", (req, res) => {
  const articleId = req.params.id;

  try {
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { articles } = db;

    if (!articles) {
      return res
        .status(500)
        .json({ message: "Articles data is missing in db.json" });
    }

    const articleIndex = articles.findIndex((a) => a.id === articleId);

    if (articleIndex === -1) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Удаляем статью
    articles.splice(articleIndex, 1);

    // Сохраняем изменения
    fs.writeFileSync(
      path.resolve(__dirname, "db.json"),
      JSON.stringify(db, null, 2),
    );

    return res.status(204).send(); // Возвращаем пустой ответ с кодом 204
  } catch (e) {
    console.error("Error deleting article:", e);
    return res.status(500).json({ message: "Internal server error" });
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

//==============================================================================
// const fs = require("fs");
// const jsonServer = require("json-server");
// const path = require("path");

// const server = jsonServer.create();
// const router = jsonServer.router(path.resolve(__dirname, "db.json"));
// server.use(jsonServer.defaults({}));
// server.use(jsonServer.bodyParser);
// const express = require("express");

// // Путь к папке с файлами
// const staticFilesPath = path.resolve(__dirname, "../src/shared/assets/kr");

// // Добавьте это перед подключением маршрутов
// server.use("/static", express.static(staticFilesPath));

// // Теперь файлы из `src/shared/assets/kr` доступны по пути `/static/<имя_файла>`

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

// // Эндпоинт для получения всех статей (GET /articles)
// server.get("/articles", (req, res) => {
//   const { _expand, _limit, _page } = req.query;
//   const page = Number(_page) || 1;
//   const limit = Number(_limit) || 4;

//   try {
//     const db = JSON.parse(
//       fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
//     );
//     const { articles, users } = db;

//     if (!articles) {
//       return res
//         .status(500)
//         .json({ message: "Articles data is missing in db.json" });
//     }

//     // Фильтрация и расширение статей
//     const expandedArticles = articles.map((article) => {
//       if (_expand === "user") {
//         const user = users.find((u) => u.id === article.userId);
//         return { ...article, user };
//       }
//       return article;
//     });

//     // Пагинация
//     const startIndex = (page - 1) * limit;
//     const paginatedArticles = expandedArticles.slice(
//       startIndex,
//       startIndex + limit,
//     );

//     return res.json(paginatedArticles);
//   } catch (e) {
//     console.error("Error fetching articles:", e);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Эндпоинт для получения статьи по ID (GET /articles/:id)
// server.get("/articles/:id", (req, res) => {
//   const articleId = req.params.id;

//   try {
//     const db = JSON.parse(
//       fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
//     );
//     const { articles } = db;

//     if (!articles) {
//       return res
//         .status(500)
//         .json({ message: "Articles data is missing in db.json" });
//     }

//     const article = articles.find((a) => a.id === articleId);

//     if (!article) {
//       return res.status(404).json({ message: "Article not found" });
//     }

//     return res.json(article); // Возвращаем найденную статью
//   } catch (e) {
//     console.error("Error fetching article by ID:", e);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Эндпоинт для создания новой статьи (POST /articles)
// server.post("/articles", (req, res) => {
//   const newArticle = req.body;

//   try {
//     const db = JSON.parse(
//       fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
//     );
//     const { articles } = db;

//     if (!articles) {
//       return res
//         .status(500)
//         .json({ message: "Articles data is missing in db.json" });
//     }

//     // Добавляем новую статью
//     articles.push(newArticle);

//     // Сохраняем изменения
//     fs.writeFileSync(
//       path.resolve(__dirname, "db.json"),
//       JSON.stringify(db, null, 2),
//     );

//     return res.status(201).json(newArticle); // Возвращаем созданную статью
//   } catch (e) {
//     console.error("Error creating article:", e);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Эндпоинт для обновления статьи по ID (PUT /articles/:id)
// server.put("/articles/:id", (req, res) => {
//   const articleId = req.params.id;
//   const updatedArticle = req.body;

//   try {
//     const db = JSON.parse(
//       fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
//     );
//     const { articles } = db;

//     if (!articles) {
//       return res
//         .status(500)
//         .json({ message: "Articles data is missing in db.json" });
//     }

//     const articleIndex = articles.findIndex((a) => a.id === articleId);

//     if (articleIndex === -1) {
//       return res.status(404).json({ message: "Article not found" });
//     }

//     // Обновляем статью
//     articles[articleIndex] = { ...articles[articleIndex], ...updatedArticle };

//     // Сохраняем изменения
//     fs.writeFileSync(
//       path.resolve(__dirname, "db.json"),
//       JSON.stringify(db, null, 2),
//     );

//     return res.json(articles[articleIndex]); // Возвращаем обновленную статью
//   } catch (e) {
//     console.error("Error updating article:", e);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Эндпоинт для удаления статьи по ID (DELETE /articles/:id)
// server.delete("/articles/:id", (req, res) => {
//   const articleId = req.params.id;

//   try {
//     const db = JSON.parse(
//       fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
//     );
//     const { articles } = db;

//     if (!articles) {
//       return res
//         .status(500)
//         .json({ message: "Articles data is missing in db.json" });
//     }

//     const articleIndex = articles.findIndex((a) => a.id === articleId);

//     if (articleIndex === -1) {
//       return res.status(404).json({ message: "Article not found" });
//     }

//     // Удаляем статью
//     articles.splice(articleIndex, 1);

//     // Сохраняем изменения
//     fs.writeFileSync(
//       path.resolve(__dirname, "db.json"),
//       JSON.stringify(db, null, 2),
//     );

//     return res.status(204).send(); // Возвращаем пустой ответ с кодом 204
//   } catch (e) {
//     console.error("Error deleting article:", e);
//     return res.status(500).json({ message: "Internal server error" });
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
