import React, { ChangeEvent, FC } from "react";

interface IInput {
	id: string;
	children?: React.ReactNode;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
	checked?: boolean;
}

const Input: FC<IInput> = ({ id, children, onChange, checked }) => {
	return (
		<label htmlFor={id}>
			<input onChange={onChange} type={"checkbox"} checked={checked} id={id} />
			<span>{children}</span>
		</label>
	);
};

export default Input;
