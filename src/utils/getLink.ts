import { Card } from "../services/types";

export function getEditLink(card: Card) {
	const { id, description, dishTypes, name, productTypes, link } = card;
	return `/add/?form=${JSON.stringify({
		editId: id,
		info: {
			description,
			dishTypes,
			name,
			productTypes,
			link,
		},
	})}`;
}
