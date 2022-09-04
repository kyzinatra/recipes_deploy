import React from "react";

import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				></link>
				<link rel="manifest" href="manifest.json" />
			</Head>

			<body>
				<Main />
				<div id="toasts"></div>
				<NextScript />
				<Script
					defer
					strategy="afterInteractive"
					src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
				/>
			</body>
		</Html>
	);
}
