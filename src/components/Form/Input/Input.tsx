import React, { ChangeEvent, FC } from "react";
import { clx } from "../../../utils/classCombine";
import style from "./Input.module.sass";

interface IInput {
	id: string;
	className?: string;
	children?: React.ReactNode;
	type?: string;
	width?: string;
	required?: boolean;
	icon?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
	value?: string;
}

const Input: FC<IInput> = ({
	id,
	className,
	children,
	type = "text",
	width = "auto",
	required,
	icon,
	onChange,
	value,
}) => {
	return (
		<div className={clx(style.input, className, "input-field")}>
			{icon && <i className="material-icons prefix">{icon}</i>}
			<label htmlFor={id} className={clx("validate")}>
				{children}
			</label>
			<input
				onChange={onChange}
				type={type}
				id={id}
				value={value}
				style={{ minWidth: width }}
				required={required || false}
			/>
		</div>
	);
};

export default Input;
