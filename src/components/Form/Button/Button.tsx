import React, { FC } from "react";
import { clx } from "../../../utils/classCombine";
import style from "./Button.module.sass";

interface IButton {
	children: React.ReactNode;
	type?: "reset" | "submit" | "button";
}

const Button: FC<IButton> = ({ children, type = "button" }) => {
	return (
		<button type={type} className={clx(style.button)}>
			{children}
		</button>
	);
};

export default Button;
