import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../services";
import Toast from "./Toast/Toast";
import style from "./Toasts.module.sass";

const Toasts = () => {
	const ref = useRef<Element>();
	const [mounted, setMounted] = useState(false);
	const toasts = useAppSelector((s) => s.toasts);

	useEffect(() => {
		ref.current = document.querySelector("#toasts") as Element;
		setMounted(true);
	}, []);

	return mounted && ref.current
		? createPortal(
				<div className={style.toasts}>
					<TransitionGroup className="toast-list">
						{toasts.map((el, i) => {
							return <Toast key={el.id || i} {...el} />;
						})}
					</TransitionGroup>
				</div>,
				ref.current
		  )
		: null;
};

export default Toasts;
