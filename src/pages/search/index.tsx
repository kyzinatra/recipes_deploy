import React, { FC, useEffect, useMemo } from "react";

import { getDocs, query, collection, orderBy, getDoc, doc } from "firebase/firestore/lite";
import { db } from "../../../firebase.config";
import { GetStaticProps } from "next/types";
import { Card, TNames, TForm } from "../../services/types";
import Form from "../../components/Form/Form";
import { useAppDispatch, useAppSelector } from "../../services";
import { ADD_TOAST } from "../../services/slices/toasts";
import Layout from "../../components/Layout/Layout";
import Cards from "../../components/DishCard/Cards/Cards";
import DishCard from "../../components/DishCard/DishCard";

import style from "./index.module.sass";
import Button from "../../components/Form/Button/Button";
import { reset } from "../../services/slices/details";
import { useFeedback } from "../../hooks/useFeedback";

interface ISearch {
	cards: Card[];
	names: TNames;
	error?: string;
	code?: number;
}

const Search: FC<ISearch> = ({ cards, names, error, code }) => {
	const { searchForm: form } = useAppSelector((a) => a.details);
	const dispatch = useAppDispatch();
	useFeedback(error, code);
	const renderCards = useMemo(() => {
		return cards.filter((card) => {
			const keys = Object.keys(form) as (keyof TForm)[];
			for (let i = 0; i < keys.length; i++) {
				const data = card[keys[i]];
				const query = form[keys[i]];

				if (data === null && query) return false; //? Exclude cards without searching field
				if (!query) continue; //? continue if no query in the field

				if (typeof data == "object" && data && typeof query == "object") {
					//? if data is array
					if (
						!query.every((tag) =>
							data.map((a) => a.toLowerCase()).includes(tag.toLocaleLowerCase())
						)
					)
						return false;
				} else if (
					!new RegExp(`${query?.toString()?.toLocaleString()}`, "gi").test(
						data?.toString().toLocaleLowerCase() || ""
					)
				)
					return false;
			}
			return true;
		});
	}, Object.values(form));

	return (
		<Layout>
			<main className={style.search}>
				<section className={style.search__section}>
					<h1>?????????????? ???????????? ?????? ???????????? ????????????: </h1>
					<Form cantSubbmit names={names} />
					<Button onClick={() => dispatch(reset())}>????????????????</Button>
				</section>
				<section className={style.search__section}>
					<h1>???????????????????? ????????????:</h1>
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

export default Search;

export const getStaticProps: GetStaticProps = async () => {
	try {
		const docs = await getDocs(query(collection(db, "cards"), orderBy("date", "desc")));
		const names = await getDoc(doc(db, "autocomplete", "names"));
		let cards: Card[] = [];
		docs.forEach((doc) => {
			cards.push(doc.data() as Card);
		});
		if (!names.exists())
			return {
				props: { cards, error: "No autocomplete names found", code: 404 },
				revalidate: 90,
			};
		return {
			props: { cards, names: names.data() },
			revalidate: 90,
		};
	} catch (e) {
		return {
			props: { error: "Server render error", code: 500 },
			revalidate: 90,
		};
	}
};
