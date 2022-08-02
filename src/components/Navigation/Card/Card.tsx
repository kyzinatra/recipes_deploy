import Link from "next/link";
import React, { FC } from "react";
import { clx } from "../../../utils/classCombine";

import style from "./Card.module.sass";

interface ICard {
	children: React.ReactNode;
	href: string;
}

const Card: FC<ICard> = ({ children, href }) => {
	return (
		<Link href={href}>
			<a className={clx(style.card, style.link)}>{children}</a>
		</Link>
	);
};

export default Card;
