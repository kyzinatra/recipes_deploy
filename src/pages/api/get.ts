import { doc, deleteDoc, getDocs, collection } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase.config";
import { Card } from "../../services/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "GET") res.status(403).json({ error: "Only GET methon access" });
  let result: Card[] = [];
  try {
    const docs = await getDocs(collection(db, "cards"));
    docs.forEach(d => {
      result.push(d.data() as Card);
    });
    res.status(200).json({ string: JSON.stringify(result) });
  } catch (e) {
    res.status(403).json({ error: "DB deliting Error" });
  }
};
