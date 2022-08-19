import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Card from "../components/Navigation/Card/Card";
import style from "./index.module.sass";

const Main = () => {
	// useEffect(() => {
	// 	fetch("api/revalidate/add");
	// }, []);
	return (
		<Layout>
			<main className={style.main}>
				<section className={style.cards}>
					<Card href="/search">
						<div className={style.cards__icon}>
							<img src="icons/search.svg" alt="" />
						</div>
						<h1 className={style.cards__head}>Поиск блюд</h1>
						<p className={style.cards__content}>Гибкий поиск блюд по фильтрам и категориям</p>
					</Card>
					<Card href="/list">
						<div className={style.cards__icon}>
							<img src="icons/list.svg" alt="" />
						</div>
						<h1 className={style.cards__head}>Список блюд</h1>
						<p className={style.cards__content}>
							Список карточек всех блюд с расширенным просмотром
						</p>
					</Card>
					<Card href="/add">
						<div className={style.cards__icon}>
							<img src="icons/add.svg" alt="" />
						</div>
						<h1 className={style.cards__head}>Добавить новое блюдо</h1>
						<p className={style.cards__content}>
							Удобный конструктор новых блюд со списком недавно добавленных
						</p>
					</Card>
				</section>
			</main>
		</Layout>
	);
};

export default Main;
