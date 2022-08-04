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

export type TDetailsInitialState = {
	pending: boolean;
	reject: boolean;
	success: boolean;
};

export type TNames = {
	types: string[];
	compound: string[];
};

export type staticResult = {
	props: TProps;
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

export type TFrom = {
	description: null | string;
	dishTypes: null | string[];
	name: string;
	productTypes: null | string[];
	link: null | string;
};

export type TFromKeys = keyof TFrom;
