import { readable, writable, type Writable } from "svelte/store";
import { createJSONStore } from "$lib/createStore";

const ROW_MIN = 1;
const ROW_MAX = 16;

export let galleryRowItems = readable({ min: ROW_MIN, max: ROW_MAX });

export let gallerySearch = createJSONStore(
	"GALLERY_SEARCH",
	{
		items_per_row: 7,
		search_text: "",
		full_width: false,
	},
	(store) => {
		const { subscribe, set, update } = store;

		update((gallery) => ({
			...gallery,
			items_per_row: Math.max(Math.min(gallery.items_per_row, ROW_MAX), ROW_MIN),
		}));

		return {
			set(val: any) {
				set(val);
			},
			subscribe,
			toggleFullWidth() {
				store.update((g) => ({ ...g, full_width: !g.full_width }));
			},
			setItemsPerRow(n: number) {
				if (n < ROW_MIN || n > ROW_MAX) return;
				store.update((g) => ({ ...g, items_per_row: n }));
			},
			setSearchText(value: string) {
				store.update((g) => ({ ...g, search_text: value }));
			},
			setParams(params: [string, string][]) {
				if (!location) return;
				let url = new URL(location.href);

				params.forEach(([param, value]) => {
					url.searchParams.set(param, value);
				});

				const nextURL = url.href;

				if (location.href !== nextURL) {
					if ("pushState" in window.history) {
						window.history.pushState({}, "", nextURL);
					} else {
						location.replace(nextURL);
					}
					store.update((s) => s);
				}
			},
			setParam(param: string, value: string) {
				return this.setParams([[param, value]]);
			},
			update() {
				store.update((s) => s);
			},
			getParam(param: string) {
				if (!location) return null;
				return new URL(location.href).searchParams.get(param);
			},
			getAllParams() {
				return new URL(location.href).searchParams;
			},
		};
	},
);

type OptionParam = {
	param: string;
	items: string[];
	items_labels: string[] | null;
};

let optionStore: Writable<OptionParam[] | null> = writable(null);
let { set, subscribe } = optionStore;
export let galleryOptionStore = {
	subscribe,
	update(vSettings: any) {
		if (!vSettings) return null;

		const packValue = gallerySearch.getParam("pack") as string;
		const editionValue = gallerySearch.getParam("edition") as string;
		const currentEdition = editionValue;

		console.log(vSettings.packs["original_16x"]);

		const res = Object.entries<string[]>({
			packs: ["original_16x", "faithful_32x", "faithful_64x"],
			editions: vSettings.packs[packValue].editions.map((e: string) => e.toLowerCase()),
			versions: vSettings.versions[currentEdition].map((e: string) => e.toLowerCase()),
			tags: ["all", ...vSettings.tags],
		}).map(([key, values]) => ({
			param: key.slice(0, -1),
			items: values,
			items_labels: key.slice(0, -1) === "pack" ? values.map((p) => vSettings.packs[p].name) : null,
		}));

		set(res);
	},
};
