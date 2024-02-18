import { createJSONStore, createStore } from "$lib/createStore";
import { toggleInArray, toggleMin } from "$lib/utils";
import type { Addon, AddonTagArray } from "$interfaces/addons";
import { writable, derived, type Writable } from "svelte/store";

type AddonStore = Array<Addon> | undefined;
export let addonStore: Writable<AddonStore> = writable(undefined);

export let authorStore = derived(addonStore, (addons) => {
	if (addons === undefined) return undefined;

	return addons
		.map((a) => a.authors)
		.flat()
		.filter((e, i, a) => a.indexOf(e) === i)
		.sort((a, b) =>
			a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() == b.toLowerCase() ? 0 : 1,
		);
});

let addonsLoading = (aS: AddonStore) => aS === undefined;
export let loadingStore = derived(addonStore, addonsLoading);

export let favoriteStore = createJSONStore(
	"ADDON_FAVORITES",
	{
		favorites: [],
	} as FavoriteAddonStore,
	(writable) => {
		const { subscribe, update } = writable;

		return {
			subscribe,
			toggle: (addon_id: string) => {
				update((v) => ({
					favorites: toggleInArray(v.favorites, addon_id),
				}));
			},
		};
	},
);

export let favoriteResultStore = derived([favoriteStore, addonStore], ([favorites, addons]) => {
	return addons !== undefined
		? addons.filter((a) => a.id && favorites.favorites.includes(String(a.id)))
		: [];
});

export const CheckboxTypesValues = ["editions", "resolutions"] as const;
export type CheckboxType = (typeof CheckboxTypesValues)[number];

export type CheckboxChoices = {
	[K in CheckboxType]: string[];
};

export const checkboxChoices: CheckboxChoices = {
	editions: ["Java", "Bedrock"],
	resolutions: ["32x", "64x"],
};

export let searchStore = createJSONStore(
	"ADDON_SEARCH",
	{
		categories: [],
		...JSON.parse(JSON.stringify(checkboxChoices)), // deep copy
		search: "",
		authors: [],
	} as SearchAddonStore,
	(writable) => {
		const { subscribe, update } = writable;
		return {
			subscribe,
			clearCategories() {
				update((v) => {
					v.categories = [];
					return v;
				});
			},
			allCategoriesSelected(choices: string[]) {
				return derived(writable, (s) => {
					let found = true;
					let i = 0;
					while (i < choices.length && found) {
						found = s.categories.indexOf(choices[i]) !== -1;
						i++;
					}
					return found;
				});
			},
			clearSearch() {
				update((v) => {
					v.search = "";
					return v;
				});
			},
			toggleCategory: (category: string) =>
				update((v) => ({ ...v, categories: toggleInArray(v.categories, category) })),
			toggleEdition: (edition: string) =>
				update((v) => ({ ...v, editions: toggleMin(v.editions, edition) })),
			toggleResolution: (res: string) =>
				update((v) => ({ ...v, resolutions: toggleMin(v.resolutions, res) })),
			setSearch: (search: string) => update((v) => ({ ...v, search })),

			allAuthorsSelected() {
				return derived([writable, authorStore], ([s, choices]) => {
					if (choices === undefined) return false;

					let found = true;
					let i = 0;
					while (i < choices.length && found) {
						found = (s.authors || []).indexOf(choices[i]) !== -1;
						i++;
					}
					return found;
				});
			},
			clearAuthors: () => update((v) => ({ ...v, authors: [] })),
			selectAllAuthors: (authors: string[]) => update((v) => ({ ...v, authors })),
			toggleAuthor: (author: string) =>
				update((v) => ({ ...v, authors: toggleInArray(v.authors || [], author) })),
		};
	},
);

export let startStore = (function () {
	let { subscribe, update } = writable({
		started: false,
		prev: 0,
		now: 0,
		results: [] as Addon[],
	});

	return {
		subscribe,
		//prev and now are used to trigger new search
		startSearch: () =>
			update((v) => ({
				...v,
				prev: v.now,
				now: v.now + 1,
				results: v.results,
			})),
		setResults: (results: Addon[]) =>
			update((v) => ({
				...v,
				started: true,
				prev: v.now,
				now: v.now,
				results,
			})),
	};
})();

// no access to values of search or start, need to listen all of them
export let resultStore = derived(
	[startStore, searchStore, addonStore],
	([start, search, addons]) => {
		if (addons === undefined || start.prev === start.now) return start.results;

		//* Search
		let res = addons as Addon[];
		if (search.search !== "") {
			const lc_search = search.search.toLowerCase();
			res = res.filter((a) => a.name.toLowerCase().includes(lc_search));
		}

		//* authors
		if (search.authors !== undefined && Array.isArray(search.authors)) {
			if (search.authors.length > 0) {
				res = res.filter((a) => {
					let a_authors = a.authors as string[];

					let add = false;
					let i = 0;
					while (i < search.authors.length && !add) {
						add = a_authors.includes(search.authors[i]);
						i++;
					}

					return add;
				});
			}
		}

		//* categories
		if (search.categories.length > 0) {
			res = res.filter((a) => {
				if (!("categories" in a)) return true;
				if (a.categories && Array.isArray(a.categories) && a.categories.length === 0) return true;
				let a_categories = a.categories as string[];

				let add = false;
				let i = 0;
				while (i < search.categories.length && !add) {
					add = a_categories.includes(search.categories[i]);
					i++;
				}

				return add;
			});
		}

		//* resolutions
		res = res.filter((a) => {
			let add = false;

			let i = 0;
			while (i < search.resolutions.length && !add) {
				add = (a.options.tags as string[]).includes(search.resolutions[i]);
				i++;
			}

			return add;
		});

		//* editions
		res = res.filter((a) => {
			let add = false;

			let i = 0;
			while (i < search.editions.length && !add) {
				add = (a.options.tags as string[]).includes(search.editions[i]);
				i++;
			}

			return add;
		});

		//* apply
		startStore.setResults(res);

		return res;
	},
);

