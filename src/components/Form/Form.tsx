import React, { FC, FormEvent, useCallback, MouseEvent } from "react";
import Button from "../../components/Form/Button/Button";
import Chips from "../../components/Form/Chips/Chips";
import Input from "../../components/Form/Input/Input";
import Textarea from "../../components/Form/Textarea/Textarea";

import { clx } from "../../utils/classCombine";

import { useAppDispatch, useAppSelector } from "../../services";
import { TFormKeys, TNames } from "../../services/types";
import { reset, setField, resetEditId } from "../../services/slices/details";

import style from "./Form.module.sass";
import { useRouter } from "next/router";
interface IForm {
	onSubbmit?: (e: FormEvent<HTMLFormElement>) => any;
	names: TNames | null;
	isLoad?: boolean;
	cantSubbmit?: boolean;
	isEdit?: boolean;
}

const Form: FC<IForm> = ({ onSubbmit, names, isLoad, cantSubbmit, isEdit }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const form = useAppSelector((a) =>
		router.route == "/add" ? a.details.addForm : a.details.searchForm
	);
	function ChangeHandler(value: string | string[], name: TFormKeys) {
		if (router.route === "/add") dispatch(setField([name, value, "addForm"]));
		else dispatch(setField([name, value, "searchForm"]));
	}

	const subbmitFunction = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!cantSubbmit && onSubbmit) onSubbmit(e);
		},
		[onSubbmit, cantSubbmit]
	);
	const resetHendler = (e: MouseEvent) => {
		dispatch(reset());
		dispatch(resetEditId());
	};
	return (
		<form onSubmit={subbmitFunction} className={style.form}>
			<fieldset className={clx(style.form__group, style.form__main)}>
				<Input
					id="title"
					required
					icon="account_circle"
					value={form.name || ""}
					onChange={(e) => ChangeHandler(e.target.value, "name")}
				>
					Название
				</Input>
				<Input
					id="link"
					type="url"
					icon="link"
					value={form.link || ""}
					onChange={(e) => ChangeHandler(e.target.value, "link")}
				>
					Ссылка на рецепт
				</Input>
			</fieldset>
			<Textarea
				id="describe"
				value={form.description || ""}
				onChange={(e) => ChangeHandler(e.target.value, "description")}
			>
				Описание блюда
			</Textarea>
			<fieldset className={clx(style.form__group, style.form__compound)}>
				<Chips
					autocomplete={names?.types}
					title="Тип блюда:"
					value={form.dishTypes || []}
					onChange={(e) => ChangeHandler(e, "dishTypes")}
				/>
				<Chips
					autocomplete={names?.compound}
					title="Состав:"
					value={form.productTypes || []}
					onChange={(e) => ChangeHandler(e, "productTypes")}
				/>
			</fieldset>
			{!cantSubbmit && (
				<div className={style.form__buttons}>
					<Button className={style.form__subbmit} type="submit" load={isLoad}>
						{isEdit ? "Сохранить" : "Создать"}
					</Button>
					{isEdit && (
						<Button className={style.form__clear} onClick={resetHendler} load={isLoad}>
							Сбросить
						</Button>
					)}
				</div>
			)}
		</form>
	);
};

export default Form;
