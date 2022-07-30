import React from "react";
import type { AppProps } from "next/app";
import "../sass/index.sass";
import { store } from "../services";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />{" "}
		</Provider>
	);
}

export default MyApp;
