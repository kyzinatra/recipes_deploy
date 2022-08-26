import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteFetch, postFetch } from "../../utils/api";
import { Card, TDetailsInitialState, TEditForm, TFormKeys } from "../types";
import { ADD_TOAST } from "./toasts";

const initialState: TDetailsInitialState = {
	addForm: {
		description: null,
		dishTypes: null,
		name: "",
		productTypes: null,
		link: null,
		difficulty: null,
	},
	searchForm: {
		description: null,
		dishTypes: null,
		name: "",
		productTypes: null,
		link: null,
		difficulty: null,
	},
	editId: null,
	pending: false,
	reject: false,
	success: false,
};

type Res = { id: string; msg: string; card: Card };

const deleteCard = createAsyncThunk(
	"details/deleteCard",
	async (id: string, { dispatch, rejectWithValue }) => {
		try {
			const res: Res = await deleteFetch("../api/delete/" + id);
			dispatch(ADD_TOAST({ message: res.msg, code: 200, style: "success" }));
			return;
		} catch (err) {
			dispatch(
				ADD_TOAST({ message: (err as Error).message || "Error", code: 500, style: "error" })
			);
			rejectWithValue((err as Error).message || "Error");
			throw Error((err as Error).message || "Error");
		}
	}
);

const editCard = createAsyncThunk(
	"details/editCard",
	async (form: TEditForm, { dispatch, rejectWithValue }) => {
		try {
			const res: Res = await postFetch("../api/edit/", form);
			dispatch(ADD_TOAST({ message: res.msg, code: 200, style: "success" }));
			return;
		} catch (err) {
			dispatch(
				ADD_TOAST({ message: (err as Error).message || "Error", code: 500, style: "error" })
			);
			rejectWithValue((err as Error).message || "Error");
			throw Error((err as Error).message || "Error");
		}
	}
);

const details = createSlice({
	name: "details",
	initialState,
	reducers: {
		setForm: (state, action: PayloadAction<TEditForm>) => {
			return { ...state, ...action.payload };
		},
		setField: (
			state,
			action: PayloadAction<
				[TFormKeys, string | null | string[] | number, "addForm" | "searchForm"]
			>
		) => {
			const field = action.payload[2];
			return {
				...state,
				[field]: {
					...state[field],
					[action.payload[0]]: action.payload[1],
				},
			};
		},
		reset: (state) => {
			return { ...state, addForm: initialState.addForm, searchForm: initialState.searchForm };
		},
		resetEditId: (state) => {
			return { ...state, editId: null };
		},
		setEdit: (state, action: PayloadAction<string>) => {
			return { ...state, editId: action.payload };
		},
	},
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

export const { setField, reset, setForm, setEdit, resetEditId } = details.actions;
export { deleteCard, editCard };

export const detailsReducer = details.reducer;
