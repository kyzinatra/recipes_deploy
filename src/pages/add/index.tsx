import React, { FC, useEffect } from "react";
import Button from "../../components/Form/Button/Button";
import Chips from "../../components/Form/Chips/Chips";
import Input from "../../components/Form/Input/Input";
import Textarea from "../../components/Form/Textarea/Textarea";
import Layout from "../../components/Layout/Layout";
import { clx } from "../../utils/classCombine";

import style from "./index.module.sass";

import { useAppDispatch } from "../../services";
import { ADD_TOAST } from "../../services/slices/toasts";
import { TProps } from "../../services/types";
import DishCard from "../../components/DishCard/DishCard";
import Cards from "../../components/DishCard/Cards/Cards";
import { getStaticProps } from "./server";

interface IADD extends TProps {}

const ADDPAGE: FC<IADD> = ({ names, error, cards }) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		//? user feedback
		if (
			names === null &&
			(error == "Autocomplete is empty" || error == "We didn't find any cards :(")
		)
			dispatch(ADD_TOAST({ message: error, code: 404, style: "warning" }));
		else if (names === null)
			dispatch(ADD_TOAST({ message: error || "Error", code: 500, style: "error" }));
	}, [names]);

	return (
		<Layout materialize>
			<main className={style.main}>
				<section className={style.section}>
					<h1 className={style.form__title}>Создайте новое блюдо!</h1>
					<form onSubmit={(e) => e.preventDefault()} className={style.form}>
						<fieldset className={clx(style.form__group, style.form__main)}>
							<Input id="title" required icon="account_circle">
								Название
							</Input>
							<Input id="link" type="url" icon="link">
								Ссылка на рецепт
							</Input>
						</fieldset>
						<Textarea id="describe">Описание блюда</Textarea>
						<fieldset className={clx(style.form__group, style.form__compound)}>
							<Chips autocomplete={names?.types} title="Тип блюда:" />
							<Chips autocomplete={names?.compound} title="Состав:" />
						</fieldset>
						<Button type="submit">Создать</Button>
					</form>
				</section>
				<section className={clx(style.section, style.botton_margin)}>
					<h1 className={style.form__title}>Недавно добавленные блюда:</h1>
					<Cards>
						{cards?.map((el) => (
							<DishCard key={el.id} {...el} />
						))}
					</Cards>
				</section>
			</main>
		</Layout>
	);
};

export default ADDPAGE;
export { getStaticProps };
