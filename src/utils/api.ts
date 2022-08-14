const chechRes = async (res: Response) => {
	if (res.ok) {
		return res.json();
	} else {
		throw Error((await res.json()).error);
	}
};

export async function postFetch(url: string, body: Object) {
	console.log(body);
	try {
		console.log(JSON.stringify(body));
	} catch (e) {
		console.log("AAAAAAAAAAAAAAAAAAAAA", e);
		console.log(body);
	}
	return fetch(url, {
		method: "POST",
		redirect: "follow",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	}).then(chechRes);
}

export async function deleteFetch(url: string) {
	return fetch(url, {
		method: "DELETE",
		redirect: "follow",
	}).then(chechRes);
}
