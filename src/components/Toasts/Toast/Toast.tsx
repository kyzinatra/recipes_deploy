import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { REMOVE_TOAST } from "../../../services/slices/toasts";
import { TInitialState } from "../../../services/types";
import { clx } from "../../../utils/classCombine";
import { DEFAULT_CSS_TIMEOUT, DEFAULT_TIMEOUT } from "../../../utils/timeouts";
import { ToastIcon } from "../Icon/Icon";

import style from "./Toast.module.sass";

const Toast: FC<TInitialState> = ({ id, timeout, style: iconsTheme, message, code }) => {
	const dispatch = useDispatch();
	const [isOpen, setOpen] = useState(true);
	const mainTimeout = timeout || DEFAULT_TIMEOUT;

	useEffect(() => {
		const timeoutID = setTimeout(() => setOpen(false), mainTimeout);
		return () => clearTimeout(timeoutID);
	}, []);

	const theme = iconsTheme || "message";
	return (
		<CSSTransition
			in={isOpen}
			timeout={DEFAULT_CSS_TIMEOUT}
			classNames="toast-anim"
			unmountOnExit
			onExited={() => {
				dispatch(REMOVE_TOAST(id || ""));
			}}
		>
			<div className={clx(style.toast, style[`toast_${theme}`])}>
				<ToastIcon
					theme={theme}
					className={clx(style.toast__icon, style[`toast__icon_${theme}`])}
				/>
				<h1 className={clx(style.toast__code, style[`toast__code_${theme}`])}>
					{theme} {code}
				</h1>
				<p className={clx(style.toast__text, style[`toast__text_${theme}`])}>{message}</p>
				<span className={style.toast__times} onClick={() => setOpen(false)}>
					&times;
				</span>
			</div>
		</CSSTransition>
	);
};

export default Toast;
