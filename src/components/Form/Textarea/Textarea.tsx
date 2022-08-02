import React, { FC } from "react";
import { clx } from "../../../utils/classCombine";

import style from "./Textarea.module.sass";

interface ITextarea {
	children?: React.ReactNode;
	id: string;
}

const Textarea: FC<ITextarea> = ({ children, id }) => {
	return (
		<div className={clx("input-field", style.textarea)}>
			<textarea
				style={{ height: "0px" }}
				id={id}
				className={clx("materialize-textarea", style.textarea__input)}
			></textarea>
			<label htmlFor={id} className={style.textarea__label}>
				{children}
			</label>
		</div>
	);
};

export default Textarea;
