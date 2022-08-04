import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteFetch } from "../../utils/api";
import { Card, TDetailsInitialState, TFrom } from "../types";
import { ADD_TOAST } from "./toasts";
type Res = { id: string; msg: string; card: Card };

const initialState: TDetailsInitialState = {
	pending: false,
	reject: false,
	success: false,
};

const deleteCard = createAsyncThunk(
	"details/deleteCard",
	async (id: string, { dispatch, fulfillWithValue, rejectWithValue }) => {
		try {
			const res: Res = await deleteFetch("../api/delete/" + id);
			dispatch(ADD_TOAST({ message: res.msg, code: 200, style: "success" }));
			return;
		} catch (err) {
			dispatch(
				ADD_TOAST({ message: (err as Error).message || "Error", code: 403, style: "error" })
			);
			rejectWithValue((err as Error).message || "Error");
			throw Error((err as Error).message || "Error");
		}
	}
);

const details = createSlice({
	name: "details",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteCard.fulfilled, (state, action) => {
				state.pending = false;
				state.reject = false;
				state.success = true;
				return state;
			})
			.addCase(deleteCard.pending, (state, action) => {
				state.pending = true;
				state.reject = false;
				state.success = false;
				return state;
			})
			.addCase(deleteCard.rejected, (state, action) => {
				state.pending = false;
				state.reject = true;
				state.success = false;
				return state;
			});
	},
});

// export const {} = cardSlice.actions;
export { deleteCard };

export const detailsReducer = details.reducer;
