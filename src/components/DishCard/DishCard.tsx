import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, MouseEvent } from "react";
import { useAppDispatch } from "../../services";
import { setForm } from "../../services/slices/details";
import { Card } from "../../services/types";
import { getEditLink } from "../../utils/getLink";
import Button from "../Form/Button/Button";
import Rating from "../Form/Rating/Rating";

import style from "./DishCard.module.sass";
import Tab from "./Tab/Tab";

interface IDishCard extends Card {}

const DishCard: FC<IDishCard> = (card) => {
	const { name, dishTypes, productTypes, description, id, link, difficulty } = card;
	const ending = (description?.length || 0) >= 255 ? "..." : "";
	const router = useRouter();
	const dispatch = useAppDispatch();
	function onEditHandler(e: MouseEvent) {
		if (router.route === "/add") {
			dispatch(
				setForm({
					addForm: {
						name,
						dishTypes,
						productTypes,
						description,
						link,
						difficulty: difficulty || null,
					},
					editId: id,
				})
			);
			window.scrollTo({
				top: 0,
			});
		} else {
			router.push(getEditLink(card));
		}
	}
	return (
		<div className={style.card}>
			<h2 className={style.card__title}>{name}</h2>
			<div>{difficulty && <Rating size="1.1" value={difficulty} disabled />}</div>
			{description && (
				<p className={style.card__content}>{description.substring(0, 255) + ending}</p>
			)}
			<div>
				{dishTypes?.map((msg, i) => (
					<Tab key={i}>{msg}</Tab>
				))}
			</div>
			<div>
				{productTypes?.map((msg, i) => (
					<Tab key={i}>{msg}</Tab>
				))}
			</div>

			<div className={style.card__link}>
				<Link href={`/dishes/${id}`}>
					<a className={style.more}>Подробнее</a>
				</Link>
				<Button style="small" onClick={onEditHandler}>
					<i className="material-icons">edit</i>
				</Button>
			</div>
		</div>
	);
};

export default DishCard;
