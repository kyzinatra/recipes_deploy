import React, { FC, MouseEvent, useEffect } from "react";

import { Card } from "../../services/types";
import { collection, getDoc, getDocs, doc } from "firebase/firestore/lite";
import { GetStaticProps, GetStaticPaths } from "next";
import { db } from "../../../firebase.config";

import style from "./dishes.module.sass";
import Tab from "../../components/DishCard/Tab/Tab";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import Button from "../../components/Form/Button/Button";
import { useAppDispatch, useAppSelector } from "../../services";
import { deleteCard } from "../../services/slices/details";
import { ADD_TOAST } from "../../services/slices/toasts";

interface IDishes {
	card: Card;
}

const Dishes: FC<IDishes> = ({ card }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { pending, success } = useAppSelector((state) => state.details);
	function clickHandler(event: MouseEvent) {
		if (typeof router.query.id == "string")
			dispatch(deleteCard(router.query.id)).then(() => router.push("/add?reload=true"));
		else dispatch(ADD_TOAST({ code: 402, message: "Wrond input type" }));
	}
	return (
		<Layout>
			<main className={style.main}>
				{router.isFallback ? (
					<h1 className={style.fallback}>Loading...</h1>
				) : (
					<div className={style.card}>
						<h1>{card.name}</h1>
						<p>{card.description}</p>
						<div>
							{card.dishTypes?.map((el, i) => (
								<Tab key={i}>{el}</Tab>
							))}
						</div>
						<div>
							{card.productTypes?.map((el, i) => (
								<Tab key={i}>{el}</Tab>
							))}
						</div>
						<div className={style.link}>
							{card.link && <Link href={card.link}>Посмотреть рецепт</Link>}
							<Button load={pending} style="DELETE" onClick={clickHandler} className={style.button}>
								Удалить карточку
							</Button>
						</div>
					</div>
				)}
			</main>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async function (context) {
	console.log("dishes/{id}/getStaticProps");
	try {
		const id = context.params?.id;
		if (typeof id != "string")
			return {
				props: { card: null, error: "ID type Error" },
				revalidate: 10,
			};

		const snap = await getDoc(doc(db, "cards", id));
		if (snap.exists()) {
			return {
				props: { card: snap.data() as Card },
				revalidate: 10,
			};
		} else {
			return {
				props: {},
				redirect: {
					destination: "/404",
				},
				revalidate: 10,
			};
		}
	} catch (err) {
		return {
			props: { card: null, error: "Server get data error" },
			revalidate: 10,
		};
	}
};

export const getStaticPaths: GetStaticPaths = async function () {
	console.log("dishes/{id}/getStaticPath");

	let paths: { params: { id: string } }[] = [];

	const querySnapshot = await getDocs(collection(db, "cards"));
	querySnapshot.forEach((doc) => {
		paths.push({ params: { id: doc.id.toString() } });
	});
	return {
		paths,
		fallback: "blocking",
	};
};

export default Dishes;
