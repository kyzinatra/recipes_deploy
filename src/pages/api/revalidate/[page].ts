import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "GET") res.status(403).json({ error: "Only GET methon access" });
	try {
		console.log(req.query.page);
		res.revalidate(("/" + req.query.page) as string);
		res.status(200).json({ msg: "revalidated" });
	} catch (e) {
		res.status(403).json({ error: "Revalidation error" });
	}
};
