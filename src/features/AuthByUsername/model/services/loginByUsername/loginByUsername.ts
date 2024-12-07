import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { User, userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>("login/loginByUsername", async (authData, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;
  try {
    const response = await extra.api.post<User>("/login", {
      ...authData,
    });

    if (!response.data) {
      throw new Error();
    }
    if (!extra.api) {
      throw new Error("API instance is not available");
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    dispatch(userActions.setAuthData(response.data));
    // const navigate = extra.navigate;

    // if (navigate) {
    //   navigate("/about");
    // }

    return response.data;
  } catch (e) {
    return rejectWithValue("error");
  }
});
