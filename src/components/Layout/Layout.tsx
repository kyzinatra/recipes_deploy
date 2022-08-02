import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { FC } from "react";
import Toasts from "../Toasts/Toasts";

interface ILayout {
	children: React.ReactNode | React.ReactNode[];
	materialize?: boolean;
}

const Layout: FC<ILayout> = ({ children }) => {
	const path = useRouter().pathname.split("/").at(-1) || "";
	const title = (path[0]?.toUpperCase() || "") + path?.substring(1) + " dishes";
	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />

				<title>{title}</title>
			</Head>
			{children}
			<Toasts />
		</div>
	);
};

export default Layout;
