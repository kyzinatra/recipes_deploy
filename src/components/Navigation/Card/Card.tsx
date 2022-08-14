import Link from "next/link";
import React, { FC } from "react";
import { useAppDispatch } from "../../../services";
import { reset } from "../../../services/slices/details";
import { clx } from "../../../utils/classCombine";

import style from "./Card.module.sass";

interface ICard {
	children: React.ReactNode;
	href: string;
}

const Card: FC<ICard> = ({ children, href }) => {
	const dispatch = useAppDispatch();
	return (
		<Link href={href} onClick={() => dispatch(reset())}>
			<a className={clx(style.card, style.link)}>{children}</a>
		</Link>
	);
};

export default Card;
