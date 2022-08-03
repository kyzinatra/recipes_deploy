const chechRes = async (res: Response) => {
	if (res.ok) {
		return res.json();
	} else {
		throw Error((await res.json()).error);
	}
};

export async function postFetch(url: string, body: Object) {
	return fetch(url, {
		method: "POST",
		redirect: "follow",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	}).then(chechRes);
}
