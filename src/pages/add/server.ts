import { Card, staticResult, TNames } from "../../services/types";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore/lite";
import { db } from "../../../firebase.config";
import { GetStaticProps } from "next/types";

export async function getStaticProps(context: GetStaticProps) {
	const result: staticResult = { props: { names: null, cards: null } };
	try {
		const autocompleteSnap = await getDoc(doc(db, "autocomplete", "names"));

		const cardsQuery = query(collection(db, "cards"), orderBy("date", "desc"), limit(5));
		const cardsSnap = await getDocs(cardsQuery);

		if (!cardsSnap.empty) {
			result.props.cards = [];
			cardsSnap.forEach((card) => {
				const cardData = card.data() as Card;
				result.props.cards?.push({ ...cardData, id: card.id });
			});
		} else result.props.error = "We didn't find any cards :(";

		if (autocompleteSnap.exists()) {
			result.props.names = autocompleteSnap.data() as TNames;
		} else result.props.error = "Autocomplete is empty";

		return result;
	} catch (e) {
		return {
			props: { names: null, error: "Server side render error" },
		};
	}
}
