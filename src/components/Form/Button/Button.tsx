import React, { FC, MouseEvent } from "react";
import { clx } from "../../../utils/classCombine";
import style from "./Button.module.sass";

interface IButton {
	children: React.ReactNode;
	type?: "reset" | "submit" | "button";
	className?: string;
	load?: boolean;
	onClick?: (e: MouseEvent) => any;
	style?: string;
}

const Button: FC<IButton> = ({
	children,
	type = "button",
	className,
	load,
	onClick,
	style: propStyle,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={load}
			className={clx(style.button, className, style[propStyle || ""])}
		>
			{!load && children}
			{load && <i className={clx("material-icons", style.load)}>sync</i>}
		</button>
	);
};

export default Button;
