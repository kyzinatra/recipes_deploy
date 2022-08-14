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
};
export type TDetailsInitialState = {
	editId: null | string;
	info: TForm;
	pending: boolean;
	reject: boolean;
	success: boolean;
};

export type TEdiTForm = { editId: null | string; info: TForm };

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
};

export type Card = {
	date: number;
	description: null | string;
	dishTypes: null | string[];
	link: null | string;
	name: string;
	productTypes: null | string[];
	id: string;
};

export type TFormKeys = keyof TForm;

export type TAutocomplete = {
	compound: string[];
	types: string[];
};
