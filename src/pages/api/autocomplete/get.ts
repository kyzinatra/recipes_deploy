import { collection, doc, setDoc } from "firebase/firestore";
import { NextApiResponse, NextApiRequest } from "next";

type test = { meee: "meeeee" };
export default function handler(_req: NextApiRequest, res: NextApiResponse<test>) {
	return res.status(200).json({ meee: "meeeee" });
}
