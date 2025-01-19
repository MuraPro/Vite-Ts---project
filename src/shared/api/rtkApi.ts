import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configEnv } from "@/shared/config/config";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: configEnv.apiUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || "";
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
