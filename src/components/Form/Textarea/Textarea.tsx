import React, { ChangeEvent, FC } from "react";
import { clx } from "../../../utils/classCombine";

import style from "./Textarea.module.sass";

interface ITextarea {
	children?: React.ReactNode;
	id: string;
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => any;
	value?: string;
}

const Textarea: FC<ITextarea> = ({ children, id, onChange, value }) => {
	return (
		<div className={clx("input-field", style.textarea)}>
			<i className="material-icons prefix">mode_edit</i>
			<textarea
				style={{ height: "0px" }}
				id={id}
				className={clx("materialize-textarea", style.textarea__input)}
				onChange={onChange}
				value={value}
			></textarea>
			<label htmlFor={id} className={clx(style.textarea__label, value ? "active" : "")}>
				{children}
			</label>
		</div>
	);
};

export default Textarea;
