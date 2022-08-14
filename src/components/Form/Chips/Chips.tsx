import React, { FC, useEffect, useMemo, useRef, useState } from "react";

import style from "./Chips.module.sass";

interface IChips {
	title?: string;
	autocomplete?: string[];
	onChange?: (array: string[]) => any;
	value?: string[] | null;
}

const Chips: FC<IChips> = ({ title, autocomplete, onChange, value }) => {
	const inputRef = useRef<HTMLDivElement | null>(null);
	const [isDocumentReady, setDocumentReady] = useState(false);
	const ChipsData = useRef<M.Chips | null>(null);

	//? Compare array to object with null keys
	const autocompleteData = useMemo(() => {
		if (!autocomplete) return {};
		let res: { [key: string]: null } = {};
		autocomplete.forEach((e) => (res[e] = null));
		return res;
	}, [autocomplete]);

	//? Load document event
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

	//? init chips
	useEffect(() => {
		if (inputRef.current && typeof M == "object") {
			const data: M.Chips = M.Chips.init(inputRef.current, {
				autocompleteOptions: {
					data: autocompleteData,
				},
				limit: 20,
				secondaryPlaceholder: "+ tag",
				placeholder: "Start typing..",
				onChipAdd: () =>
					onChange &&
					onChange(
						data.chipsData.map(
							// TODO: test
							(a) => a.tag[0].toUpperCase() + a.tag.substring(1).toLocaleLowerCase()
						)
					),
				onChipDelete: () => onChange && onChange(data.chipsData.map((a) => a.tag)),
			});
			ChipsData.current = data;
		}
	}, [isDocumentReady]);

	useEffect(() => {
		if (!ChipsData.current || value == null) return;

		const chipsArr = ChipsData.current?.chipsData.map((a) => a.tag) || null;
		if (JSON.stringify(chipsArr) !== JSON.stringify(value)) {
			for (let i = 0; i <= (chipsArr?.length || 0) + 1; i++) {
				ChipsData.current?.deleteChip(0);
			}
			value?.forEach((el) => {
				ChipsData.current?.addChip({ tag: el });
			});
		}
	}, [ChipsData.current, value, isDocumentReady]);

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
