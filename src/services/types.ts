export type TInitialState = {
	code: number;
	message: string;
	style?: "error" | "warning" | "success" | "message";
	timeout?: number;
	id?: string;
};

export type TCardsInitialState = {
	cards: Card[];
	pending: boolean;
	reject: boolean;
	success: boolean;
};
export type TForm = {
	description: null | string;
	dishTypes: null | string[];
	name: string;
	productTypes: null | string[];
	link: null | string;
	difficulty?: number | null;
};
export type TDetailsInitialState = {
	addForm: TForm;
	searchForm: TForm;
	editId: null | string;
	pending: boolean;
	reject: boolean;
	success: boolean;
};

export type TEditForm = { editId: null | string; addForm?: TForm; searchForm?: TForm };

export type TNames = {
	types: string[];
	compound: string[];
};

export type staticResult = {
	props: TProps;
	revalidate?: number;
};

export type TProps = {
	names: null | TNames;
	cards: null | Card[];
	error?: string;
	code?: number;
};

export type Card = {
	date: number;
	description: null | string;
	dishTypes: null | string[];
	link: null | string;
	name: string;
	productTypes: null | string[];
	id: string;
	difficulty?: number | null;
};

export type TFormKeys = keyof TForm;

export type TAutocomplete = {
	compound: string[];
	types: string[];
};
