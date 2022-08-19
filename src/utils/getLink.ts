import { Card } from "../services/types";

export function getEditLink(card: Card) {
	const { id, description, dishTypes, name, productTypes, link } = card;
	return `/add/?form=${JSON.stringify({
		editId: id,
		addForm: {
			description,
			dishTypes,
			name,
			productTypes,
			link,
		},
	})}`;
}
