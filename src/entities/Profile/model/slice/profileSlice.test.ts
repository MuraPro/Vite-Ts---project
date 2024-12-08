import { Country, Currency } from "shared/const/common";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema, Profile } from "../types/profile";
import { profileSlice, profileActions } from "./profileSlice";

describe("profileSlice", () => {
  const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
  };

  it("должен вернуть начальное состояние", () => {
    expect(profileSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("должен установить состояние readonly", () => {
    const action = profileActions.setReadonly(false);
    const state = profileSlice.reducer(initialState, action);
    expect(state.readonly).toBe(false);
  });

  it("должен обновить профиль", () => {
    const updatedProfile: Profile = {
      first: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      age: "30",
      city: "New York",
      username: "johnnyd",
      avatar: "https://example.com/avatar.png",
      currency: Currency.USD,
      country: Country.USA,
    };

    const action = profileActions.updateProfile(updatedProfile);
    const state = profileSlice.reducer(initialState, action);
    expect(state.form).toEqual(updatedProfile);
  });

  it("должен отменить редактирование", () => {
    const stateWithProfile: ProfileSchema = {
      ...initialState,
      form: {
        first: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.com",
      } as Profile,
      data: {
        first: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.com",
      } as Profile,
    };

    const action = profileActions.cancelEdit();
    const state = profileSlice.reducer(stateWithProfile, action);
    expect(state.readonly).toBe(true);
    expect(state.form).toEqual(state.data);
  });

  describe("обработка extraReducers", () => {
    it("должен обработать fetchProfileData.pending", () => {
      const action = { type: fetchProfileData.pending.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it("должен обработать fetchProfileData.fulfilled", () => {
      const profile: Profile = {
        first: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        age: "30",
        city: "New York",
        username: "johnnyd",
        avatar: "https://example.com/avatar.png",
        currency: Currency.USD,
        country: Country.USA,
      };

      const action = {
        type: fetchProfileData.fulfilled.type,
        payload: profile,
      };
      const state = profileSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(profile);
      expect(state.form).toEqual(profile);
    });

    it("должен обработать fetchProfileData.rejected", () => {
      const action = {
        type: fetchProfileData.rejected.type,
        payload: "error",
      };
      const state = profileSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe("error");
    });

    it("должен обработать updateProfileData.pending", () => {
      const action = { type: updateProfileData.pending.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it("должен обработать updateProfileData.fulfilled", () => {
      const profile: Profile = {
        first: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        age: "30",
        city: "New York",
        username: "johnnyd",
        avatar: "https://example.com/avatar.png",
        currency: Currency.USD,
        country: Country.USA,
      };

      const action = {
        type: updateProfileData.fulfilled.type,
        payload: profile,
      };
      const state = profileSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(profile);
      expect(state.form).toEqual(profile);
      expect(state.readonly).toBe(true);
    });

    it("должен обработать updateProfileData.rejected", () => {
      const action = {
        type: updateProfileData.rejected.type,
        payload: undefined,
      };

      const state = profileSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeUndefined();
    });
  });
});
