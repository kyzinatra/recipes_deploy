import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { db } from "../../../firebase.config";
import { GetStaticProps } from "next";
import React, { ChangeEvent, FC, useMemo, useState } from "react";
import Layout from "../../components/Layout/Layout";

import style from "./index.module.sass";
import { Card } from "../../services/types";
import DishCard from "../../components/DishCard/DishCard";
import Checkbox from "../../components/Form/Input/Checkbox/Checkbox";
import Link from "next/link";
import Cards from "../../components/DishCard/Cards/Cards";

interface IList {
	cards?: Card[];
}

const List: FC<IList> = ({ cards }) => {
	const [onlyNames, setOnlyNames] = useState(false);
	const [byName, setByName] = useState(false);
	const [onlyDesc, setonlyDesc] = useState(false);
	const [onlyRec, setOnlyRec] = useState(false);

	function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
		switch (e.target.id) {
			case "filterShow":
				setOnlyNames(e.target.checked);
				break;
			case "filterName":
				setByName(e.target.checked);
				break;
			case "filterDesc":
				setonlyDesc(e.target.checked);
				break;
			case "filterRec":
				setOnlyRec(e.target.checked);
				break;
		}
	}

	const renderCard = useMemo(() => {
		let cardsCopy = [...(cards || [])];
		let collator = new Intl.Collator();
		if (byName) cardsCopy = cardsCopy.sort((a, b) => collator.compare(a.name, b.name));
		if (onlyDesc) cardsCopy = cardsCopy.filter((el) => el.description != null);
		if (onlyRec) cardsCopy = cardsCopy.filter((el) => el.link != null);
		return cardsCopy;
	}, [byName, onlyDesc, onlyRec]);

	return (
		<Layout>
			<main className={style.main}>
				<h1 className={style.main__title}>Список всех блюд, добавленных на данный момент:</h1>
				<section className={style.settings}>
					<h2 className={style.settings__head}>Настройки:</h2>
					<div className={style.settings__content}>
						<Checkbox onChange={onChangeHandler} checked={onlyNames} id="filterShow">
							Оставить только названия
						</Checkbox>
						<Checkbox onChange={onChangeHandler} checked={byName} id="filterName">
							Сортировать по имени
						</Checkbox>
						<Checkbox onChange={onChangeHandler} checked={onlyDesc} id="filterDesc">
							Только с описанием
						</Checkbox>
						<Checkbox onChange={onChangeHandler} checked={onlyRec} id="filterRec">
							Только с рецептом
						</Checkbox>
					</div>
				</section>
				{!onlyNames ? (
					<Cards>
						{renderCard?.map((el) => (
							<DishCard key={el.id} {...el} />
						))}
					</Cards>
				) : (
					<ul className={style.list__names}>
						{renderCard?.map((el) => (
							<li className={style["name-card"]} key={el.id}>
								<Link href={`dishes/${el.id}`}>
									<a href="">
										<h2>{el.name}</h2>
									</a>
								</Link>
								{el.description && <p>{el.description}</p>}
							</li>
						))}
					</ul>
				)}
			</main>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const docs = await getDocs(query(collection(db, "cards"), orderBy("date", "desc")));
	let cards: Card[] = [];
	docs.forEach((doc) => {
		cards.push(doc.data() as Card);
	});
	return {
		props: { cards },
	};
};

export default List;
