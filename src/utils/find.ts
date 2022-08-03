import { isElectron } from "@firebase/util";

type Tarr = { [key: string]: any; id: string }[];

export function removeSimmular(arr: Tarr): Tarr {
	return arr.filter((el, i, arr) => {
		if (arr.findIndex((item) => item.id == el.id) != i) return false;
		return true;
	});
}
