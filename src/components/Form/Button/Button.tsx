import React, { FC } from "react";
import { clx } from "../../../utils/classCombine";
import style from "./Button.module.sass";

interface IButton {
	children: React.ReactNode;
	type?: "reset" | "submit" | "button";
	className?: string;
}

const Button: FC<IButton> = ({ children, type = "button", className }) => {
	return (
		<button type={type} className={clx(style.button, className)}>
			{children}
		</button>
	);
};

export default Button;
