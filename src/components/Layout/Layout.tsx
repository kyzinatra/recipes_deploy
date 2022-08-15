import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Nav from "../Navigation/Nav/Nav";
import Toasts from "../Toasts/Toasts";

import style from "./Layout.module.sass";

interface ILayout {
	children: React.ReactNode | React.ReactNode[];
	materialize?: boolean;
}

const Layout: FC<ILayout> = ({ children }) => {
	let path;
	if (Array.prototype.at!) {
		path = useRouter()?.pathname?.split("/")?.at(-1) || "";
	} else {
		path = "";
	}
	let title = "";
	if (path.startsWith("[") && path.endsWith("]")) title = "Dishes";
	else title = (path[0]?.toUpperCase() || "") + path?.substring(1) + " dishes";
	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />

				<title>{title}</title>
			</Head>
			<div className={style.wrapper}>
				<Nav />
				{children}
			</div>
			<Toasts />
		</div>
	);
};

export default Layout;
