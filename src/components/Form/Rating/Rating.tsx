import React, {
	FC,
	useMemo,
	FocusEvent,
	MouseEvent,
	useState,
	KeyboardEvent,
	HTMLAttributes,
	useEffect,
} from "react";
import style from "./Rating.module.sass";

interface IRating {
	children?: React.ReactNode;
	stars?: number | string;
	onChange?: (state: number) => any;
	value?: number;
	disabled?: boolean;
	size?: string;
}

const Rating: FC<IRating> = ({
	children,
	stars: startConut = 10,
	onChange,
	value = -1,
	size = "1.8",
	disabled,
}) => {
	const [stars, setStars] = useState(value);
	const [tempStart, setTempStars] = useState(-1);

	useEffect(() => setStars(value), [value]);

	const renderStart = useMemo(() => {
		let renderData: React.ReactNode[] = [];

		let props: HTMLAttributes<HTMLElement> = {
			className: `material-icons ${style.rating}`,
			style: { fontSize: `${size}rem` },
		};

		if (!disabled) {
			props = { ...props, onMouseEnter: onStarEnter, onMouseLeave: onStarLeave, onClick: fixStars };
		}
		for (let i = 0; i < +startConut; i++) {
			if ((tempStart == -1 && stars > i) || tempStart > i)
				renderData.push(
					<i data-num={i + 1} key={i} {...props}>
						star
					</i>
				);
			else
				renderData.push(
					<i data-num={i + 1} key={i} {...props}>
						star_border
					</i>
				);
		}
		return renderData;
	}, [stars, tempStart, startConut]);

	function onStarEnter(e: MouseEvent | FocusEvent) {
		if (e.target instanceof HTMLElement) {
			setTempStars(+(e.target.dataset?.num || -1));
		}
	}
	function onStarLeave(e: MouseEvent | FocusEvent) {
		setTempStars(-1);
	}
	function fixStars(e: MouseEvent | KeyboardEvent) {
		if (e.target instanceof HTMLElement) {
			setStars(+(e.target.dataset?.num || -1));
			onChange && onChange(+(e.target.dataset?.num || -1));
		}
	}
	return (
		<>
			<span>{children}</span>
			<div>{renderStart}</div>
		</>
	);
};

export default Rating;
