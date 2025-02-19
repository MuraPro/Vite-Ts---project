import fs from "fs/promises";
import resolveRoot from "../resolveRoot.js";
import createModel from "./createModel.js";
import createUI from "./createUI.js";
import createPublicApi from "./createPublicApi.js";

const createSlice = async (layer, sliceName) => {
  try {
    await fs.mkdir(resolveRoot("src", layer, sliceName));
  } catch (e) {
    console.log(`Не удалось создать директорию для слайса ${sliceName}`);
  }

  await createModel(layer, sliceName);
  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};

export default createSlice;
