import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { Profile } from "../../types/profile";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/updateProfileData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const formData = getProfileForm(getState());

  if (!formData) {
    return rejectWithValue("error");
  }

  try {
    const response: { data: Profile } = await extra.api.put<Profile>(
      "/profile",
      formData,
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
