export type TInitialState = {
	code: number;
	message: string;
	style?: "error" | "warning" | "success" | "message";
	timeout?: number;
	id?: string;
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
	ipAdress: null | string;
	link: null | string;
	name: string;
	productTypes: null | string[];
	userAgent: null | string;
	id: string;
};
