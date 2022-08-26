import React, { FC, FormEvent, useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout/Layout";
import DishCard from "../../components/DishCard/DishCard";
import Cards from "../../components/DishCard/Cards/Cards";

import { clx } from "../../utils/classCombine";

import style from "./index.module.sass";

import { useAppDispatch, useAppSelector } from "../../services";
import { Card, TEditForm, TProps } from "../../services/types";

import { staticResult, TNames } from "../../services/types";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore/lite";
import { db } from "../../../firebase.config";
import { fetchCard } from "../../services/slices/cards";
import { removeSimmular } from "../../utils/find";
import { editCard, reset, setForm } from "../../services/slices/details";
import { useRouter } from "next/router";
import Form from "../../components/Form/Form";
import { useFeedback } from "../../hooks/useFeedback";

interface IADD extends TProps {}

const ADDPAGE: FC<IADD> = ({ names, error, cards, code }) => {
	const dispatch = useAppDispatch();
	const addCards = useAppSelector((a) => a.cards.cards);
	const { addForm: form, editId } = useAppSelector((a) => a.details);
	const [isLoad, setLoad] = useState(false);
	const router = useRouter();

	//? user feedback
	useFeedback(error, code);

	//? Subbmit adding
	function onSubbmit(e: FormEvent<HTMLFormElement>) {
		setLoad(true);
		console.log(editId);

		if (!editId) {
			dispatch(fetchCard(form)).then((res) => {
				setLoad(false);
				if (res.meta.requestStatus === "fulfilled") dispatch(reset());
			});
		} else {
			dispatch(editCard({ addForm: form, editId })).then((res) => {
				setLoad(false);
				if (res.meta.requestStatus === "fulfilled") {
					dispatch(reset());
					router.push("/add");
				}
			});
		}
	}

	const renderCards = useMemo(() => {
		const combine = [...addCards, ...(cards || [])];
		const set = removeSimmular(combine) as Card[];

		return set.splice(0, 5);
	}, [addCards, cards]);

	//? IS EDIT
	useEffect(() => {
		if (typeof router.query.form == "string") {
			dispatch(setForm(JSON.parse(router.query.form) as TEditForm));
		}
	}, [router]);
	return (
		<Layout materialize>
			<main className={style.main}>
				<section className={style.section}>
					<h1 className={style.form__title}>
						{editId
							? `Отредактируй блюдо! (${editId.substring(0, 5).toUpperCase()})`
							: "Создайте новое блюдо!"}
					</h1>
					<Form isEdit={!!editId} onSubbmit={onSubbmit} names={names} isLoad={isLoad} />
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
	const result: staticResult = { props: { names: null, cards: null }, revalidate: 90 };
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
			props: { names: null, error: "Server side render error", code: 500 },
			revalidate: 90,
		};
	}
}
