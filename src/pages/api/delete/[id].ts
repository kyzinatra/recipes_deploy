import { setDoc, doc, deleteDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../../../services/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "DELETE") res.status(403).json({ error: "Only DELETE methon access" });

	try {
		if (typeof req.query.id == "string") await deleteDoc(doc(db, "cards", req.query.id));
		else throw Error();
		res.revalidate("/add");
		res.revalidate(`/dishes/${req.query.id}`);
		// res.revalidate("/search");
		res.status(200).json({ msg: "Dish deleted successfully" });
	} catch (e) {
		res.status(403).json({ error: "DB deliting Error" });
	}
};
