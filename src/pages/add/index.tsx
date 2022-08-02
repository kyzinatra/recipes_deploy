import { GetStaticProps } from "next";
import React, { FC, useEffect } from "react";
import Button from "../../components/Form/Button/Button";
import Chips from "../../components/Form/Chips/Chips";
import Input from "../../components/Form/Input/Input";
import Textarea from "../../components/Form/Textarea/Textarea";
import Layout from "../../components/Layout/Layout";
import { clx } from "../../utils/classCombine";

import style from "./index.module.sass";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../../../firebase.config";
import { useAppDispatch } from "../../services";
import { ADD_TOAST } from "../../services/slices/toasts";
// type IHtmlFrom = {};

interface Index {
	names?: {
		types: string[];
		compound: string[];
	} | null;
	cards?: any;
	error?: string;
}

const index: FC<Index> = ({ names, cards, error }) => {
	// const [htmlFrom, setHtmlFrom] = useState({});
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (names === null && error == "Autocomplete is empty")
			dispatch(ADD_TOAST({ message: error, code: 404, style: "warning" }));
		if (names === null && error == "Server side render error")
			dispatch(ADD_TOAST({ message: error, code: 500, style: "error" }));
	}, [names]);

	return (
		<Layout materialize>
			<main className={style.main}>
				<section className={style.section}>
					<h1 className={style.form__title}>Создайте новое блюдо!</h1>
					<form onSubmit={(e) => e.preventDefault()} className={style.form}>
						<fieldset className={clx(style.form__group, style.form__main)}>
							<Input id="title" required>
								Название
							</Input>
							<Input id="link" type="url">
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
				<section className={style.section}>
					<h1 className={style.form__title}>Недавно добавленные блюда:</h1>
				</section>
			</main>
		</Layout>
	);
};

export async function getStaticProps(context: GetStaticProps) {
	// limit(5)

	try {
		const docSnap = await getDoc(doc(db, "autocomplete", "names"));
		if (docSnap.exists())
			return {
				props: { names: docSnap.data() },
			};
		else
			return {
				props: { names: null, error: "Autocomplete is empty" },
			};
	} catch (e) {
		return {
			props: { names: null, error: "Server side render error" },
		};
	}
}

export default index;
