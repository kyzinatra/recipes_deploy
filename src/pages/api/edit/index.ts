import { setDoc, doc, getDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../firebase.config";
import { Card, TAutocomplete, TEditForm } from "../../../services/types";
type Data = { error: string } | { msg: "Dish updated successfully"; id: string; card: Card };

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	if (req.method != "POST") res.status(403).json({ error: "Only post methon access" });

	try {
		const body: TEditForm = req.body;
		if (!body.editId) throw Error();
		const newDish = { ...body.addForm, date: Date.now(), id: body.editId } as Card;
		await setDoc(doc(db, "cards", body.editId), newDish);
		const autocompleteSnap = await getDoc(doc(db, "autocomplete", "names"));
		if (autocompleteSnap.exists()) {
			const autocomplete = autocompleteSnap.data() as TAutocomplete;
			const compound = [...new Set([...autocomplete.compound, ...(newDish.productTypes || [])])];
			const types = [...new Set([...autocomplete.types, ...(newDish.dishTypes || [])])];
			await setDoc(doc(db, "autocomplete", "names"), { compound, types });
		}

		res.revalidate("/add");
		res.revalidate(`/dishes/${req.body.editId}`);
		res.revalidate("/list");
		res.revalidate("/search");
		res.status(200).json({ msg: "Dish updated successfully", id: body.editId, card: newDish });
	} catch (e) {
		res.status(403).json({ error: "DB updating Error" });
	}
};
