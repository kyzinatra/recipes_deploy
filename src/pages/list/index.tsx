import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../firebase.config";
import { GetStaticProps } from "next";
import React, { ChangeEvent, FC, useState } from "react";
import Layout from "../../components/Layout/Layout";

import style from "./index.module.sass";
import { Card } from "../../services/types";
import DishCard from "../../components/DishCard/DishCard";
import Input from "../../components/Form/Input/Input";
import Checkbox from "../../components/Form/Input/Checkbox/Checkbox";
import Link from "next/link";

interface IList {
	cards?: Card[];
}

const List: FC<IList> = ({ cards }) => {
	const [onlyNames, setOnlyNames] = useState(false);

	function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
		setOnlyNames(e.target.checked);
	}

	return (
		<Layout>
			<main className={style.main}>
				<h1 className={style.main__title}>Список всех блюд, добавленных на данный момент:</h1>
				<section className={style.settings}>
					<Checkbox onChange={onChangeHandler} checked={onlyNames} id="filterShow">
						Оставить только названия
					</Checkbox>
				</section>
				{!onlyNames ? (
					<section className={style.list}>
						{cards?.map((el) => (
							<DishCard key={el.id} {...el} />
						))}
					</section>
				) : (
					<ul className={style.list__names}>
						{cards?.map((el) => (
							<li className={style["name-card"]}>
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
	const docs = await getDocs(collection(db, "cards"));
	let cards: Card[] = [];
	docs.forEach((doc) => {
		cards.push(doc.data() as Card);
	});
	return {
		props: { cards },
	};
};

export default List;
