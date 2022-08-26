import React, { useEffect } from "react";
import { useAppDispatch } from "../services";
import { ADD_TOAST } from "../services/slices/toasts";

export function useFeedback(error?: string | null, code?: number) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (error || (code && code >= 400)) {
			dispatch(
				ADD_TOAST({
					message: error || "Something went wrong :(",
					code: code || 500,
					style: "error",
				})
			);
		}
	}, [error]);
}