export let resultDisplayedStore = derived(
	[startStore, resultStore, addonStore],
	([start, result, addons]) => {
		const isResult = start.started && addons !== undefined;

		return isResult ? result : addons;
	},
);

//* data for sort types
export const SORT_TYPES_DEFAULT = "name_asc";
export const SORT_TYPES = [SORT_TYPES_DEFAULT, "name_desc", "date_asc", "date_desc"];

//* sort type stored in local storage
export let sortStore = createStore(
	"ADDON_SORT",
	"",
	(v) => v,
	(writable) => {
		let { set, subscribe, update } = writable;
		return {
			subscribe,
			set: function (type: string): Promise<void> {
				if (type === "") type = SORT_TYPES_DEFAULT;
				if (SORT_TYPES.indexOf(type) === -1) return Promise.reject(new Error("Invalid sort type"));
				set(type);
				return Promise.resolve();
			},
			previous: function () {
				update((v) => {
					if (v === "") v = SORT_TYPES_DEFAULT;
					let index = SORT_TYPES.indexOf(v);
					let new_index = (SORT_TYPES.length + index - 1) % SORT_TYPES.length;
					return SORT_TYPES[new_index];
				});
			},
			next: function () {
				update((v) => {
					if (v === "") v = SORT_TYPES_DEFAULT;
					let index = SORT_TYPES.indexOf(v);
					let new_index = (index + 1) % SORT_TYPES.length;
					return SORT_TYPES[new_index];
				});
			},
		};
	},
);

const numberToUne = (a: number) => (a === 0 ? 0 : a / Math.abs(a));
const sortByName = (a: Addon, b: Addon) => a.name.localeCompare(b.name);

const sortFunctions: Record<string, ((a: Addon, b: Addon) => number) | undefined> = {
	name_desc: (a, b) => b.name.localeCompare(a.name),
	date_asc: (a, b) => {
		if (a.last_updated && b.last_updated) return numberToUne(a.last_updated - b.last_updated);
		else if (a.last_updated && !b.last_updated)
			return -1; // a is more recent
		else if (!a.last_updated && b.last_updated) return 1; // b ismore recent
		return sortByName(a, b); // both are old
	},
	date_desc: (a, b) => {
		if (a.last_updated && b.last_updated) return numberToUne(b.last_updated - a.last_updated);
		else if (a.last_updated && !b.last_updated)
			return 1; // a is more recent
		else if (!a.last_updated && b.last_updated) return -1; // b ismore recent
		return sortByName(a, b); // both are old
	},
};

export let sortedResultStore = derived([resultDisplayedStore, sortStore], ([result, sortType]) => {
	if (result === undefined) return undefined;

	let sortedResult: Addon[] = result;
	sortedResult = sortedResult.sort(sortByName);

	let foundSortFunction = sortFunctions[sortType];
	if (foundSortFunction !== undefined) {
		if (sortType.startsWith("date")) {
			const [dated, others] = sortedResult.reduce(
				(acc, cur) => {
					if (cur.last_updated) acc[0].push(cur);
					else acc[1].push(cur);
					return acc;
				},
				[[], []] as [Addon[], Addon[]],
			);
			sortedResult = [...dated.sort(foundSortFunction), ...others.sort(sortByName)];
		} else {
			sortedResult = sortedResult.sort(foundSortFunction);
		}
	}
	// else already sorted by ascending name

	return sortedResult;
});

export let addonStatsStore = derived(addonStore, (s) => {
	if (s === undefined) return undefined;

	const result: Record<string, Record<string, number>> = {};
	const editions: string[] = [];
	Object.values(s)
		.map((e) => e.options.tags)
		.forEach((types) => {
			types
				.filter((e) => !Number.isNaN(Number.parseInt(e, 10)))
				.forEach((resolution) => {
					if (result[resolution] === undefined) result[resolution] = {};
					types
						.filter((e) => Number.isNaN(Number.parseInt(e, 10)))
						.forEach((edition) => {
							if (editions.indexOf(edition) === -1) editions.push(edition);
							if (result[resolution][edition] === undefined) result[resolution][edition] = 0;
							result[resolution][edition]++;
						});
				});
		});
	Object.keys(result).forEach((res) => {
		editions.forEach((e) => {
			if (result[res][e] === undefined) result[res][e] = 0;
		});
	});

	return result;
});
