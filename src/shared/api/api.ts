import axios from "axios";
import { configEnv } from "shared/config/config";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

export const $api = axios.create({
  baseURL: configEnv.apiUrl,
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  },
});
