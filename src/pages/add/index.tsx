import React, { FC, FormEvent, useEffect, useMemo, useState } from "react";
import Button from "../../components/Form/Button/Button";
import Chips from "../../components/Form/Chips/Chips";
import Input from "../../components/Form/Input/Input";
import Textarea from "../../components/Form/Textarea/Textarea";
import Layout from "../../components/Layout/Layout";
import { clx } from "../../utils/classCombine";

import style from "./index.module.sass";

import { useAppDispatch, useAppSelector } from "../../services";
import { ADD_TOAST } from "../../services/slices/toasts";
import { Card, TEditFrom, TFrom, TFromKeys, TProps } from "../../services/types";
import DishCard from "../../components/DishCard/DishCard";
import Cards from "../../components/DishCard/Cards/Cards";
import { staticResult, TNames } from "../../services/types";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore/lite";
import { db } from "../../../firebase.config";

import { fetchCard } from "../../services/slices/cards";
import { removeSimmular } from "../../utils/find";
import { editCard, reset, setField, setFrom } from "../../services/slices/details";
import { useRouter } from "next/router";

interface IADD extends TProps {}

const ADDPAGE: FC<IADD> = ({ names, error, cards }) => {
	const dispatch = useAppDispatch();
	const addCards = useAppSelector((a) => a.cards.cards);
	const { info: form, editId } = useAppSelector((a) => a.details);
	const [isLoad, setLoad] = useState(false);
	const router = useRouter();

	//? user feedback
	useEffect(() => {
		if (
			names === null &&
			(error == "Autocomplete is empty" || error == "We didn't find any cards :(")
		)
			dispatch(ADD_TOAST({ message: error, code: 404, style: "warning" }));
		else if (names === null)
			dispatch(ADD_TOAST({ message: error || "Error", code: 500, style: "error" }));
	}, [names]);

	function ChangeHandler(value: string | string[], name: TFromKeys) {
		dispatch(setField([name, value]));
	}

	function onSubbmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoad(true);
		if (!editId) {
			dispatch(fetchCard(form)).then((res) => {
				setLoad(false);
				if (res.meta.requestStatus === "fulfilled") dispatch(reset());
			});
		} else {
			dispatch(editCard({ info: form, editId })).then((res) => {
				setLoad(false);
				if (res.meta.requestStatus === "fulfilled") {
					dispatch(reset());
					router.push("/add");
				}
			});
		}
	}

	const renderCards = useMemo(() => {
		const combine = [...addCards, ...(cards || [])].splice(0, 5);
		const set = removeSimmular(combine) as Card[];

		return set;
	}, [addCards, cards]);

	//? EDIT

	useEffect(() => {
		if (typeof router.query.form == "string") {
			dispatch(setFrom(JSON.parse(router.query.form) as TEditFrom));
		}
	}, [router]);

	return (
		<Layout materialize>
			<main className={style.main}>
				<section className={style.section}>
					<h1 className={style.form__title}>Создайте новое блюдо!</h1>
					<form onSubmit={onSubbmit} className={style.form}>
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
						<Button type="submit" load={isLoad}>
							Создать
						</Button>
					</form>
				</section>
				<section className={clx(style.section, style.botton_margin)}>
					<h1 className={style.form__title}>Недавно добавленные блюда:</h1>
					<Cards>
						{renderCards.map((el) => (
							<DishCard key={el.id} {...el} />
						))}
					</Cards>
				</section>
			</main>
		</Layout>
	);
};

export default ADDPAGE;

export async function getStaticProps() {
	console.log("add/getStaticProps");
	const result: staticResult = { props: { names: null, cards: null } };
	try {
		const autocompleteSnap = await getDoc(doc(db, "autocomplete", "names"));

		const cardsQuery = query(collection(db, "cards"), orderBy("date", "desc"), limit(5));
		const cardsSnap = await getDocs(cardsQuery);

		if (!cardsSnap.empty) {
			result.props.cards = [];
			cardsSnap.forEach((card) => {
				const cardData = card.data() as Card;
				result.props.cards?.push({ ...cardData, id: card.id });
			});
		} else result.props.error = "We didn't find any cards :(";

		if (autocompleteSnap.exists()) {
			result.props.names = autocompleteSnap.data() as TNames;
		} else result.props.error = "Autocomplete is empty";

		return result;
	} catch (e) {
		return {
			props: { names: null, error: "Server side render error" },
		};
	}
}
