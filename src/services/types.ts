export type TInitialState = {
	code: number;
	message: string;
	style?: "error" | "warning" | "success" | "message";
	timeout?: number;
	id?: string;
};
