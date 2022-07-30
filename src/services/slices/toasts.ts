import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { TInitialState } from "../types";

const initialState: TInitialState[] = [];

const toastSlice = createSlice({
	name: "toasts",
	initialState,
	reducers: {
		ADD_TOAST: (state, action: PayloadAction<TInitialState>) => {
			state.push({ ...action.payload, id: uuid() });
			return state;
		},
		REMOVE_TOAST: (state, action: PayloadAction<string>) => {
			return state.filter((a) => a.id !== action.payload);
		},
		REMOVE_LAST_TOAST: (state) => {
			state.shift();
			return state;
		},
	},
});

export const { ADD_TOAST, REMOVE_TOAST, REMOVE_LAST_TOAST } = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
