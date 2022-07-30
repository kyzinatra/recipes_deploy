import React from "react";

import { configureStore } from "@reduxjs/toolkit";
import { toastReducer } from "./slices/toasts";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: { toasts: toastReducer },
	devTools: process.env.NODE_ENV === "development",
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
