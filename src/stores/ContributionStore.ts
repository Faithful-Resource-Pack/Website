import { derived } from "svelte/store";
import { readable } from "svelte/store";

type Contribution = any;

let _contributions = readable(
	{
		data: undefined,
		error: undefined
	} as {
		data: Record<string, Record<string, Contribution[]>> | undefined;
		error: Error | undefined;
	},
	(set) => {
		fetch("https://api.faithfulpack.net/v2/contributions/raw")
			.then((res) => res.json())
			.then((res) => Object.values(res))
			.then((json: Contribution[]) => {
				let reduced = json
					.filter((contribution) => contribution.pack && contribution.texture)
					.reduce((acc: Record<string, Record<string, Contribution[]>>, cur: any) => {
						if (!acc[cur.pack]) acc[cur.pack] = {};
						if (!acc[cur.pack][cur.texture]) acc[cur.pack][cur.texture] = [];

						acc[cur.pack][cur.texture].push({
							contributors: cur.authors,
							date: cur.date
						});

						return acc;
					});
				set({
					data: reduced,
					error: undefined
				});
			})
			.catch((err: Error) => {
				set({ data: undefined, error: err });
			});
	}
);

let contributionStore = derived(_contributions, (res) => res.data);
let contributionError = derived(_contributions, (res) => res.error);

type Contributor = {
	id: string;
	contributions: number;
	username: string;
	uuid?: string;
};

let contributionAuthors = readable({} as Record<string, Contributor>, (set) => {
	fetch(`https://api.faithfulpack.net/v2/contributions/authors`)
		.then((res) => res.json())
		.then((res: Contributor[]) => {
			set(
				res.reduce(
					(acc, cur) => {
						acc[cur.id] = cur;
						return acc;
					},
					{} as Record<string, Contributor>
				)
			);
		});
});

export default contributionStore;
export { contributionStore, contributionError, contributionAuthors };
