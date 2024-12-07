import { ThunkDispatch } from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "app/providers/StoreProvider";
// import { AppDispatch } from "app/providers/StoreProvider";
import { useDispatch } from "react-redux";
import { Action } from "redux";

// Если нужно явно использовать ThunkDispatch
type TypedDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, Action>;
export const useAppDispatch = () => useDispatch<TypedDispatch>();

// export const useAppDispatch = () => useDispatch<AppDispatch>();
