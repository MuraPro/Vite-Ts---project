import fs from "fs/promises";
import resolveRoot from "../resolveRoot.js";
import reduxSliceTemplate from "./reduxSliceTemplate.js";
import schemaTypeTemplate from "./schemaTypeTemplate.js";

export default async function createModel(layer, sliceName) {
  const resolveModelPath = (...segments) =>
    resolveRoot("src", layer, sliceName, "model", ...segments);

  const createModelStructure = async () => {
    try {
      // Список директорий, которые нужно создать
      const dirs = ["", "types", "slices", "selectors", "services"];
      for (const dir of dirs) {
        const dirPath = resolveModelPath(dir);
        // Асинхронная проверка существования директории
        try {
          await fs.stat(dirPath);
        } catch (err) {
          if (err.code === "ENOENT") {
            await fs.mkdir(dirPath);
          } else {
            throw err;
          }
        }
      }
    } catch (e) {
      console.log(
        `Не удалось создать model сегмент для слайса ${sliceName}`,
        e,
      );
    }
  };

  const createReduxSlice = async () => {
    try {
      const filePath = resolveModelPath("slices", `${sliceName}Slice.ts`);
      // Асинхронная проверка существования файла
      try {
        await fs.stat(filePath);
      } catch (err) {
        if (err.code === "ENOENT") {
          await fs.writeFile(filePath, reduxSliceTemplate(sliceName));
        } else {
          throw err;
        }
      }
    } catch (e) {
      console.log("Не удалось создать редакс слайс", e);
    }
  };

  const createSchemaType = async () => {
    try {
      const filePath = resolveModelPath("types", `${sliceName}Schema.ts`);
      // Асинхронная проверка существования файла
      try {
        await fs.stat(filePath);
      } catch (err) {
        if (err.code === "ENOENT") {
          await fs.writeFile(filePath, schemaTypeTemplate(sliceName));
        } else {
          throw err;
        }
      }
    } catch (e) {
      console.log("Не удалось создать тип схемы стейта", e);
    }
  };

  await createModelStructure();
  await createReduxSlice();
  await createSchemaType();
}
