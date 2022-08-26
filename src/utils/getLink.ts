import { Card, TEditForm } from "../services/types";

export function getEditLink(card: Card): string {
	const { id, description, dishTypes, name, productTypes, link, difficulty } = card;
	return `/add/?form=${JSON.stringify({
		editId: id,
		addForm: {
			description,
			dishTypes,
			name,
			productTypes,
			link,
			difficulty: difficulty || null,
		},
	})}`;
}
