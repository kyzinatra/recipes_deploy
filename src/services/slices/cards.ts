import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postFetch } from "../../utils/api";
import { Card, TCardsInitialState, TFrom } from "../types";
import { ADD_TOAST } from "./toasts";
type Res = { id: string; msg: string; card: Card };

const initialState: TCardsInitialState = {
	cards: [],
	pedding: false,
	reject: false,
	success: false,
};

const fetchCard = createAsyncThunk(
	"cards/fetchCard",
	async (form: TFrom, { dispatch, fulfillWithValue, rejectWithValue }) => {
		try {
			const res: Res = await postFetch("api/new/dish", form);
			dispatch(ADD_TOAST({ message: res.msg, code: 200, style: "success" }));
			fulfillWithValue({ ...res.card, id: res.id });
			return { ...res.card, id: res.id };
		} catch (err) {
			dispatch(
				ADD_TOAST({ message: (err as Error).message || "Error", code: 403, style: "error" })
			);
			rejectWithValue((err as Error).message || "Error");
			throw Error((err as Error).message || "Error");
		}
	}
);
// setAddCards((last) => [{ ...res.card, id: res.id }, ...last]);
//
const cardSlice = createSlice({
	name: "cards",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCard.fulfilled, (state, action) => {
				state.pedding = false;
				state.reject = false;
				state.success = true;
				if (action.payload != undefined) state.cards = [action.payload, ...state.cards];
				return state;
			})
			.addCase(fetchCard.pending, (state, action) => {
				state.pedding = true;
				state.reject = false;
				state.success = false;
				return state;
			})
			.addCase(fetchCard.rejected, (state, action) => {
				state.pedding = false;
				state.reject = true;
				state.success = false;
				return state;
			});
	},
});

// export const {} = cardSlice.actions;
export { fetchCard };

export const cardReducer = cardSlice.reducer;
