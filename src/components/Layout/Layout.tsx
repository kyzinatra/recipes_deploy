import Head from "next/head";
import React, { FC } from "react";
import Toasts from "../Toasts/Toasts";

interface ILayout {
	children: React.ReactNode | React.ReactNode[];
}

const Layout: FC<ILayout> = ({ children }) => {
	return (
		<div>
			<Head>
				<title>My page title</title>
			</Head>
			{children}
			<Toasts />
		</div>
	);
};

export default Layout;
