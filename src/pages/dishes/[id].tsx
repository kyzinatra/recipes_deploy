import React, { FC, MouseEvent} from "react";

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
import { getEditLink } from "../../utils/getLink";

interface IDishes {
	card: Card;
}

const Dishes: FC<IDishes> = ({ card }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { pending } = useAppSelector((state) => state.details);
	function clickHandler(event: MouseEvent) {
		const comfirm = confirm(
			"Вы действительно хотите удалить эту карточку.\nЭто действие нельзя будет отменить"
		);
		if (!comfirm) {
			dispatch(ADD_TOAST({ code: 403, message: "Confirmation rejected", style: "warning" }));
			return;
		}
		if (typeof router.query.id == "string")
			dispatch(deleteCard(router.query.id)).then(
				(res) => res.meta.requestStatus === "fulfilled" && router.push("/add")
			);
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
							<Link href={getEditLink(card)}>Редактировать</Link>
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
			};

		const snap = await getDoc(doc(db, "cards", id));
		if (snap.exists()) {
			return {
				props: { card: snap.data() as Card },
			};
		} else {
			return {
				props: {},
				redirect: {
					destination: "/404",
				},
			};
		}
	} catch (err) {
		return {
			props: { card: null, error: "Server get data error" },
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
