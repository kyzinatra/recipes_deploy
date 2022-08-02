import React, { FC, useEffect, useMemo, useRef, useState } from "react";

import style from "./Chips.module.sass";

interface IChips {
	title?: string;
	autocomplete?: string[];
}

const Chips: FC<IChips> = ({ title, autocomplete }) => {
	const inputRef = useRef<HTMLDivElement | null>(null);
	const [isDocumentReady, setDocumentReady] = useState(false);
	const autocompleteData = useMemo(() => {
		if (!autocomplete) return {};
		let res: { [key: string]: null } = {};
		autocomplete.forEach((e) => (res[e] = null));
		return res;
	}, [autocomplete]);
	useEffect(() => {
		if (document.readyState == "complete") {
			setDocumentReady(true);
			return;
		}

		const loadListener = function () {
			setDocumentReady(true);
		};
		window.addEventListener("load", loadListener);
		return () => window.removeEventListener("load", loadListener);
	}, []);

	useEffect(() => {
		if (inputRef.current && typeof M == "object") {
			M.Chips.init(inputRef.current, {
				autocompleteOptions: {
					data: autocompleteData,
				},
				limit: 20,
				secondaryPlaceholder: "+ tag",
				placeholder: "Start typing..",
			});
		}
	}, [isDocumentReady]);
	return (
		<div>
			<span className={style.chips__title}>{title}</span>
			<div ref={inputRef} className="chips chips-autocomplete">
				<input className={style.chips} />
			</div>
		</div>
	);
};

export default Chips;
