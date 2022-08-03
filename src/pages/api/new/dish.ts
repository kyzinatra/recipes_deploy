import { setDoc, doc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../../../services/types";
type Data = { error: string } | { msg: "Dish added successfully"; id: string; card: Card };

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	if (req.method != "POST") res.status(403).json({ error: "Only post methon access" });

	try {
		const newId = uuidv4();
		const newDish = { ...req.body, date: Date.now() } as Card;
		await setDoc(doc(db, "cards", newId), newDish);
		res.revalidate("/add");
		res.revalidate("/list");
		res.revalidate("/search");
		res.status(200).json({ msg: "Dish added successfully", id: newId, card: newDish });
	} catch (e) {
		res.status(403).json({ error: "DB Adding Error" });
	}
};
