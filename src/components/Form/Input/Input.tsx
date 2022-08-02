import React, { FC } from "react";
import { clx } from "../../../utils/classCombine";
import style from "./Input.module.sass";

interface IInput {
	id: string;
	className?: string;
	children?: React.ReactNode;
	type?: string;
	width?: string;
	required?: boolean;
}

const Input: FC<IInput> = ({
	id,
	className,
	children,
	type = "text",
	width = "auto",
	required,
}) => {
	return (
		<div className={clx(style.input, className, "input-field")}>
			<label htmlFor={id} className={clx("validate")}>
				{children}
			</label>
			<input type={type} id={id} style={{ minWidth: width }} required={required || false} />
		</div>
	);
};

export default Input;
