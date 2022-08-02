import Link from "next/link";
import React, { FC } from "react";
import { Card } from "../../services/types";
import Button from "../Form/Button/Button";

import style from "./DishCard.module.sass";
import Tab from "./Tab/Tab";

interface IDishCard extends Card {}

const DishCard: FC<IDishCard> = ({ date, name, dishTypes, productTypes, description, id }) => {
	const ending = description?.length || 0 >= 255 ? "..." : "";
	return (
		<Link href={`/dishes/${id}`}>
			<a className={style.card}>
				<h2 className={style.card__title}>{name}</h2>
				{description && (
					<p className={style.card__content}>{description.substring(0, 255) + ending}</p>
				)}
				<div className="">
					{dishTypes?.map((msg, i) => (
						<Tab key={i}>{msg}</Tab>
					))}
				</div>
				<div className="">
					{productTypes?.map((msg, i) => (
						<Tab key={i}>{msg}</Tab>
					))}
				</div>
				<div className={style.card__link}>
					<Button>Подробнее</Button>
				</div>
			</a>
		</Link>
	);
};

export default DishCard;
