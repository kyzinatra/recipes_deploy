import React, { FC } from "react";
import style from "./Cards.module.sass";

interface ICards {
	children: React.ReactNode;
}

const Cards: FC<ICards> = ({ children }) => {
	return <div className={style.cards}>{children}</div>;
};

export default Cards;
