import React, { FC } from "react";
import { clx } from "../../../utils/classCombine";
import style from "./Button.module.sass";

interface IButton {
	children: React.ReactNode;
	type?: "reset" | "submit" | "button";
	className?: string;
	load?: boolean;
}

const Button: FC<IButton> = ({ children, type = "button", className, load }) => {
	return (
		<button type={type} disabled={load} className={clx(style.button, className)}>
			{!load && children}
			{load && <i className={clx("material-icons", style.load)}>sync</i>}
		</button>
	);
};

export default Button;
